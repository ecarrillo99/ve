import { useEffect, useState } from "react";
import Icons from "../../global/icons";

const ProfileMenu = ({ handleChangeOption, selectedOption, profileData }) => {
    const icons = new Icons();
    const [mobileTab, setMobileTab] = useState(selectedOption);

    useEffect(() => {
        handleChangeOption(mobileTab);
    }, [mobileTab]);

    // Desktop version (original sidebar)
    const DesktopMenu = () => (
        <div className="flex border rounded-md, justify-center">
            {[
                { id: 1, label: "Datos personales", icon: "icon-[material-symbols-light--person-edit-outline]" },
                { id: 2, label: "Página de Agencia", icon: "icon-[material-symbols-light--web]", condition: profileData?.Codigo },
                { id: 3, label: "Mi Cashback", icon: "icon-[material-symbols-light--change-circle-outline-rounded]" },
                { id: 4, label: "Seguridad", icon: "icon-[cil--https]" },
                { id: 5, label: "Administración", icon: "icon-[material-symbols--admin-panel-settings-outline]" }
            ].map(({ id, label, icon, condition = true }) => condition && (
                <div key={id} className="flex items-center gap-3 px-4 py-2 cursor-pointer border-t hover:text-greenVE-500" onClick={() => handleChangeOption(id)}>
                    <div className="bg-gray-100 h-9 w-9 rounded-full flex items-center justify-center">
                        <span className={`${selectedOption == id ? "text-greenVE-500" : ""} ${icon} h-8 w-8`}></span>
                    </div>
                    <label className={`${selectedOption == id ? "text-greenVE-500" : ""} font-medium cursor-pointer text-sm`}>{label}</label>
                </div>
            ))}
        </div>
    );

    // Mobile version (buttons instead of tabs)
    const MobileMenu = () => (
        <div className="w-full flex overflow-x-auto bg-white border rounded-md p-1 space-x-1">
            {[
                { id: 1, label: "Datos", icon: "icon-[material-symbols-light--person-edit-outline]" },
                { id: 2, label: "Agencia", icon: "icon-[material-symbols-light--web]", condition: profileData?.Codigo },
                { id: 3, label: "Cashback", icon: "icon-[material-symbols-light--change-circle-outline-rounded]" },
                { id: 4, label: "Seguridad", icon: "icon-[cil--https]" },
                { id: 5, label: "Admin", icon: "icon-[material-symbols--admin-panel-settings-outline]" }
            ].map(({ id, label, icon, condition = true }) => condition && (
                <button
                    key={id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${mobileTab == id ? "bg-gray-100 text-greenVE-500" : ""}`}
                    onClick={() => setMobileTab(id)}
                >
                    <span className={`${icon} h-5 w-5`} />
                    <span className="text-sm">{label}</span>
                </button>
            ))}
        </div>
    );

    return (
        <>
            <div className="hidden md:block">
                <DesktopMenu />
            </div>
            <div className="md:hidden">
                <MobileMenu />
            </div>
        </>
    );
}

export default ProfileMenu;
