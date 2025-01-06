import React from 'react';
import MarcaPais from './MarcaPais';

const NavbarLanding = () => {
    var activo;
    return (
        <header className="bg-greenVE-500">
            <div className="flex mx-auto max-w-6xl py-2 px-4 sm:px-6 lg:px-8 gap-4">
                <img src="https://visitaecuador.com/img/web/ve_logo.svg" style={{ width: "110px", height: "auto" }} />
                <div className="flex gap-2 justify-between items-end w-full">
                    <div className='flex gap-2'>
                        <button className={`flex gap-1 border-2 ${(activo == null || activo == 1 ? "border-white" : "border-transparent")} text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white`}  >
                            <img src="https://visitaecuador.com/img/web/homeMenu.svg" style={{ height: "25px" }}></img>
                            <label className="hidden md:flex cursor-pointer">Adquirir suscripción</label>
                        </button>
                        <button className={`flex gap-1 border-2 ${(activo == 2 ? "border-white" : "border-transparent")} text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white`}  >
                            <img src="https://visitaecuador.com/img/web/homeMenu.svg" style={{ height: "25px" }}></img>
                            <label className="hidden md:flex cursor-pointer">Contáctenos</label>
                        </button>
                        <button className={`flex gap-1 border-2 ${(activo == 2 ? "border-white" : "border-transparent")} text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white`}  >
                            <img src="https://visitaecuador.com/img/web/homeMenu.svg" style={{ height: "25px" }}></img>
                            <label className="hidden md:flex cursor-pointer">Promoción valida por</label>
                        </button>
                    </div>
                    <MarcaPais />
                </div>
            </div>
        </header>
    );
};

export default NavbarLanding;