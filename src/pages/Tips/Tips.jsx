import React, { useEffect, useState, lazy, Suspense } from 'react';
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';

const Navbar = lazy(() => import("../../components/global_components/navbar/Navbar"));
const Footer = lazy(() => import("../../components/global_components/footer/Footer"));
const Beneficios = lazy(() => import("../../components/tips/beneficios"));
const contactos = ["593963764220", "593984952637"];

const Tips = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil
    
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

      const handleOnClick = () => {
        const contacto = contactos[Math.floor(Math.random() * contactos.length)];
        const path = "https://wa.me/" + contacto
        window.open(path, '_blank')
      }
    return (
        <div>
            {
        isMobile
        ?<Suspense><NavbarMobile activo={1}/></Suspense>
        :<Suspense><Navbar activo={1}/></Suspense>
      }
            <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
                <img className='-mt-6 mb-2' src="https://visitaecuador.com/img/web/banner_tips.png" alt="" />
                <div className='flex flex-col items-center mb-5'>
                    <label className="text-2xl font-semibold ">Te asiste en tus viajes</label>
                    <button className="bg-greenVE-600 text-white rounded-full px-4 py-2 mt-4 flex items-center gap-2" onClick={()=>handleOnClick()}>
                        <span className="icon-[mdi--whatsapp]"></span>
                        CHATEA AHORA
                    </button>
                </div>
                <Suspense><Beneficios /></Suspense>
                <div className='flex flex-col items-center mt-10'>
                    <button className="bg-greenVE-600 text-white rounded-full px-4 py-2 mt-4 flex items-center gap-2" onClick={()=>handleOnClick()}>
                        <span className="icon-[mdi--whatsapp]"></span>
                        CHATEA AHORA
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Tips;