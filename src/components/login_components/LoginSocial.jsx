import { useState } from "react";
import Icons from "../../global/icons";
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import {auth} from '../../firebase'
import encodePass from "../../global/encodePass";
import Config from "../../global/config";
import { loginRemote } from "../../controllers/suscripcion/suscripcionController";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";



const icons=new Icons
const LoginSocial=()=>{
    const gProvider = new GoogleAuthProvider();
    const fProvider = new FacebookAuthProvider();
    const navigate =useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleClickGoogle=()=>{
        signInWithPopup(auth, gProvider).then(async (result)=>{
            setIsLoading(true);
            const user = result.user;
            try{
                const random = () => Math.floor(Math.random() * 100);
                const randomStr = Array.from({ length: 7 }, () => random()).join('');
                const username = user.displayName ?? ('usuario' + randomStr.substring(0, 6));
                const email = user.email??'';
                var id = user.uid??randomStr;
                var pass = encodePass(email);
                if (email.trim() === '') {
                    setIsLoading(false)
                    alert("Correo inválido, intente con otra cuenta")
                    return;
                }
                const params={
                    "id": id,
                    "pass": pass,
                    "servicio": Config.SERVICIO,
                    "metodo": Config.METODO_EX_GO,
                    "username": username, 
                    "nombre": username,
                    "email": email,
                    "id_servicio": Config.IDSERVICIO,
                    "id_metodo": Config.IDMETODO_EX_GO,
                }
                console.log(params)
                try {
                    await loginRemote(params)
                        .then((result) => {
                            setIsLoading(false)
                            console.log(result)
                            if(result){
                                navigate(-1)
                            }else{
                                setIsLoading(false)
                                alert("Ha ocurrido un error, intente nuevamente")
                            }
                        })
                        .catch((error) => { console.log(error) })
    
                } catch (error) {
                    setIsLoading(false)
                    console.error("Error:", error);
                }
            }catch(e){

            }
        }).catch((error) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
          });
    }

    const handleClickFacebook=()=>{
        signInWithPopup(auth, fProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;

                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }

    return(
        <div className="flex flex-col items-center justify-center gap-4 ">
            <h1 className="text-center w-1/2 font-bold text-greenVE-700 text-xl ">PRUEBA GRATIS CON:</h1>
            <div className="flex gap-8 items-center justify-center">
                {
                    isLoading
                    ?<Spinner color="blue" className="text-greenVE-300"></Spinner>
                    :<a onClick={()=>handleClickGoogle()} dangerouslySetInnerHTML={{ __html: icons.Data['LoginGoogle'] }} className='border-2 p-2 rounded-md hover:border-greenVE-500' />
                }
                
                <a onClick={()=>handleClickFacebook()} dangerouslySetInnerHTML={{ __html: icons.Data['LoginFacebook'] }} className='border-2 p-2 rounded-md hover:border-greenVE-500' />
            </div>
            <h1 className="text-center w-1/2 font-bold text-greenVE-700 text-xl ">Ó</h1>
            <button className="bg-greenVE-500 px-4 py-1 rounded-md text-white w-1/2">Adquirir Suscripción</button>
        </div>
    )
}
export default LoginSocial;