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
  green:      "#AAD524",
  greenDark:  "#96c121",
  greenBg:    "#f7fde8",
  greenBorder:"#d4ed72",
  dark:       "#1c1917",
  gray:       "#57534e",
  lightGray:  "#a8a29e",
  ultraLight: "#f5f5f4",
  border:     "#e7e5e4",
  white:      "#FFFFFF",
  accent:     "#d97706",
  accentBg:   "#fffbeb",
  accentBorder:"#fcd34d",
  accentDark: "#92400e",
  blue:       "#1d4ed8",
  blueBg:     "#eff6ff",
  teal:       "#065f46",
  tealLight:  "#d1fae5",
};

const styles = StyleSheet.create({
  page: { flexDirection: "column", backgroundColor: C.white, fontFamily: "Helvetica" },
  topBand: { height: 5, backgroundColor: C.green },
  bottomBand: { height: 5, backgroundColor: C.green },
  body: { margin: "8pt 14pt", flexGrow: 1 },

  // ── Header ──
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.greenBorder,
    marginBottom: 8,
  },
  logo: { width: 85, height: 28, objectFit: "contain" },
  headerCenter: { flex: 1, alignItems: "center", paddingHorizontal: 8 },
  certTitle: { fontSize: 13, fontFamily: "Helvetica-Bold", color: C.gray, textAlign: "center" },
  certSubtitle: { fontSize: 6, color: C.greenDark, textAlign: "center", marginTop: 1.5, fontFamily: "Helvetica-Oblique" },
  idBadge: {
    alignItems: "flex-end",
    borderWidth: 1,
    borderColor: C.greenBorder,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: C.greenBg,
  },
  idBadgeLabel: { fontSize: 5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  idBadgeValue: { fontSize: 8, color: C.dark, fontFamily: "Helvetica-Bold" },
  folioBadge: { backgroundColor: C.green, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 5, alignItems: "flex-end" },
  folioLabel: { fontSize: 5, color: C.greenBg, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  folioValue: { fontSize: 7.5, color: C.white, fontFamily: "Helvetica-Bold" },

  // ── Suscriptor strip ──
  susRow: {
    flexDirection: "row",
    backgroundColor: C.ultraLight,
    borderRadius: 4,
    padding: "5pt 8pt",
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: C.border,
  },
  susCell: { flex: 1 },
  susLabel: { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 1.5 },
  susValue: { fontSize: 8.5, color: C.dark, fontFamily: "Helvetica-Bold" },
  susSub: { fontSize: 6, color: C.gray, marginTop: 1 },

  // ── Section header ──
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: C.ultraLight,
    borderLeftWidth: 3,
    borderLeftColor: C.green,
    marginBottom: 5,
    marginTop: 6,
  },
  sectionTitle: { fontSize: 7.5, fontFamily: "Helvetica-Bold", color: C.gray, textTransform: "uppercase", letterSpacing: 0.3 },

  // ── Establecimiento ──
  estBlock: {
    flexDirection: "row",
    gap: 8,
    padding: "7pt 8pt",
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 5,
    marginBottom: 4,
  },
  estImage: { width: 55, height: 55, borderRadius: 3, objectFit: "cover", flexShrink: 0 },
  estInfo: { flex: 1 },
  estName: { fontSize: 10, fontFamily: "Helvetica-Bold", color: C.dark, marginBottom: 3 },
  estMetaRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 1.5 },
  estMetaLabel: { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", width: 40 },
  estMetaValue: { fontSize: 7, color: C.gray, flex: 1 },

  // ── Fechas / cards de reserva ──
  reservaCards: { flexDirection: "row", gap: 5, marginBottom: 5 },
  reservaCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 5,
    padding: "5pt 6pt",
    alignItems: "center",
  },
  reservaCardLabel: { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 2 },
  reservaCardDay: { fontSize: 20, color: C.dark, fontFamily: "Helvetica-Bold", lineHeight: 1 },
  reservaCardMonth: { fontSize: 7, color: C.gray, textTransform: "uppercase" },
  reservaCardWeekday: { fontSize: 6, color: C.lightGray },
  reservaCardSub: { fontSize: 6, color: C.greenDark, marginTop: 2 },

  reservaStatCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 5,
    padding: "5pt 6pt",
    alignItems: "center",
    justifyContent: "center",
  },
  reservaStatLabel: { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 2, textAlign: "center" },
  reservaStatValue: { fontSize: 18, color: C.dark, fontFamily: "Helvetica-Bold", textAlign: "center", lineHeight: 1 },
  reservaStatSep: { fontSize: 18, color: C.lightGray, fontFamily: "Helvetica", lineHeight: 1 },
  reservaStatUnit: { fontSize: 6, color: C.gray, textAlign: "center", marginTop: 1 },

  // ── Habitaciones / precios ──
  precioBlock: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
  },
  precioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: C.border,
  },
  precioRowLast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  precioDesc: { flex: 1, fontSize: 7.5, color: C.dark },
  precioAplica: { fontSize: 6.5, color: C.blue, fontFamily: "Helvetica-Bold" },
  precioValor: { fontSize: 7.5, color: C.dark, fontFamily: "Helvetica-Bold", textAlign: "right" },
  precioValorAccent: { fontSize: 7.5, color: C.accent, fontFamily: "Helvetica-Bold", textAlign: "right" },

  // Fila de subtotal / total
  subtotalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.ultraLight,
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: C.greenBg,
  },
  subtotalLabel: { flex: 1, fontSize: 7.5, color: C.gray, fontFamily: "Helvetica-Bold" },
  subtotalValor: { fontSize: 7.5, color: C.gray, fontFamily: "Helvetica-Bold", textAlign: "right" },
  totalLabel: { flex: 1, fontSize: 8.5, color: C.dark, fontFamily: "Helvetica-Bold" },
  totalValor: { fontSize: 11, color: C.greenDark, fontFamily: "Helvetica-Bold", textAlign: "right" },

  // ── Wine Offer ──
  wineBlock: {
    borderWidth: 1,
    borderColor: C.accentBorder,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
    backgroundColor: C.accentBg,
  },
  wineHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: C.accent,
    gap: 5,
  },
  wineHeaderText: { fontSize: 7.5, color: C.white, fontFamily: "Helvetica-Bold" },
  wineBody: { flexDirection: "row", padding: "6pt 8pt", gap: 8 },
  wineImg: { width: 40, height: 40, borderRadius: 3, objectFit: "cover" },
  wineInfo: { flex: 1 },
  wineName: { fontSize: 8.5, color: C.accentDark, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  wineDesc: { fontSize: 6.5, color: C.gray },
  winePrice: { fontSize: 11, color: C.accent, fontFamily: "Helvetica-Bold", alignSelf: "flex-end" },
  wineRegalos: { paddingHorizontal: 8, paddingBottom: 5 },
  wineRegalosText: { fontSize: 6.5, color: C.accentDark },
  wineNote: {
    borderTopWidth: 0.5,
    borderTopColor: C.accentBorder,
    padding: "4pt 8pt",
  },
  wineNoteText: { fontSize: 6, color: C.accentDark, fontFamily: "Helvetica-Oblique" },

  // ── Info extra (servicios, restricciones) ──
  infoGrid: { flexDirection: "row", gap: 5, marginBottom: 5 },
  infoCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 5,
    padding: "5pt 7pt",
  },
  infoCellTitle: { fontSize: 6, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 3 },
  infoCellText: { fontSize: 6.5, color: C.gray },

  // ── Mapa ──
  mapBlock: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
  },

  // ── Términos ──
  termBlock: { marginBottom: 6 },
  termTitle: { fontSize: 6, fontFamily: "Helvetica-Bold", color: C.gray, marginBottom: 3, textTransform: "uppercase" },
  termRow: { flexDirection: "row", marginBottom: 1.5 },
  termBullet: { fontSize: 6, color: C.green, marginRight: 3, fontFamily: "Helvetica-Bold" },
  termText: { fontSize: 5.5, color: C.gray, flex: 1 },

  // ── Footer ──
  footerDivider: { borderTopWidth: 1, borderTopColor: C.greenBorder, marginTop: 6, paddingTop: 6 },
  footer: { flexDirection: "row", alignItems: "center" },
  footerLeft: { flex: 2.5 },
  footerCenter: { flex: 1.5, alignItems: "center" },
  footerRight: { flex: 1, alignItems: "flex-end" },
  footerLabel: { fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold", textTransform: "uppercase", marginBottom: 1.5 },
  footerText: { fontSize: 6, color: C.gray },
  footerBold: { fontSize: 6.5, color: C.dark, fontFamily: "Helvetica-Bold" },
  footerPhone: { fontSize: 7, color: C.greenDark, fontFamily: "Helvetica-Bold" },
  whatsappImg: { height: 26, width: 26, objectFit: "contain" },
  patrocinadores: { height: 16, width: 110, objectFit: "contain" },
});

// ─── Helpers ──────────────────────────────────────────────────────
const generateStaticMapImageUrl = (latitude, longitude) => {
  const apiKey = "AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z";
  const size = "1600,200";
  const markers = `${latitude},${longitude}`;
  return `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road?center=${markers}&zoomlevel=17&mapSize=${encodeURI(size)}&pushpin=${markers}&fmt=png&key=${apiKey}`;
};

const formatDate = (date, option) => {
  const opts = {
    full:    { weekday: "long", day: "2-digit", month: "long", year: "numeric" },
    weekday: { weekday: "long" },
    day:     { day: "2-digit" },
    month:   { month: "long" },
  };
  return date.toLocaleDateString("es-ES", opts[option] || opts.full);
};

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// ─── PDF Component ────────────────────────────────────────────────
const CertificadoDoc = ({ reserva, nombreSuscriptorPDF, wineOffer, hasWineOffer, staticMapImageUrl }) => {
  const isReserva = reserva.IdRes != null && reserva.IdRes !== "";
  const isCotizacion = reserva.Estado === "Cotización";
  // Folio: usa IdRes si existe, si no genera uno con timestamp igual que RestaurantsCertificado
  const folio = reserva.Folio || (isReserva
    ? `VE-${reserva.IdRes}-${reserva.IdSus || ""}`
    : `VE-${Date.now().toString(36).toUpperCase()}-${reserva.IdSus || ""}`);
  const titulo = !isReserva
    ? "Certificado"
    : isCotizacion
    ? "Cotización de Reserva"
    : `Certificado de ${reserva.Estado !== "Confirmada" ? "Pre-Reserva" : "Reserva"}`;

  const noches = (reserva.FechaIn && reserva.FechaOut)
    ? Math.round((new Date(reserva.FechaOut) - new Date(reserva.FechaIn)) / (1000 * 60 * 60 * 24))
    : 0;

  const TERMINOS = [
    "Para hacer la reserva sugerimos comunicarse con 5 días de anticipación al lugar de destino y realizar el pago respectivo.",
    "Los beneficiarios deberán cancelar la suma del paquete promocional previo a su utilización. No cancele a otra persona o empresa.",
    "Los beneficiarios aceptan cancelar los gastos extras como: comida, bebida, fee de emisión y otros.",
    "Este Certificado deslinda de toda responsabilidad a VisitaEcuador.com; el cumplimiento estará a cargo del hospedaje.",
    "Este Certificado es transferible hasta 1er Grado de Consanguineidad (Padres e hijos hasta 21 años, solteros).",
    "Aplica no show. Aplica restricciones.",
    "Horario de atención Central de Reservas: Lunes a Viernes 08h30-13h00 y 14h30-18h00.",
  ];

  const subtotalConVino = Number(reserva.Subtotal) + (hasWineOffer ? wineOffer.precio : 0);
  const totalConVino = Number(reserva.Total) + (hasWineOffer ? wineOffer.precio : 0);

  return (
    <Document fileName="Certificado">
      <Page size="A4" style={styles.page}>
        <View style={styles.topBand} />
        <View style={styles.body}>

          {/* ── HEADER ── */}
          <View style={styles.header}>
            <Image src="https://visitaecuador.com/img/web/logo_verde.png" style={styles.logo} />
            <View style={styles.headerCenter}>
              <Text style={styles.certTitle}>{titulo}</Text>
              <Text style={styles.certSubtitle}>VisitaEcuador.com · Central de Reservas · Cuenca, Ecuador</Text>
            </View>
            <View style={{ alignItems: "flex-end", gap: 4 }}>
              <View style={styles.folioBadge}>
                <Text style={styles.folioLabel}>N° Folio</Text>
                <Text style={styles.folioValue}>{folio}</Text>
              </View>
             
            </View>
          </View>

          {/* ── SUSCRIPTOR ── */}
          <View style={styles.susRow}>
            <View style={styles.susCell}>
              <Text style={styles.susLabel}>Suscriptor</Text>
              <Text style={styles.susValue}>{nombreSuscriptorPDF || "—"}</Text>
            </View>
            <View style={styles.susCell}>
              <Text style={styles.susLabel}>ID Suscriptor</Text>
              <Text style={styles.susValue}>{reserva.IdSus || "—"}</Text>
              <Text style={styles.susSub}>VisitaEcuador.com</Text>
            </View>
            <View style={styles.susCell}>
              <Text style={styles.susLabel}>Fecha de emisión</Text>
              <Text style={styles.susValue}>{reserva.fecha_reserva || "—"}</Text>
            </View>
          </View>

          {/* ── ESTABLECIMIENTO ── */}
          <SectionHeader title="Establecimiento" />
          <View style={styles.estBlock}>
            {reserva.FotoEst && (
              <Image src={reserva.FotoEst} style={styles.estImage} cache={false} />
            )}
            <View style={styles.estInfo}>
              <Text style={styles.estName}>{reserva.NombreEst || "—"}</Text>
              {reserva.DireccionEst && (
                <View style={styles.estMetaRow}>
                  <Text style={styles.estMetaLabel}>Dirección</Text>
                  <Text style={styles.estMetaValue}>{reserva.DireccionEst}</Text>
                </View>
              )}
              {reserva.LugarEst && (
                <View style={styles.estMetaRow}>
                  <Text style={styles.estMetaLabel}>Ubicación</Text>
                  <Text style={styles.estMetaValue}>{reserva.LugarEst}</Text>
                </View>
              )}
              <View style={{ flexDirection: "row", gap: 8, marginTop: 3, flexWrap: "wrap" }}>
                {reserva.TelefonoEst != null && reserva.TelefonoEst !== "" && (
                  <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                    <Text style={{ fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold" }}>TEL</Text>
                    <Text style={{ fontSize: 6.5, color: C.gray }}>{reserva.TelefonoEst}</Text>
                  </View>
                )}
                {reserva.WhatsappEst != null && reserva.WhatsappEst !== "" && (
                  <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                    <Text style={{ fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold" }}>WS</Text>
                    <Text style={{ fontSize: 6.5, color: C.gray }}>{reserva.WhatsappEst}</Text>
                  </View>
                )}
                {reserva.EmailEst != null && reserva.EmailEst !== "" && (
                  <View style={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
                    <Text style={{ fontSize: 5.5, color: C.lightGray, fontFamily: "Helvetica-Bold" }}>EMAIL</Text>
                    <Text style={{ fontSize: 6.5, color: C.gray }}>{reserva.EmailEst}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* ── FECHAS Y OCUPACIÓN ── */}
          {(isReserva || (reserva.FechaIn && reserva.FechaOut)) && (
            <>
              <SectionHeader title="Detalles de la estadía" />
              <View style={styles.reservaCards}>
                {/* Entrada */}
                <View style={styles.reservaCard}>
                  <Text style={styles.reservaCardLabel}>Entrada</Text>
                  <Text style={styles.reservaCardDay}>{formatDate(new Date(reserva.FechaIn + "T00:00:00"), "day")}</Text>
                  <Text style={styles.reservaCardMonth}>{formatDate(new Date(reserva.FechaIn + "T00:00:00"), "month").toUpperCase()}</Text>
                  <Text style={styles.reservaCardWeekday}>{formatDate(new Date(reserva.FechaIn + "T00:00:00"), "weekday")}</Text>
                  <Text style={styles.reservaCardSub}>desde {reserva.CheckIn}</Text>
                </View>
                {/* Salida */}
                <View style={styles.reservaCard}>
                  <Text style={styles.reservaCardLabel}>Salida</Text>
                  <Text style={styles.reservaCardDay}>{formatDate(new Date(reserva.FechaOut + "T00:00:00"), "day")}</Text>
                  <Text style={styles.reservaCardMonth}>{formatDate(new Date(reserva.FechaOut + "T00:00:00"), "month").toUpperCase()}</Text>
                  <Text style={styles.reservaCardWeekday}>{formatDate(new Date(reserva.FechaOut + "T00:00:00"), "weekday")}</Text>
                  <Text style={styles.reservaCardSub}>hasta {reserva.CheckOut}</Text>
                </View>
                {/* Hab / Noches */}
                <View style={styles.reservaStatCard}>
                  <Text style={styles.reservaStatLabel}>Hab. / Noches</Text>
                  <View style={{ flexDirection: "row", alignItems: "baseline", gap: 1 }}>
                    <Text style={styles.reservaStatValue}>{reserva.CantidadHab}</Text>
                    <Text style={styles.reservaStatSep}> / </Text>
                    <Text style={styles.reservaStatValue}>{noches}</Text>
                  </View>
                  <Text style={styles.reservaStatUnit}>habitaciones / noches</Text>
                </View>
                {/* Adultos / Niños */}
                <View style={styles.reservaStatCard}>
                  <Text style={styles.reservaStatLabel}>Adultos / Niños</Text>
                  <View style={{ flexDirection: "row", alignItems: "baseline", gap: 1 }}>
                    <Text style={styles.reservaStatValue}>{reserva.Adultos}</Text>
                    <Text style={styles.reservaStatSep}> / </Text>
                    <Text style={styles.reservaStatValue}>{reserva.Ninos}</Text>
                  </View>
                  <Text style={styles.reservaStatUnit}>personas</Text>
                </View>
              </View>
            </>
          )}

          {/* ── PRECIOS ── */}
          <SectionHeader title="Detalle de precio" />
          <View style={styles.precioBlock}>
            {reserva.Habitaciones.map((item, index) => (
              <React.Fragment key={index}>
                <View style={styles.precioRow}>
                  <Text style={styles.precioDesc}>
                    {item.Cantidad} × {item.Nombre}
                    {"  "}
                    <Text style={{ fontSize: 6.5, color: C.lightGray }}>
                      (máx. {item.Adultos} adulto{item.Adultos !== 1 ? "s" : ""}
                      {item.Ninos > 0 ? `, ${item.Ninos} niño${item.Ninos !== 1 ? "s" : ""}` : ""})
                    </Text>
                    {item.AplicaEn ? (
                      <Text style={styles.precioAplica}>{"  "}* Aplica {item.AplicaEn.toLowerCase()}</Text>
                    ) : null}
                  </Text>
                  <Text style={styles.precioValor}>${item.Subtotal.toFixed(2)}</Text>
                </View>
                {item.NinosAdicionales ? (
                  <View key={`ninos-${index}`} style={styles.precioRow}>
                    <Text style={styles.precioDesc}>
                      {item.NinosAdicionales} × {item.Nombre}
                      {"  "}
                      <Text style={{ fontSize: 6.5, color: C.greenDark, fontFamily: "Helvetica-Bold" }}>Niño adicional</Text>
                    </Text>
                    <Text style={styles.precioValor}>${item.SubtotalNino.toFixed(2)}</Text>
                  </View>
                ) : null}
                {item.AdultosAdicionales ? (
                  <View key={`adultos-${index}`} style={styles.precioRow}>
                    <Text style={styles.precioDesc}>
                      {item.AdultosAdicionales} × {item.Nombre}
                      {"  "}
                      <Text style={{ fontSize: 6.5, color: C.greenDark, fontFamily: "Helvetica-Bold" }}>Adulto adicional</Text>
                    </Text>
                    <Text style={styles.precioValor}>${item.SubtotalAdulto.toFixed(2)}</Text>
                  </View>
                ) : null}
              </React.Fragment>
            ))}

            {hasWineOffer && wineOffer.precio > 0 && (
              <View style={styles.precioRow}>
                <Text style={{ ...styles.precioDesc, color: C.accent }}>
                  🍷 Oferta Ruta del Vino: {wineOffer.titulo}
                </Text>
                <Text style={styles.precioValorAccent}>${wineOffer.precio.toFixed(2)}</Text>
              </View>
            )}

            <View style={styles.subtotalRow}>
              <Text style={styles.subtotalLabel}>Subtotal</Text>
              <Text style={styles.subtotalValor}>${subtotalConVino.toFixed(2)}</Text>
            </View>
            <View style={[styles.subtotalRow, { borderTopWidth: 0 }]}>
              <Text style={styles.subtotalLabel}>Impuestos / Servicios</Text>
              <Text style={styles.subtotalValor}>${Number(reserva.Impuestos).toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total (impuestos incluidos)</Text>
              <Text style={styles.totalValor}>${totalConVino.toFixed(2)}</Text>
            </View>
          </View>

          {/* ── WINE OFFER DESTACADO ── */}
          {hasWineOffer && (
            <View style={styles.wineBlock}>
              <View style={styles.wineHeader}>
                <Text style={styles.wineHeaderText}>🍷  Oferta Especial · Ruta del Vino</Text>
              </View>
              <View style={styles.wineBody}>
                {wineOffer.imagen && (
                  <Image src={wineOffer.imagen} style={styles.wineImg} cache={false} />
                )}
                <View style={styles.wineInfo}>
                  <Text style={styles.wineName}>{wineOffer.titulo}</Text>
                  {wineOffer.descripcion && (
                    <Text style={styles.wineDesc}>{wineOffer.descripcion}</Text>
                  )}
                </View>
                {wineOffer.precio > 0 && (
                  <Text style={styles.winePrice}>${wineOffer.precio.toFixed(2)}</Text>
                )}
              </View>
              {wineOffer.regalos && (
                <View style={styles.wineRegalos}>
                  <Text style={styles.wineRegalosText}>
                    <Text style={{ fontFamily: "Helvetica-Bold" }}>🎁 Regalos incluidos:  </Text>
                    {wineOffer.regalos}
                  </Text>
                </View>
              )}
              <View style={styles.wineNote}>
                <Text style={styles.wineNoteText}>
                  Presente este certificado al momento del check-in para reclamar sus regalos de la Ruta del Vino.
                </Text>
              </View>
            </View>
          )}

          {/* ── SERVICIOS / RESTRICCIONES ── */}
          <SectionHeader title="Información del establecimiento" />
          <View style={styles.infoGrid}>
            {reserva.serviciosEst && (
              <View style={styles.infoCell}>
                <Text style={styles.infoCellTitle}>Servicios</Text>
                <Text style={styles.infoCellText}>{reserva.serviciosEst.replaceAll("-", "•")}</Text>
              </View>
            )}
            {reserva.restriccionesEst && (
              <View style={styles.infoCell}>
                <Text style={styles.infoCellTitle}>Restricciones</Text>
                <Text style={styles.infoCellText}>{reserva.restriccionesEst.replaceAll("-", "•")}</Text>
              </View>
            )}
            {reserva.sistemaServEst && (
              <View style={styles.infoCell}>
                <Text style={styles.infoCellTitle}>Sistema de servicios</Text>
                <Text style={styles.infoCellText}>{reserva.sistemaServEst.replaceAll("-", "•")}</Text>
              </View>
            )}
          </View>

          {/* Incluye / No incluye */}
          {reserva.Habitaciones.map((item, index) => (
            <React.Fragment key={`hab-detail-${index}`}>
              {(reserva.incluyeEst || reserva.noIncluyeEst || item.Acomodacion) && (
                <View style={[styles.infoGrid, { marginTop: 0 }]}>
                  {reserva.incluyeEst && (
                    <View style={styles.infoCell}>
                      <Text style={styles.infoCellTitle}>Incluye</Text>
                      <Text style={styles.infoCellText}>{reserva.incluyeEst.replaceAll("-", "•")}</Text>
                    </View>
                  )}
                  {reserva.noIncluyeEst && (
                    <View style={styles.infoCell}>
                      <Text style={styles.infoCellTitle}>No incluye</Text>
                      <Text style={styles.infoCellText}>{reserva.noIncluyeEst.replaceAll("-", "•")}</Text>
                    </View>
                  )}
                  {item.Acomodacion && (
                    <View style={styles.infoCell}>
                      <Text style={styles.infoCellTitle}>Acomodación</Text>
                      <Text style={styles.infoCellText}>{item.Acomodacion}</Text>
                    </View>
                  )}
                </View>
              )}
            </React.Fragment>
          ))}

          {/* ── MAPA ── */}
          <View style={styles.mapBlock}>
            <Image src={staticMapImageUrl} style={{ width: "100%", height: 70 }} />
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
                <Text style={styles.footerText}>Calle del Batán 5-317 y Esmeraldas :: Cuenca :: Ecuador</Text>
              </View>
              <View style={styles.footerCenter}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Image src="https://visitaecuador.com/img/web/whatsapp_cert.png" style={styles.whatsappImg} />
                  <View>
                    <Text style={{ ...styles.footerBold, marginBottom: 2 }}>CENTRAL DE RESERVAS:</Text>
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
const Certificado = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reserva = {};

  for (const [key, value] of searchParams) {
    if (value.startsWith("[") && value.endsWith("]")) {
      reserva[key] = JSON.parse(value);
    } else {
      reserva[key] = value;
    }
  }

  const wineOffer = {
    titulo:      reserva.WineOfferTitulo      ? decodeURIComponent(reserva.WineOfferTitulo)      : null,
    precio:      reserva.WineOfferPrecio      ? parseFloat(reserva.WineOfferPrecio)               : 0,
    imagen:      reserva.WineOfferImagen      ? decodeURIComponent(reserva.WineOfferImagen)      : null,
    descripcion: reserva.WineOfferDescripcion ? decodeURIComponent(reserva.WineOfferDescripcion) : null,
    regalos:     reserva.WineOfferRegalos     ? decodeURIComponent(reserva.WineOfferRegalos)     : null,
  };
  const hasWineOffer = wineOffer.titulo !== null;

  const latitude  = reserva.LatitudEst;
  const longitude = reserva.LongitudEst;
  const staticMapImageUrl = generateStaticMapImageUrl(latitude, longitude);

  const [nombreSuscriptorPDF, setNombreSuscriptorPDF] = useState(reserva.NombreSus || "");
  const [nombreSuscriptorInput, setNombreSuscriptorInput] = useState(reserva.NombreSus || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasDownloadedInitial, setHasDownloadedInitial] = useState(false);

  const getCodigoFromLocalStorage = () => {
    try {
      const datos = localStorage.getItem("datos");
      if (datos) return JSON.parse(datos)?.data?.codigo || null;
    } catch {}
    return null;
  };
  const canEditName = ["39579", "77562"].includes(getCodigoFromLocalStorage());

  useEffect(() => {
    setIsMobile(/iphone|ipad|ipod|android/.test(navigator.userAgent.toLowerCase()));
  }, []);

  const MyDocument = useMemo(() => () => (
    <CertificadoDoc
      reserva={reserva}
      nombreSuscriptorPDF={nombreSuscriptorPDF}
      wineOffer={wineOffer}
      hasWineOffer={hasWineOffer}
      staticMapImageUrl={staticMapImageUrl}
    />
  ), [nombreSuscriptorPDF, hasWineOffer, wineOffer]);

  useEffect(() => {
    if (isMobile && !hasDownloadedInitial) {
      const run = async () => {
        const blob = await pdf(<MyDocument />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${nombreSuscriptorPDF.replaceAll("-","")}-${reserva.IdSus}-${
          reserva.IdRes == null || reserva.IdRes === "" ? reserva.fecha_reserva : reserva.IdRes
        }.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        setHasDownloadedInitial(true);
      };
      run();
    }
  }, [isMobile, hasDownloadedInitial, nombreSuscriptorPDF]);

  const handleDownloadPDF = async () => {
    const blob = await pdf(<MyDocument />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nombreSuscriptorPDF.replaceAll("-","")}-${reserva.IdSus}-${
      reserva.IdRes == null || reserva.IdRes === "" ? reserva.fecha_reserva : reserva.IdRes
    }.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Panel de edición */}
      <div className="bg-gray-100 p-2 sm:p-4 border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <label className="font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap">
            Nombre del Suscriptor:
          </label>
          {isEditing && canEditName ? (
            <>
              <input
                type="text"
                value={nombreSuscriptorInput}
                onChange={(e) => setNombreSuscriptorInput(e.target.value)}
                className="flex-1 w-full sm:w-auto px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Ingrese el nombre"
                autoFocus
              />
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => { setIsEditing(false); setNombreSuscriptorPDF(nombreSuscriptorInput); }}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition whitespace-nowrap"
                >Aplicar</button>
                <button
                  onClick={() => { setNombreSuscriptorInput(nombreSuscriptorPDF); setIsEditing(false); }}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm bg-gray-400 text-white rounded-md hover:bg-gray-500 transition whitespace-nowrap"
                >Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <span className="flex-1 text-gray-900 font-medium text-sm sm:text-base break-words">{nombreSuscriptorPDF}</span>
              <div className="flex gap-2 w-full sm:w-auto">
                {canEditName && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition whitespace-nowrap"
                  >Editar Nombre</button>
                )}
                <button
                  onClick={handleDownloadPDF}
                     className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs bg-greenVE-600 text-white rounded-md hover:bg-greenVE-700">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                    Descargar PDF</button>
              </div>
            </>
          )}
        </div>
      </div>

      {hasWineOffer && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
          <div className="max-w-6xl mx-auto flex items-center gap-2">
            <span className="text-sm text-amber-800">
              Este certificado incluye la <strong>Oferta Ruta del Vino: {wineOffer.titulo}</strong>
              {wineOffer.regalos && <span> con regalos: {wineOffer.regalos}</span>}
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <PDFViewer className="w-full h-full">
          <MyDocument />
        </PDFViewer>
      </div>
    </div>
  );
};

export default Certificado;