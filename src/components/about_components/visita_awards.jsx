import React from 'react';

const VisitaAwards = () => {

    const videoId = "HRIlNXHOmEs";
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-[#c993c9]">VisitaEcuador Awards</h2>
            <div className="border-l-4 border-[#c993c9] pl-4">
                <p className="text-gray-700 mb-4">
                    Estos galardones se han convertido en un sello de calidad reconocido en el
                    sector turístico del país. Los ganadores son seleccionados mediante un riguroso proceso que combina
                    las valoraciones de los usuarios, evaluaciones de expertos y estándares de calidad internacionales.
                </p>

                <h3 className="text-xl font-medium text-gray-800 mb-2">Mira el video que preparamos:</h3>

                <div className="relative overflow-hidden pb-56 h-80">
                    <iframe
                        className="absolute top-0 left-0 w-5/6 h-72 border-0 ml-16 mt-5"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Como reservar por nuestra APP"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

            </div>

            <div className="mt-4">
                <h3 className="text-xl font-medium text-gray-800 mb-3">Beneficios para los ganadores</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="#c993c9" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-1">Reconocimiento</h4>
                        <p className="text-gray-700">Sello oficial de calidad VisitaEcuador Awards para exhibir en el establecimiento y utilizar en materiales promocionales</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#c993c9" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-1">Visibilidad</h4>
                        <p className="text-gray-700">Promoción destacada en la plataforma VisitaEcuador, redes sociales y eventos de turismo nacionales e internacionales</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#c993c9" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-800 mb-1">Prestigio</h4>
                        <p className="text-gray-700">Diferenciación frente a la competencia y aumento de credibilidad ante clientes potenciales</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-[#f9f2f9] p-4 rounded-md">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Gala Anual de Premiación</h3>
                <p className="text-gray-700">
                    La ceremonia de entrega de los VisitaEcuador Awards se realiza cada año en un evento exclusivo que reúne a los principales actores del sector turístico del país. La gala se ha convertido en un referente de la industria y una oportunidad única para el networking entre profesionales del turismo.
                </p>
                <div className="mt-4 flex justify-center">
                    <button className="bg-[#c993c9] text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-all">
                        Conoce a los ganadores anteriores
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VisitaAwards;
