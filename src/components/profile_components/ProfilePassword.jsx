import { useState } from "react";
import { changePassword } from "../../controllers/perfil/perfilController";
import { Spinner } from "@material-tailwind/react";

const ProfilePassword = () => {
    const [passAnterior, setPassAnterior]=useState("");
    const [passNueva, setPassNueva]=useState("");
    const [passReingresada, setPassReingresada]=useState("");
    const [editModes, setEditModes] = useState({
        contrasenia: false,
        eliminar: false,
    });
    const [loadingModes, setLoadingModes] = useState({
        contrasenia: false,
        eliminar: false,
    });

    const [erroresList, setErroresList] = useState({
        passAnterior: false,
        passNueva: "",
        passReingresada:""
    });

    const validarDatos=()=>{
        var valido=true;
        setErroresList((prevErrores) => ({
            ...prevErrores,
            passAnterior: "",
            passNueva: "",
            passReingresada: "",
        }));
        if(passAnterior==""){
            valido=false;
            setErroresList((prevErrores) => ({
                ...prevErrores,
                passAnterior: "Campo obligatorio",
            }));
        }
        if(passNueva==""){
            valido=false;
            setErroresList((prevErrores) => ({
                ...prevErrores,
                passNueva: "Campo obligatorio",
            }));
        }
        if(passReingresada==""){
            valido=false;
            setErroresList((prevErrores) => ({
                ...prevErrores,
                passReingresada: "Campo obligatorio",
            }));
        }
        if(passReingresada!=passNueva){
            valido=false;
            setErroresList((prevErrores) => ({
                ...prevErrores,
                passReingresada: "Contraseñas no coinciden",
            }));
        }
        return valido
    }

    const handleToggleEdit = (section) => {
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [section]: !prevEditModes[section],
        }));
    };

    const handleCancel = (section) => {
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [section]: false,
        }));
    };

    const handleSave = (section) => {
        setLoadingModes((prevLoadingModes) => ({
            ...prevLoadingModes,
            [section]: true,
        }));
        if(section=='contrasenia'){
            if(validarDatos()){
                changePassword(passAnterior, passNueva).then((res)=>{
                    if(res){
                        if(res==401){
                            localStorage.removeItem("datos");
                            window.location.reload();
                        }else{
                            setEditModes((prevEditModes) => ({
                                ...prevEditModes,
                                [section]: false,
                            }));
                        }
                    }else{
                        setErroresList((prevErrores) => ({
                            ...prevErrores,
                            passAnterior: "Contraseña incorrecta",
                        }));
                    }
                    setLoadingModes((prevLoadingModes) => ({
                        ...prevLoadingModes,
                        [section]: false,
                    }));
                })
            }
        }
        
    };

    const handleChangePassAnterior=(event)=>{
        setPassAnterior(event.target.value)
    }

    const handleChangePassNueva=(event)=>{
        setPassNueva(event.target.value)
    }

    const handleChangePassReingresada=(event)=>{
        setPassReingresada(event.target.value)
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col">
                    <h1 className="font-semibold text-3xl">Seguridad</h1>
                    <label>Modifica tu contraseña o elimina tu cuenta</label>
                </div>
            </div>
            <div className="flex py-5 border-b justify-between">
                <div className="flex w-10/12">
                    <div className="w-3/12">
                        <label className="text-sm font-semibold">Contraseña:</label>
                    </div>
                    {
                        editModes["contrasenia"]
                        ?(
                            <div className="w-7/12 flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <label className="text-xs">Ingrese contraseña actual</label>
                                        <label className="text-xxs text-red-500">{erroresList.passAnterior}</label>
                                    </div>
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm" onChange={handleChangePassAnterior}></input>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <label className="text-xs">Ingrese contraseña nueva</label>
                                        <label className="text-xxs text-red-500">{erroresList.passNueva}</label>
                                    </div>
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm" onChange={handleChangePassNueva}></input>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <label className="text-xs">Re-ingrese contraseña nueva</label>
                                        <label className="text-xxs text-red-500">{erroresList.passReingresada}</label>
                                    </div>
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm" onChange={handleChangePassReingresada}></input>
                                </div>
                            </div>
                        )
                        :(
                            <div className="w-7/12">
                                <label className="text-sm ">Modifica tu contraseña para aumentar tu seguridad</label>
                            </div>
                        )
                    }
                </div>
                {editModes.contrasenia ? (
                    <>
                        <label className="text-sm text-red-500 cursor-pointer hover:underline" onClick={() => handleCancel('contrasenia')}>{loadingModes.contrasenia?"":"Cancelar"}</label>
                        <label className="ml-2 text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleSave('contrasenia')}>{loadingModes.contrasenia?<Spinner></Spinner>:"Guardar"}</label>
                    </>
                ) : (
                    <label className="text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleToggleEdit('contrasenia')}>Modificar</label>
                )}
            </div>
         </div>
    )
}
export default ProfilePassword;