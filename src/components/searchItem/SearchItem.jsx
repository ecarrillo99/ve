import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../global/icons";
import { changeFavoritoStatus } from "../../controllers/establecimiento/establecimientoController";

const SearchItem = (props) => {
  const navigate = useNavigate();
  const { options, date, destination, Establecimiento, firstElement } = props
  //const [noches, setNoches] = useState(Math.ceil(Math.abs(new Date(date[0].endDate)) - new Date(date[0].startDate)) / (1000 * 60 * 60 * 24));
  const noches = Math.ceil(Math.abs(new Date(date[0].endDate)) - new Date(date[0].startDate)) / (1000 * 60 * 60 * 24);
  const [favorito, setFavorito] = useState(JSON.parse(Establecimiento.Favorito))
  const [isLoading, setIsLoading] = useState(false)
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const openMap=true;
  const icons = new Icons();
  const HandleClickItem = () => {
    navigate(`/hotel/${Establecimiento.Titulo.toLowerCase().replaceAll(" - ","-").replaceAll(" ","-")}/?id=${Establecimiento.IdEstablecimiento}&destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`, { state: {Establecimiento, destination, date, options} });
  }
  const HandleClickLocation = () => {
    navigate(`/hotel/${Establecimiento.Titulo.toLowerCase().replaceAll(" - ","-").replaceAll(" ","-")}/?id=${Establecimiento.IdEstablecimiento}&destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`, { state: {Establecimiento, destination, date, options, openMap} });
  }

  const handleClickFav = () => {
    if (!isLoading) {
      setIsLoading(true)
      changeFavoritoStatus(Establecimiento.IdEstablecimiento, !favorito).then((res) => {
        if (res) {
          if(res===401){
            localStorage.removeItem("datos")
            window.location.reload();
          }else{
            setFavorito(!favorito);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false)
        }
      })
    }
  }

  return (
    <div className={firstElement?"flex gap-x-2 border border-greenVE-500 h-60 mb-3 rounded-md shadow-greenVE-500 shadow-md  py-3 pr-3 bg-greenVE-50":"flex gap-x-2 border border-gray-200 h-60 mb-3 rounded-md shadow-md py-3 pr-3"}>
      <div className="absolute -ml-2.5 mt-10" dangerouslySetInnerHTML={{ __html: icons.Data.Triangle }} />
      <div className="-ml-2.5 mt-4 absolute h-6 w-40 bg-greenVE-500 text-justify flex items-center justify-center text-white font-medium rounded-r-md rounded-tl-md text-sm">Desayuno Incluido</div>
      {
        (nivel !== "visitante") && (
          <div className="absolute h-8 w-8 bg-white rounded-full ml-48 mt-3 flex justify-center items-center cursor-pointer" onClick={() => handleClickFav()}>
            {

              isLoading
                ? <div className="w-4 h-4 border-l-2 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                : (favorito
                  ? <div className=" " dangerouslySetInnerHTML={{ __html: icons.Data.Like }} />
                  : <div className=" " dangerouslySetInnerHTML={{ __html: icons.Data.Unlike }} />)
            }
          </div>
        )
      }

      <div className="w-4/12 flex items-center justify-center">
        <img alt="" src={Establecimiento.Foto} className="w-52 h-52 object-cover rounded-md" />
      </div>
      <div className="flex w-8/12">
        <div className="w-8/12">
          <div className="flex flex-wrap gap-x-2">
            <h2 className="text-greenVE-600 font-semibold">{Establecimiento.Titulo}</h2>
            <div className="flex content-between my-1">
              {Array(+(Establecimiento.Catalogacion)).fill(null).map((item, index) => (
                <svg key={index} height="15px" width="15px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className=" text-blue-600 text-xs my-1 cursor-pointer underline" onClick={HandleClickLocation} >{Establecimiento.Ciudad}, {Establecimiento.Pais}</button>
            <button href="#" className=" text-blue-600 text-xs my-1 cursor-pointer underline" onClick={HandleClickLocation}>Mostrar en mapa</button>
          </div>
          <div className="mt-4">
            {
              options.adult>2
              ?<div className="text-xs border border-gray-400 rounded-md px-1 py-0.5 mb-2 inline-block">Recomendado para tu grupo</div>
              :<div className="text-xs border border-gray-400 rounded-md px-1 py-0.5 mb-2 inline-block">Recomendado para ti</div>

            }
            
            {
              Establecimiento.Recomendados.map((item, index) => (
                (Establecimiento.Recomendados.length > 1 || parseInt(item.NumOfertas) > 1) ?
                  (<div className="leading-3 flex gap-x-0.5 relative" key={index}>
                    <div className="text-xxs z-50 font-medium bg-gray-200 mr-1.5 rounded-md h-6 w-6 flex items-center justify-center flex-shrink-0">
                      {item.NumOfertas} x
                    </div>
                    <div className={`flex flex-col ${index < Establecimiento.Recomendados.length - 1 ? 'mb-2' : ''} w-full`}>
                      <label className="text-xxs font-semibold">{item.TituloOferta}</label>
                      <label className="text-xxs">{item.NumOfertas} cama {item.Acomodacion}</label>
                    </div>
                    <div className="absolute h-full bg-gray-300 w-0.5 left-3"></div>
                  </div>)
                  : (
                    <div className="leading-3 flex gap-x-2 relative" key={index}>

                      <div className={`flex flex-col ml-8 ${index < Establecimiento.Recomendados.length - 1 ? 'mb-2' : ''} w-full`}>
                        <label className="text-xxs font-semibold">{item.TituloOferta}</label>
                        <label className="text-xxs">{item.NumOfertas} cama {item.Acomodacion}</label>
                      </div>
                      <div className="absolute h-full bg-gray-300 w-0.5 left-3"></div>
                    </div>
                  )
              ))
            }
          </div>
        </div>
        <div className="flex flex-col justify-between items-end w-4/12">
          <div className="flex justify-end gap-2">
            <div className="flex flex-col justify-center items-end">
              <label className="text-xs font-semibold">{Establecimiento.Calificacion.Titulo}</label>
              <label className="text-xxs">{Establecimiento.Calificacion.Valor} {Establecimiento.Calificacion.Valor > 1 ? "Comentarios" : "Comentario"}</label>
            </div>
            <div className="bg-greenVE-500 h-10 w-10 flex justify-center items-center rounded-r-md rounded-tl-md">
              <label className="text-white text-lg font-medium">{Establecimiento.Calificacion.Icono}</label>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <label className="text-xs text-end text-gray-600">{noches} {noches > 1 ? "noches" : "noche"}, {options.adult} {options.adult > 1 ? "adultos" : "adulto"}{options.children > 0 ? (options.children > 1 ? ", " + options.children + " niños" : ", " + options.children + " niño") : ""} </label>
            <div className="flex gap-2 justify-center items-center">
              <label className="text-sm text-red-600 line-through">US${Math.round(parseFloat(Establecimiento.Rack))}</label>
              <label className="text-xl font-semibold">US${Math.round(parseFloat(Establecimiento.PrecioSinImpuestos))}</label>
            </div>
            <label className="text-end text-xs text-gray-600">+ US${Math.round(parseFloat(Establecimiento.Impuestos))} de impuestos y cargos</label>
            <button className="flex justify-center gap-1 items-center bg-greenVE-500 text-white px-2 py-1.5 rounded-md w-full text-sm font-medium mt-2" onClick={HandleClickItem}>Ver disponibilidad <div dangerouslySetInnerHTML={{ __html: icons.Data.NextArrow }} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
