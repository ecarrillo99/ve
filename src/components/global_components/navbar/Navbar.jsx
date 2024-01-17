import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import { useState } from "react";
import { endRemoteSession } from "../../../controllers/suscripcion/suscripcionController";
import { ClickAwayListener } from "@material-ui/core";

const icons = new Icons();

const Navbar = () => {
  const navigate = new useNavigate();
  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickSuscription = () => {
    navigate("/suscripcion");
  };

  const handleClickProfileSet = () => {
    navigate("/perfil");
  };

  const handleClickBookHistory=()=>{
    navigate("/historial");
  }

  const handleClickFavorites=()=>{
    navigate("/favoritos");
  }

  const handleClickLogo=()=>{
    navigate("/");
  }

  const [openProfile, setOpenProfile] = useState(false);
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const nombre = session ? session.data.nombre:"";
  const foto = session ? (session.data.fotos ? session.data.fotos.m : "") : "";

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickLogOut = () => {
    try {
      endRemoteSession().then((result) => {
        if (result) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <header className="bg-greenVE-500">
      <div className="flex mx-auto max-w-6xl py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-2/12 flex cursor-pointer" onClick={handleClickLogo}>
          <img src="/img/ve_logo.svg" style={{ width: "110px", height: "auto" }} alt="Logo" />
        </div>
        <div className="flex flex-col w-10/12 justify-between ">
          <div className="flex gap-2 justify-end items-center">
            <button className="flex gap-1 text-white rounded-full border-2 px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-300">
              Registrar alojamiento
            </button>
            {(nivel === "visitante" || nivel === "gratuito") && (
              <button className="flex gap-1 text-greenVE-600 bg-white rounded-full px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-500" onClick={() => handleClickSuscription()}>
                Adquirir Suscripción
              </button>
            )}
            {nivel === "visitante" && (
              <button className="flex gap-1 text-greenVE-600 bg-white rounded-full px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-500" onClick={() => handleClickLogin()}>
                Iniciar Sesión
              </button>
            )}
            <div className="flex items-end justify-end">
              {(foto !== "" && nivel !== "visitante") && (
                <div className="flex gap-2 items-center cursor-pointer hover:bg-white hover:bg-opacity-20 hover:rounded-md p-1" onClick={() => handleClickProfile()}>
                  <img src={foto} className="rounded-full h-10 w-10 border-2 hidden md:block"/>
                  <div className="flex flex-col ">
                    <label className="font-semibold text-white cursor-pointer">{nombre}</label>
                    <label className="capitalize text-xs text-white cursor-pointer">{nivel}</label>
                  </div>
                </div>
              )}
              {(nivel !== "visitante" && openProfile) && (
                <ClickAwayListener onClickAway={handleClickProfile}>
                  <div className="md:absolute z-50 bg-white flex flex-col items-start py-2 top-14  gap-2 shadow-2xl rounded-md ">
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickProfileSet}><div dangerouslySetInnerHTML={{ __html: icons.Data.Account }}  /> Mi perfil</button>
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickBookHistory}><div dangerouslySetInnerHTML={{ __html: icons.Data.Historial}}  /> Historial de Reservas</button>
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickFavorites}><div dangerouslySetInnerHTML={{ __html: icons.Data.Favorito }}  /> Mis Favoritos</button>
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2"><div dangerouslySetInnerHTML={{ __html: icons.Data.Administrador }}  /> Administrador</button>
                    <button onClick={() => handleClickLogOut()} className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 flex items-center gap-2"><div dangerouslySetInnerHTML={{ __html: icons.Data.Logout }}  />Cerrar sesión</button>
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-end mt-4 sm:mt-0">
            <button className="flex gap-1 text-white border-2 rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300">
            <img src="/img/homeMenu.svg" style={{height:"25px"}}></img>
              <label className="hidden md:flex">Hospedaje</label>
            </button>
            <button className="flex gap-1 text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300">
              <img src="/img/disneymenu.svg" style={{height:"25px"}}></img>
              <label className="hidden md:flex">Disney Destination Concierge</label>
            </button>
            <button className="flex gap-1 text-white hover:border-2 rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300">
              <img src="/img/infotourMenu.svg" style={{height:"25px"}}></img>
              <label className="hidden md:flex">InfoTour</label>
            </button>
          </div>
        </div>
      </div>
    </header>

  )
};

export default Navbar;
