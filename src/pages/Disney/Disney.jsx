import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";

const Disney=()=>{
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
                ?<NavbarMobile/>
                :<Navbar activo={2}/>
            }
                <iframe
                    src="https://visitaecuador.com/disney"
                    width="100%"
                    height="2800px"
                >
                </iframe>
            <Footer></Footer>
        </div>
    );
}
export default  Disney;