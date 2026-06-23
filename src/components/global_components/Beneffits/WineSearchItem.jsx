import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EditOfferModal from "../../vinos_components/admin/EditOfferModal";
import { getOfferTypeConfig } from "../../../core/offertTypeConfig";

const slugify = (text) => {
  if (!text) return "";
  return encodeURIComponent(
    text.toLowerCase().replaceAll(" - ", "-").replaceAll(" ", "-")
      .replace(/[^a-z0-9\-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
  );
};

const DAY_NAMES = ["", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const formatDayRange = (start, end) => {
  const useBase1 = start > 6 || end > 6;
  const names = useBase1 ? DAY_NAMES : ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const s = names[start] ?? start;
  const e = names[end] ?? end;
  return s === e ? s : `${s} – ${e}`;
};

const formatTime = (timeValue) => {
  if (!timeValue) return "";
  const str = typeof timeValue === "string" ? timeValue : new Date(timeValue).toISOString();
  const timePart = str.includes("T") ? str.split("T")[1] : str;
  const [hh, mm] = timePart.split(":");
  const h = parseInt(hh, 10);
  return `${h % 12 || 12}:${mm}${h >= 12 ? "pm" : "am"}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("es-ES", { day: "numeric", month: "short", timeZone: "UTC" });
};

const isAdmin = () => {
  try {
    const id = localStorage.getItem("id_usuario");
    if (id) return id.toString() === "412";
    const datos = JSON.parse(localStorage.getItem("datos") || "{}");
    return (datos?.data?.id_usuario || datos?.id_usuario)?.toString() === "412";
  } catch { return false; }
};

const WineSearchItem = ({ offer, firstElement }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const typeConfig = getOfferTypeConfig(offer.type);
  const scheduleDateTime = new URLSearchParams(location.search).get('scheduleDateTime') || '';
  const [openEditOffer, setOpenEditOffer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [viewShare, setViewShare] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const establishment = offer.establishment || {};
  const daysRemaining = (() => {
    const diff = new Date(offer.date_ed) - new Date();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const handleClickItem = () => {
    if (openEditOffer) return;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    navigate(`/restaurante/${slugify(establishment.name || offer.title)}/`, {
      state: {
        OfertaSeleccionada: {
          TituloOferta: offer.title,
          FotoPrincipal: offer.image,
          Detalle: offer.description || offer.title,
          IdOferta: offer.id,
          price: offer.price || 0,
          Precio: offer.price || 0,
          FinalSinImpuestos: offer.price || 0,
          Impuestos: offer.taxes || 0,
          date_st: offer.date_st,
          date_ed: offer.date_ed,
            type: offer.type || '',     
          subType: offer.subType || '', 
          inventories: offer.inventories || [],
          wineEstablishment: { name: establishment.name, city: establishment.city, country: establishment.country },
        },
        options: { adult: 1, children: 0, childrenAges: [], room: 1 },
        date: [{ startDate: today.toISOString(), endDate: tomorrow.toISOString(), key: "selection" }],
        fromWineOffer: true,
        scheduleDateTime,
      },
    });
  };

  const shortUrl = window.location.origin + "/restaurante/" + slugify(establishment.name || offer.title);

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent("Descubre esta oferta: " + offer.title + " en VisitaEcuador.com: " + shortUrl)}`);
  };

  return (
    <>
      {openEditOffer && (
        <EditOfferModal
          isOpen={openEditOffer}
          onClose={() => setOpenEditOffer(false)}
          offer={offer}
          onUpdated={() => { setOpenEditOffer(false); window.location.reload(); }}
        />
      )}
      {viewShare && <div className="fixed inset-0 z-40" onClick={() => setViewShare(false)} />}

      <div className={`flex gap-x-2 border h-60 mb-3 rounded-md shadow-md py-3 pr-3 ${
        firstElement ? "border-amber-400 shadow-amber-200 bg-amber-50" : "border-gray-200"
      }`}>

        {/* Ribbon superior izquierdo */}
        <div className="absolute -ml-2.5 mt-10">
          <svg viewBox="0 0 8 6" className="w-2 h-1.5 fill-amber-700"><path d="M0 0 L8 0 L8 6 Z"/></svg>
        </div>
        {offer.inventories && offer.inventories.length > 0 && (
          <div className="-ml-2.5 mt-4 absolute h-6 w-40 bg-amber-500 text-justify flex items-center justify-center text-white font-medium rounded-r-md rounded-tl-md text-xs gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 7h-1.209A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H4c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2z"/>
            </svg>
            +{offer.inventories.length} regalo{offer.inventories.length > 1 ? "s" : ""} incluido{offer.inventories.length > 1 ? "s" : ""}
          </div>
        )}

        {/* Imagen */}
        <div className="w-4/12 flex items-center justify-center relative" onClick={handleClickItem}>
          {!imageLoaded && <div className="w-52 h-52 bg-gray-200 rounded-md animate-pulse" />}
          <img
            src={offer.image}
            alt={offer.title}
            className={`w-52 h-52 object-cover rounded-md cursor-pointer ${imageLoaded ? "opacity-100" : "opacity-0 absolute"}`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Badge días restantes */}
          {daysRemaining > 0 && daysRemaining <= 7 && !isAdmin() && (
            <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              ¡{daysRemaining} días!
            </div>
          )}
          {isAdmin() && (
            <button
              onClick={(e) => { e.stopPropagation(); setOpenEditOffer(true); }}
              className="absolute bottom-2 right-2 bg-white/90 text-xs font-semibold py-0.5 px-2 rounded-md shadow-sm hover:bg-white"
            >
              Editar
            </button>
          )}
        </div>

        {/* Contenido */}
        <div className="flex w-8/12">
          {/* Info izquierda */}
          <div className="w-8/12">
            {/* Nombre establecimiento + estrellas */}
            <div className="gap-x-2 items-center">
              <h2
                className="text-greenVE-600 font-semibold hover:underline cursor-pointer"
                onClick={handleClickItem}
              >
                { offer.title}
              </h2>
            
            </div>

            {/* Ubicación */}
            <div className="flex gap-3">
              <span className="text-blue-600 text-xs my-1">
                {establishment.city}{establishment.city && establishment.country ? ", " : ""}{establishment.country}
              </span>
            </div>

            {/* Título oferta */}
            <div className="mt-2 flex flex-wrap gap-2 items-start">
              {/* Type badge */}
              
              <div className={`text-xs border border-amber-300 bg-amber-50 text-amber-700 rounded-md px-2 py-0.5 mb-2 inline-block font-medium`}>
                {establishment.name }
              </div>
               <div className="flex my-1">
                {Array(+(establishment.rate || 0)).fill(null).map((_, i) => (
                  <span key={i} className="icon-[fluent--star-16-filled] text-amber-500" />
                ))}
              </div>
            </div>
           {offer.type != 'promociones' &&(
            <>
              {/* Schedules o fechas */}
              {offer.schedules && offer.schedules.length > 0 ? (
                <div className="flex flex-wrap gap-1 mt-1">
                  {offer.schedules.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xxs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                        <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"/>
                      </svg>
                      <span className="font-medium text-amber-700">{formatDayRange(s.day_start, s.day_end)}</span>
                      <span className="text-gray-400">·</span>
                      <span>{formatTime(s.time_st)} – {formatTime(s.time_ed)}</span>
                    </div>
                  ))}
                </div>
              ) : offer.date_st ? (
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  <span>{formatDate(offer.date_st)} – {formatDate(offer.date_ed)}</span>
                </div>
              ) : null}
           </> )}

            {/* Descripción */}
            {offer.description && (
              <div className="mt-2">
                <div className="leading-3 flex gap-x-2 relative pb-1">
                  <div className="absolute h-full bg-gray-300 w-0.5" />
                  <div className="flex flex-col ml-3 w-full">
                    <label className="text-xs text-gray-600 line-clamp-2">{offer.description}</label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel derecho — precio + CTA */}
          <div className="flex flex-col justify-between items-end w-4/12">
            {/* Rating establecimiento */}
            <div className="flex justify-end gap-2">
              {establishment.rate > 0 && (
                <>
                  <div className="flex flex-col justify-center items-end">
                    <label className="text-xs font-semibold">
                      {establishment.rate >= 4.5 ? "Excepcional" : establishment.rate >= 4 ? "Muy bueno" : "Bueno"}
                    </label>
                    <label className="text-xxs text-gray-500">{establishment.type}</label>
                  </div>
                  <div className=" flex-col bg-amber-500 h-12 w-12 flex justify-center items-center rounded-r-md rounded-tl-md">
                    <label className="text-white text-lg font-medium">{establishment.rate}</label>
                      <div className="flex -mt-1">
                {Array(+(establishment.rate || 0)).fill(null).map((_, i) => (
                  <span key={i} className="icon-[fluent--star-16-filled] text-white w-2 h-2" />
                ))}
              </div>
                  </div>
                </>
              )}
            </div>

            {/* Precio + botón */}
            <div className="flex flex-col items-end">
              {offer.price && offer.type != 'promociones' ?(
                <>
                <label className="text-xs text-end text-gray-500 mb-1">{typeConfig.priceLabel}</label>
                <div className="flex gap-2 justify-center items-center">
                  <label className="text-xl font-semibold">US${parseFloat(offer.price).toFixed(0)}</label>
                </div>
                </>
              ) : parseFloat(offer.price) === 0 && offer.subType === 'burgerKing' ? (
                 <>
                <label className="text-xs text-end text-gray-500 mb-1">Mucho mas sin costo</label>
                <div className="flex gap-2 justify-center items-center">
                  <label className="text-xl font-semibold">Agrandado</label>
                </div>
                </>
              ) : parseFloat(offer.price) > 0 && offer.subType === 'burgerKing' ? (
                 <>
                <label className="text-xs text-end text-gray-500 mb-1">{typeConfig.priceLabel}</label>
                <div className="flex gap-2 justify-center items-center">
                  <label className="text-xl font-semibold">- 15%</label>
                </div>
                </>
              ) 
              : null}
              {offer.taxes && (
                <label className="text-end text-xs text-gray-500">
                  + US${parseFloat(offer.taxes).toFixed(0)} impuestos
                </label>
              )}

              {/* Botón compartir */}
              <div className="relative mt-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setViewShare(!viewShare); }}
                  className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-xs mb-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartir
                </button>
                {viewShare && (
                  <div className="absolute right-0 bottom-7 bg-white border rounded-md shadow-xl p-2 w-48 z-50">
                    <div className="flex items-center justify-between mb-1 px-1">
                      <label className="font-semibold text-xs">Compartir oferta</label>
                      <button onClick={() => setViewShare(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer" onClick={handleCopy}>
                      {isCopied
                        ? <span className="text-xs text-greenVE-500 font-medium">✓ Enlace copiado</span>
                        : <span className="text-xs">📋 Copiar enlace</span>
                      }
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer" onClick={handleWhatsapp}>
                      <span className="text-xs">💬 Enviar por WhatsApp</span>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="flex justify-center gap-1 items-center bg-greenVE-500 text-white px-2 py-1.5 rounded-md w-full text-sm font-medium"
                onClick={handleClickItem}
              >
                {offer.price && offer.type != 'promociones' ?(
                <>
                  {typeConfig.reserveLabel}

                </>
              ) : parseFloat(offer.price) === 0 && offer.subType === 'burgerKing' ? (
                 <>
                <div className="flex gap-2 justify-center items-center">
                  <label className="text-xl font-semibold">Gratis</label>
                </div>
                </>
              ) : parseFloat(offer.price) > 0 && offer.subType === 'burgerKing' ? (
                 <>
                                  {typeConfig.reserveLabel}

                </>
              ) 
              : null}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WineSearchItem;