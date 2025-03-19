import React from 'react';

const Smart = () => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-[#9bca72]">SMART - Sistema de Membresías y Administración de Reservas Turísticas</h2>
            <div className="border-l-4 border-[#9bca72] pl-4">
                <p className="text-gray-700 mb-4">
                    Es nuestro producto estrella, por medio del mismo podemos publicar en nuestro portal web las ofertas de: hospedaje, alimentación, aventura, transporte, artesanías. Estas ofertas están disponibles en nuestro portal para el publico en general y para las personas socias del Club Visita Ecuador.

                    Cuando usted firma el contrato con nuestra empresa, obtiene un usuario y una clave para acceder a nuestro portal web,mediante la cual usted sube las ofertas, las modifica, las elimina o las cambia, de la misma manera se procede para las ofertas del Club Visita Ecuador.

                    Este programa tiene un costo anual desde US. 600.00 más IVA, dependiendo la tarifa rack del hotel, el mismo puede ser cancelado de contado, con tres cheques o con tarjeta de crédito a 6 meses sin intereses (VISA/ MASTERCARD/ PACIFCARD/ AMEX- Banco del Pichincha, Banco del Pacífico, Banco de Guayaquil y Banco del Austro); más de 06 meses se aplicará recargo con los intereses respectivos por planes diferidos.
                </p>

                <h3 className="text-xl font-medium text-gray-800 mb-2">El paquete completo del SMART incluye::</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#f4f9ef] p-4 rounded-md">
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>Búsqueda inteligente de alojamientos y servicios</li>
                            <li>Promoción y difusión de ofertas turísticas a través del Club Visita Ecuador.</li>
                            <li>Promoción y difusión a través de listas de bases especializadas de Visita Ecuador (tres envíos masivos SIM)</li>
                            <li>Suscripción institucional del Club Visita Ecuador</li>
                            <li>Activación de iconos en la búsqueda detallada de hoteles en el Web Visita Ecuador.</li>

                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Beneficios del Sistema SMART</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-[#9bca72] flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-1">Eficiencia</h4>
                        <p className="text-center text-gray-700 text-sm">Automatización de procesos que ahorra tiempo y recursos</p>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-[#9bca72] flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-1">Confiabilidad</h4>
                        <p className="text-center text-gray-700 text-sm">Sistema seguro con respaldo y verificación de todas las transacciones</p>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-[#9bca72] flex items-center justify-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-1">Adaptabilidad</h4>
                        <p className="text-center text-gray-700 text-sm">Se ajusta a las necesidades específicas de cada usuario y establecimiento</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Smart;
