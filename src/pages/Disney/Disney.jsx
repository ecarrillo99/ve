import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";

const Disney = () => {
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

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {isMobile ? <NavbarMobile activo={2}/> : <Navbar activo={2}/>}

            <main className="flex-grow">
                <div className="bg-gray-200 py-6 px-4 mb-8">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                        <h2 className="text-lg md:text-2xl font-bold text-black mb-4 md:mb-0">
                            ¿Quieres probar Disney Concierge?
                        </h2>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6  rounded h-8">
                            Inicia sesión o regístrate
                        </button>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 mb-12">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-8 md:mb-0 text-center">
                            <img
                                src="https://visitaecuador.com/disney/img/concierge.svg"
                                alt="Disney Destinations Concierge"
                                className="h-40 ml-16 "
                            />
                            <h2 className="text-2xl md:text-2xl font-bold text-pink-500 mt-4">
                                ¿Qué es Disney Concierge?
                            </h2>

                            <div className="mt-6 relative w-full aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                                        <div
                                            className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white ml-1"></div>
                                    </div>
                                </div>
                                <img
                                    src="https://youtu.be/nRKULJdN7hg"
                                    className="w-full opacity-50"
                                />
                            </div>
                        </div>

                        <div className="md:w-1/2 md:pl-8">
                            <p className="text-lg mb-6">
                                Disney Concierge existe para ahorrarte tiempo y brindarte la mejor experiencia en tu
                                primer, segundo o
                                enésimo viaje a los parques y cruceros de Disney.
                            </p>

                            <p className="text-lg mb-6">
                                Es un sistema para planear tu mágico viaje a medida de tus necesidades por los
                                diferentes destinos
                                y actividades maravillosas que Disney ofrece. La atención es totalmente personalizada y
                                en ESPAÑOL.
                            </p>

                            <p className="text-lg">
                                Te atenderá un Magic Planner que te acompaña antes, durante y después de tu viaje
                                asistiéndote
                                con todos los tips necesarios para que tu tiempo en Disney y el de tu familia sea
                                realmente inolvidable.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-pink-50 py-10">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-pink-600 bg-white border-2 border-pink-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <div className="font-bold">Disponibles</div>
                                <div className="font-bold">24/7</div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-pink-600 bg-white border-2 border-pink-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                    </svg>
                                </div>
                                <div className="font-bold">+50</div>
                                <div className="font-bold">Magic Planner</div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-pink-600 bg-white border-2 border-pink-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                                    </svg>
                                </div>
                                <div className="font-bold">Hablamos en</div>
                                <div className="font-bold">Español</div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-pink-600 bg-white border-2 border-pink-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                                    </svg>
                                </div>
                                <div className="font-bold">Entradas</div>
                                <div className="font-bold">Tickets</div>
                            </div>

                            <div className="flex flex-col items-center">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-pink-600 bg-white border-2 border-pink-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                                    </svg>
                                </div>
                                <div className="font-bold">Hospedaje</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-pink-50  mx-auto px-10 py-16 mt-10">

                    <h2 className="text-2xl font-bold text-center text-pink-500 mb-8 ">
                        ¿Cómo utilizar Disney Concierge?
                    </h2>

                    <p className="text-lg mb-6 mr-16 ml-16">
                        Busca en Play Store o App Store la aplicación de Club Visita, descárgala, <span
                        className="text-blue-500">adquiere tu suscripción</span> e ingresa tu usuario y tu clave, en la
                        parte inferior encuentras a Mickey, al hacer click podrás disfrutar del sistema de Disney
                        Concierge,
                        ingresa la fecha de tu viaje, la cantidad de adultos y de niños, las edades de los niños y vive
                        el
                        mágico mundo de Disney.
                    </p>

                </div>

                    <div className="max-w-6xl mx-auto px-4 py-16 ">
                        <div className="mt-12">
                            <h3 className="text-2xl font-bold text-center text-pink-500 mb-8">
                                Descarga la aplicación
                            </h3>

                            <div className="flex flex-col items-center">
                                <div className="mb-6 rounded-lg overflow-hidden">
                                    <img
                                        src="https://visitaecuador.com/disney/img/telefonos.jpeg"
                                        alt="App Disney Concierge"
                                        className="w-full max-w-md mx-auto"
                                    />
                                </div>

                                <p className="mb-2 text-center">
                                    Desde Google play o App Store, o simplemente escanea este código QR
                                </p>

                                <div className="flex flex-col items-center space-y-4 my-4">
                                    <div
                                        className="w-32 h-32 bg-white border border-gray-300 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-gray-900">
                                            <img
                                                src="https://visitaecuador.com/img/diseno/qrapp.png"
                                                alt="QR"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center space-y-2">
                                        <img
                                            src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png"
                                            alt="Google Play"
                                            className="h-10 w-35"
                                        />
                                        <img
                                            src="https://visitaecuador.com/img/diseno/app/appstore.svg"
                                            alt="App Store"
                                            className="h-7.5 w-25"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-8">
                        <div className="max-w-6xl mx-auto px-4">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-6 md:mb-0">
                                    <div className="text-white font-bold py-1 px-4 bg-pink-600 mb-2 inline-block">
                                        Disney Concierge
                                    </div> <br/>
                                    <div className="text-white font-bold py-1 px-4 bg-pink-600 mb-2 inline-block">
                                        es un beneficio más de VisitaEcuador
                                    </div> <br/>
                                    <div className="text-white font-bold py-1 px-4 bg-pink-600 inline-block">
                                        Compra nuestra suscripción y comienza a viajar!
                                    </div>
                                </div>

                                <div className="text-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold  px-6 rounded mb-4 w-full h-8">
                                        Comprar suscripción ahora!
                                    </button>

                                    <p className="text-white mb-2">Recuerda, si compras con un código promocional
                                        obtienes:</p>

                                    <div className="flex items-center mb-1 text-left">
                                        <div
                                            className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white"
                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M5 13l4 4L19 7"/>
                                            </svg>
                                        </div>
                                        <span className="text-white">44% de descuento.</span>
                                    </div>

                                    <div className="flex items-center text-left">
                                        <div
                                            className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white"
                                                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M5 13l4 4L19 7"/>
                                            </svg>
                                        </div>
                                        <span className="text-white">Doble de años en tu suscripción</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Disney;
