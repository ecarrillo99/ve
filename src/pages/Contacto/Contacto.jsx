import React, { Suspense, useEffect, useState } from 'react';
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';
import Navbar from '../../components/global_components/navbar/Navbar';
import Footer from '../../components/global_components/footer/Footer';

const Contacto = () => {
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
        <iframe src='https://visitaecuador.com/contacto/' className='w-full h-[900px]'/>
        <Footer/>
        </>
    );
};

export default Contacto;