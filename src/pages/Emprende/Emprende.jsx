import React, { Suspense, useEffect, useState } from 'react';
import Navbar from '../../components/global_components/navbar/Navbar';
import Footer from '../../components/global_components/footer/Footer';

const Emprende = () => {
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
      <Suspense><Navbar activo={1}/></Suspense>
        
            <iframe src='https://www.visitaecuador.com/contacto/#emprende' className='w-full h-[850px]'/>
        <Footer/>
        </>
    );
};

export default Emprende;