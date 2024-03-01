import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";

const Disney=()=>{
    return (
        <div>
            <Navbar activo={2}/>
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