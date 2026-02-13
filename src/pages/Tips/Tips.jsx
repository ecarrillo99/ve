import React, { useEffect, useState, lazy, Suspense } from 'react';
import { getOperador } from '../../controllers/info/infoController';
import { set } from 'date-fns';


const Navbar = lazy(() => import("../../components/global_components/navbar/Navbar"));
const Footer = lazy(() => import("../../components/global_components/footer/Footer"));
const Beneficios = lazy(() => import("../../components/tips/beneficios"));

const Tips = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil

    var [operador, setOperador] = useState();
    
      useEffect(() => {
        getOperador().then((result)=>{
          setOperador(result);
        })
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        }
      }, []);

    const handleOnClick = () => {
        const path = "https://wa.me/" + operador.whatsapp
        window.open(path, '_blank')
      }
      
    return (
        <div>
       <Suspense><Navbar activo={0}/></Suspense>
      
            <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
                <img className='-mt-6 mb-2' src="https://visitaecuador.com/img/web/banner_tips.png" alt="" />
                {operador && (
                    <div className='flex flex-col items-center mb-5 justify-center ' >
                        <label className="text-2xl font-semibold  mx-10 text-center mt-5">Hola soy {operador.nombre} y te asistiré en tu viaje</label>
                        <div className='flex md:flex-row flex-col gap-10'>
                          <div className='flex animate-bounce mt-5' style={{ animationDuration: '3s', transform: 'translateY(-10px)' }}>
                            <img className='w-40 h-40 mt-4 relative left-10 top-1 cursor-pointer' src={operador.imagen} alt="" onClick={() => handleOnClick()} />
                            <button className="bg-greenVE-500 text-white rounded-full px-4 py-2 mt-20 flex items-center gap-2 h-10 pl-10" onClick={() => handleOnClick()}>
                                Chatea Conmigo
                                <span className="icon-[mdi--whatsapp]"></span>
                            </button>
                          </div>
                          <div className='flex flex-col gap-2 md:mt-0 -mt-12'>
                            <label className="text-xl font-semibold  mx-10 text-center mt-5">Consultame sobre:</label>
                            <div className="flex items-center ">
                                <span className="icon-[mdi--checkbox-marked-circle] text-greenVE-500 mr-2" ></span>
                                <label className="">Hoteles, destinos y tips</label>
                            </div>
                            <div className="flex items-center">
                                <span className="icon-[mdi--checkbox-marked-circle] text-greenVE-500 mr-2"></span>
                                <label className="">Realizar tu primera reserva</label>
                            </div>
                            <div className="flex items-center">
                                <span className="icon-[mdi--checkbox-marked-circle] text-greenVE-500 mr-2"></span>
                                <label >Adquirir tu suscripción</label>
                            </div>
                            <div className="flex items-center">
                                <span className="icon-[mdi--checkbox-marked-circle] text-greenVE-500 mr-2"></span>
                                <label >Y mucho más</label>
                            </div>
                          </div>
                        </div>
                    </div>
                )}
                <Suspense><Beneficios /></Suspense>
                <div className='flex flex-col items-center mt-10'>
                    <button className="bg-greenVE-500 text-white rounded-full px-4 py-2 mt-4 flex items-center gap-2" onClick={()=>handleOnClick()}>
                        <span className="icon-[mdi--whatsapp]"></span>
                        Chatea Conmigo
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Tips;