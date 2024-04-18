import React from 'react';

const HotelServices = ({ Titulo, Incluye, NoIncluye, Restricciones, SistemaServicios, setOpenServices }) => {
    return (
        <div className='w-full h-screen z-50 fixed top-0 left-0 bg-white flex flex-col'>
            <div className='flex py-1 mb-3 items-center  shadow-lg px-4'>
                <div onClick={() => setOpenServices(false)} className='h-8 w-4 flex items-center justify-center text-3xl'>x</div>
                <div className='w-full text-center text-xl font-semibold text-greenVE-600'>{Titulo}</div>
            </div>
            <div className='flex flex-col overflow-y-auto pb-10 px-4'>
                <label className='text-xl font-semibold'>Servicios del alojamiento</label>
                {
                    Incluye.length > 0
                        ? <>
                            <label className='text-lg font-semibold mt-3'>Incluye:</label>
                            {
                                Incluye.map((item) => (
                                    <div className='flex gap-1 items-center'>
                                        <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                        <div className='w-11/12'>{item.Titulo}</div>
                                    </div>
                                ))
                            }
                        </>
                        : <></>
                }
                {
                    NoIncluye.length > 0
                        ? <>
                            <label className='text-lg font-semibold mt-3'>No incluye:</label>
                            {
                                NoIncluye.map((item) => (
                                    <div className='flex gap-1 items-center'>
                                        <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                        <div className='w-11/12'>{item.Titulo}</div>
                                    </div>
                                ))
                            }
                        </>
                        : <></>
                }
                {
                    Restricciones.length > 0
                        ? <>
                            <label className='text-lg font-semibold mt-3'>No incluye:</label>
                            {
                                Restricciones.map((item) => (
                                    <div className='flex gap-1 items-center'>
                                        <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                        <div className='w-11/12'>{item.Titulo}</div>
                                    </div>
                                ))
                            }
                        </>
                        : <></>
                }
                {
                    SistemaServicios.length > 0
                        ? <>
                            <label className='text-lg font-semibold mt-3'>No incluye:</label>
                            {
                                SistemaServicios.map((item) => (
                                    <div className='flex gap-1 items-center'>
                                        <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                        <div className='w-11/12'>{item.Titulo}</div>
                                    </div>
                                ))
                            }
                        </>
                        : <></>
                }
            </div>

        </div>
    );
};

export default HotelServices;