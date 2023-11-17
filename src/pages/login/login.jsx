import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import LoginNormal from "../../components/login_components/LoginNormal";
import LoginSocial from "../../components/login_components/LoginSocial";

const Login = () => {
    return(
        <div className="h-screen">
            <Navbar></Navbar>
            <div className="flex mx-auto my-28 max-w-6xl py-6 sm:px-6 lg:px-8  items-center">
                <div className="w-1/2 border-r-2">
                    <LoginNormal></LoginNormal>
                </div>
                <div className="w-1/2">
                    <LoginSocial></LoginSocial>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Login;