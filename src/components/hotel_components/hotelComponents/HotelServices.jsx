import React, { useState } from 'react';

const HotelServices = ({ Titulo, Incluye, NoIncluye, Restricciones, SistemaServicios, setOpenServices }) => {
    // Determinar si es versión modal (mobile) o inline (desktop)
    const isModal = setOpenServices !== undefined;
    const [openServicesModal, setOpenServicesModal] = useState(false);
    // Versión Modal Completa (Mobile)
    if (isModal) {
        return (
            <div className="w-full h-screen z-50 fixed top-0 left-0 bg-white flex flex-col">
                <div className="flex py-1 mb-3 items-center shadow-lg px-4">
                    <div onClick={() => setOpenServices(false)} className="h-8 w-4 flex items-center justify-center text-3xl">x</div>
                    <div className="w-full text-center text-xl font-semibold text-greenVE-600">{Titulo}</div>
                </div>
                <div className="flex flex-col overflow-y-auto pb-10 px-4">
                    <label className="text-xl font-semibold">Servicios del alojamiento</label>
                    {
                        Incluye?.length > 0
                            ? <>
                                <label className="text-lg font-semibold mt-3">Incluye:</label>
                                {
                                    Incluye.map((item, idx) => (
                                        <div key={idx} className="flex gap-1 items-center">
                                            <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                            <div className="w-11/12">{item.Titulo}</div>
                                        </div>
                                    ))
                                }
                            </>
                            : <></>
                    }
                    {
                        NoIncluye?.length > 0
                            ? <>
                                <label className="text-lg font-semibold mt-3">No incluye:</label>
                                {
                                    NoIncluye.map((item, idx) => (
                                        <div key={idx} className="flex gap-1 items-center">
                                            <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                            <div className="w-11/12">{item.Titulo}</div>
                                        </div>
                                    ))
                                }
                            </>
                            : <></>
                    }
                    {
                        Restricciones?.length > 0
                            ? <>
                                <label className="text-lg font-semibold mt-3">Restricciones:</label>
                                {
                                    Restricciones.map((item, idx) => (
                                        <div key={idx} className="flex gap-1 items-center">
                                            <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                            <div className="w-11/12">{item.Titulo}</div>
                                        </div>
                                    ))
                                }
                            </>
                            : <></>
                    }
                    {
                        SistemaServicios?.length > 0
                            ? <>
                                <label className="text-lg font-semibold mt-3">Sistema de servicios:</label>
                                {
                                    SistemaServicios.map((item, idx) => (
                                        <div key={idx} className="flex gap-1 items-center">
                                            <span className="icon-[material-symbols--check-small] text-greenVE-500 w-1/12 h-6"></span>
                                            <div className="w-11/12">{item.Titulo}</div>
                                        </div>
                                    ))
                                }
                            </>
                            : <></>
                    }
                </div>
            </div>
        );
    }

    // Versión Inline (Desktop) - Para HotelServicesMain


    return (
        <>
            <div className="p-3 border-y z-50">
                <label className="font-semibold">Servicios incluidos</label>
                <div className="flex gap-x-6 flex-wrap gap-y-2">
                    {
                        Incluye?.map((item, idx) => (
                            <div key={idx} className="flex gap-1 items-center">
                                <span className="icon-[material-symbols--check-small-rounded] h-5 w-5 text-greenVE-500"></span>
                                <label>{item.Titulo}</label>
                            </div>
                        ))
                    }
                </div>
                <button onClick={() => setOpenServicesModal(true)} className="mt-4 font-medium text-greenVE-500">
                    Ver todos los servicios
                </button>
            </div>

            {/* Modal cuando se hace click en "Ver todos los servicios" */}
            {
                openServicesModal && (
                    <HotelServices
                        Incluye={Incluye}
                        NoIncluye={NoIncluye}
                        Restricciones={Restricciones}
                        SistemaServicios={SistemaServicios}
                        Titulo={Titulo}
                        setOpenServices={setOpenServicesModal}
                    />
                )
            }
        </>
    );
};

export default HotelServices;