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
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:text-greenVE-500" onClick={() => handleChangeOption(1)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span className={`${selectedOption == 1?"text-greenVE-500":""} icon-[material-symbols-light--person-edit-outline] h-8 w-8`}></span>
                </div>
                <label className={`${selectedOption==1?"text-greenVE-500":""} font-medium cursor-pointer text-sm `}>Datos personales</label>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t hover:text-greenVE-500" onClick={() => handleChangeOption(3)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span className={`${selectedOption == 3?"text-greenVE-500":""} icon-[material-symbols-light--change-circle-outline-rounded] h-8 w-8`}></span>
                </div>
                <label className={`${selectedOption==3?"text-greenVE-500":""} font-medium cursor-pointer text-sm `}>Mi Cashback</label>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t hover:text-greenVE-500" onClick={() => handleChangeOption(2)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span className={`${selectedOption == 2?"text-greenVE-500":""} icon-[cil--https] h-6 w-6`}></span>
                </div>
                <label className={`${selectedOption==2?"text-greenVE-500":""} font-medium cursor-pointer text-sm `}>Seguridad</label>
            </div>
            
        </div>
    );
}

export default ProfileMenu;