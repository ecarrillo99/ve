const AppBanner = () => {
    return(
        <div className="bg-cover bg-center h-auto" style={{ backgroundImage: "url('./img/app_banner_image.jpg')" }}>
            <div className=" grid grid-cols-2 mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 ">
                <div ></div>
                <div className="flex items-center justify-center">
                    <div>
                        <h2 className=" text-3xl text-white font-semibold">Más de 500 ofertas hoteleras.</h2>
                        <h4 className="items-center text-base text-white font-semibold">Descárgate la aplicación y haz tu prueba gratuita.</h4>
                        <h4 className="items-center text-base text-white font-semibold">¡Realiza tu Primera reserva hoy!</h4>
                        <img alt="" src="./img/qr_app.png" style={{width: "150px", height: "auto"}} className="mx-auto border-8 border-white mt-3"/>
                        <div className="grid grid-cols-2 pb-5 pt-2">
                            <div className="flex items-center justify-end mr-1">
                                <a target="_blank" href="https://apps.apple.com/ec/app/visitaecuador-com/id1385161516" rel="noreferrer" >
                                    <img alt="" src="./img/astore.png" style={{width: "150px", height: "auto"}} />
                                </a>
                            </div>
                            <div className="flex items-center justify-start ml-1">
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.visitaEcuador" rel="noreferrer">
                                    <img alt="" src="./img/gplay.png" style={{width: "150px", height: "auto"}} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppBanner;