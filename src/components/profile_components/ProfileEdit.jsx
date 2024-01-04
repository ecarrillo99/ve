import { useEffect, useState } from "react";
import { getProfileData } from "../../controllers/perfil/perfilController";
import ProfilePhoto from "./ProfilePhoto";

const ProfileEdit = ({ profileData, citiesData }) => {
    const [ciudad, setCiudad] = useState();
    const [direccionField, setDireccionField] = useState(profileData.Direccion);
    const [cumpleaniosField, setCumpleaniosField] = useState(profileData.FechaNacimiento);
    const [contactosField, setContactosField] = useState(profileData.Contactos);
    const [fotoPerfil, setFotoPerfil] = useState(profileData.Foto);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModes, setEditModes] = useState({
        ciudad: false,
        direccion: false,
        cumpleanios: false,
        contactos: Array(profileData.Contactos.length).fill(false),
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
        // Lógica para guardar los cambios
        // Puedes realizar acciones de guardado según la sección (ciudad, dirección, etc.)
        // Aquí puedes enviar los datos al servidor, por ejemplo.

        // Después de guardar, puedes desactivar el modo de edición
        setEditModes((prevEditModes) => ({
            ...prevEditModes,
            [section]: false,
        }));
    };

    const handleCumpleaniosChange = (event) => {
        setCumpleaniosField(event.target.value);
    };

    const handleDireccionChange = (event) => {
        setDireccionField(event.target.value);
    };

    const handleEditPhoto=()=>{
        setModalOpen(!modalOpen);
    }

    const handleContactosChange = (event, index) => {
        setContactosField((prevContactosField) => {
            // Crear una copia del estado actual
            const newState = { ...prevContactosField };

            // Actualizar el título del objeto en el índice dado
            newState[index] = { ...newState[index], Titulo: event.target.value };

            // Devolver el nuevo estado
            return newState;
        });
    };

    const updateProfilePhoto=(imgSrc)=>{
        setFotoPerfil(imgSrc);
    }

    const closeModal=()=>{
        setModalOpen(false);
    }

    return (
        <div className="flex flex-col">
            {
                modalOpen&&<ProfilePhoto closeModal={closeModal} updateProfilePhoto={updateProfilePhoto}/>
            }
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col">
                    <h1 className="font-semibold text-3xl">Datos personales</h1>
                    <label>Actualiza o revisa tus datos personales </label>
                </div>
                <div className="rounded-full bg-slate-300 h-14 w-14 border-4 border-greenVE-500 relative cursor-pointer" onClick={()=>handleEditPhoto()}>
                    <img className="rounded-full w-14 h-12" src={fotoPerfil} />
                    <div className="flex items-center justify-center absolute bottom-0 left-0 right-0 text-center bg-gray-800 text-white h-6 opacity-75 rounded-b-full">
                    <label className="text-xxs cursor-pointer">Editar</label>
                    </div>
                </div>
            </div>
            <div className="flex py-5 border-b">
                <div className="flex w-10/12">
                    <div className="w-3/12">
                        <label className="text-sm font-semibold">Nombre:</label>
                    </div>
                    <div className="w-7/12">
                        <label className="text-sm">{profileData.Nombres}</label>
                    </div>
                </div>
            </div>
            <div className="flex py-5 border-b justify-between">
                <div className="flex w-10/12">
                    <div className="w-3/12">
                        <label className="text-sm font-semibold">Ciudad:</label>
                    </div>
                    {
                        editModes.ciudad?(
                            <div></div>
                        ):(
                            
                            <div className="w-7/12">
                                <label className="text-sm ">Cuenca</label>
                            </div>
                        )
                    }
                    
                </div>
                {editModes.ciudad ? (
                    <>
                        <label className="text-sm text-red-500 cursor-pointer hover:underline" onClick={() => handleCancel('ciudad')}>Cancelar</label>
                        <label className="ml-2 text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleSave('ciudad')}>Guardar</label>
                    </>
                ) : (
                    <label className="text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleToggleEdit('ciudad')}>Editar</label>
                )}
            </div>
            <div className="flex py-5 border-b justify-between">
                <div className="flex w-10/12">
                    <div className="w-3/12">
                        <label className="text-sm font-semibold">Dirección:</label>
                    </div>
                    <div className="w-7/12">
                        {
                            editModes.direccion ? (
                                <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm" value={direccionField} onChange={handleDireccionChange}></input>
                            ) : (
                                <label className="text-sm ">{direccionField}</label>
                            )
                        }
                    </div>
                </div>
                {editModes.direccion ? (
                    <>
                        <label className="text-sm text-red-500 cursor-pointer hover:underline" onClick={() => handleCancel('direccion')}>Cancelar</label>
                        <label className="ml-2 text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleSave('direccion')}>Guardar</label>
                    </>
                ) : (
                    <label className="text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleToggleEdit('direccion')}>Editar</label>
                )}
            </div>
            <div className="flex py-5 border-b justify-between">
                <div className="flex w-10/12">
                    <div className="w-3/12">
                        <label className="text-sm font-semibold">Fecha de nacimiento:</label>
                    </div>
                    <div className="w-7/12">
                        {
                            editModes.cumpleanios ? (
                                <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm" value={cumpleaniosField} onChange={handleCumpleaniosChange} type="date"></input>
                            ) : (
                                <label className="text-sm ">{cumpleaniosField}</label>
                            )
                        }

                    </div>
                </div>
                {editModes.cumpleanios ? (
                    <>
                        <label className="text-sm text-red-500 cursor-pointer hover:underline" onClick={() => handleCancel('cumpleanios')}>Cancelar</label>
                        <label className="ml-2 text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleSave('cumpleanios')}>Guardar</label>

                    </>
                ) : (
                    <label className="text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleToggleEdit('cumpleanios')}>Editar</label>
                )}
            </div>
            {profileData.Contactos.map((item, index) => (
                <div key={item.Valor} className="flex py-5 border-b justify-between">
                    <div className="flex w-10/12">
                        <div className="w-3/12">
                            <label className="text-sm font-semibold">{item.Icono}:</label>
                        </div>
                        <div className="w-7/12">
                            {
                                editModes[`contactos_${index}`] ? (
                                    <input className="border border-greenVE-500 px-2 rounded-lg focus:outline-none text-sm" value={contactosField[index].Titulo} onChange={(event) => handleContactosChange(event, index)}></input>
                                ) : (
                                    <label className="text-sm">{contactosField[index].Titulo}</label>
                                )
                            }
                        </div>
                    </div>
                    {editModes[`contactos_${index}`] ? (
                        <>
                            <label className="text-sm text-red-500 cursor-pointer hover:underline" onClick={() => handleCancel(`contactos_${index}`)}>Cancelar</label>
                            <label className="ml-2 text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleSave(`contactos_${index}`)}>Guardar</label>
                        </>
                    ) : (
                        <label className="text-sm text-greenVE-500 cursor-pointer hover:underline" onClick={() => handleToggleEdit(`contactos_${index}`)}>Editar</label>
                    )}
                </div>
            ))}
        </div>
    )
}

export default ProfileEdit;