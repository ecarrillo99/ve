const AboutBanner = () => {
    return (
        <div className="bg-slate-100 pb-3">
            <div className="flex mx-auto max-w-6xl sm:px-6 lg:px-8 ">
            <div className="flex items-center justify-center mw-8/12">
                <div>
                    <h2 className="text-lg text-greenTitle font-semibold">La plataforma de reservas hoteleras más importante del Ecuador.</h2>
                    <p className="text-xs text-black pt-3 ">Ofrecemos una suscripción actual para que hombres de negocio, viajeros y familias que gusten llegar a los hoteles más importantes del país
                        obtengan los mejores precios certificados en sus reservas de hoteles top, cuando Booking.com y otras plataformas del mundo cobran hasta el doble por el mismo servicio.</p>
                    <h3 className="text-xs font-bold pt-7">Un ejemplo de nuestras ofertas*:</h3>
                    <p className="text-xs pt-2">Tryp by Wyndham en Guayaquil:</p>
                    <p className="text-xs pt-1">2 DÍAS, 1 NOCHE para 2 ADULTOS, 2 NIÑOS</p>
                    <div className="grid grid-cols-2 mx-auto pt-5">
                        <div>
                            <h4 className="font-semibold text-center text-sm">VisitaEcuador.com</h4>
                            <h4 className="font-semibold text-center text-4xl text-greenVE-500">$82</h4>
                            <h4 className="font-bold text-center text-greenVE-500 text-xs">INCLUYE DESAYUNO</h4>
                            <h4 className="font-bold text-center text-lg text-greenVE-500">E IMPUESTOS</h4>
                        </div> 
                        <div>
                            <h4 className="font-semibold text-center text-sm">Booking.com</h4>
                            <h4  className="font-semibold text-center text-4xl text-gray-500 line-through decoration-red-600 decoration-8">$250</h4>
                            <h4 className="font-bold text-center text-gray-500 text-xs">INCLUYE DESAYUNO</h4>
                            <h4 className="font-bold text-center text-l gtext-gray-500">E IMPUESTOS</h4>
                        </div>
                    </div>
                    <h4 className=" text-xxxs text-center">*Oferta bajo disponibilidad del hotel. :: Precios comparativos tomados de la web al 14 - Agt - 2023.</h4>
                </div>
            </div>
            <div className="md:w-4/12">
            <img src="./img/web/comparation.png" style={{width: "180px", height: "auto"}} className="mx-auto pt-7" />
            </div>
        </div>
        </div>
        

    )
}

export default AboutBanner;