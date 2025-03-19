import React from 'react';

const ServiciosSubmenu = () => {
    return (
<div>
        <a href="#" className="inline-block w-full h-48 ">
            <img
                src="https://www.visitaecuador.com/ve/img/contenido/informacion/top_visa_servicios.jpg"
                alt="Google Play"
                className="rounded-lg   w-11/12 h-48"
            />
        </a>
    <h3 className="text-2xl font-semibold text-[#98b7e5] mt-2 mb-5">Servicios de la Tarjeta</h3>

    <ul className="list-disc pl-5 space-y-2 text-gray-700">
        <li>Avances en Efectivo por un valor correspondiente al 60% de su cupo disponible. En caso de necesitar
            incrementar este valor debe solicitar en Servicio al Cliente. (Aplican Restricciones).
        </li>
        <li>Diferido de Consumos Corrientes y del Exterior desde 3 hasta 36 meses plazo.</li>
        <li>Oportunidad de solicitar tarjetas adicionales sin costo y con cupo asignado por el titular a padre, madre,
            cónyuge, hijos, familiares en cualquier grado de consanguinidad ó afinidad, amigo/a, empleado/a.
        </li>
        <li>Usted tendrá opción a realizar pagos de totales sin cargos adicionales o pagos de mínimos para su mayor
            comodidad.
        </li>
        <li>Centro de atención 24 horas todos los días del año.</li>
        <li>800.000 cajeros automáticos de la Red Plus a nivel mundial y cajeros de la Red Apoyo.</li>
    </ul>
</div>
)
}

export default ServiciosSubmenu;
