import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VideoCard from '../about_components/aboutSubmenu_components/Testimonios/VideoCard';

const TestimoniosVideos = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const testimonios = [
        {
            id: 1,
            nombre: "Fabian Castro",
            ciudad: "Atacames",
            rating: 5,
            hotelNombre: "Hotel Cielo Azul",
            youtubeUrl: "https://youtu.be/o39Ua8ywfAo"
        },
        {
            id: 2,
            nombre: "Ivan Mora",
            ciudad: "Riobamba",
            rating: 4,
            hotelNombre: "Hotel Casa Real",
            youtubeUrl: "https://youtu.be/2o7yoBcLDks"
        },
        {
            id: 3,
            nombre: "Eduardo Gonzalez",
            ciudad: "Bahia de Caraquez",
            rating: 5,
            hotelNombre: "Hotel Casa Ceibo",
            youtubeUrl: "https://youtu.be/z4UfFqjNrRE"
        },
        {
            id: 4,
            nombre: "Victor Gonzales",
            ciudad: "Atacames",
            rating: 5,
            hotelNombre: "Hotel Belamare",
            youtubeUrl: "https://youtu.be/CoYPOq7GXLk"
        },
        {
            id: 5,
            nombre: "Santiago Espinoza",
            ciudad: "Loja",
            rating: 4,
            hotelNombre: "Holiday Inn Guayaquil",
            youtubeUrl: "https://youtu.be/npydNukVkxU"
        },
        {
            id: 6,
            nombre: "Robert Aguilar",
            ciudad: "Salinas",
            rating: 5,
            hotelNombre: "Barceló Colon Miramar",
            youtubeUrl: "https://youtu.be/BowAKvsD5qE"
        },
        {
            id: 7,
            nombre: "Nancy Cevallos",
            ciudad: "Quevedo",
            rating: 5,
            hotelNombre: "Crespotel Hotel Boutique",
            youtubeUrl: "https://youtu.be/Xmc0Ix4vzoQ"
        },
        {
            id: 8,
            nombre: "Catalina Larriva",
            ciudad: "Tonsupa",
            rating: 4,
            hotelNombre: "Club Resort del Pacífico",
            youtubeUrl: "https://youtu.be/kBQfnN8Ua4k"
        },
        {
            id: 9,
            nombre: "Diego Vazquez",
            ciudad: "Quito",
            rating: 5,
            hotelNombre: "Anahi Boutique Hotel",
            youtubeUrl: "https://youtu.be/z-Id-zkq5CE"
        },
        {
            id: 10,
            nombre: "Maria E Rodriguez",
            ciudad: "Loja",
            rating: 4,
            hotelNombre: "Howard Johnson de Loja",
            youtubeUrl: "https://youtu.be/tpZHeMxEMlk"
        },
        {
            id: 11,
            nombre: "Maria G Falcones",
            ciudad: "Atacames",
            rating: 5,
            hotelNombre: "El Marques Hotel",
            youtubeUrl: "https://youtu.be/Kv6RkpJH7qw"
        },
        {
            id: 12,
            nombre: "Luis Fernando Pozo",
            ciudad: "Arenillas",
            rating: 5,
            hotelNombre: "Hillary Nature Resort & Spa",
            youtubeUrl: "https://youtu.be/4kGt6aM38o4"
        },
        {
            id: 13,
            nombre: "Alba Patricia Parra",
            ciudad: "Guayaquil",
            rating: 5,
            hotelNombre: "Holiday Inn ",
            youtubeUrl: "https://youtu.be/zA13A9rQlS4"
        },
        {
            id: 14,
            nombre: "Edwin Velasco",
            ciudad: "Santo Domingo",
            rating: 4,
            hotelNombre: "Grand Hotel Santo Domingo ",
            youtubeUrl: "https://youtu.be/fFsRquMg4kQ"
        },
        {
            id: 15,
            nombre: "Veronica Macas",
            ciudad: "Guayaquil",
            rating: 5,
            hotelNombre: "Howard Johnson ",
            youtubeUrl: "https://youtu.be/pJ_Swi95Vgc"
        },
        {
            id: 16,
            nombre: "Juan Carlo Salazar",
            ciudad: "Quito",
            rating: 5,
            hotelNombre: "Hotel Reina Isabel",
            youtubeUrl: "https://youtu.be/b45MLS9aKs0"
        },
        {
            id: 17,
            nombre: "Fernando Jara",
            ciudad: "Entrevista",
            hotelNombre: "Visita Ecuador",
            youtubeUrl: "https://youtu.be/xv_nuCke4Po"
        },
        {
            id: 18,
            nombre: "Rafael Maya Jacome",
            ciudad: "Quito",
            rating: 5,
            hotelNombre: "Hotel Best Westerm",
            youtubeUrl: "https://youtu.be/4ArPMoBIICI"
        },
        {
            id: 19,
            nombre: "Rafael Maya Jacome",
            ciudad: "Quito",
            rating: 5,
            hotelNombre: "Hotel Best Westerm",
            youtubeUrl: "https://youtu.be/YXQo6PgHkho"
        },
        {
            id: 20,
            nombre: "Edison Astudillo",
            ciudad: "Ambato",
            rating: 5,
            hotelNombre: "Mary Carmen Hotel",
            youtubeUrl: "https://youtu.be/j6PVKEOwTxc"
        },
        {
            id: 21,
            nombre: "Jacinto Cordero Espinoza",
            ciudad: "Macas",
            rating: 4,
            hotelNombre: "Hosteria Farallon",
            youtubeUrl: "https://youtu.be/Up1bcqbIKcE"
        },
        {
            id: 22,
            nombre: "Maximiliano Ochoa",
            ciudad: "Vilcabamba",
            rating: 5,
            hotelNombre: "Descanso del Toro Hosteria",
            youtubeUrl: "https://youtu.be/mR11PT5hq0Q"
        },
        {
            id: 23,
            nombre: "Maximiliano Ochoa",
            ciudad: "Guayaquil",
            rating: 4,
            hotelNombre: "Hotel Sonestia ",
            youtubeUrl: "https://youtu.be/YplWJQQLOnw"
        },
        {
            id: 24,
            nombre: "Edison Astudillo",
            ciudad: "Guayaquil",
            rating: 5,
            hotelNombre: "Sheraton Hotel ",
            youtubeUrl: "https://youtu.be/-tqZ8MiyL1k"
        },
        {
            id: 25,
            nombre: "Jacinto Cordero Espinoza",
            ciudad: "Ayampe",
            rating: 5,
            hotelNombre: "Hotel Wyndham",
            youtubeUrl: "https://youtu.be/cRDNsmsaM_g"
        },
        {
            id: 26,
            nombre: "Carlos Maridueña",
            ciudad: "Manta",
            rating: 4,
            hotelNombre: "Hotel Oro Verde",
            youtubeUrl: "https://youtu.be/lVVD2slbMTA"
        },
        {
            id: 27,
            nombre: "Francisco Ampuero",
            ciudad: "Guayaquil",
            rating: 5,
            hotelNombre: "La Mirage Garden Hotel & Spa",
            youtubeUrl: "https://youtu.be/0LZO41aUnL8"
        },
        {
            id: 28,
            nombre: "Veronica Briseño",
            ciudad: "Cuenca",
            rating: 5,
            hotelNombre: "Oro Verde Hotel",
            youtubeUrl: "https://youtu.be/dO6o5tMTLsg"
        },
        {
            id: 29,
            nombre: "Edison Astudillo",
            ciudad: "Guayaquil",
            rating: 4,
            hotelNombre: "Grand Hotel Guayaquil ",
            youtubeUrl: "https://youtu.be/HaVJOwB3-sg"
        },
        {
            id: 30,
            nombre: "Maximiliano Ochoa",
            ciudad: "Loja",
            rating: 5,
            hotelNombre: "Howard Johnson de Loja",
            youtubeUrl: "https://youtu.be/I8STdezxaEY"
        },
        {
            id: 31,
            nombre: "Edison Astudillo",
            ciudad: "Guayaquil",
            rating: 4,
            hotelNombre: "Holiday Inn ",
            youtubeUrl: "https://youtu.be/ct9eZwqq4sI"
        },
        {
            id: 32,
            nombre: "Marcela Cisneros",
            ciudad: "Quito",
            rating: 5,
            hotelNombre: "Hotel Best Westerm",
            youtubeUrl: "https://youtu.be/eqnv5dUZrrc"
        },
        {
            id: 33,
            nombre: "Francisco Ampuero",
            ciudad: "Machala",
            rating: 5,
            hotelNombre: "Hotel Veuxor",
            youtubeUrl: "https://youtu.be/8MYiQVUz8_Y"
        },
        {
            id: 34,
            nombre: "Carlos Maridueña",
            ciudad: "Manta",
            rating: 4,
            hotelNombre: "MantaHost Hotel",
            youtubeUrl: "https://youtu.be/aCqlL4S6w9w"
        },
        {
            id: 35,
            nombre: "Edison Astudillo",
            ciudad: "Salinas",
            rating: 4.5,
            hotelNombre: "Hotel Barcelo Colon Miramar",
            youtubeUrl: "https://youtu.be/H_yzQ3IL7to"
        },
        {
            id: 36,
            nombre: "Fernando Astudillo",
            ciudad: "Loja",
            rating: 4.5,
            hotelNombre: "Hotel Sonesta",
            youtubeUrl: "https://youtu.be/xX2MhzYjwYs"
        },
        {
            id: 37,
            nombre: "Teresa Cordero",
            ciudad: "Cuenca",
            rating: 4.5,
            hotelNombre: "Hotel Wyndham",
            youtubeUrl: "https://youtu.be/hB28E9kTJ9M"
        },
        {
            id: 38,
            nombre: "Teresa Cordero",
            ciudad: "Quito",
            rating: 5,
            hotelNombre: "Descanso del Toro Hosteria",
            youtubeUrl: "https://youtu.be/RlLB-EaFxh4"
        },
        {
            id: 39,
            nombre: "Maximiliano Ochoa",
            ciudad: "Manta",
            rating: 5,
            hotelNombre: "Hosteria Farallon",
            youtubeUrl: "https://youtu.be/OHgwbs0BpBk"
        },
        {
            id: 40,
            nombre: "Veronica Briseño",
            ciudad: "Loja",
            rating: 5,
            hotelNombre: "Howard Johnson",
            youtubeUrl: "https://youtu.be/2BgRTCNjHQE"
        },
        {
            id: 41,
            nombre: "Veronica Briseño",
            ciudad: "Guayaquil",
            rating: 5,
            hotelNombre: "Sheraton Hotel ",
            youtubeUrl: "https://youtu.be/cMbwVHJ063M"
        },
        {
            id: 42,
            nombre: "Veronica Briseño",
            ciudad: "Quito",
            rating: 5,
            hotelNombre: "Hotel Best Westerm",
            youtubeUrl: "https://youtu.be/kna90Xi0sfE"
        },
        {
            id: 43,
            nombre: "Edison Astudillo",
            ciudad: "Manta",
            rating: 5,
            hotelNombre: "Hotel Oro Verde",
            youtubeUrl: "https://youtu.be/Btq5Pja6A3k"
        },
        {
            id: 44,
            nombre: "Maximiliano Ochoa",
            ciudad: "Guayaquil",
            rating: 5,
            hotelNombre: "Howard Johnson",
            youtubeUrl: "https://youtu.be/FpH2VNXhj5c"
        }
    ];

    const itemsPerPage = 4;
    const pageCount = Math.ceil(testimonios.length / itemsPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : prev));
    };

    const currentTestimonios = testimonios.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div className=" py-10 px-4 md:px-8 rounded-xl shadow-lg">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-red-400">
                        Videos <span className="text-red-400">Testimoniales</span>
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className={`p-2 rounded-full ${currentPage === 0 ? 'text-gray-400 bg-gray-100' : 'text-white bg-red-400 hover:bg-blue-200'}`}
                            aria-label="Página anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === pageCount - 1}
                            className={`p-2 rounded-full ${currentPage === pageCount - 1 ? 'text-gray-400 bg-gray-100' : 'text-white bg-red-400 hover:bg-gray-200'}`}
                            aria-label="Página siguiente"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {currentTestimonios.map(video => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-flex space-x-2">
                        {Array.from({ length: pageCount }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`w-3 h-3 rounded-full ${currentPage === index ? 'bg-red-400' : 'bg-gray-200'}`}
                                aria-label={`Ir a página ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimoniosVideos;
