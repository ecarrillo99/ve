const AboutBanner = () => {
    return (

        <div className=" grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 ">
            <div class="flex items-center justify-center">
                <div>
                    <h2 className="text-2xl text-greenTitle font-semibold">La plataforma de reservas hoteleras más importante del Ecuador.</h2>
                    <p className="text-base text-black pt-3 ">Ofrecemos una suscripción actual para que hombres de negocio, viajeros y familias que gusten llegar a los hoteles más importantes del país
                        obtengan los mejores precios certificados en sus reservas de hoteles top, cuando Booking.com y otras plataformas del mundo cobran hasta el doble por el mismo servicio.</p>
                    <h3 className="text-base font-bold pt-7">Un ejemplo de nuestras ofertas*:</h3>
                    <p className="text-base pt-2">Tryp by Wyndham en Guayaquil:</p>
                    <p className="text-xs pt-1">2 DÍAS, 1 NOCHE para 2 ADULTOS, 2 NIÑOS</p>
                    <div class="grid grid-cols-2 mx-auto pt-5">
                        <div>
                            <h4 className="font-semibold text-center">VisitaEcuador.com</h4>
                            <h4 className="font-semibold text-center text-7xl text-greenVE-500">$82</h4>
                            <h4 className="font-bold text-center text-greenVE-500">INCLUYE DESAYUNO</h4>
                            <h4 className="font-bold text-center text-2xl text-greenVE-500">E IMPUESTOS</h4>
                        </div>
                        <div>
                            <h4 className="font-semibold text-center ">Booking.com</h4>
                            <h4  className="font-semibold text-center text-7xl text-gray-500 line-through decoration-red-600 decoration-8">$250</h4>
                            <h4 className="font-bold text-center text-gray-500">INCLUYE DESAYUNO</h4>
                            <h4 className="font-bold text-center text-2xl text-gray-500">E IMPUESTOS</h4>
                        </div>
                    </div>
                    <h4 className=" text-xxs text-center">*Oferta bajo disponibilidad del hotel. :: Precios comparativos tomados de la web al 14 - Agt - 2023.</h4>
                </div>
            </div>
            <img src="/img/comparation.png" style={{width: "300px", height: "auto"}} class="mx-auto pt-7"/>
        </div>

    )
}

export default AboutBanner;