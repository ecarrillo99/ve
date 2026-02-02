import { useState } from "react";
import {
  changeFavoritoStatus,
  shareHotel,
} from "../../../controllers/establecimiento/establecimientoController";
import Icons from "../../../global/icons";
import { ClickAwayListener } from "@mui/material";

const HotelBanner = (props) => {
  const { Establecimiento } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const [favorito, setFavorito] = useState(
    JSON.parse(Establecimiento.Favorito)
  );
  const icons = new Icons();
  const petFriendly =
    (Establecimiento.Incluye != null
      ? Establecimiento.Incluye.some((item) => parseInt(item.Valor) === 112)
      : false) ||
    (Establecimiento.SistemaServicios != null
      ? Establecimiento.SistemaServicios.some(
          (item) => parseInt(item.Valor) === 151
        )
      : false);
  const [viewShare, setViewShare] = useState(false);
  const [shortUrl, setShortUrl] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  const handleClickFav = () => {
    if (!isLoading) {
      setIsLoading(true);
      changeFavoritoStatus(Establecimiento.IdEstablecimiento, !favorito).then(
        (res) => {
          if (res) {
            if (res === 401) {
              localStorage.removeItem("datos");
              window.location.reload();
            } else {
              setFavorito(!favorito);
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
          }
        }
      );
    }
  };

  const handleClickAwayShare = () => {
    setIsCopied(false);
    setViewShare(false);
  };

  const handleClickWhatsapp = () => {
    const message = encodeURIComponent(
      "Descubre las ofertas de " +
        Establecimiento.Titulo +
        " en VisitaEcuador.com ingresando aquí: " +
        shortUrl
    );
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL);
  };

  const handleClickCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setIsCopied(true);
  };

  const handleClickShare = () => {
    setLoadingShare(true);
    if (shortUrl == null) {
      shareHotel("insertar", window.location.href).then((result) => {
        if (result) {
          setViewShare(true);
          setShortUrl(window.location.origin + "/short/" + result);
          setLoadingShare(false);
        } else {
          setLoadingShare(false);
        }
      });
    } else {
      setViewShare(true);
      setLoadingShare(false);
    }
  };

  const handleClickPreReserva = () => {
    const targetElement = document.getElementById("tabla-ofertas");

    if (targetElement) {
      const scrollOptions = {
        behavior: "smooth",
        block: "start",
      };
      targetElement.scrollIntoView(scrollOptions);
    }
  };

  return (
    <div className="flex justify-end">
      <div className="w-9/12">
        <div className="flex items-center gap-3">
          <div className="flex items-center pt-3">
            {Array(+Establecimiento.Catalogacion)
              .fill(null)
              .map((item, index) => (
                <svg
                  key={index}
                  height="16px"
                  width="16px"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-current text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
          </div>
          <div>
            {petFriendly == true ? (
              <div className="flex items-center gap-x-1 bg-greenVE-100 rounded-md w-32 justify-center mt-3 py-1">
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: icons.Data.PetFriendly }}
                />
                <label className="text-greenVE-600 text-sm font-medium">
                  Pet Friendly
                </label>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <h1 className="text-xl font-semibold">{Establecimiento.Titulo}</h1>
        <div className="flex items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <p className="text-xs">
            {Establecimiento.Direccion} {Establecimiento.Ciudad},{" "}
            {Establecimiento.Pais}
          </p>
        </div>
      </div>
      <div className="w-3/12 flex h-8 items-center justify-between">
        {nivel !== "visitante" && (
          <>
            {isLoading ? (
              <div className="w-6 h-6 border-l-2 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            ) : favorito ? (
              <div
                className="cursor-pointer"
                dangerouslySetInnerHTML={{ __html: icons.Data.LikeHotel }}
                onClick={() => handleClickFav()}
              />
            ) : (
              <div
                className="cursor-pointer"
                dangerouslySetInnerHTML={{ __html: icons.Data.UnlikeHotel }}
                onClick={() => handleClickFav()}
              />
            )}
          </>
        )}
        {loadingShare ? (
          <div className="w-6 h-6 border-l-2 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
        ) : (
          <div
            className="cursor-pointer"
            onClick={() => handleClickShare()}
            dangerouslySetInnerHTML={{ __html: icons.Data.Share }}
          ></div>
        )}

        <button
          className="bg-greenVE-600 p-2 text-white"
          onClick={() => handleClickPreReserva()}
        >
          Reservar ahora
        </button>
      </div>
      {viewShare && (
        <ClickAwayListener onClickAway={handleClickAwayShare}>
          <div className="absolute  h-[110px] flex bg-white border mt-[40px] z-50 flex-col shadow-lg  mr-7 rounded-md">
            <label className="font-semibold p-2">
              Compartir este alojamiento
            </label>
            {!isCopied ? (
              <div
                className="flex items-center pl-2 gap-2"
                onClick={() => handleClickCopy()}
              >
                <svg
                  className="h-6 w-6 "
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                    <path
                      d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
                      fill="#0F0F0F"
                    ></path>{" "}
                  </g>
                </svg>
                <label className="text-sm">Copiar enlace</label>
              </div>
            ) : (
              <div
                className="flex items-center pl-2 gap-2"
                onClick={() => handleClickCopy()}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#95c01f"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#96c021"
                      stroke-width="1.5"
                    ></circle>{" "}
                    <path
                      d="M8.5 12.5L10.5 14.5L15.5 9.5"
                      stroke="#96c021"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <label className="text-sm text-greenVE-500">
                  Enlace copiado
                </label>
              </div>
            )}
            <div className="h-2"></div>
            <div
              className="flex items-center pl-2 gap-2"
              onClick={() => handleClickWhatsapp()}
            >
              <svg
                className="h-6 w-6"
                fill="#000000"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>whatsapp</title>{" "}
                  <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>{" "}
                </g>
              </svg>
              <label className="text-sm">Enviar por Whatsapp</label>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default HotelBanner;
