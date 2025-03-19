import React, { useState } from 'react';

const Prensa = () => {
    const [activeTab, setActiveTab] = useState('revistas');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const revistas = [
        {
            id: 1,
            title: 'Revista Negocios',
            date: 'Noviembre 2018',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/RevistaNegocios-Nov2018.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/RevistaNegocios-Nov2018-org.jpg'
        },
        {
            id: 2,
            title: 'Líderes',
            date: 'Octubre 2015',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/Lideres_02Nov2015.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/Lideres_02Nov2015-org.jpg'
        },
        {
            id: 3,
            title: 'Zona Libre',
            date: 'Septiembre 2014',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/VE-ZonaLibre.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/VE-ZonaLibre-org.jpg'
        },
        {
            id: 4,
            title: 'La Revista',
            date: 'Septiembre 2014',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/LaRevista-Oct2014.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/LaRevista-Oct2014-org.jpg'
        }
    ];

    const diarios = [
        {
            id: 1,
            title: 'Expreso',
            date: '9 de Septiembre 2014',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/Expreso_09Sept214.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/Expreso_09Sept214-org.jpg'
        },
        {
            id: 2,
            title: 'PoliNoticias',
            date: 'Octubre 2014',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/Polinoticias_Oct2014.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/Polinoticias_Oct2014-org.jpg'
        },
        {
            id: 3,
            title: 'PP el Verdadero',
            date: '14 de Septiembre 2014',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/TurismoExpress-PP.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/TurismoExpress-PP-org.jpg'
        },
        {
            id: 4,
            title: 'Telégrafo',
            date: '6 de Septiembre 2014',
            image: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/VE-Telegrafo.jpg',
            fullImage: 'https://www.visitaecuador.com/ve/img/contenido/informacion/prensa/VE-Telegrafo-org.jpg',
            downloadable: true
        }
    ];

    const openModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => setSelectedItem(null), 300);
    };

    const renderList = (items) => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => openModal(item)}
                    >
                        <div className="p-2">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover rounded"
                            />
                        </div>
                        <div className="p-4 text-center border-t">
                            <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.date}</p>

                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Prensa</h1>

            <div className="mb-6">
                <div className="flex border-b border-gray-200">
                    <button
                        className={`py-2 px-4 font-medium text-lg ${activeTab === 'revistas' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-teal-500'}`}
                        onClick={() => setActiveTab('revistas')}
                    >
                        Revistas
                    </button>
                    <button
                        className={`py-2 px-4 font-medium text-lg ${activeTab === 'diarios' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-teal-500'}`}
                        onClick={() => setActiveTab('diarios')}
                    >
                        Diarios
                    </button>
                </div>
            </div>

            <div className="mt-6">
                {activeTab === 'revistas' ? renderList(revistas) : renderList(diarios)}
            </div>


            {modalOpen && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-auto">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">{selectedItem.title} - {selectedItem.date}</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <img
                                src={selectedItem.fullImage}
                                alt={selectedItem.title}
                                className="w-full h-auto rounded"
                            />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Prensa;
