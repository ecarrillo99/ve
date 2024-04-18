import React, { useState } from 'react';
import HotelServices from './HotelServices';

const HotelServicesMain = ({Incluye, NoIncluye, Restricciones, SistemaServicios, Titulo}) => {
    const [openServices, setOpenServices]=useState(false)
    return (
        <div className='p-3 border-y z-50'>
            <label className='font-semibold'>Servicios incluidos</label>
            <div className='flex  gap-x-6 flex-wrap gap-y-2'>
                {
                    Incluye.map((item)=>(
                        <div className='flex gap-1 items-center '>
                            <span className="icon-[material-symbols--check-small-rounded] h-5 w-5 text-greenVE-500"></span>
                            <label>
                                {item.Titulo}
                            </label>
                        </div>
                    ))
                }
            </div>
            <button onClick={()=>setOpenServices(true)} className='mt-4 font-medium text-greenVE-500'>Ver todos los servicios</button>
            {
                openServices
                ?<HotelServices
                    Incluye={Incluye}
                    NoIncluye={NoIncluye}
                    Restricciones={Restricciones}
                    SistemaServicios={SistemaServicios}
                    Titulo={Titulo}
                    setOpenServices={setOpenServices}/>
                :<></>
            }
        </div>
    );
};

export default HotelServicesMain;