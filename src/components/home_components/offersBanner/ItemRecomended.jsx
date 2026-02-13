import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemRecomended = ({ oferta }) => {
  const navigate = useNavigate();
  const [viewShare, setViewShare] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  const handleClickWhatsapp = () => {
    const message = encodeURIComponent(
      "Descubre las ofertas de " +
        oferta.Establecimiento +
        " en VisitaEcuador.com ingresando aquí: " +
        shortUrl
    );
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL);
  };

  const handleClickCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClickShare = (e) => {
    e.stopPropagation();
    setLoadingShare(true);
    if (shortUrl == null) {
      const tempShortUrl = window.location.origin + "/short/" + oferta.IdEstablecimiento;
      setViewShare(true);
      setShortUrl(tempShortUrl);
      setLoadingShare(false);
    } else {
      setViewShare(true);
      setLoadingShare(false);
    }
  };

  const handleClickAwayShare = (e) => {
    e.stopPropagation();
    setViewShare(false);
    setIsCopied(false);
  };

  const HandleClickItem = () => {
    navigate(`/hotel/${oferta.Establecimiento.toLowerCase().replaceAll(" - ", "-").replaceAll(" ", "-")}/?id=${oferta.IdEstablecimiento}&fechas=${encodeURIComponent(JSON.stringify(date))}&destino=${encodeURIComponent(JSON.stringify(destination))}&opciones=${encodeURIComponent(JSON.stringify(options))}`);
  };

  const [date] = useState(
    [{
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + parseInt(oferta.Noches))),
      key: "selection",
    }]
  );

  const [options] = useState({
    adult: parseInt(oferta.Adultos),
    children: oferta.Ninos != null ? parseInt(oferta.Ninos) : 0,
    childrenAges: [],
    room: 1,
  });

  const [destination] = useState({
    Titulo: oferta.Establecimiento,
    Tipo: "establecimiento",
    Id: oferta.IdEstablecimiento,
    Lugar: oferta.Lugar
  });

  return (
    <>
      {/* Overlay de fondo cuando el modal está abierto */}
      {viewShare && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={handleClickAwayShare}
        />
      )}
      
      <div 
        className="bg-white rounded-xl border border-gray-200 hover:border-greenVE-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-visible group relative"
      >
        {/* Imagen con overlay de gradiente */}
        <div className="relative w-full md:h-52 h-40 overflow-hidden" onClick={HandleClickItem}>
          {/* Skeleton loader */}
          <div className="animate-pulse absolute inset-0 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-full"></div>
          
          {/* Imagen */}
          <img
            src={oferta.Foto}
            alt={oferta.Establecimiento}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradiente superior para mejor legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badge de ubicación flotante */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-greenVE-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-gray-700">{oferta.Lugar}</span>
            </div>
          </div>

          {/* Badge de precio en la esquina superior derecha */}
          <div className="absolute top-3 right-3">
            <div className="bg-greenVE-600 text-white px-3 py-1.5 rounded-full shadow-lg">
              <span className="text-xs font-bold">Desde ${oferta.Precio}</span>
            </div>
          </div>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-4">
          {/* Nombre del establecimiento */}
          <h3 className="text-sm md:text-sm font-bold text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-greenVE-700 transition-colors">
            {oferta.Establecimiento}
          </h3>

          {/* Estrellas de calificación */}
          <div className="flex items-center gap-1">
            {Array(+(oferta.Catalogacion)).fill(null).map((item, index) => (
              <svg 
                key={index} 
                height="14px" 
                width="14px" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="fill-current text-amber-400"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                  clipRule="evenodd" 
                />
              </svg>
            ))}
          </div>

          {/* Comentarios y calificación */}
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <span className="font-bold text-greenVE-700">9.7</span>
              <span className="text-gray-500">•</span>
            </div>
            <span className="text-gray-500">10 Comentarios</span>
          </div>

          {/* Separador sutil */}
          <div className="border-t border-gray-100 pt-3 mt-3">
            <div className="flex items-center justify-between relative">
              {/* Duración de la estadía 
                  <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-gray-500">{oferta.Noches} {parseInt(oferta.Noches) > 1 ? 'noches' : 'noche'}</span>
                  </div>
              */}
              
              {/* Botón de compartir */}
              <button
                onClick={handleClickShare}
                className="flex items-center gap-1.5 text-gray-600 hover:text-greenVE-600 transition-colors relative z-50 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span className="text-xs font-medium">Compartir</span>
              </button>

              {/* Modal de compartir */}
              {viewShare && (
                <div className="absolute right-0 -top-36 z-50">
                  <div className="bg-white border rounded-md shadow-xl p-2 w-56">
                      <div className="flex items-center justify-between mb-2 px-2">
                        <label className="font-semibold text-sm">
                        Compartir este alojamiento
                        </label>
                        <button 
                        onClick={handleClickAwayShare}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        </button>
                    </div>
                    
                    {!isCopied ? (
                      <div
                        className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClickCopy();
                        }}
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                            fill="#0F0F0F"
                          />
                          <path
                            d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                            fill="#0F0F0F"
                          />
                        </svg>
                        <label className="text-sm cursor-pointer">Copiar enlace</label>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 px-2 py-2 bg-green-50 rounded">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#95c01f"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#96c021"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M8.5 12.5L10.5 14.5L15.5 9.5"
                            stroke="#96c021"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <label className="text-sm text-greenVE-500">
                          Enlace copiado
                        </label>
                      </div>
                    )}
                    
                    <div
                      className="flex items-center gap-2 px-2 py-2 hover:bg-gray-50 rounded cursor-pointer mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickWhatsapp();
                      }}
                    >
                      <svg
                        className="h-5 w-5"
                        fill="#000000"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z" />
                      </svg>
                      <label className="text-sm cursor-pointer">Enviar por Whatsapp</label>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1.5 text-greenVE-600 font-semibold group-hover:gap-2 transition-all cursor-pointer" onClick={HandleClickItem}>
                <span className="text-xs">Ver más</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemRecomended;