import React from 'react';

const VisaInternacional = () => {
    return (
        <div className="flex flex-col gap-4 "><a href="#" className="inline-block w-full h-48 ml-5 ">
            <img
                src="https://www.visitaecuador.com/ve/img/contenido/informacion/top-visa1.jpg"
                alt="Visas"
                className="rounded-lg border border-gray-300 w-11/12 h-48"
            />
        </a>
            <a href="#" className="inline-block w-full h-24 ml-14 bg-transparent  " style={{marginTop: "-15px"}}>
                <img
                    src="https://www.visitaecuador.com/ve/img/contenido/informacion/visa1.jpg"
                    alt="Targect"
                    className="rounded-lg  w-3/4 h-20 bg-transparent"
                />
            </a>
            <div className="flex flex-col gap-3 max-w-5xl mx-auto">

                <h2 className="text-2xl font-bold text-[#98b7e5]">Visa Internacional</h2>
                <p className="text-gray-700">
                    Con el antecedente de la inexistencia en el mercado de una tarjeta de crédito especializada en
                    turismo y viajes, VISITA ECUADOR, pensando en las necesidades de nuestros clientes y mercado
                    objetivo decidimos lanzar al mismo nuestra propia tarjeta de crédito, la cual brindará al público un
                    sin número de beneficios y a su vez facilitará la adquisición de nuestros productos.
                </p>

                <a href="#" className="inline-block w-full h-48 ml-10 ">
                    <img
                        src="https://www.visitaecuador.com/ve/img/contenido/informacion/visa2.jpg"
                        alt="Google Play"
                        className="rounded-lg   w-10/12 h-48"
                    />
                </a>
            </div>
        </div>
    );
};

export default VisaInternacional;
