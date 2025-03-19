import React, { Suspense, useEffect, useState } from 'react';
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';
import Navbar from '../../components/global_components/navbar/Navbar';
import Footer from '../../components/global_components/footer/Footer';

const About = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Establecer el estado inicial
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {isMobile
                ? <Suspense fallback={<div>Cargando...</div>}><NavbarMobile activo={1}/></Suspense>
                : <Suspense fallback={<div>Cargando...</div>}><Navbar activo={1}/></Suspense>
            }

            <main className="flex-grow">
                <div className="bg-blue-600 text-white py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nosotros</h1>
                        <p className="text-xl md:text-2xl max-w-2xl">
                            Descubre la visión, misión y el equipo detrás de Visita Ecuador,
                            tu guía definitiva para explorar las maravillas de Ecuador.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Nuestra Historia</h2>
                            <p className="text-gray-600 mb-4">
                                Visita Ecuador nació en 2015 con la misión de promover el turismo sostenible
                                en todas las regiones de Ecuador. Desde entonces, hemos ayudado a miles de
                                viajeros a descubrir las joyas escondidas de nuestro hermoso país.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Nuestro equipo está formado por apasionados expertos locales comprometidos
                                con ofrecer experiencias auténticas y respetuosas con las comunidades locales
                                y el medio ambiente.
                            </p>
                            <p className="text-gray-600">
                                Trabajamos en estrecha colaboración con operadores turísticos, hoteles y
                                restaurantes para garantizar que nuestros visitantes disfruten de lo mejor
                                que Ecuador tiene para ofrecer.
                            </p>
                        </div>
                        <div className="rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="/api/placeholder/600/400"
                                alt="Equipo de Visita Ecuador"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Mission & Vision */}
                <div className="bg-gray-100 py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold mb-4 text-blue-600">Nuestra Misión</h3>
                                <p className="text-gray-600">
                                    Promover un turismo responsable y sostenible que beneficie tanto a los
                                    visitantes como a las comunidades locales. Nos esforzamos por ofrecer
                                    información precisa y actualizada para que cada viajero pueda vivir una
                                    experiencia única y enriquecedora en Ecuador.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h3 className="text-2xl font-bold mb-4 text-blue-600">Nuestra Visión</h3>
                                <p className="text-gray-600">
                                    Convertirnos en la plataforma de referencia para el turismo en Ecuador,
                                    reconocida por nuestro compromiso con la sostenibilidad, la autenticidad
                                    y la excelencia en el servicio. Aspiramos a contribuir al desarrollo
                                    económico sostenible de todas las regiones del país.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Nuestro Equipo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((member) => (
                            <div key={member} className="text-center">
                                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
                                    <img
                                        src={`/api/placeholder/160/160`}
                                        alt={`Miembro del equipo ${member}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Nombre del Miembro</h3>
                                <p className="text-blue-600 mb-2">Cargo</p>
                                <p className="text-gray-600 max-w-xs mx-auto">
                                    Breve descripción sobre la experiencia y pasión por Ecuador de este
                                    miembro del equipo.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600 text-white py-12">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">¿Listo para explorar Ecuador?</h2>
                        <p className="text-xl max-w-2xl mx-auto mb-8">
                            Descubre destinos increíbles, planifica tu viaje y vive experiencias únicas
                            con nuestra ayuda.
                        </p>
                        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition duration-300">
                            Comenzar mi aventura
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default About;
