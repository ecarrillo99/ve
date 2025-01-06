import React, { Suspense, useEffect, useState } from 'react';
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';
import Navbar from '../../components/global_components/navbar/Navbar';
import Footer from '../../components/global_components/footer/Footer';

const Remate = () => {
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
    return (
        <>
        {
            isMobile
            ?<Suspense><NavbarMobile activo={1}/></Suspense>
            :<Suspense><Navbar activo={1}/></Suspense>
        }
        <div className='flex justify-center'>
            <iframe src='https://www.visitaecuador.com/ve/ofertas_remate.php' className='w-[955px] h-[1100px]'/>
        </div>
        <Footer/>
        </>
    );
};

export default Remate;