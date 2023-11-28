import { useState } from "react";
import { loginRemote } from "../../controllers/suscripcion/suscripcionController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Config from "../../global/config";

const LoginNormal = () => {
    const [inputUser, setInputUser] = useState('');
    const handleInputUserChange = (event) => {
        setInputUser(event.target.value);
    };

    const [inputPass, setInputPass] = useState('');
    const handleInputPassChange = (event) => {
        setInputPass(event.target.value);
    };

    const [validUser, setValidUser] = useState(true)
    const [validPass, setValidPass] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isIncorrect, setIsIncorrect] = useState(false)

    const navigate =useNavigate()

    const handleClickLogin = () => {
        setIsIncorrect(false)
        inputPass == "" ? setValidPass(false) : setValidPass(true)
        inputUser == "" ? setValidUser(false) : setValidUser(true)
        if (inputPass != "" && inputUser != "" && !isLoading) {
            setIsLoading(true)
            const params={
                "id_metodo": Config.IDMETODO,
                "id_servicio": Config.IDSERVICIO,
                "id": inputUser,
                "pass": inputPass,
                "servicio": Config.SERVICIO,
                "metodo": Config.METODO,
              }
            try {
                loginRemote(params)
                    .then((result) => {
                        setIsLoading(false)
                        console.log(result)
                        if(result){
                            navigate(-1)
                        }else{
                            setIsIncorrect(true)
                        }
                    })
                    .catch((error) => { console.log(error) })

            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
    return (
        <div className="flex flex-col items-center justify-center gap-4 ">
            <h1 className="text-center w-1/2 font-bold text-greenVE-700 text-xl ">INICIAR SESIÓN</h1>
            <div className="flex justify-between w-1/2 items-center">
                <label className="text-left  font-semibold text-greenVE-700 text-lg -mb-4">Usuario</label>
                {
                    !validUser && <label className="text-left font-semibold text-red-500 text-xxs -mb-4">* Ingrese usuario</label>
                }
            </div>
            <input
                className="border-2 border-greenVE-500 rounded-md px-2 py-1 w-1/2"
                type="text"
                value={inputUser}
                onChange={handleInputUserChange}
                placeholder="Ingresar usuario" />
            <div className="flex justify-between w-1/2 items-center">
                <label className="text-left  font-semibold text-greenVE-700 text-lg -mb-4">Contraseña</label>
                {
                    !validPass && <label className="text-left font-semibold text-red-500 text-xxs -mb-4">* Ingrese contraseña</label>
                }
            </div>
            <input
                className="border-2 border-greenVE-500 rounded-md px-2 py-1 w-1/2"
                type="password"
                value={inputPass}
                onChange={handleInputPassChange}
                placeholder="Ingresar contraseña" />
            <button className="  py-1 rounded-md text-greenVE-500 w-1/2 text-right -m-2 text-sm">Olvidé mi contraseña</button>
            <button className="bg-greenVE-500 px-4 py-1 rounded-md text-white w-1/2 flex justify-center" onClick={() => handleClickLogin()}>
                {
                    isLoading
                        ? <Spinner color="white"></Spinner>
                        : <label className="cursor-pointer">Iniciar sesión</label>
                }
            </button>
            {
                isIncorrect && <label className="w-1/2 text-center font-semibold text-red-500 text-xs -mt-2">Revise sus datos e intente nuevamente</label>
            }
        </div>
    )
}
export default LoginNormal;