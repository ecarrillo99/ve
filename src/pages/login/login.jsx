import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import LoginNormal from "../../components/login_components/LoginNormal";
import LoginSocial from "../../components/login_components/LoginSocial";
import ResetPassword from "./Reset_password";
import { sessionStatus } from "../../global/util";
import { Navigate } from "react-router-dom";

const Login = () => {
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
        !sessionStatus()?
        <div className="h-screen">
           <Navbar activo={6}/>
            
            <div className="flex flex-col md:mx-auto md:my-28 md:max-w-6xl py-6 md:flex-row md:px-6 lg:px-8 items-center">
                <div className="w-full md:w-1/2 border-r md:border-r-2 mb-4 md:mb-0">
                    <LoginNormal></LoginNormal>
                </div>
                <div className="w-full md:w-1/2">
                    <LoginSocial></LoginSocial>
                </div>
            </div>
            <Footer></Footer>
        </div>
        :(
            <Navigate to="/"/>
        )
    )
}

export default Login;