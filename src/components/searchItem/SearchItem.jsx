import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../global/icons";
import { changeFavoritoStatus } from "../../controllers/establecimiento/establecimientoController";

const SearchItem = (props) => {
  const navigate = useNavigate();
  const { options, date, destination, Establecimiento, firstElement } = props
  const ganga=Establecimiento.Recomendados.some(recomendado => recomendado.Ganga === true);
  //const [noches, setNoches] = useState(Math.ceil(Math.abs(new Date(date[0].endDate)) - new Date(date[0].startDate)) / (1000 * 60 * 60 * 24));
  const noches = Math.ceil(Math.abs(new Date(date[0].endDate)) - new Date(date[0].startDate)) / (1000 * 60 * 60 * 24);
  const [favorito, setFavorito] = useState(JSON.parse(Establecimiento.Favorito))
  const [isLoading, setIsLoading] = useState(false)
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const openMap=true;
  const icons = new Icons();
  const petFriendly=(Establecimiento.Incluye!=null?Establecimiento.Incluye.some(item => parseInt(item.Valor) === 112):false)||(Establecimiento.SistemaServicios!=null?Establecimiento.SistemaServicios.some(item => parseInt(item.Valor) === 151):false);
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
        <img src={Establecimiento.Foto} className="w-52 h-52 object-cover rounded-md" />
      </div>
      <div className="flex w-8/12">
        <div className="w-8/12">
          <div className="flex flex-wrap gap-x-2">
            <h2 className="text-greenVE-600 font-semibold hover:underline cursor-pointer" onClick={HandleClickItem}>{Establecimiento.Titulo}</h2>
            <div className="flex content-between my-1">
              {Array(+(Establecimiento.Catalogacion)).fill(null).map((item, index) => (
                <span className="icon-[fluent--star-16-filled] text-amber-500"></span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className=" text-blue-600 text-xs my-1 cursor-pointer underline" onClick={HandleClickLocation} >{Establecimiento.Ciudad}, {Establecimiento.Pais}</button>
            <button href="#" className=" text-blue-600 text-xs my-1 cursor-pointer underline" onClick={HandleClickLocation}>Mostrar en mapa</button>
          </div>
          <div>
          {
            Establecimiento.IdEstablecimiento=="443"
            &&<label className="text-xxs text-red-700">* Este establecimiento no ofrece hospedaje</label>
          }
          {
            petFriendly==true&&(
            <div className="flex items-center gap-x-1 bg-greenVE-100 rounded-md w-32 justify-center mt-3 py-1">
              <div className="" dangerouslySetInnerHTML={{ __html: icons.Data.PetFriendly }} />
              <label className="text-greenVE-600 text-sm font-medium">Pet Friendly</label>
            </div>)
          }
          </div>
          <div className="mt-3">
            {
              ganga?(<div className="flex  text-xs text-orange-600  bg-orange-100 rounded-md px-2 gap-1.5 py-0.5 mb-2 w-36 ">
                <div className="" dangerouslySetInnerHTML={{ __html: icons.Data.Ganga }} />
              <label className="text-orange-500 text-sm font-medium">Precio ganga</label>
              </div>):(<div>{
              options.adult>2
              ?<div className="text-xs border border-gray-400 rounded-md px-1 py-0.5 mb-2 inline-block">Recomendado para tu grupo</div>
              :<div className="text-xs border border-gray-400 rounded-md px-1 py-0.5 mb-2 inline-block">Recomendado para ti</div>}</div>)

            }
            
            {
              Establecimiento.Recomendados.map((item, index) => (
                (Establecimiento.Recomendados.length > 1 || parseInt(item.NumOfertas) > 1) ?
                  (<div className={`leading-3 flex gap-x-0.5 relative ${index == Establecimiento.Recomendados.length - 1 ? 'pb-1' : ''}`} key={index}>
                    <div className="text-[9px] z-50 font-medium bg-gray-200 mr-1.5 rounded-md h-[18px] w-[18px] flex items-center justify-center flex-shrink-0">
                      {item.NumOfertas} x
                    </div>
                    <div className={`flex flex-col ${index < Establecimiento.Recomendados.length - 1 ? 'mb-2' : ''} w-full`}>
                      <label className="text-xxs font-semibold" >{item.TituloOferta}</label>
                      {
                        item.IdEstablecimiento=="443"
                        ?<label className="text-xxs">{item.NumOfertas} {item.NumOfertas>1?"paquetes":"paquete"} </label>
                        :<label className="text-xxs">{item.NumOfertas} cama {item.Acomodacion}</label>
                      }
                    </div>
                    <div className="absolute h-full bg-gray-300 w-0.5 left-2"></div>
                  </div>)
                  : (
                    <div className="leading-3 flex gap-x-2 relative pb-1" key={index}>

                      <div className={`flex flex-col ml-3 ${index < Establecimiento.Recomendados.length - 1 ? 'mb-2' : ''} w-full`}>
                        <label className="text-xxs font-semibold">{item.TituloOferta}</label>
                        {
                          item.IdEstablecimiento=="443"
                          ?<label className="text-xxs">{item.NumOfertas} {item.NumOfertas>1?"paquetes":"paquete"} </label>
                          :<label className="text-xxs">{item.NumOfertas} cama {item.Acomodacion}</label>
                        }
                      </div>
                      <div className="absolute h-full bg-gray-300 w-0.5"></div>
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
            {
              Establecimiento.IdEstablecimiento!="443"
              ?<label className="text-xs text-end text-gray-800">{noches} {noches > 1 ? "noches" : "noche"}, {options.adult} {options.adult > 1 ? "adultos" : "adulto"}{options.children > 0 ? (options.children > 1 ? ", " + options.children + " niños" : ", " + options.children + " niño") : ""} </label>
              :<label className="text-xs text-end text-gray-800">1 día, {options.adult} {options.adult > 1 ? "adultos" : "adulto"}</label>
            }
            <div className="flex gap-2 justify-center items-center">
              <label className="text-sm text-red-600 line-through">US${Math.round(parseFloat(Establecimiento.Rack))}</label>
              <label className="text-xl font-semibold">US${Math.round(parseFloat(Establecimiento.PrecioSinImpuestos))}</label>
            </div>
            <label className="text-end text-xs text-gray-800">+ US${Math.round(parseFloat(Establecimiento.Impuestos))} de impuestos y cargos</label>
            <button className="flex justify-center gap-1 items-center bg-greenVE-500 text-white px-2 py-1.5 rounded-md w-full text-sm font-medium mt-2" onClick={HandleClickItem}>Ver disponibilidad <div dangerouslySetInnerHTML={{ __html: icons.Data.NextArrow }} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
