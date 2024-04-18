import React, { useEffect, useState } from 'react';
import Footer from '../../components/global_components/footer/Footer';
import Navbar from '../../components/global_components/navbar/Navbar';
import SuscripcionForm from '../../components/yaganaste_components/suscripcion_form';
import { sessionYaGanaste } from '../../global/util';
import { Navigate } from 'react-router-dom';
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';

const YaGanaste = () => {
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
    return sessionYaGanaste()?(
        <div className="h-screen">
            {
                isMobile
                ? <NavbarMobile/>
                : <Navbar/>
            }
            <SuscripcionForm></SuscripcionForm>
            <Footer></Footer>
        </div>
    ):(
        <Navigate to="/"/>
    );
};

export default YaGanaste;