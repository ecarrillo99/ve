import React from 'react';

const DescargarApp = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* App Header */}
            <h1 className="text-2xl font-semibold text-red-700">App</h1>
            <p className="text-gray-700 mb-8">Mira estos videos y entérate de nuestras ventajas.</p>

            {/* Download Section */}
            <h2 className="text-xl font-medium text-red-700 mb-2">Descarga nuestra app</h2>
            <p className="mb-4">Y llévanos a donde vayas</p>

            {/* Grid Layout for Download Section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 w-full">
                {/* Download Links & QR Code - Takes 1 column on mobile, 1 column on desktop */}
                <div className="flex flex-col gap-3">
                    {/* Google Play */}
                    <a href="#" className="inline-block w-32 ml-6 " >
                        <img
                            src="https://play.google.com/intl/en_us/badges/static/images/badges/es_badge_web_generic.png"
                            alt="Google Play"
                            className="rounded-lg border border-gray-300"
                        />
                    </a>

                    {/* App Store */}
                    <a href="#" className="inline-block w-56 px-7">
                        <img
                            src="https://visitaecuador.com/img/diseno/app/appstore.svg"
                            alt="App Store"
                            className="rounded-lg border border-gray-300"
                        />
                    </a>

                    {/* QR Code */}
                    <div className="mt-2 ml-10">
                        <img
                            src="https://visitaecuador.com/img/diseno/qrapp.png"
                            alt="QR Code"
                            className="border border-gray-300"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 ml-16">
                    <div className="relative overflow-hidden pb-56 h-0 w-96">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full border-0"
                            src="https://www.youtube.com/embed/VFjswE0are8?si=3jIR-C8zNrtr8Rhw"
                            title="Descarga la App Club Visita"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescargarApp;
