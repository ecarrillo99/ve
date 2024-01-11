import { useEffect, useState } from "react";
import Icons from "../../global/icons";
import { getProfileData } from "../../controllers/perfil/perfilController";

const ProfileMenu = ({ handleChangeOption, selectedOption }) => {
    const icons = new Icons();
    const [profileData, setProfileData]=useState();
    useEffect(() => {

        async function fetchData() {

            try {
                getProfileData()
                    .then((result) => {
                        if (result) {
                            if(result==401){
                                localStorage.removeItem("datos");
                                window.location.reload();
                            }else{
                                setProfileData(result)
                            }
                        }
                    })
                    .catch((error) => { console.log(error) })

            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="border rounded-md">
            {
                selectedOption == 1
                    ? (
                        <div className="flex items-center gap-3 px-4 py-2 cursor-pointer" onClick={() => handleChangeOption(1)}>
                            <div className="bg-gray-100 p-2 rounded-full" dangerouslySetInnerHTML={{ __html: icons.Data.ProfileHov }} />
                            <label className="font-medium cursor-pointer text-sm text-greenVE-500">Datos personales</label>
                        </div>
                    )
                    : (
                        <div className="flex items-center gap-3 px-4 py-2 cursor-pointer" onClick={() => handleChangeOption(1)}>
                            <div className="bg-gray-100 p-2 rounded-full" dangerouslySetInnerHTML={{ __html: icons.Data.Profile }} />
                            <label className="font-medium cursor-pointer text-sm hover:text-greenVE-500">Datos personales</label>
                        </div>
                    )
            }
            {
                selectedOption == 2
                    ? (
                        <div className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t" onClick={() => handleChangeOption(2)}>
                            <div className="bg-gray-100 p-2 rounded-full" dangerouslySetInnerHTML={{ __html: icons.Data.SeguridadHov }} />
                            <label className="font-medium cursor-pointer text-sm text-greenVE-500">Seguridad</label>
                        </div>
                    )
                    : (
                        <div className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t" onClick={() => handleChangeOption(2)}>
                            <div className="bg-gray-100 p-2 rounded-full" dangerouslySetInnerHTML={{ __html: icons.Data.Seguridad }} />
                            <label className="font-medium cursor-pointer text-sm hover:text-greenVE-500">Seguridad</label>
                        </div>
                    )
            }
        </div>
    );
}

export default ProfileMenu;