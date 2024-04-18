import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { calcularNoches } from '../../../global/formatearFecha';
import { changeFavoritoStatus } from '../../../controllers/establecimiento/establecimientoController';

const SearchResultItem = ({Establecimiento, destination, date, options, PrimerElemento}) => {

    const session = JSON.parse(localStorage.getItem("datos"));
    const nivel = session ? session.data.nivel : "visitante";
    const [favorito, setFavorito] = useState(JSON.parse(Establecimiento.Favorito))
    const ganga=Establecimiento.Recomendados.some(recomendado => recomendado.Ganga === true);
    const [isLoading, setIsLoading] = useState(false)
    const petFriendly=(Establecimiento.Incluye!=null?Establecimiento.Incluye.some(item => parseInt(item.Valor) === 112):false)||(Establecimiento.SistemaServicios!=null?Establecimiento.SistemaServicios.some(item => parseInt(item.Valor) === 151):false);
    var camas=0;
    var habitaciones=0;
    Establecimiento.Recomendados.forEach((elemento) => {
        habitaciones=habitaciones+elemento.NumOfertas
        camas=camas + (elemento.Acomodacion.toLowerCase().includes("doble")?2*elemento.NumOfertas:elemento.NumOfertas);
    });

    const navigate = useNavigate();

    const handleCLickElement=()=>{
        navigate(`/hotel/${Establecimiento.Titulo.toLowerCase().replaceAll(" - ","-").replaceAll(" ","-")}/?id=${Establecimiento.IdEstablecimiento}&destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`, { state: {Establecimiento, destination, date, options} });
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
        <div onClick={(e) => {
            e.stopPropagation();
            handleCLickElement();
        }} className={`flex flex-row py-4 ${PrimerElemento?"bg-greenVE-100":"border-b border-greenVE-300"}`}>
            <div className='w-1/3 px-3 flex flex-col'>
                <div className='relative bg-greenVE-500 text-white text-xs text-center  font-medium  rounded-t-lg'>
                    Desayuno<br></br>Incluido
                </div>
                <img className='rounded-lg h-full object-cover -mt-8' src={Establecimiento.Foto} />
                
            </div>
            <div className='w-2/3 flex flex-col gap-2 mr-3'>
                <div className='flex justify-between items-start'>
                    <label className='font-semibold leading-5'>{Establecimiento.Titulo}</label>
                    {
                        (nivel !== "visitante") && (
                        <div className=" " onClick={(e) => {
                            e.stopPropagation();
                            handleClickFav();
                        }}>
                            {

                            isLoading
                                ? <div className="w-5 h-5 border-l-2 border-t-2 mb-[7px] border-blue-500 border-solid rounded-full animate-spin"></div>
                                : (favorito
                                ? <span className="icon-[ant-design--heart-filled] h-5 w-5 text-red-500"></span>
                                : <span className="icon-[ant-design--heart-outlined] h-5 w-5"></span>)
                            }
                        </div>
                        )
                    }
                </div>
                {/* Aquí agregamos el contenedor flex para alinear elementos verticalmente */}
                <div className='flex flex-col gap-2 h-full'>
                    {/* Asegúrate de que el contenedor tenga la clase h-full para que tome la altura completa */}
                    <div className='flex'>
                        {Array(parseInt(Establecimiento.Catalogacion)).fill(null).map((item, index) => (
                            <span className="icon-[fluent--star-16-filled] text-amber-500"></span>
                        ))}
                    </div>
                    <div className='flex gap-1 items-center'>
                        <div className='w-4 h-5'><span className="icon-[fluent--location-20-regular] "></span></div>
                        <label className='text-xs'>{Establecimiento.Direccion}</label>
                    </div>
                    <div className='flex gap-2'>
                        {
                            petFriendly
                            ?<div className='flex gap-1 w-1/2 bg-greenVE-200 justify-center rounded-lg py-1 items-center'>
                                <span className="icon-[ph--paw-print] text-greenVE-700"></span>
                                <label className='text-xs text-greenVE-600'>Pet Friendly</label>
                            </div>
                            :<></>
                        }
                        {
                            ganga
                            ?<div className='flex gap-1 w-1/2 bg-orange-200 justify-center rounded-lg py-1 items-center'>
                                <span className="icon-[ic--outline-discount] text-orange-700"></span>
                                <label className='text-xs text-orange-600'>Ganga</label>
                            </div>
                            :<></>
                        }
                    </div>
                    <div className='flex gap-1'>
                        <label className='text-xs'>{habitaciones==1?"1 habitación:":habitaciones+" habitaciones:"} {camas==1?"1 cama":camas+" camas"}</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label className='text-xs font-semibold'>{calcularNoches(date[0].startDate, date[0].endDate)}</label>
                        <label className='text-xs text-greenVE-600 line-through'>US ${Establecimiento.Rack}</label>
                        <label className='text-sm font-semibold text-orange-600'>US ${Establecimiento.PrecioSinImpuestos}</label>
                    </div>
                    <div className='flex items-center gap-1 text-sm'>
                        <label>+</label>
                        <label>US ${Establecimiento.Impuestos} de impuestos y cargos</label>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SearchResultItem;