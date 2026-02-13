import React, { Suspense, useEffect, useState } from 'react';
import Navbar from '../../components/global_components/navbar/Navbar';
import Footer from '../../components/global_components/footer/Footer';

const About = () => {
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
   <Suspense><Navbar activo={6}/></Suspense>
        
        <iframe src='https://visitaecuador.com/nosotros/' className='w-full h-[900px]'/>
        <Footer/>
        </>
    );
};

export default About;