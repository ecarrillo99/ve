import React from 'react';

const Beneficios = () => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold  text-[#9bca72]">Beneficios</h2>
            <div className="border-l-4 border-[#9bca72] pl-4">
                <p className="text-gray-700 mb-4">
                    Ser miembro del Club VisitaEcuador te ofrece una amplia gama de beneficios exclusivos diseñados para mejorar tu experiencia de viaje en Ecuador.
                </p>

                <h3 className="text-xl font-medium text-gray-800 mb-2">Beneficios principales:</h3>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                    <li>Descuentos exclusivos de hasta el 50% en hoteles, hostales, hosterías y resorts asociados en todo Ecuador</li>
                    <li>Precios preferenciales en tours, actividades y servicios turísticos</li>
                    <li>Acceso a promociones especiales y paquetes turísticos</li>
                    <li>Reservas prioritarias en temporadas altas</li>
                    <li>Atención personalizada a través de nuestra plataforma</li>
                    <li>Acumulación de puntos canjeables en futuras reservaciones</li>
                    <li>Boletín informativo con las mejores ofertas mensuales</li>
                    <li>Participación en eventos exclusivos para miembros</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-2">Ahorro garantizado:</h3>
                <p className="text-gray-700 mb-4">
                    Nuestra amplia red de establecimientos asociados te permite recuperar el valor de tu membresía en tan solo una o dos reservaciones. El ahorro acumulado durante el año de suscripción supera significativamente la inversión realizada.
                </p>

                <div className="bg-[#f4f9ef] p-4 rounded-md mb-4">
                    <h4 className="font-medium text-[#9bca72] mb-2">¿Cómo acceder a los beneficios?</h4>
                    <p className="text-gray-700">
                        Para disfrutar de todos los beneficios, simplemente activa tu membresía en nuestra plataforma o descarga nuestra aplicación móvil. Desde allí, podrás buscar, reservar y disfrutar de todas las ventajas que el Club VisitaEcuador tiene para ofrecer.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-medium text-[#9bca72] mb-2">Membresía Estándar</h3>
                    <ul className="text-gray-700 space-y-2">
                        <li>✓ Acceso a descuentos básicos</li>
                        <li>✓ Reservas en línea</li>
                        <li>✓ Soporte al cliente</li>
                        <li>✓ Duración: 1 año</li>
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-medium text-[#9bca72] mb-2">Membresía Premium</h3>
                    <ul className="text-gray-700 space-y-2">
                        <li>✓ Todos los beneficios estándar</li>
                        <li>✓ Descuentos mejorados</li>
                        <li>✓ Atención prioritaria</li>
                        <li>✓ Reservas anticipadas</li>
                        <li>✓ Beneficios exclusivos</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Beneficios;
