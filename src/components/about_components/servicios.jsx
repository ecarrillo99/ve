import React from 'react';

const Servicios = () => {
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#0c4677] mb-4">Servicios</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
                <p className="mb-6">
                    En VisitaEcuador nos especializamos en ofrecer soluciones integrales para potenciar su experiencia
                    turística en todo el país. Nuestros servicios están diseñados para satisfacer las necesidades tanto
                    de viajeros individuales como de empresas.
                </p>
                <p>
                    Más de 120 proveedores de servicios turísticos, hoteleros y de transporte a nivel nacional forma
                    parte de la variada oferta que ofrece el CLUB DE VIAJES VISITA ECUADOR. Cadenas Hoteleras y
                    mayoristas en la gestión de VISITA ECUADOR
                </p>

                <a href="#" className="inline-block w-11/12 h-96 ml-12 mt-5 mb-5 ">
                    <img
                        src="https://www.visitaecuador.com/ve/img/contenido/informacion/servicios.jpg"
                        alt="Google Play"
                        className="rounded-lg border border-gray-300 w-11/12 h-96"
                    />
                </a>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="border border-[#7accc7] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-[#7accc7] mb-3">Servicios para viajeros</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Reservas de hospedaje:</span> Acceso a más de 200
                                    hoteles y hosterías con tarifas preferenciales.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Reservas en restaurantes:</span> Descuentos exclusivos
                                    en los mejores establecimientos gastronómicos.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Tours y experiencias:</span> Paquetes turísticos
                                    personalizados en todas las regiones de Ecuador.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Transporte:</span> Coordinación de traslados y
                                    servicio de renta de vehículos.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Asistencia al viajero:</span> Soporte 24/7 durante
                                    toda su estancia.
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="border border-[#7accc7] rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-[#7accc7] mb-3">Servicios para empresas</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Viajes corporativos:</span> Gestión de hospedaje y
                                    transporte para ejecutivos.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Eventos empresariales:</span> Organización de
                                    convenciones, retiros y actividades de team building.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Incentivos:</span> Programas de motivación para
                                    colaboradores basados en experiencias turísticas.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Marketing turístico:</span> Estrategias promocionales
                                    para destinos y establecimientos.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="text-[#7accc7] mr-2">•</div>
                                <div>
                                    <span className="font-medium">Consultoría:</span> Asesoramiento especializado para
                                    proyectos turísticos.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-[#0c4677] mb-3">Servicios especializados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
                        <div className="text-[#7accc7] text-3xl mb-2">
                            <i className="fas fa-camera"></i>
                        </div>
                        <h4 className="font-medium mb-2">Fotografía turística</h4>
                        <p className="text-sm text-gray-600">
                            Servicio profesional para capturar los mejores momentos de su viaje o documentar
                            instalaciones turísticas.
                        </p>
                    </div>
                    <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
                        <div className="text-[#7accc7] text-3xl mb-2">
                            <i className="fas fa-globe"></i>
                        </div>
                        <h4 className="font-medium mb-2">Turismo educativo</h4>
                        <p className="text-sm text-gray-600">
                            Programas especiales para instituciones educativas con enfoque en aprendizaje y recreación.
                        </p>
                    </div>
                    <div className="bg-[#f5f5f5] p-4 rounded-lg text-center">
                        <div className="text-[#7accc7] text-3xl mb-2">
                            <i className="fas fa-heart"></i>
                        </div>
                        <h4 className="font-medium mb-2">Lunas de miel</h4>
                        <p className="text-sm text-gray-600">
                            Experiencias románticas personalizadas en los destinos más cautivadores de Ecuador.
                        </p>
                    </div>
                </div>

                <div className="bg-[#e6f7f6] p-4 rounded-lg mt-6">
                    <h4 className="font-semibold text-[#0c4677] mb-2">¿Necesita un servicio personalizado?</h4>
                    <p className="mb-4">
                        Nuestro equipo de expertos está disponible para diseñar una solución que se ajuste perfectamente
                        a sus necesidades específicas.
                    </p>
                    <div className="flex justify-end">
                        <button className="bg-[#7accc7] text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
                            Contactar a un asesor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Servicios;
