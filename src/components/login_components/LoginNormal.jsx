import { useState } from "react";
import { loginRemote } from "../../controllers/suscripcion/suscripcionController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Config from "../../global/config";
import ResetPassword from "../../pages/login/Reset_password";

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
    const [seePass, setSeePass]=useState(false)
    const [mensaje, setMensaje]=useState("");
    const [openReset, setOpenReset]= useState(false);

    const navigate = useNavigate()

    const handleClickLogin = () => {
        setIsIncorrect(false);
        setValidUser(inputUser !== "");
        setValidPass(inputPass !== "");

        if (inputUser && inputPass && !isLoading) {
            setIsLoading(true);
            const params = {
                "id_metodo": Config.IDMETODO,
                "id_servicio": Config.IDSERVICIO,
                "id": inputUser,
                "pass": inputPass,
                "servicio": Config.SERVICIO,
                "metodo": Config.METODO,
            };

            try {
                loginRemote(params)
                    .then((result) => {
                        setIsLoading(false);
                        if (result === true) {
                            navigate(-1);
                        } else {
                            setIsIncorrect(true);
                            setMensaje(result === false ? "Revise sus datos e intente nuevamente" : result);
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setIsLoading(false);
                    });
            } catch (error) {
                console.error("Error:", error);
                setIsLoading(false);
            }
        }
    };
    const verPass=()=>{
        setSeePass(!seePass)
    }

    const handleClickReset=()=>{
        setOpenReset(!openReset)
    }

    const handleClickCloseReset=()=>{
        setOpenReset(!openReset)
    }

    return (
        <>
            <ResetPassword isOpen={openReset} handleClickCloseReset={() => setOpenReset(!openReset)} />
            <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-center md:w-1/2 font-bold text-greenVE-700 text-xl">INICIAR SESIÓN</h1>

                <form
                    className="flex flex-col items-center gap-4 w-full"
                    onSubmit={(event) => {
                        event.preventDefault(); // Evita la recarga de página
                        handleClickLogin();
                    }}
                >
                    <div className="flex justify-between w-3/4 md:w-1/2 items-center">
                        <label className="text-left font-semibold text-greenVE-700 text-lg -mb-4">Usuario</label>
                        {!validUser && <label className="text-left font-semibold text-red-500 text-xxs -mb-4">* Ingrese usuario</label>}
                    </div>
                    <input
                        className="border-2 border-greenVE-500 rounded-md px-2 py-1 w-3/4 md:w-1/2 outline-none"
                        type="text"
                        value={inputUser}
                        onChange={(e) => setInputUser(e.target.value)}
                        placeholder="Ingresar usuario"
                    />

                    <div className="flex justify-between w-3/4 md:w-1/2 items-center">
                        <label className="text-left font-semibold text-greenVE-700 text-lg -mb-4">Contraseña</label>
                        {!validPass && <label className="text-left font-semibold text-red-500 text-xxs -mb-4">* Ingrese contraseña</label>}
                    </div>
                    <div className="border-2 border-greenVE-500 rounded-md px-2 py-1 w-3/4 md:w-1/2 flex h-9">
                        <input
                            className="rounded-md px-2 py-1 outline-none w-[90%]"
                            type={seePass ? "text" : "password"}
                            value={inputPass}
                            onChange={(e) => setInputPass(e.target.value)}
                            placeholder="Ingresar contraseña"
                        />
                        <div className="cursor-pointer" onClick={() => setSeePass(!seePass)}>
                            {seePass ? "🙈" : "👁️"}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpenReset(!openReset)}
                        className="py-1 rounded-md text-greenVE-500 w-3/4 md:w-1/2 text-right -m-2 text-sm"
                    >
                        Olvidé mi contraseña
                    </button>

                    <button
                        type="submit"
                        className="bg-greenVE-500 px-4 py-1 rounded-md text-white w-3/4 md:w-1/2 flex justify-center"
                    >
                        {isLoading ? <Spinner color="white" /> : <span>Iniciar sesión</span>}
                    </button>
                </form>

                {isIncorrect && <label className="w-3/4 md:w-1/2 text-center font-semibold text-red-500 text-xs -mt-2">{mensaje}</label>}
            </div>
        </>
    );
};

export default LoginNormal;
