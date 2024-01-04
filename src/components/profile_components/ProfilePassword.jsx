import { useState } from "react";

const ProfilePassword = () => {
    const [editModes, setEditModes] = useState({
        contrasenia: false,
        eliminar: false,
    });

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
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [section]: false,
        }));
    };

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
                                    <label className="text-xs">Ingrese contraseña actual</label>
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs">Ingrese contraseña nueva</label>
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm"></input>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs">Reingrese contraseña nueva</label>
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm"></input>
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
                        <label className="text-sm text-red-500 cursor-pointer hover:underline" onClick={() => handleCancel('contrasenia')}>Cancelar</label>
                        <label className="ml-2 text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleSave('contrasenia')}>Guardar</label>
                    </>
                ) : (
                    <label className="text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleToggleEdit('contrasenia')}>Modificar</label>
                )}
            </div>
            <div className="flex py-5 border-b justify-between items-center">
                <div className="flex w-10/12 items-center">
                    <div className="w-3/12">
                        <label className="text-sm font-semibold">Eliminar cuenta:</label>
                    </div>
                    {
                        editModes["eliminar"]
                        ?(
                            <div className="w-7/12 flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <label className="text-xs">Ingrese contraseña para continuar</label>
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm"></input>
                                </div>
                            </div>
                        )
                        :(
                            <div className="w-7/12">
                                <label className="text-sm ">Elimina definitivamente tu cuenta, esta acción no es reversible</label>
                            </div>
                        )
                    }
                </div>
                {editModes.eliminar ? (
                    <>
                        <label className="text-sm text-red-500 cursor-pointer hover:underline" onClick={() => handleCancel('eliminar')}>Cancelar</label>
                        <label className="ml-2 text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleSave('eliminar')}>Guardar</label>
                    </>
                ) : (
                    <label className="text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleToggleEdit('eliminar')}>Eliminar</label>
                )}
            </div>
        </div>
    )
}
export default ProfilePassword;