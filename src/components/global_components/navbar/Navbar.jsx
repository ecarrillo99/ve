import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import { useState } from "react";
import { endRemoteSession } from "../../../controllers/suscripcion/suscripcionController";
import "./navbar.css";

const icons = new Icons();

const Navbar = () => {
  const navigate = new useNavigate();
  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickSuscription = () => {
    navigate("/suscripcion");
  };

  const [openProfile, setOpenProfile] = useState(false);
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const foto = session ? (session.data.fotos ? session.data.fotos.m : "") : "";

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickLogOut = () => {
    try {
      endRemoteSession().then((result) => {
        if (result) {
          window.location.reload();
          console.log("reload");
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="bg-greenVE-500">
      <div className="flex mx-auto max-w-6xl py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-2/12 flex">
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
            <div className="flex items-center">
              {(foto !== "" && nivel !== "visitante") && (
                <img src={foto} className="rounded-full h-12 w-12 border-2 cursor-pointer hidden md:block" alt="Profile" onClick={() => handleClickProfile()} />
              )}
              {(nivel !== "visitante" && openProfile) && (
                <div className="md:absolute z-50 bg-white flex flex-col top-20 -ml-11 shadow-lg rounded-md gap-0.5">
                  <button className="hover:bg-greenVE-200 px-4 hover:rounded-t-lg text-sm py-1">Mi perfil</button>
                  <div className="border"></div>
                  <button className="hover:bg-greenVE-200 px-4 text-sm py-1">Mis Favoritos</button>
                  <div className="border"></div>
                  <button className="hover:bg-greenVE-200 px-4 text-sm py-1">Administrador</button>
                  <div className="border border-gray-50"></div>
                  <button onClick={() => handleClickLogOut()} className="hover:bg-greenVE-200 px-4 hover:rounded-b-lg text-sm py-1">Cerrar sesión</button>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-end mt-4 sm:mt-0">
            <button className="flex gap-1 text-white border-2 rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: icons.Data["Cama"] }} />
              <label className="hidden md:flex">Hospedaje</label>
            </button>
            <button className="flex gap-1 text-white border-2 rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: icons.Data["Disney"] }} />
              <label className="hidden md:flex">Disney Destination Concierge</label>
            </button>
            <button className="flex gap-1 text-white border-2 rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: icons.Data["InfoTour"] }} />
              <label className="hidden md:flex">InfoTour</label>
            </button>
          </div>
        </div>
      </div>
    </div>

  )
};

export default Navbar;
