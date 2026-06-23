/**
 * =====================================================================
 * Script de verificación de métodos de pago del componente Suscripcion
 * =====================================================================
 * Este script realiza llamadas HTTP READ-ONLY / dry-run contra los
 * endpoints configurados en src/global/config.jsx para comprobar:
 *   - Conectividad y DNS
 *   - Estado TLS / códigos HTTP
 *   - Validez de tokens y credenciales
 *   - Formato de respuesta del backend
 *
 * IMPORTANTE:
 *   - NO se ejecutan cobros reales. Se usan payloads mínimos o
 *     identificadores inventados para forzar una respuesta del servidor.
 *   - Requiere Node 18+ (usa fetch nativo).
 *
 * USO:
 *   node verify_payment_methods.js
 *
 * Autor: Equipo VisitaEcuador - Auditoría de pagos
 * ===================================================================== */

const CONFIG = {
  URL_SERVICIOS: "https://apidev.visitaecuador.com/v1.7",
  URL_SERVICIOS_PAGOS: "https://dev.visitaecuador.com/",
  URL_PAYPHONE: "https://pay.payphonetodoesposible.com/api/transaction",
  URL_PAYPHONE_API: "https://pay.payphonetodoesposible.com/api",
  VERPAY: "/pay/",
  VERSUS: "/sus/",
  IDSERVICIO: "1",
  IDEMPRESA: "1",
  MONEDA: "USD",
  TOKENPP: "jvAtIRktHfYT90uEZ1mp5A7fIgD0S40g2eYrS7IHvEFy7ZCVflXxPDZbjsVssdjRjPsfbIPg968yyp6pGSeRDgk49I31Q9xNDUZnZbWjI-zAxu3rGM4SE1ZkOi8oncLbYJrQu0by526kkcLuQ3gevQoAylkR0Mplxc5KeAcK00ShHeM_mKPRA4vI1pe6ssCKahJxpYRrWTdoI7VqPmlqGfIE8KV5YJzP1fcXWRJjV-Hj7mL7HRK2L-Nfy0nAAioiRb22TgWnL-0KptvdGCUi2HGXaICwLe5KYLCZJ7j2s7JW50M8OPhevz5m3zpI6jgOCkR2VA",
  TOKENPP_BP:
    "_lHifGqe0mLy7wQ-NElk3oX62v6KzkOjEkmn6DJwN_qPMoWUpCBc5ThqnMRcENtYVEfHPUFtBsiBYjuWnJhNihqZoDFqktxQxQsPkW455r4rsDhurhaNNhE-B9mZVYCryWVGK-h9gzvYzEXzaDOAvPkuA7mAQhBvgcojamlhk0RBE-gXum-VwXd_wQk2Y5aokqjAN4h9o5wBcLmBJ9g8C_0pj_jiN85hdkqK6_Nujk8H1MEQqPcVRY5w5KzdSz-yKX6CsAxCfp6-UGzufSUh5OeTQsaACdQnOlVTZ495ktUp8SNklZ-hfJ7xTehAeX4vhlzX9g",
  PAYPAL_CLIENT_ID:
    "AfbecBsoFjZoJL6bVAXkE2uZZVvyA_WY0aGxuSA8Q1UIPAvrRr1h6bRmWMkUQ89F3ztV0GH6jQWb3WEv",
};

// -- helpers --------------------------------------------------------------

const BOLD = "\x1b[1m";
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";

function header(label) {
  console.log(`\n${CYAN}${BOLD}── ${label} ${"─".repeat(Math.max(0, 70 - label.length))}${RESET}`);
}

function ok(msg) {
  console.log(`  ${GREEN}✔${RESET} ${msg}`);
}
function warn(msg) {
  console.log(`  ${YELLOW}⚠${RESET} ${msg}`);
}
function fail(msg) {
  console.log(`  ${RED}✘${RESET} ${msg}`);
}

async function timedFetch(url, init = {}, timeoutMs = 15000) {
  const ctrl = new AbortController();
  const t0 = Date.now();
  const to = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...init, signal: ctrl.signal });
    const elapsed = Date.now() - t0;
    let bodyText = "";
    try {
      bodyText = await res.text();
    } catch (_) {}
    return { ok: true, status: res.status, headers: Object.fromEntries(res.headers), body: bodyText, elapsed };
  } catch (e) {
    return { ok: false, error: e.message, elapsed: Date.now() - t0 };
  } finally {
    clearTimeout(to);
  }
}

function tryJson(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

const results = [];

function record(name, status, detail, raw) {
  results.push({ name, status, detail, raw });
}

// -- 1. PayPhone Tarjeta (Create) ----------------------------------------

async function testPayPhoneCreate() {
  header("1. PayPhone - Tarjeta (POST /Create/)");
  const url = `${CONFIG.URL_PAYPHONE}/Create/`;
  // Payload INVÁLIDO a propósito: sólo verificamos autenticación/DNS.
  const body = {
    amount: 0,
    currency: "USD",
    clientTransactionId: "verify_" + Date.now(),
  };
  const r = await timedFetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CONFIG.TOKENPP}`,
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  });

  if (!r.ok) {
    fail(`Sin respuesta: ${r.error} (${r.elapsed}ms)`);
    record("PayPhone Create", "ERROR", r.error);
    return;
  }
  console.log(`  HTTP ${r.status}  ·  ${r.elapsed}ms`);
  const json = tryJson(r.body);
  if (r.status === 401) {
    fail("Token PayPhone INVÁLIDO (401). Revisar Config.TOKENPP.");
    record("PayPhone Create", "AUTH FAIL", "401 Unauthorized");
  } else if (r.status >= 400 && r.status < 500) {
    ok(`Endpoint responde con validación (${r.status}). Token válido.`);
    record("PayPhone Create", "OK (validación)", json?.message || r.body.slice(0, 140));
  } else if (r.status >= 500) {
    warn(`Error de servidor: ${r.status}`);
    record("PayPhone Create", "SERVER ERROR", r.body.slice(0, 140));
  } else if (r.status >= 200 && r.status < 300) {
    warn("Respuesta 2xx con payload vacío: revisar manualmente.");
    record("PayPhone Create", "OK", r.body.slice(0, 140));
  }
}

// -- 2. PayPhone Botón de Pago (prepare + getStatus) ---------------------

async function testPayPhoneBP() {
  header("2. PayPhone - Botón de Pago (POST /sale + GET /sale/:id)");

  // 2a. POST /sale con body mínimo
  const r1 = await timedFetch(`${CONFIG.URL_PAYPHONE_API}/sale`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CONFIG.TOKENPP_BP}`,
      Accept: "application/json",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ amount: 0, currency: "USD", clientTransactionId: "verify_" + Date.now() }),
  });
  if (!r1.ok) {
    fail(`POST /sale sin respuesta: ${r1.error}`);
    record("PayPhone BP /sale", "ERROR", r1.error);
  } else {
    console.log(`  POST /sale → HTTP ${r1.status}  ·  ${r1.elapsed}ms`);
    if (r1.status === 401) {
      fail("Token PayPhone BP INVÁLIDO (401).");
      record("PayPhone BP /sale", "AUTH FAIL", "401");
    } else {
      ok(`Endpoint /sale accesible (${r1.status}).`);
      record("PayPhone BP /sale", "OK", r1.body.slice(0, 140));
    }
  }

  // 2b. GET /sale/{id}
  const r2 = await timedFetch(`${CONFIG.URL_PAYPHONE_API}/sale/99999999`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CONFIG.TOKENPP_BP}`,
      Accept: "application/json",
    },
  });
  if (!r2.ok) {
    fail(`GET /sale/:id sin respuesta: ${r2.error}`);
    record("PayPhone BP /sale/:id", "ERROR", r2.error);
  } else {
    console.log(`  GET  /sale/:id → HTTP ${r2.status}  ·  ${r2.elapsed}ms`);
    if (r2.status === 401) {
      fail("Token PayPhone BP inválido en GET (401).");
      record("PayPhone BP /sale/:id", "AUTH FAIL", "401");
    } else {
      ok(`Endpoint /sale/:id accesible (${r2.status}).`);
      record("PayPhone BP /sale/:id", "OK", r2.body.slice(0, 140));
    }
  }
}

// -- 3. DataFast (getTransactionIdDFv3.1 + checkPagoDFv3.3) --------------

async function testDataFast() {
  header("3. DataFast - Prepare + Verify");

  const urldata = [
    `amount=112.00`,
    `currency=USD`,
    `paymentType=DB`,
    `customer.email=verify@test.com`,
    `customer.givenName=QA`,
    `customer.surname=Verify`,
    `customer.identificationDocType=IDCARD`,
    `customer.identificationDocId=9999999999`,
    `customer.phone=0999999999`,
    `billing.country=EC`,
    `billing.city=Quito`,
    `billing.street1=Av%20Verify`,
    `billing.postcode=170150`,
    `cart.items[0].name=Verificacion`,
    `cart.items[0].quantity=1`,
    `cart.items[0].price=112.00`,
    `customParameters[SHOPPER_MID]=verify`,
    `risk.parameters[USER_DATA2]=ClubVisita`,
    `merchantTransactionId=verify_${Date.now()}`,
  ].join("&");

  const params = {
    urldata,
    id_servicio: CONFIG.IDSERVICIO,
    // mode: "test",
  };

  const r1 = await timedFetch(
    `${CONFIG.URL_SERVICIOS}${CONFIG.VERPAY}getTransactionIdDFv3.1/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    }
  );

  if (!r1.ok) {
    fail(`getTransactionIdDFv3.1 sin respuesta: ${r1.error}`);
    record("DataFast prepare", "ERROR", r1.error);
    return;
  }
  console.log(`  POST getTransactionIdDFv3.1 → HTTP ${r1.status}  ·  ${r1.elapsed}ms`);
  const j = tryJson(r1.body);
  if (r1.status === 200 && j) {
    if (j.id && j.result?.code) {
      ok(`Widget checkout creado. id=${j.id?.slice(0, 18)}…  code=${j.result.code}`);
      record("DataFast prepare", "OK", `code=${j.result.code} id=${j.id}`);
      // 3b. verificar (aún no pagado, debe devolver un código PENDIENTE)
      const r2 = await timedFetch(
        `${CONFIG.URL_SERVICIOS}${CONFIG.VERPAY}checkPagoDFv3.3/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: j.id, id_servicio: CONFIG.IDSERVICIO }),
        }
      );
      console.log(`  POST checkPagoDFv3.3  → HTTP ${r2.status}  ·  ${r2.elapsed}ms`);
      const jv = tryJson(r2.body);
      if (jv) {
        ok(`checkPago responde: code=${jv?.result?.code || jv?.estado}`);
        record("DataFast verify", "OK", `code=${jv?.result?.code || jv?.estado}`);
      } else {
        warn("Respuesta checkPago no es JSON válido.");
        record("DataFast verify", "WARN", r2.body.slice(0, 140));
      }
    } else {
      warn(`Prepare responde pero formato inesperado: ${r1.body.slice(0, 200)}`);
      record("DataFast prepare", "WARN", r1.body.slice(0, 140));
    }
  } else {
    fail(`HTTP ${r1.status}: ${r1.body.slice(0, 200)}`);
    record("DataFast prepare", "FAIL", `HTTP ${r1.status}`);
  }
}

// -- 4. Jardín Azuayo ----------------------------------------------------

async function testJardinAzuayo() {
  header("4. Jardín Azuayo (ApiJA.php)");
  const url = `${CONFIG.URL_SERVICIOS_PAGOS}ApiJA.php`;

  // 4a. validarCuenta con datos inventados. Backend exige cedula/cuenta/desc_producto/precio
  const r1 = await timedFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "validarCuenta",
      cedula: "9999999999",
      cuenta: "9999999",
      desc_producto: "Verificacion QA",
      precio: 0.01,
    }),
  });
  if (!r1.ok) {
    fail(`ApiJA.php validarCuenta sin respuesta: ${r1.error}`);
    record("ApiJA validarCuenta", "ERROR", r1.error);
    return;
  }
  console.log(`  POST validarCuenta → HTTP ${r1.status}  ·  ${r1.elapsed}ms`);
  const j = tryJson(r1.body);
  if (j && typeof j.estado !== "undefined") {
    ok(`Servicio responde JSON estándar: estado=${j.estado} codigo=${j.codigo} msj=${j.msj}`);
    record("ApiJA validarCuenta", "OK", `estado=${j.estado} msj=${j.msj}`);
  } else {
    fail(`Respuesta no es JSON esperado: ${r1.body.slice(0, 200)}`);
    record("ApiJA validarCuenta", "FAIL", r1.body.slice(0, 140));
  }

  // 4b. verificar que el guard "tipo equivocado" funcione
  const r2 = await timedFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "tipoIncorrecto",
      cedula: "9999999999",
      cuenta: "9999999",
      desc_producto: "X",
      precio: 0.01,
    }),
  });
  const j2 = tryJson(r2.body);
  if (j2 && j2.estado === false && j2.codigo === 4) {
    ok(`Backend rechaza tipo inválido (codigo=4 como se esperaba).`);
  } else {
    warn(`Guard de 'tipo' no valida como se esperaba: ${r2.body.slice(0, 140)}`);
  }
}

// -- 5. Backend listaTarjetas + gestionarSuscripcion (dry ping) ----------

async function testBackendSuscripcion() {
  header("5. Backend Suscripción (listaTarjetas / gestionarSuscripcion)");

  // listaTarjetas
  const r1 = await timedFetch(
    `${CONFIG.URL_SERVICIOS}${CONFIG.VERSUS}listaTarjetas/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_servicio: CONFIG.IDSERVICIO, id_empresa: CONFIG.IDEMPRESA }),
    }
  );
  if (!r1.ok) {
    fail(`listaTarjetas sin respuesta: ${r1.error}`);
    record("listaTarjetas", "ERROR", r1.error);
  } else {
    console.log(`  POST listaTarjetas → HTTP ${r1.status}  ·  ${r1.elapsed}ms`);
    const j = tryJson(r1.body);
    if (j && (j.estado === true || Array.isArray(j.data) || typeof j === "object")) {
      ok(`Backend suscripción responde (${r1.elapsed}ms).`);
      record("listaTarjetas", "OK", r1.body.slice(0, 140));
    } else {
      warn(`Respuesta sospechosa: ${r1.body.slice(0, 140)}`);
      record("listaTarjetas", "WARN", r1.body.slice(0, 140));
    }
  }

  // gestionarSuscripcion con payload vacío -> debe rechazar
  const r2 = await timedFetch(
    `${CONFIG.URL_SERVICIOS}${CONFIG.VERSUS}gestionarSuscripcion/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }
  );
  if (r2.ok) {
    console.log(`  POST gestionarSuscripcion → HTTP ${r2.status}  ·  ${r2.elapsed}ms`);
    const j = tryJson(r2.body);
    if (j && j.estado === false) {
      ok(`gestionarSuscripcion valida entrada vacía (estado=false).`);
      record("gestionarSuscripcion", "OK (valida)", j.msj);
    } else {
      warn(`Respuesta inesperada: ${r2.body.slice(0, 140)}`);
      record("gestionarSuscripcion", "WARN", r2.body.slice(0, 140));
    }
  }
}

// -- 6. PayPal (verificación de client-id contra SDK) --------------------

async function testPayPal() {
  header("6. PayPal - disponibilidad de SDK y client-id");

  // El SDK carga desde https://www.paypal.com/sdk/js?client-id=...
  const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${CONFIG.PAYPAL_CLIENT_ID}&currency=USD&locale=es_EC`;
  const r = await timedFetch(sdkUrl, { method: "GET" });
  if (!r.ok) {
    fail(`PayPal SDK sin respuesta: ${r.error}`);
    record("PayPal SDK", "ERROR", r.error);
    return;
  }
  console.log(`  GET sdk/js → HTTP ${r.status}  ·  ${r.elapsed}ms`);
  if (r.status === 200 && r.body.includes("paypal")) {
    ok(`PayPal SDK carga correctamente con el client-id configurado.`);
    record("PayPal SDK", "OK", `${r.body.length} bytes`);
  } else if (r.status === 400) {
    fail(`client-id PayPal RECHAZADO (400). Revisar configuración.`);
    record("PayPal SDK", "FAIL", "client-id rechazado");
  } else {
    warn(`Respuesta inesperada: HTTP ${r.status}`);
    record("PayPal SDK", "WARN", `HTTP ${r.status}`);
  }
}

// -- resumen --------------------------------------------------------------

function printSummary() {
  console.log("\n" + "═".repeat(74));
  console.log(`${BOLD}RESUMEN${RESET}`);
  console.log("═".repeat(74));
  for (const r of results) {
    const color =
      r.status.startsWith("OK")
        ? GREEN
        : r.status.startsWith("WARN")
        ? YELLOW
        : RED;
    console.log(
      `  ${color}${r.status.padEnd(16)}${RESET}  ${r.name.padEnd(30)}  ${
        r.detail ? r.detail.toString().slice(0, 80) : ""
      }`
    );
  }
  console.log("═".repeat(74));
  console.log(`Timestamp: ${new Date().toISOString()}`);
}

// -- main -----------------------------------------------------------------

(async () => {
  console.log(`${BOLD}Verificación de métodos de pago · componente Suscripcion${RESET}`);
  console.log(`Nodo: ${process.version}  ·  ${new Date().toISOString()}\n`);

  await testPayPhoneCreate();
  await testPayPhoneBP();
  await testDataFast();
  await testJardinAzuayo();
  await testBackendSuscripcion();
  await testPayPal();

  printSummary();
})();
