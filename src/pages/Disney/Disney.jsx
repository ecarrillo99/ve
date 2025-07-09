import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";
import {useLocation} from "react-router-dom";

const Disney=()=>{
    const location = useLocation();
    const isExposedRoute = location.pathname === '/disney';
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
        <div>
            {
                isMobile
                ?<NavbarMobile activo={2}/>
                :<Navbar activo={2}/>
            }
                <iframe
                    src="https://disneyconcierge.app/"
                    width="100%"
                    height="1000px"
                >
                </iframe>
            {!isExposedRoute && (
            <Footer></Footer>
            )}
        </div>
    );
}
export default  Disney;
