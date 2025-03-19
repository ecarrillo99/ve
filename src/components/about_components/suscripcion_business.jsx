import React from 'react';

const SuscripcionBusiness = () => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-[#9bca72]">Suscripción VIP / Business</h2>
            <div className="border-l-4 border-[#9bca72] pl-4">
                <p className="text-gray-700 mb-4">
                    Duración de cinco años, los suscriptores tienen acceso al sistema de ofertas nacional, chárters a nivel internacional, una estadía de 2 DIAS 1 NOCHE para 2 adultos, reciben su kit Vip
                </p>

                <h3 className="text-xl font-medium text-gray-800 mb-2">Incluye:</h3>
                <ul className="list-disc pl-5 mb-4 text-gray-700">
                    <li>1 tarjeta Visita Ecuador + 1 adicional.</li>
                    <li>Acceso con usuario y clave única a través del internet.</li>
                    <li>Acceso a ofertas de fines de semana ilimitados, hasta un 70% ahorro en sus viajes.</li>
                    <li>Certificados fines de semana ilimitados.</li>
                    <li>Tarifa preferencial VisitaEcuador entre semana.</li>
                    <li>Paquetes de remate 2 al mes.</li>
                    <li>Ofertas internacionales ahorra 15%.</li>
                    <li>Chárter Ahorro 10%</li>
                    <li>Beneficios descuentos especiales en locales afiliados.</li>
                    <li>Emisión de certificados transferibles hasta primer grado de consanguinidad.</li>
                    <li>Certificados con promoción detallada.</li>
                    <li>Reservas directas con el proveedor de la promoción elegida.</li>
                    <li>Pago de la reserva al momento de obtener el beneficio.</li>
                    <li>Paquetes especiales para grupos.</li>
                    <li>Más de 300 promociones certificadas a nivel nacional en: Hospedaje / alimentación / transporte y más</li>

                </ul>

                <div className="bg-[#f4f9ef] p-4 rounded-md mb-4">
                    <h4 className="font-medium text-[#9bca72] mb-2">Teminos y Condiciones:</h4>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li>Acceso a descuentos exclusivos para uso personal y familiar</li>
                        <li>Para hacer la reservación le sugerimos comunicarse con 5 días de anticipación a nuestra central de reservas PBX. 07 4134500 EXT. 100, 112, 123 Y 124 , o al 1700 VISITA (847482) / reservas@visitaecuador.com.</li>
                        <li>Deben pagar el paquete promocional previo la utilización del mismo.</li>
                        <li>Por ningún concepto cancele esta cantidad a otra persona o empresa que no sea la prestadora del servicio descrito en el certificado.</li>
                        <li>Los beneficiarios aceptan cancelar los gastos extras que no estén especificados en los certificados.</li>
                        <li>Los certificados deslindan de toda responsabilidad a Visita Ecuador, el cumplimiento y el alcance del mismo estará a cargo del Hotel ofertado.</li>

                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-medium text-[#9bca72] mb-2">Plan Basic</h3>
                    <ul className="text-gray-700 space-y-2">
                        <li>✓ Hasta 25 beneficiarios</li>
                        <li>✓ Descuentos básicos</li>
                        <li>✓ Portal empresarial</li>
                        <li>✓ Soporte por email</li>
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4 border-2 border-[#9bca72]">
                    <h3 className="text-lg font-medium text-[#9bca72] mb-2">Plan Professional</h3>
                    <ul className="text-gray-700 space-y-2">
                        <li>✓ 25-100 beneficiarios</li>
                        <li>✓ Descuentos mejorados</li>
                        <li>✓ Portal personalizado</li>
                        <li>✓ Soporte prioritario</li>
                        <li>✓ Reportes trimestrales</li>
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-medium text-[#9bca72] mb-2">Plan Enterprise</h3>
                    <ul className="text-gray-700 space-y-2">
                        <li>✓ +100 beneficiarios</li>
                        <li>✓ Descuentos premium</li>
                        <li>✓ Portal personalizado</li>
                        <li>✓ Asesor dedicado</li>
                        <li>✓ Reportes mensuales</li>
                        <li>✓ Eventos exclusivos</li>
                    </ul>
                </div>
            </div>

            <div className="mt-6">
                <button className="bg-[#9bca72] text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-all">
                    Solicitar información
                </button>
            </div>
        </div>
    );
};

export default SuscripcionBusiness;
