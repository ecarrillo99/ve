import React from 'react';

const Enlaces = () => {
    const publicidadItems = [
        {
            id: 1,
            name: 'Quito Turismo',
            year: '2016',
            imageUrl: 'https://www.visitaecuador.com/ve/img/contenido/informacion/enlaces/quitoturismo1.jpg',
            link: '#'
        },
    ];

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-normal text-stone-800 mb-8">Enlaces</h2>

            <div className="mb-6">
                <h3 className="text-lg font-normal text-stone-800 mb-2">Publicidad</h3>
                <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-wrap gap-4">
                        {publicidadItems.map((item) => (
                            <div key={item.id} className="group">
                                <a href={item.link} className="block">
                                    <div className="border border-gray-200 p-2 w-48 h-40 flex items-center justify-center hover:shadow-md transition-shadow duration-200">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="max-w-full max-h-full"
                                        />
                                    </div>
                                    <div className="mt-2 text-center">
                                        <p className="text-sm text-blue-800">{item.name}</p>
                                        <p className="text-xs text-gray-600">{item.year}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enlaces;
