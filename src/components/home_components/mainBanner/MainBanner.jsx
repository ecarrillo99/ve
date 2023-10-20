const MainBanner = () => {
    return(
        <div className="bg-cover bg-center h-auto" style={{ backgroundImage: "url('/img/main_banner_background.jpg')" }}>
            <div className=" grid grid-cols-2 mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 ">
                <div class="flex items-center justify-center">
                    <div>
                        <img src="/img/ve_logo.svg" style={{width: "200px", height: "auto"}} class="mx-auto" />
                        <h2 className="items-center text-4xl text-white font-semibold">En hoteles top, el mejor<br/>precio certificado.<br/><span className="border-b-4 border-white">Pero en serio.</span></h2>
                        <img src="/img/ve_best_price.svg" style={{width: "100px", height: "auto"}} class="mx-auto pt-7"/>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MainBanner;