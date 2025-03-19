import React from 'react';

const ClubViajes = () => {
    const beneficios = [
        "Descuentos exclusivos en hoteles afiliados",
        "Ofertas especiales en restaurantes y atracciones",
        "Reservas prioritarias en temporadas altas",
        "Acumulación de puntos canjeables por estancias",
        "Programa de fidelización con recompensas por nivel",
        "Newsletter mensual con promociones exclusivas"
    ];

    const niveles = [
        {
            nombre: "Viajero",
            requisitos: "Nivel básico para nuevos miembros",
            beneficios: ["10% de descuento en hoteles", "5% de descuento en paquetes turísticos"]
        },
        {
            nombre: "Explorador",
            requisitos: "Después de 3 reservas completadas",
            beneficios: ["15% de descuento en hoteles", "10% de descuento en paquetes turísticos", "Check-in temprano"]
        },
        {
            nombre: "Aventurero",
            requisitos: "Después de 10 reservas completadas",
            beneficios: ["20% de descuento en hoteles", "15% de descuento en paquetes turísticos", "Check-in temprano y check-out tardío", "Upgrade de habitación (sujeto a disponibilidad)"]
        },
        {
            nombre: "VIP",
            requisitos: "Miembros con más de 20 reservas anuales",
            beneficios: ["25% de descuento en hoteles", "20% de descuento en paquetes turísticos", "Servicio de conserjería personalizado", "Acceso a eventos exclusivos", "Traslados gratuitos aeropuerto-hotel"]
        }
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-2 lg  ">
                <div className="lg:col-auto w-full">
                <h2 className="text-2xl font-bold text-[#9bca72] mb-4">Club de Viajes
                VisitaEcuador</h2>

                <p className="text-gray-700 mb-6">
                    En Noviembre del año 2007 nace la iniciativa de crear un Club de Viajes y red multinivel que
                    incorpora miembros a su red, con el objetivo de crear fuentes de ingreso y beneficiar a las familias
                    ecuatorianas, adquirir puntos acumulables y viajar gratis. La iniciativa del Club, trajo como
                    consecuencia que cientos de personas se vean interesadas en el tema, sin embargo, para que el
                    producto en realidad tenga EL BENEFICIO esperado debía tener un valor agregado; es así como se
                    consolida la idea inicial de AHORRO, e inicia la ardua labor de trabajar en forma directa con los
                    proveedores de servicios turísticos e incorporar nuevos, al sistema. Estos beneficios van hasta un
                    70% de ahorro en alojamiento fundamentalmente.

                    A la fecha somos más de 74.000 suscriptores y seguimos creciendo

                    Uno de los principales proyectos de Visita Ecuador para el 2013 es llegar con nuestra oferta de
                    servicios a países hermanos, apoyándonos en aliados estratégicos que crean y estén dispuestos a
                    llevar la marca en el corazón y así lograr claramente el liderazgo a nivel continental, soportado en
                    el crecimiento, expansión y evolución de nuestro negocio, el cual tiene una filosofía clara de
                    servicio basada en la responsabilidad y trabajo en equipo. www.clubvisita.com
                </p>

                <a href="#" className="inline-block w-full h-48  ">
                    <img
                        src="https://www.visitaecuador.com/ve/img/contenido/informacion/clubvisita-pagina.jpg"
                        alt="Google Play"
                        className="rounded-lg   w-full h-48"
                    />
                </a></div>
                <a href="#" className="inline-block w-10/12 h-full -mt-12 -mr-10 ">
                    <img
                        src="https://www.visitaecuador.com/ve/img/contenido/informacion/clubvisita-lateral.jpg"
                        alt="Google Play"
                        className="rounded-lg   w-full    h-full"
                    />
                </a>
            </div>
        </div>
    );
};

export default ClubViajes;
