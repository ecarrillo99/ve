import React from 'react';

const TurismoExpress = () => {
    // Sample data for popular express tours
    const toursPopulares = [
        {
            nombre: "Salina Express",
            duracion: "3 días - 2 Noches  2 Adultos - 2 Niños",
            descripcion: "Visita las Salinas disfruta de sus playas y comida ."
        },
        {
            nombre: "Amazonía Aventura",
            duracion: "3 días",
            descripcion: "Explora la selva amazónica y conoce comunidades nativas."
        },
        {
            nombre: "Ruta del Volcán",
            duracion: "2 días",
            descripcion: "Recorre el Parque Nacional Cotopaxi y sus alrededores."
        }
    ];

    return (
        <div className="flex flex-col gap-4">
            <a href="#" className="inline-block w-full h-48 ml-5 ">
                <img
                    src="https://www.visitaecuador.com/ve/img/contenido/informacion/top-turismo-express.jpg"
                    alt="Google Play"
                    className="rounded-lg   w-11/12 h-48"
                />
            </a>
            <h2 className="text-2xl font-bold text-[#9bca72]">Turismo Express</h2>

            <div className="flex flex-col gap-3">
                <p className="text-gray-700">
                    Nuestro programa de Turismo Express está diseñado para viajeros con tiempo limitado que desean
                    conocer los principales atractivos de Ecuador de manera eficiente y organizada. Ofrecemos paquetes
                    cortos pero completos que maximizan la experiencia turística en pocos días.
                </p>

                <a href="#" className="inline-block w-full h-10/12 ml-5 ">
                    <img
                        src="https://www.visitaecuador.com/ve/img/contenido/informacion/visita-guayaquil.jpg"
                        alt="Google Play"
                        className="rounded-lg   w-11/12 h-10/12"
                    />
                </a>

                <div className="mt-5">
                    <h3 className="text-xl font-semibold text-[#9bca72]">Tours Más Populares</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        {toursPopulares.map((tour, index) => (
                            <div key={index} className="border border-[#9bca72] rounded-lg overflow-hidden">
                                <div className="py-2 px-4 bg-[#9bca72] text-white">
                                    <h4 className="font-medium flex justify-between">
                                        <span>{tour.nombre}</span>
                                        <span>{tour.duracion}</span>
                                    </h4>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-600">{tour.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default TurismoExpress;
