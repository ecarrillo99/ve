import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const ListadoHoteles = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

    const [expandedCategories, setExpandedCategories] = useState({
        Nacionales: true,
        Internacionales: true
    });

    const toggleCategory = (category) => {
        setExpandedCategories({
            ...expandedCategories,
            [category]: !expandedCategories[category]
        });
    };

    const hotelData = {
        Nacionales: {
            color: "#6aaa45",
            locations: [
                {
                    nombre: "Azuay",
                    establecimientos: [
                        { nombre: "Zahir By Wyndham", ciudad: "Cuenca", ofertas: 4, amenities: true },
                        { nombre: "Hotel San Andrés", ciudad: "Cuenca", ofertas: 4, amenities: true },
                        { nombre: "Morenica del Rosario", ciudad: "Cuenca", ofertas: 4, amenities: true },
                        { nombre: "Mansión Alcázar Boutique Hotel", ciudad: "Cuenca", ofertas: 3, amenities: true },
                        { nombre: "El Dorado Hotel", ciudad: "Cuenca", ofertas: 5, amenities: true },
                        { nombre: "Sheraton Cuenca", ciudad: "Cuenca", ofertas: 7, amenities: true },
                    ],
                    totalOfertas: 31
                },
                {
                    nombre: "Chimborazo",
                    establecimientos: [
                        { nombre: "Hostería Hacienda La Andaluza", ciudad: "Riobamba", ofertas: 5, amenities: true }
                    ],
                    totalOfertas: 5
                },
                {
                    nombre: "El Oro",
                    establecimientos: [
                        { nombre: "Oro Machala Resort Spa", ciudad: "Machala", ofertas: 3, amenities: true },
                        { nombre: "Oro Machala By Oro Verde Hotels", ciudad: "Machala", ofertas: 4, amenities: true }
                    ],
                    totalOfertas: 7
                },
                {
                    nombre: "Esmeraldas",
                    establecimientos: [
                        { nombre: "Hotel Playa Verde", ciudad: "Esmeraldas", ofertas: 10, amenities: true },
                        { nombre: "Campestre Hotel", ciudad: "Tonsupa", ofertas: 8, amenities: true }
                    ],
                    totalOfertas: 18
                },
                {
                    nombre: "Galápagos",
                    establecimientos: [
                        { nombre: "Piedras Blancas Lodge", ciudad: "Puerto Ayora", ofertas: 5, amenities: true }
                    ],
                    totalOfertas: 5
                },
                {
                    nombre: "Guayas",
                    establecimientos: [
                        { nombre: "Sheraton Guayaquil", ciudad: "Guayaquil", ofertas: 6, amenities: true },
                        { nombre: "DoubleTree by Hilton", ciudad: "Guayaquil", ofertas: 5, amenities: true },
                        { nombre: "Hotel Palace", ciudad: "Guayaquil", ofertas: 5, amenities: true },
                        { nombre: "Sonesta Hotel & Residences", ciudad: "Guayaquil", ofertas: 4, amenities: true },
                        { nombre: "Spa By Wyndham Guayaquil", ciudad: "Guayaquil", ofertas: 5, amenities: true },
                        { nombre: "Hotel Wyndham Garden Guayaquil", ciudad: "Guayaquil", ofertas: 4, amenities: true },
                        { nombre: "Hm Hotel Internacional", ciudad: "Guayaquil", ofertas: 3, amenities: true },
                        { nombre: "Hotel Wyndham Guayaquil Puerto Santa Ana", ciudad: "Guayaquil", ofertas: 4, amenities: true },
                        { nombre: "Riverside Hotel Guayaquil", ciudad: "Guayaquil", ofertas: 2, amenities: true }
                    ],
                    totalOfertas: 37
                },
                {
                    nombre: "Imbabura",
                    establecimientos: [
                        { nombre: "Hacienda Cusín San Miguel", ciudad: "Yacucalle", ofertas: 4, amenities: true }
                    ],
                    totalOfertas: 4
                },
                {
                    nombre: "Loja",
                    establecimientos: [
                        { nombre: "Hotel Agua Marina", ciudad: "Catamayo", ofertas: 4, amenities: true },
                        { nombre: "Grand Victoria Boutique Hotel", ciudad: "Loja", ofertas: 4, amenities: true }
                    ],
                    totalOfertas: 8
                }
            ]
        },
        Internacionales: {
            color: "#f18e1e",
            locations: [
                {
                    nombre: "Perú",
                    establecimientos: [
                        { nombre: "Casa Andina Premium Valle Sagrado Hotel Y", ciudad: "Cusco", ofertas: 3, amenities: true },
                        { nombre: "Hotel Spa", ciudad: "Cusco", ofertas: 3, amenities: true },
                        { nombre: "Casa Andina Standard Cusco Plaza", ciudad: "Cusco", ofertas: 3, amenities: true },
                        { nombre: "Casa Andina Premium Cusco", ciudad: "Cusco", ofertas: 3, amenities: true },
                        { nombre: "Casa Andina Standard Cusco San Blas", ciudad: "Cusco", ofertas: 3, amenities: true }
                    ],
                    totalOfertas: 15
                },
                {
                    nombre: "Lima",
                    establecimientos: [
                        { nombre: "Casa Andina Standard Chiclayo", ciudad: "Lima", ofertas: 4, amenities: true },
                        { nombre: "Casa Andina Premium Miraflores", ciudad: "Lima", ofertas: 3, amenities: true },
                        { nombre: "Casa Andina Standard San Antonio", ciudad: "Lima", ofertas: 3, amenities: true },
                        { nombre: "Casa Andina Premium San Isidro", ciudad: "Lima", ofertas: 3, amenities: true },
                        { nombre: "Casa Andina Select Miraflores Centro", ciudad: "Lima", ofertas: 3, amenities: true }
                    ],
                    totalOfertas: 16
                },
                {
                    nombre: "Nazca",
                    establecimientos: [
                        { nombre: "Casa Andina Standard Nazca", ciudad: "Nazca", ofertas: 3, amenities: true }
                    ],
                    totalOfertas: 3
                },
                {
                    nombre: "Puno",
                    establecimientos: [
                        { nombre: "Casa Andina Standard Puno", ciudad: "Puno", ofertas: 3, amenities: true },
                        { nombre: "Casa Andina Premium Puno", ciudad: "Puno", ofertas: 3, amenities: true }
                    ],
                    totalOfertas: 6
                },
                {
                    nombre: "Tambos",
                    establecimientos: [
                        { nombre: "Casa Andina Select Zorritos Tumbes", ciudad: "Tambos", ofertas: 3, amenities: true }
                    ],
                    totalOfertas: 3
                },
                {
                    nombre: "Urubamba",
                    establecimientos: [
                        { nombre: "Casa Andina Select Pucallpa", ciudad: "Pucallpa", ofertas: 3, amenities: true }
                    ],
                    totalOfertas: 3
                },
                {
                    nombre: "Machu Picchu",
                    establecimientos: [
                        { nombre: "Casa Andina Standard Machu Picchu", ciudad: "Machu Picchu", ofertas: 3, amenities: true }
                    ],
                    totalOfertas: 3
                }
            ]
        }
    };

    const calculateTotalOfertas = (data) => {
        let total = 0;
        data.locations.forEach(location => {
            total += location.totalOfertas;
        });
        return total;
    };

    return (
        <div className="flex flex-col gap-4 max-w-5xl mx-auto">

            <a href="#" className="inline-block w-full h-48 ml-5 ">
                <img
                    src="https://www.visitaecuador.com/ve/img/contenido/informacion/listado_logo-hoteles.jpg"
                    alt="Google Play"
                    className="rounded-lg   w-11/12 h-48"
                />
            </a>

            <h2 className="text-2xl font-bold text-[#c993c9]">Listado de Hoteles</h2>

            <div className="flex flex-col gap-3">
                <p className="text-gray-700">
                    En VisitaEcuador contamos con el catálogo más completo de hospedaje en Ecuador. Nuestra red incluye
                    241 Ofertas de 64 Establecimientos en 26 Ciudades en 2 Paises, desde lujosos hoteles 5 estrellas
                    hasta acogedores hostales y hosterías en cada rincón del Ecuador.
                </p>

                {/* Nacionales Section */}
                <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                    <div
                        className="bg-[#c993c9] text-white p-2 text-center font-medium cursor-pointer "
                        onClick={() => toggleCategory('Nacionales')}
                    >
                        Nacionales
                    </div>

                    {expandedCategories.Nacionales && (
                        <div className="mt-2">
                            {hotelData.Nacionales.locations.map((location, locationIndex) => (
                                <div key={`nacional-${locationIndex}`} className="border-t border-gray-200">
                                    <div className="bg-[#f8f8f8] p-2 font-medium text-[#c993c9]">
                                        {location.nombre}
                                    </div>
                                    <div className="px-2">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="text-sm text-gray-600">
                                                <th className="text-left py-1">Establecimiento</th>
                                                <th className="text-left py-1">Ciudad</th>
                                                <th className="text-center py-1">Ofertas</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {location.establecimientos.map((hotel, hotelIndex) => (
                                                <tr key={`nacional-hotel-${locationIndex}-${hotelIndex}`}
                                                    className="border-t border-gray-100">
                                                    <td className="py-1">
                                                        <div className="flex items-center">
                                                            <span>{hotel.nombre}</span>
                                                            {hotel.amenities && <span className="ml-1">🌟</span>}
                                                        </div>
                                                    </td>
                                                    <td className="py-1">{hotel.ciudad}</td>
                                                    <td className="py-1 text-center">{hotel.ofertas}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                            <tfoot>
                                            <tr className="bg-[#f8f8f8] font-medium">
                                                <td colSpan="2" className="py-1 text-right">Total {location.nombre}:
                                                </td>
                                                <td className="py-1 text-center">{location.totalOfertas}</td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-[#f8f8f8] p-2 font-medium text-right">
                                Total Ofertas: {calculateTotalOfertas(hotelData.Nacionales)}
                            </div>
                        </div>
                    )}
                </div>

                {/* Internacionales Section */}
                <div className="mt-4 border border-gray-200 rounded-md overflow-hidden">
                    <div
                        className="bg-[#c993c9] text-white p-2 text-center font-medium cursor-pointer"
                        onClick={() => toggleCategory('Internacionales')}
                    >
                        Internacionales
                    </div>

                    {expandedCategories.Internacionales && (
                        <div className="mt-2">
                            {hotelData.Internacionales.locations.map((location, locationIndex) => (
                                <div key={`internacional-${locationIndex}`} className="border-t border-gray-200">
                                    <div className="bg-gray-50 text-[#c993c9] p-2 font-medium">
                                        {location.nombre}
                                    </div>
                                    <div className="px-2">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="text-sm text-gray-600">
                                                <th className="text-left py-1">Establecimiento</th>
                                                <th className="text-left py-1">Ciudad</th>
                                                <th className="text-center py-1">Ofertas</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {location.establecimientos.map((hotel, hotelIndex) => (
                                                <tr key={`internacional-hotel-${locationIndex}-${hotelIndex}`}
                                                    className="border-t border-gray-100">
                                                    <td className="py-1">
                                                        <div className="flex items-center">
                                                            <span>{hotel.nombre}</span>
                                                            {hotel.amenities && <span className="ml-1">🌟</span>}
                                                        </div>
                                                    </td>
                                                    <td className="py-1">{hotel.ciudad}</td>
                                                    <td className="py-1 text-center">{hotel.ofertas}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                            <tfoot>
                                            <tr className="bg-[#f8f8f8] font-medium">
                                                <td colSpan="2" className="py-1 text-right">Total {location.nombre}:
                                                </td>
                                                <td className="py-1 text-center">{location.totalOfertas}</td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-[#f8f8f8] p-2 font-medium text-right">
                                Total Ofertas: {calculateTotalOfertas(hotelData.Internacionales)}
                            </div>
                        </div>
                    )}
                </div>


                <div className="flex justify-center mt-4">
                    <button
                        className="bg-[#c993c9] text-white py-2 px-6 rounded-full hover:bg-opacity-90 transition-all"
                        onClick={handleClick}>
                        Explorar Hoteles
                    </button>
                </div>

                <p className="text-sm text-gray-500 mt-3 text-center">
                    * Precios especiales y beneficios exclusivos para miembros del Club VisitaEcuador
                </p>
            </div>
        </div>
    );
};

export default ListadoHoteles;
