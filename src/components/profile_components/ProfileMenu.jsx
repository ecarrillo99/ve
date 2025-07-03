import { useEffect, useState } from "react";
import Icons from "../../global/icons";
import { getProfileData } from "../../controllers/perfil/perfilController";

const ProfileMenu = ({ handleChangeOption, selectedOption, profileData }) => {
    const icons = new Icons();

    return (
        <div className="border rounded-md">
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:text-greenVE-500"
                 onClick={() => handleChangeOption(1)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span
                        className={`${selectedOption == 1 ? "text-greenVE-500" : ""} icon-[material-symbols-light--person-edit-outline] h-8 w-8`}></span>
                </div>
                <label
                    className={`${selectedOption == 1 ? "text-greenVE-500" : ""} font-medium cursor-pointer text-sm `}>Datos
                    personales</label>
            </div>
            {
                (profileData && profileData.Codigo && profileData.Codigo != "") &&
                <div className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t hover:text-greenVE-500"
                     onClick={() => handleChangeOption(2)}>
                    <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                        <span
                            className={`${selectedOption == 2 ? "text-greenVE-500" : ""} icon-[material-symbols-light--web] h-8 w-8`}></span>
                    </div>
                    <label
                        className={`${selectedOption == 2 ? "text-greenVE-500" : ""} font-medium cursor-pointer text-sm `}>Página
                        de Agencia</label>
                </div>
            }
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t hover:text-greenVE-500"
                 onClick={() => handleChangeOption(3)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span
                        className={`${selectedOption == 3 ? "text-greenVE-500" : ""} icon-[material-symbols-light--change-circle-outline-rounded] h-8 w-8`}></span>
                </div>
                <label
                    className={`${selectedOption == 3 ? "text-greenVE-500" : ""} font-medium cursor-pointer text-sm `}>Mi
                    Cashback</label>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t hover:text-greenVE-500"
                 onClick={() => handleChangeOption(4)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span
                        className={`${selectedOption == 4 ? "text-greenVE-500" : ""} icon-[cil--https] h-6 w-6`}></span>
                </div>
                <label
                    className={`${selectedOption == 4 ? "text-greenVE-500" : ""} font-medium cursor-pointer text-sm `}>Seguridad</label>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:text-greenVE-500"
                 onClick={() => handleChangeOption(5)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span
                        className={`${selectedOption == 5 ? "text-greenVE-500" : ""} icon-[material-symbols--admin-panel-settings-outline] h-8 w-8`}></span>
                </div>
                <label
                    className={`${selectedOption == 5 ? "text-greenVE-500" : ""} font-medium cursor-pointer text-sm `}>Administración</label>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:text-greenVE-500"
                 onClick={() => handleChangeOption(6)}>
                <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                    <span
                        className={`${selectedOption == 6 ? "text-greenVE-500" : ""} icon-[material-symbols--admin-panel-settings-outline] h-8 w-8`}></span>
                </div>
                <label
                    className={`${selectedOption == 6 ? "text-greenVE-500" : ""} font-medium cursor-pointer text-sm `}>My Biosite</label>
            </div>
        </div>
    );
}

export default ProfileMenu;
