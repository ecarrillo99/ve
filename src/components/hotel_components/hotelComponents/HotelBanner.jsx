import { useState } from "react";
import { changeFavoritoStatus } from "../../../controllers/establecimiento/establecimientoController";
import Icons from "../../../global/icons";

const HotelBanner = (props) => {
  const { Establecimiento } = props;
  const [isLoading, setIsLoading] = useState(false)
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const [favorito, setFavorito] = useState(JSON.parse(Establecimiento.Favorito))
  const icons = new Icons();

  const handleClickFav = () => {
    if (!isLoading) {
      setIsLoading(true)
      changeFavoritoStatus(Establecimiento.IdEstablecimiento, !favorito).then((res) => {
        if (res) {
          if (res === 401) {
            localStorage.removeItem("datos")
            window.location.reload();
          } else {
            setFavorito(!favorito);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false)
        }
      })
    }
  }

  const handleClickPreReserva = () => {
    const targetElement = document.getElementById('tabla-ofertas');

    if (targetElement) {
      const scrollOptions = {
        behavior: 'smooth',
        block: 'start',
      };
      targetElement.scrollIntoView(scrollOptions);
    }
  };

  return (
    <div className="flex" >
      <div className="w-9/12">
        <div className="flex items-center ">
          {Array(+(Establecimiento.Catalogacion)).fill(null).map((item, index) => (
            <svg key={index} height="16px" width="16px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current text-yellow-500">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          ))}
        </div>
        <h1 className="text-xl font-semibold">{Establecimiento.Titulo}</h1>
        <div className="flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-blue-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <p className="text-xs">{Establecimiento.Direccion} {Establecimiento.Ciudad}, {Establecimiento.Pais}</p>
        </div>
      </div>
      <div className="w-3/12 flex h-8 items-center justify-between">
        {
          (nivel !== "visitante") &&
          <>
            {
              isLoading
                ? <div className="w-6 h-6 border-l-2 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                : (favorito
                  ? <div dangerouslySetInnerHTML={{ __html: icons.Data.LikeHotel }} onClick={() => handleClickFav()} />
                  : <div dangerouslySetInnerHTML={{ __html: icons.Data.UnlikeHotel }} onClick={() => handleClickFav()} />)
            }
          </>
        }
        <div dangerouslySetInnerHTML={{ __html: icons.Data.Share}}></div>
        <button className="bg-greenVE-600 p-2 text-white" onClick={() => handleClickPreReserva()}>
          Reservar ahora
        </button>
      </div>
    </div>
  );
};

export default HotelBanner;
