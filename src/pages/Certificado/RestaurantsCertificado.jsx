import React, { useEffect, useState, useMemo } from "react";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";

// ─── Paleta ────────────────────────────────────────────────────
const C = {
  green:       "#AAD524",
  greenDark:   "#96c121",
  greenBg:     "#f7fde8",
  greenBorder: "#d4ed72",
  dark:        "#1c1917",
  gray:        "#57534e",
  lightGray:   "#a8a29e",
  ultraLight:  "#f5f5f4",
  border:      "#e7e5e4",
  white:       "#FFFFFF",
  accent:      "#d97706",
  accentBg:    "#fffbeb",
  teal:        "#065f46",
  tealLight:   "#d1fae5",
};

const styles = StyleSheet.create({
  page:       { flexDirection: "column", backgroundColor: C.white, fontFamily: "Helvetica" },
  topBand:    { height: 5, backgroundColor: C.green },
  bottomBand: { height: 5, backgroundColor: C.green },
  body:       { margin: "8pt 14pt", flexGrow: 1 },

  // ── Header ──
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: C.greenBorder, marginBottom: 8,
  },
  logo:          { width: 85, height: 28, objectFit: "contain" },
  headerCenter:  { flex: 1, alignItems: "center", paddingHorizontal: 8 },
  certTitle:     { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.gray, textAlign: "center" },
  certSubtitle:  { fontSize: 6.5, color: C.greenDark, textAlign: "center", marginTop: 2, fontFamily: "Helvetica-Oblique" },
  folioBadge:    { backgroundColor: C.green, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 5, alignItems: "flex-end" },
  folioLabel:    { fontSize: 5, color: C.greenBg, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  folioValue:    { fontSize: 7.5, color: C.white, fontFamily: "Helvetica-Bold" },

  // ── Suscriptor strip ──
  susRow: {
    flexDirection: "row", backgroundColor: C.ultraLight, borderRadius: 4,
    padding: "5pt 8pt", marginBottom: 8, gap: 12, borderWidth: 1, borderColor: C.border,
  },
  susCell:  { flex: 1 },
  susLabel: { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 1.5 },
  susValue: { fontSize: 8.5, color: C.dark, fontFamily: "Helvetica-Bold" },
  susSub:   { fontSize: 6, color: C.gray, marginTop: 1 },

  // ── Section header ──
  sectionHeader: {
    flexDirection: "row", alignItems: "center", paddingVertical: 3, paddingHorizontal: 8,
    backgroundColor: C.ultraLight, borderLeftWidth: 3, borderLeftColor: C.green,
    marginBottom: 5, marginTop: 6,
  },
  sectionTitle: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.gray, textTransform: "uppercase", letterSpacing: 0.3 },

  // ── Establecimiento ──
  estBlock: {
    flexDirection: "row", gap: 8, padding: "7pt 8pt",
    borderWidth: 1, borderColor: C.border, borderRadius: 5, marginBottom: 4,
  },
  estInfo:       { flex: 1 },
  estImage:      { width: 70, height: 50, borderRadius: 4, objectFit: "cover", flexShrink: 0 },
  estName:       { fontSize: 11, fontFamily: "Helvetica-Bold", color: C.dark, marginBottom: 3 },
  estMetaRow:    { flexDirection: "row", alignItems: "flex-start", marginTop: 1.5 },
  estMetaLabel:  { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", width: 44 },
  estMetaValue:  { fontSize: 7, color: C.gray, flex: 1 },
  estChipsRow:   { flexDirection: "row", gap: 5, marginTop: 5, flexWrap: "wrap" },
  estChip:       { flexDirection: "row", gap: 2, alignItems: "center", backgroundColor: C.ultraLight, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 2 },
  estChipLabel:  { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold" },
  estChipValue:  { fontSize: 6.5, color: C.dark },

  // ── Visita cards ──
  visitCards:      { flexDirection: "row", gap: 6, marginBottom: 8 },
  visitCard:       { flex: 1, borderWidth: 1, borderColor: C.border, borderRadius: 5, padding: "6pt 7pt" },
  visitCardGreen:  { flex: 1, borderWidth: 1, borderColor: C.greenBorder, borderRadius: 5, padding: "6pt 7pt", backgroundColor: C.greenBg },
  visitCardLabel:  { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 2 },
  visitCardValue:  { fontSize: 9, color: C.dark, fontFamily: "Helvetica-Bold" },
  visitCardSub:    { fontSize: 6, color: C.gray, marginTop: 1.5 },

  // ── Oferta card ──
  ofertaCard: {
    borderWidth: 1, borderColor: C.border, borderRadius: 5, marginBottom: 5, overflow: "hidden",
  },
  ofertaCardHeader: {
    flexDirection: "row", alignItems: "center", backgroundColor: C.ultraLight,
    padding: "5pt 8pt", gap: 6,
  },
  ofertaNumBadge:  { width: 16, height: 16, borderRadius: 8, backgroundColor: C.green, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  ofertaNumText:   { fontSize: 7, color: C.white, fontFamily: "Helvetica-Bold" },
  ofertaTitle:     { fontSize: 9, color: C.dark, fontFamily: "Helvetica-Bold", flex: 1 },
  ofertaPrecio:    { fontSize: 9, color: C.greenDark, fontFamily: "Helvetica-Bold" },
  ofertaBody:      { flexDirection: "row", padding: "6pt 8pt", gap: 8 },
  ofertaImg:       { width: 50, height: 50, borderRadius: 3, objectFit: "cover", flexShrink: 0 },
  ofertaInfo:      { flex: 1 },
  ofertaDesc:      { fontSize: 6.5, color: C.gray, marginBottom: 4, lineHeight: 1.4 },
  ofertaPersonas:  { fontSize: 6.5, color: C.gray },
  ofertaPersonasV: { fontSize: 6.5, color: C.dark, fontFamily: "Helvetica-Bold" },
  // horarios chips
  horariosRow:    { flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 3 },
  horarioChip:    { backgroundColor: C.greenBg, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1.5, borderWidth: 0.5, borderColor: C.greenBorder },
  horarioText:    { fontSize: 6, color: C.greenDark },
  // regalos chips
  regalosOferta:  { flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 4 },
  regaloChipSm:   { backgroundColor: C.tealLight, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1.5, borderWidth: 0.5, borderColor: "#6ee7b7" },
  regaloTextSm:   { fontSize: 6, color: C.teal, fontFamily: "Helvetica-Bold" },

  // ── Total ──
  totalBlock: {
    flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 16,
    padding: "7pt 10pt", borderWidth: 1, borderColor: C.border, borderRadius: 5,
    backgroundColor: C.ultraLight, marginBottom: 8,
  },
  totalLabel: { fontSize: 8, color: C.gray, fontFamily: "Helvetica-Bold" },
  totalSub:   { fontSize: 6, color: C.lightGray },
  totalValue: { fontSize: 18, color: C.green, fontFamily: "Helvetica-Bold" },

  // ── Términos ──
  termBlock:  { marginBottom: 6 },
  termTitle:  { fontSize: 6, fontFamily: "Helvetica-Bold", color: C.gray, marginBottom: 3, textTransform: "uppercase" },
  termRow:    { flexDirection: "row", marginBottom: 1.5 },
  termBullet: { fontSize: 6, color: C.green, marginRight: 3, fontFamily: "Helvetica-Bold" },
  termText:   { fontSize: 5.5, color: C.gray, flex: 1 },

  // ── Footer ──
  footerDivider: { borderTopWidth: 1, borderTopColor: C.greenBorder, marginTop: 4, paddingTop: 6 },
  footer:        { flexDirection: "row", alignItems: "center" },
  footerLeft:    { flex: 2.5 },
  footerCenter:  { flex: 1.5, alignItems: "center" },
  footerRight:   { flex: 1, alignItems: "flex-end" },
  footerLabel:   { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 1.5 },
  footerText:    { fontSize: 6, color: C.gray },
  footerBold:    { fontSize: 6.5, color: C.dark, fontFamily: "Helvetica-Bold" },
  footerPhone:   { fontSize: 7, color: C.greenDark, fontFamily: "Helvetica-Bold" },
  whatsappImg:   { height: 26, width: 26, objectFit: "contain" },
  patrocinadores:{ height: 16, width: 110, objectFit: "contain" },
});

// ─── Helpers ──────────────────────────────────────────────────────
const pad    = (n) => String(n).padStart(2, "0");
const DIAS   = ["dom","lun","mar","mié","jue","vie","sáb"];
const MESES  = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MESES_S= ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
const fullDate = (d) => `${DIAS[d.getDay()]} ${pad(d.getDate())} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// ─── PDF Component ────────────────────────────────────────────────
const CertificadoPDF = ({ data }) => {
  const {
    nombre, idSus, emailSus,
    nombreEst, ciudadEst, paisEst, direccionEst,
    telefonoEst, whatsappEst, emailEst, webEst,
    ofertas, total, folio,
    adults, childs, visitDateTime, hoy, FotoEst,
  } = data;

  const personasLabel = [
    adults > 0 ? `${adults} adulto${adults !== 1 ? "s" : ""}` : "",
    childs  > 0 ? `${childs} niño${childs  !== 1 ? "s" : ""}` : "",
  ].filter(Boolean).join(" · ") || "—";

  // Todos los regalos de todas las ofertas (para sección global)
  const todosRegalos = ofertas.flatMap(o => o.regalos || []).filter(Boolean);

  const TERMINOS = [
    "Válido únicamente para las ofertas de la Ruta del Vino especificadas. No transferible a otros establecimientos.",
    "Los regalos incluidos están sujetos a disponibilidad del establecimiento al momento de la visita.",
    "Transferible hasta 1er Grado de Consanguineidad. Presentar documento de identidad al ingresar.",
    "Aplica restricciones de temporada y horarios. Consultar directamente con el establecimiento antes de visitar.",
    "El precio de descorche corresponde al costo del beneficio por persona. No incluye consumo adicional.",
    "Reserva con mínimo 24 horas de anticipación llamando a la Central de Reservas de VisitaEcuador.com.",
    "Horario de atención Central de Reservas: Lunes a Viernes 08h30–13h00 y 14h30–18h00.",
  ];

  return (
    <Document fileName={`Certificado_Vino_${idSus}`}>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.topBand} />
        <View style={styles.body}>

          {/* ── HEADER ── */}
          <View style={styles.header}>
            <Image src="https://visitaecuador.com/img/web/logo_verde.png" style={styles.logo} />
            <View style={styles.headerCenter}>
              <Text style={styles.certTitle}>Certificado · Ruta del Vino</Text>
              <Text style={styles.certSubtitle}>Descubre los mejores vinos de Ecuador y el mundo · visitaecuador.com</Text>
            </View>
            <View style={styles.folioBadge}>
              <Text style={styles.folioLabel}>N° Folio</Text>
              <Text style={styles.folioValue}>{folio || "—"}</Text>
            </View>
          </View>

          {/* ── SUSCRIPTOR ── */}
          <View style={styles.susRow}>
            <View style={styles.susCell}>
              <Text style={styles.susLabel}>Suscriptor</Text>
              <Text style={styles.susValue}>{nombre || "—"}</Text>
              {emailSus ? <Text style={styles.susSub}>{emailSus}</Text> : null}
            </View>
            <View style={styles.susCell}>
              <Text style={styles.susLabel}>ID Suscriptor</Text>
              <Text style={styles.susValue}>{idSus || "—"}</Text>
              <Text style={styles.susSub}>VisitaEcuador.com</Text>
            </View>
            <View style={styles.susCell}>
              <Text style={styles.susLabel}>Fecha de emisión</Text>
              <Text style={styles.susValue}>{fullDate(hoy)}</Text>
            </View>
            <View style={styles.susCell}>
              <Text style={styles.susLabel}>Personas</Text>
              <Text style={styles.susValue}>{personasLabel}</Text>
            </View>
          </View>

          {/* ── ESTABLECIMIENTO ── */}
          <SectionHeader title="Establecimiento" />
          <View style={styles.estBlock}>
            {FotoEst ? (
              <Image src={FotoEst} style={styles.estImage} cache={false} />
            ) : null}
            <View style={styles.estInfo}>
              <Text style={styles.estName}>{nombreEst || "—"}</Text>
              {(ciudadEst || paisEst) && (
                <View style={styles.estMetaRow}>
                  <Text style={styles.estMetaLabel}>Ubicación</Text>
                  <Text style={styles.estMetaValue}>{[ciudadEst, paisEst].filter(Boolean).join(", ")}</Text>
                </View>
              )}
              {direccionEst ? (
                <View style={styles.estMetaRow}>
                  <Text style={styles.estMetaLabel}>Dirección</Text>
                  <Text style={styles.estMetaValue}>{direccionEst}</Text>
                </View>
              ) : null}
              {(telefonoEst || whatsappEst || emailEst || webEst) && (
                <View style={styles.estChipsRow}>
                  {telefonoEst ? <View style={styles.estChip}><Text style={styles.estChipLabel}>TEL</Text><Text style={styles.estChipValue}>{telefonoEst}</Text></View> : null}
                  {whatsappEst ? <View style={styles.estChip}><Text style={styles.estChipLabel}>WS</Text><Text style={styles.estChipValue}>{whatsappEst}</Text></View> : null}
                  {emailEst   ? <View style={styles.estChip}><Text style={styles.estChipLabel}>EMAIL</Text><Text style={styles.estChipValue}>{emailEst}</Text></View> : null}
                  {webEst     ? <View style={styles.estChip}><Text style={styles.estChipLabel}>WEB</Text><Text style={styles.estChipValue}>{webEst}</Text></View> : null}
                </View>
              )}
            </View>
          </View>

          {/* ── DETALLES DE VISITA ── */}
          <SectionHeader title="Detalles de la visita" />
          <View style={styles.visitCards}>
            {/* Fecha */}
            <View style={styles.visitCard}>
              <Text style={styles.visitCardLabel}>📅  Fecha de visita</Text>
              {visitDateTime ? (
                <>
                  <Text style={styles.visitCardValue}>{visitDateTime.date}</Text>
                  {visitDateTime.time ? <Text style={styles.visitCardSub}>a las {visitDateTime.time}</Text> : null}
                </>
              ) : (
                <Text style={{ ...styles.visitCardValue, color: C.lightGray, fontSize: 7 }}>A coordinar con el establecimiento</Text>
              )}
            </View>
            {/* Hora */}
            {visitDateTime?.time ? (
              <View style={styles.visitCard}>
                <Text style={styles.visitCardLabel}>🕐  Hora de ingreso</Text>
                <Text style={styles.visitCardValue}>{visitDateTime.time}</Text>
                <Text style={styles.visitCardSub}>Presentarse puntualmente</Text>
              </View>
            ) : null}
            {/* Personas */}
            <View style={styles.visitCardGreen}>
              <Text style={styles.visitCardLabel}>👥  Personas</Text>
              <Text style={styles.visitCardValue}>{personasLabel}</Text>
              {adults > 0 && childs > 0 && (
                <Text style={styles.visitCardSub}>{adults} adultos · {childs} niños</Text>
              )}
            </View>
            {/* N° Reserva */}
            <View style={styles.visitCard}>
              <Text style={styles.visitCardLabel}>🎫  N° Reserva</Text>
              <Text style={{ ...styles.visitCardValue, fontSize: 7 }}>{folio || "—"}</Text>
            </View>
          </View>

          {/* ── OFERTAS (una card por oferta) ── */}
          <SectionHeader title="Ofertas incluidas" />
          {ofertas.map((oferta, idx) => (
            <View key={idx} style={styles.ofertaCard}>
              {/* Header de la card */}
              <View style={styles.ofertaCardHeader}>
                <View style={styles.ofertaNumBadge}>
                  <Text style={styles.ofertaNumText}>{idx + 1}</Text>
                </View>
                <Text style={styles.ofertaTitle}>{oferta.titulo}</Text>
                <Text style={styles.ofertaPrecio}>${oferta.precio.toFixed(2)} c/u</Text>
              </View>

              {/* Cuerpo */}
              <View style={styles.ofertaBody}>
                {/* Imagen si existe */}
                {oferta.imagen ? (
                  <Image src={oferta.imagen} style={styles.ofertaImg} cache={false} />
                ) : null}

                <View style={styles.ofertaInfo}>
                  {/* Personas */}
                  <View style={{ flexDirection: "row", gap: 3, marginBottom: 3 }}>
                    <Text style={styles.ofertaPersonas}>Personas: </Text>
                    <Text style={styles.ofertaPersonasV}>
                      {oferta.personas} persona{oferta.personas !== 1 ? "s" : ""}
                    </Text>
                    <Text style={{ ...styles.ofertaPersonas, marginLeft: 8 }}>Subtotal: </Text>
                    <Text style={styles.ofertaPersonasV}>${(oferta.precio).toFixed(2)}</Text>
                  </View>

                  {/* Descripción */}
                  {oferta.descripcion ? (
                    <Text style={styles.ofertaDesc}>{oferta.descripcion}</Text>
                  ) : null}

                  {/* Horarios */}
                  {oferta.horarios && oferta.horarios.length > 0 && (
                    <>
                      <Text style={{ fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 2 }}>Horarios</Text>
                      <View style={styles.horariosRow}>
                        {oferta.horarios.map((h, hi) => (
                          <View key={hi} style={styles.horarioChip}>
                            <Text style={styles.horarioText}>{h}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}

                  {/* Regalos de esta oferta */}
                  {oferta.regalos && oferta.regalos.length > 0 && (
                    <>
                      <Text style={{ fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginTop: 4, marginBottom: 2 }}>🎁 Regalos incluidos</Text>
                      <View style={styles.regalosOferta}>
                        {oferta.regalos.map((r, ri) => (
                          <View key={ri} style={styles.regaloChipSm}>
                            <Text style={styles.regaloTextSm}>✓ {r}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}

          {/* ── TOTAL ── */}
          <View style={styles.totalBlock}>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.totalLabel}>Precio descorche total</Text>
              <Text style={styles.totalSub}>Todas las ofertas seleccionadas · USD</Text>
            </View>
            <Text style={styles.totalValue}>${total}</Text>
          </View>

          {/* ── TÉRMINOS ── */}
          <View style={styles.termBlock}>
            <Text style={styles.termTitle}>Términos y condiciones</Text>
            {TERMINOS.map((t, i) => (
              <View key={i} style={styles.termRow}>
                <Text style={styles.termBullet}>›</Text>
                <Text style={styles.termText}>{t}</Text>
              </View>
            ))}
          </View>

          {/* ── FOOTER ── */}
          <View style={styles.footerDivider}>
            <View style={styles.footer}>
              <View style={styles.footerLeft}>
                <Text style={styles.footerBold}>VisitaEcuador.com</Text>
                <Text style={styles.footerText}>PBX: +593 7 413 4500</Text>
                <Text style={styles.footerText}>Calle del Batán 5-317 y Esmeraldas · Cuenca · Ecuador</Text>
                <Text style={{ ...styles.footerText, marginTop: 2, color: C.lightGray }}>Certificado generado el {fullDate(hoy)}</Text>
              </View>
              <View style={styles.footerCenter}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Image src="https://visitaecuador.com/img/web/whatsapp_cert.png" style={styles.whatsappImg} />
                  <View>
                    <Text style={{ ...styles.footerBold, marginBottom: 2 }}>Central de reservas:</Text>
                    <Text style={styles.footerPhone}>+593 98 064 4467</Text>
                    <Text style={styles.footerPhone}>+593 98 185 0436</Text>
                    <Text style={styles.footerPhone}>+593 98 626 3432</Text>
                  </View>
                </View>
              </View>
              <View style={styles.footerRight}>
                <Text style={styles.footerLabel}>Con el auspicio de:</Text>
                <Image src="https://visitaecuador.com/img/web/patrocinadores.png" style={styles.patrocinadores} />
              </View>
            </View>
          </View>

        </View>
        <View style={styles.bottomBand} />
      </Page>
    </Document>
  );
};

// ─── Página principal ─────────────────────────────────────────────
const RestaurantsCertificado = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reserva = {};
  for (const [key, value] of searchParams) {
    try {
      reserva[key] = (value.startsWith("[") || value.startsWith("{")) ? JSON.parse(value) : value;
    } catch { reserva[key] = value; }
  }

  const FotoEst      = reserva.FotoEst      || "";
  const nombreSus    = reserva.NombreSus    || "";
  const idSus        = reserva.IdSus        || "";
  const emailSus     = reserva.Email        || "";
  const nombreEst    = reserva.NombreEst    || "";
  const ciudadEst    = reserva.CiudadEst    || "";
  const paisEst      = reserva.PaisEst      || "Ecuador";
  const direccionEst = reserva.DireccionEst || "";
  const telefonoEst  = reserva.TelefonoEst  || "";
  const whatsappEst  = reserva.WhatsappEst  || "";
  const emailEst     = reserva.EmailEst     || "";
  const webEst       = reserva.WebEst       || "";
  const folio        = reserva.Folio        || "";
  const total        = reserva.Total        || "0.00";
  const adults       = parseInt(reserva.Adults || "0");
  const childs       = parseInt(reserva.Childs  || "0");
  const dateSt       = reserva.DateSt       || "";
  const timeSt       = reserva.TimeSt       || "";
  const regalos      = reserva.Regalos      || "";
  const regalosArr   = regalos ? regalos.split(", ").filter(Boolean) : [];

  // Ofertas — ahora son objetos completos
  let ofertas = [];
  if (reserva.Ofertas) {
    try {
      ofertas = Array.isArray(reserva.Ofertas) ? reserva.Ofertas : JSON.parse(reserva.Ofertas);
    } catch { ofertas = []; }
  }

  // Igual que ConfirmationDetail: fallback a fecha actual si no hay dateSt
  const buildVisitDateTime = () => {
    const padL = (n) => String(n).padStart(2, '0');
    if (dateSt && dateSt.includes('-')) {
      const [y, m, d] = dateSt.split('-').map(Number);
      const dow = new Date(y, m - 1, d);
      return {
        date: `${DIAS[dow.getDay()]} ${padL(d)} ${MESES_S[m - 1]} ${y}`,
        time: timeSt || "",
      };
    }
    // Fallback: fecha actual
    const now = new Date();
    return {
      date: `${DIAS[now.getDay()]} ${padL(now.getDate())} ${MESES_S[now.getMonth()]} ${now.getFullYear()}`,
      time: `${padL(now.getHours())}:${padL(now.getMinutes())}`,
    };
  };
  const visitDateTime = buildVisitDateTime();
  const hoy = new Date();

  const [nombrePDF, setNombrePDF]     = useState(nombreSus);
  const [nombreInput, setNombreInput] = useState(nombreSus);
  const [isEditing, setIsEditing]     = useState(false);
  const [isMobile, setIsMobile]       = useState(false);
  const [downloaded, setDownloaded]   = useState(false);

  const getCodigoLS = () => {
    try { return JSON.parse(localStorage.getItem("datos") || "{}")?.data?.codigo || null; } catch { return null; }
  };
  const canEdit = ["39579", "77562"].includes(getCodigoLS());

  useEffect(() => {
    setIsMobile(/iphone|ipad|ipod|android/.test(navigator.userAgent.toLowerCase()));
  }, []);

  const pdfData = useMemo(() => ({
    nombre: nombrePDF, idSus, emailSus,
    nombreEst, ciudadEst, paisEst, direccionEst,
    telefonoEst, whatsappEst, emailEst, webEst,
    ofertas, total, folio, adults, childs, visitDateTime, hoy, FotoEst,
  }), [nombrePDF, visitDateTime]);

  const MyDoc = useMemo(() => () => <CertificadoPDF data={pdfData} />, [pdfData]);

  useEffect(() => {
    if (isMobile && !downloaded) {
      pdf(<MyDoc />).toBlob().then(blob => {
        const a = Object.assign(document.createElement("a"), {
          href: URL.createObjectURL(blob),
          download: `Certificado_Vino_${nombrePDF.replaceAll(" ","_")}_${idSus}.pdf`,
        });
        a.click();
        URL.revokeObjectURL(a.href);
        setDownloaded(true);
      });
    }
  }, [isMobile, downloaded]);

  const download = async () => {
    const blob = await pdf(<MyDoc />).toBlob();
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: `Certificado_Vino_${nombrePDF.replaceAll(" ","_")}_${idSus}.pdf`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const DIAS_JS   = ["dom","lun","mar","mié","jue","vie","sáb"];
  const MESES_JS  = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Panel de control */}
      <div className="bg-greenVE-50 border-b border-greenVE-200 shadow-sm py-2">
        <div className="max-w-6xl mx-auto px-3 py-2 flex flex-wrap items-center gap-2">
          <span className="font-semibold text-greenVE-800 text-md">Certificado Ruta del Vino</span>
          <span className="text-gray-300 text-xs">|</span>
          <span className="text-sm text-gray-500">Suscriptor:</span>
          {isEditing && canEdit ? (
            <>
              <input autoFocus type="text" value={nombreInput} onChange={e => setNombreInput(e.target.value)}
                className="flex-1 min-w-0 px-2 py-1 text-sm border border-greenVE-300 rounded-md focus:outline-none focus:ring-2 focus:ring-greenVE-500" />
              <button onClick={() => { setNombrePDF(nombreInput); setIsEditing(false); }}
                className="px-3 py-1 text-xs bg-greenVE-600 text-white rounded-md hover:bg-greenVE-700">Aplicar</button>
              <button onClick={() => { setNombreInput(nombrePDF); setIsEditing(false); }}
                className="px-3 py-1 text-xs bg-gray-400 text-white rounded-md hover:bg-gray-500">Cancelar</button>
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-gray-800 truncate max-w-xs">{nombrePDF}</span>
              {canEdit && (
                <button onClick={() => setIsEditing(true)}
                  className="px-3 py-1 text-xs bg-greenVE-600 text-white rounded-md hover:bg-greenVE-700">Editar nombre</button>
              )}
              <button onClick={download}
                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-greenVE-600 text-white rounded-md hover:bg-greenVE-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar PDF
              </button>
            </>
          )}
        </div>

      </div>

      {/* Visor PDF */}
      <div className="flex-1 overflow-hidden">
        <PDFViewer className="w-full h-full">
          <MyDoc />
        </PDFViewer>
      </div>
    </div>
  );
};

export default RestaurantsCertificado;