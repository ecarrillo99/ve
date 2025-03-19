import React, {useEffect, useState} from 'react';
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";
import Navbar from "../../components/global_components/navbar/Navbar";
import Footer from "../../components/global_components/footer/Footer";

const YouTubeEmbed = ({ videoId, title }) => {
    return (
        <div className="aspect-w-16 aspect-h-9 mb-6">
            <iframe
                className="w-full h-64 rounded"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

const Appk = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const videoIds = {
        downloadApp: "QaL6cG4LCNU",
        howToReserve: "_xPNgNvS4wg",
        hotels: "81ah9YHS5JM"
    };

    return (
        <div className="flex flex-col min-h-screen bg-white" >
            {isMobile ? <NavbarMobile activo={2}/> : <Navbar activo={2}/>}

            <div className="bg-blue-200 py-12 px-32">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://visitaecuador.com/img/diseno/app/bannerapplp.png"
                            alt="App Screenshot"
                            className="max-w-full"
                        />
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-1 md:gap-0 px-32" style={{marginTop:"-100px"}}>
                        <h1><div className="text-lg"> Descarga nuestra app</div><br/> <div className="ml-5 mb-7 text-lg"  style={{marginTop:"-30px"}}>  llévanos a donde vayas</div></h1>
                        <p className="text-gray-700 mb-2">Todos nuestros servicios ahora desde tu teléfono</p>

                        <div className="flex flex-wrap gap-2 mb-2">
                            <a href="#" className="inline-block">
                                <img
                                    src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png"
                                    alt="Google Play"
                                    className="h-12 py-1 "
                                    style={{marginTop:"-4px"}}
                                />
                            </a>
                            <a href="#" className="inline-block">
                                <img
                                    src="https://visitaecuador.com/img/diseno/app/appstore.svg"
                                    alt="App Store"
                                    className="h-10 py-1 "
                                />
                            </a>
                        </div>

                        <div className="flex justify-start md:justify-center mr-36">
                            <img
                                src="https://visitaecuador.com/img/diseno/qrapp.png"
                                alt="QR Code"
                                className="h-32"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-96 md:w-1/3 ml-16 mb-8 md:mb-0 ">
                            <YouTubeEmbed
                                videoId={videoIds.downloadApp}
                                title="Descarga la app"
                            />
                        </div>
                        <div className="w-full md:w-1/2 md:pl-12">
                            <div className="flex items-center text-green-600 text-2xl font-semibold mb-4">
                                <span className="mr-2">📲</span>
                                <h2>Descarga la app</h2>
                            </div>
                            <p className="text-gray-600 mb-8">Rápido y fácil</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <div className="flex items-center text-green-600 text-2xl font-semibold mb-4">
                                <h2 className="ml-40" style={{marginRight:"-50px"}}>🏷️¿Cómo reservar?</h2>
                            </div>
                            <p className="text-gray-600 ml-40">En pocos pasos con nuestra app.</p>
                        </div>
                        <div className="w-96 md:w-1/3 mr-16">
                            <YouTubeEmbed
                                videoId={videoIds.howToReserve}
                                title="¿Cómo reservar?"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-96 md:w-1/3 ml-16 mb-8 md:mb-0">
                            <YouTubeEmbed
                                videoId={videoIds.hotels}
                                title="Hoteles 5 estrellas"
                            />
                        </div>
                        <div className="w-full md:w-1/2 md:pl-12">
                            <div className="flex items-center text-green-600 text-2xl font-semibold mb-4">
                                <span className="mr-2">⭐</span>
                                <h2>Hoteles 5 estrellas desde $85</h2>
                            </div>
                            <p className="text-gray-600">Nuestra tarifa estrella</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <div className="flex items-center text-green-600 text-2xl font-semibold mb-4 ml-40">
                                <span className="mr-2">🔍</span>
                                <h2>Búsqueda de ofertas</h2>
                            </div>
                            <p className="text-gray-600 ml-44">Elige el lugar o tu ubicación actual, y descubre nuevas ofertas.</p>
                        </div>
                        <div className="w-full md:w-1/2 md:pl-12 flex justify-center h-96">
                            <img
                                src="https://visitaecuador.com/img/diseno/app/busqueda.jpg"
                                alt="Búsqueda de ofertas"
                                className="max-w-xs rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center h-96">
                            <img
                                src="https://visitaecuador.com/img/diseno/app/mapa.jpg"
                                alt="Mapa"
                                className="max-w-xs rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="w-full md:w-2/3 md:pl-12">
                            <div className="flex items-center text-green-600 text-2xl font-semibold mb-4">
                                <span className="mr-2">🗺️</span>
                                <h2>Todo en un mapa</h2>
                            </div>
                            <p className="text-gray-600">Revisa todos los establecimientos disponibles en el mapa</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-2/3 mb-8 md:mb-0">
                            <div className="flex items-center text-green-600 text-2xl font-semibold mb-4 ml-40">
                                <span className="mr-2">👤</span>
                                <h2>Tu información</h2>
                            </div>
                            <p className="text-gray-600 ml-40">Mira la información de tu servicio, tu actividad.</p>
                        </div>
                        <div className="w-full md:w-1/3 md:pl-12 flex justify-center h-96">
                            <img
                                src="https://visitaecuador.com/img/diseno/app/perfil.jpg"
                                alt="Perfil de usuario"
                                className="max-w-xs rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Appk;
