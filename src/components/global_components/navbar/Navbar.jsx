import { useLocation, useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import { useState } from "react";
import {
  endRemoteSession,
  getPermissions,
  loginRemote,
  setPermissionsAdmin,
} from "../../../controllers/suscripcion/suscripcionController";
import { ClickAwayListener } from "@mui/material";
import { Spinner } from "@material-tailwind/react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../../../firebase";
import encodePass from "../../../global/encodePass";
import Config from "../../../global/config";
import MarcaPais from "./MarcaPais";
import MobileMenu from "./MobileMenu";
import MobileBottomNav from "./MobileBottomNav";

const icons = new Icons();

const Navbar = ({ activo, isExposed = false }) => {
  const codigo = localStorage.getItem("codigo");
  const navigate = new useNavigate();
  const location = useLocation();
  const [openProfile, setOpenProfile] = useState(false);
  const [openSuscription, setOpenSuscription] = useState(false);
  const [openConvenios, setOpenConvenios] = useState(false);
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const nombre = session ? session.data.nombre : "";
  const yaGanaste = session ? session.data.permisos.perfil.yaGanaste : false;
  const dashboard = session ? session.data.permisos.perfil.dashboard : false;
  const beta = session ? session.data.permisos.perfil.pruebasBeta : false;
  const foto = session ? (session.data.fotos ? session.data.fotos.m : "") : "";
  const [isLoadingAdmin, setLoadingAdmin] = useState(false);
  const [isLoadingAdminBeta, setLoadingAdminBeta] = useState(false);
  const [isLoagingLogOut, setIsLoadingLogOut] = useState(false);
  const [isLoadingGoogle, setisLoadingGoogle] = useState(false);
  const [isLoadingFB, setIsLoadingFB] = useState(false);
  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();
  const isExposedRoute = location.pathname === "/disney" || isExposed;

  const [openBeneficios, setOpenBeneficios] = useState(false);

  // Mobile states
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileProfile, setOpenMobileProfile] = useState(false);

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickSuscription = () => {
    setOpenSuscription(false);
    navigate("/suscripcion", {
      state: { showMenu: true },
    });
  };
  const handleClickNosotros = () => {
    navigate("/nosotros");
    setOpenMenu(false);
  };

  const handleClickProfileSet = () => {
    navigate("/perfil");
    setOpenMobileProfile(false);
  };

  const handleClickBookHistory = () => {
    navigate("/historial");
    setOpenMobileProfile(false);
  };

  const handleClickFavorites = () => {
    navigate("/favoritos");
    setOpenMobileProfile(false);
  };

  const handleClickYaGanaste = () => {
    navigate("/yaganaste");
  };

  const handleClickVinos = () => {
    navigate("/vinos");
    setOpenMenu(false);
  };

  const handleClickBYD = () => {
    navigate("/byd");
    setOpenMenu(false);
  };

  const handleClickDashboard = () => {
    window.open("/dashboard");
  };

  const handleClickPack = () => {
    navigate("/pack");
  };

  const handleClickLogo = () => {
    navigate("/");
    setOpenMenu(false);
  };

  const handleClickAdministradorBeta = () => {
    if (!isLoadingAdminBeta) {
      setLoadingAdminBeta(true);
      setPermissionsAdmin().then((result) => {
        if (result) {
          window.open("/administrador");
          setLoadingAdminBeta(false);
        }
      });
    }
  };

  const handleClickAdministrador = () => {
    if (!isLoadingAdmin) {
      setLoadingAdmin(true);
      getPermissions(session.data.id_usuario).then((result) => {
        if (result) {
          window.open("/ve/administrador");
          setLoadingAdmin(false);
        }
      });
    }
  };

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickMobileProfile = () => {
    if (nivel == "visitante") {
      navigate("/login");
    } else {
      setOpenMobileProfile(!openMobileProfile);
    }
  };

  const handleClickSuscribing = () => {
    setOpenConvenios(false);
    setOpenSuscription(!openSuscription);
  };

  const handleClickLogOut = () => {
    setIsLoadingLogOut(true);
    try {
      endRemoteSession().then((result) => {
        setIsLoadingLogOut(false);
        if (result) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickDisney = () => {
    navigate("/disney");
    setOpenMenu(false);
  };

  const handleClickVisas = () => {
    navigate("/visas-concierge");
    setOpenMenu(false);
  };

  const handleClickInicio = () => {
    navigate("/");
    setOpenMenu(false);
  };

  const handleClickInfotour = () => {
    window.open("https://www.infotour.app/");
    setOpenMenu(false);
  };

  const handleClickContactanos = () => {
    navigate("/contacto");
    setOpenMenu(false);
  }

  const handleClickMenu = () => {
    setOpenConvenios(false);
    setOpenMenu(!openMenu);
  };

  const handleClickGoogle = () => {
    signInWithPopup(auth, gProvider)
      .then(async (result) => {
        setisLoadingGoogle(true);
        const user = result.user;
        try {
          const random = () => Math.floor(Math.random() * 100);
          const randomStr = Array.from({ length: 7 }, () => random()).join("");
          const username =
            user.displayName ?? "usuario" + randomStr.substring(0, 6);
          const email = user.email ?? "";
          var id = user.uid ?? randomStr;
          var pass = encodePass(email);
          if (email.trim() === "") {
            setisLoadingGoogle(false);
            alert("Correo inválido, intente con otra cuenta");
            return;
          }
          const params = {
            id: id,
            pass: pass,
            servicio: Config.SERVICIO,
            metodo: Config.METODO_EX_GO,
            username: username,
            nombre: username,
            email: email,
            id_servicio: Config.IDSERVICIO,
            id_metodo: Config.IDMETODO_EX_GO,
          };
          try {
            await loginRemote(params)
              .then((result) => {
                setisLoadingGoogle(false);
                if (result) {
                  window.location.reload();
                } else {
                  setisLoadingGoogle(false);
                  alert("Ha ocurrido un error, intente nuevamente");
                }
              })
              .catch((error) => {});
          } catch (error) {
            setisLoadingGoogle(false);
            console.error("Error:", error);
          }
        } catch (e) {}
      })
      .catch((error) => {});
  };

  const handleClickFacebook = () => {
    if (!isLoadingFB) {
      signInWithPopup(auth, fProvider)
        .then(async (result) => {
          setIsLoadingFB(true);
          const user = result.user;
          try {
            const random = () => Math.floor(Math.random() * 100);
            const randomStr = Array.from({ length: 7 }, () => random()).join("");
            const username =
              user.displayName ?? "usuario" + randomStr.substring(0, 6);
            const email = user.email ?? "";
            var id = user.uid ?? randomStr;
            var pass = encodePass(email);
            if (email.trim() === "") {
              setIsLoadingFB(false);
              alert("Correo inválido, intente con otra cuenta");
              return;
            }
            const params = {
              id: id,
              pass: pass,
              servicio: Config.SERVICIO,
              metodo: Config.METODO_EX_FB,
              username: username,
              nombre: username,
              email: email,
              id_servicio: Config.IDSERVICIO,
              id_metodo: Config.IDMETODO_EX_FB,
            };
            try {
              await loginRemote(params)
                .then((result) => {
                  setIsLoadingFB(false);
                  if (result) {
                    navigate(-1);
                  } else {
                    setIsLoadingFB(false);
                    alert("Ha ocurrido un error, intente nuevamente");
                  }
                })
                .catch((error) => {});
            } catch (error) {
              setIsLoadingFB(false);
              console.error("Error:", error);
            }
          } catch (e) {}
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }
  };

  const router = 
    location.pathname === "/vinos"
  

  const route = 
    location.pathname === "/"
  

  return (
    <header className="bg-greenVE-500">
      {!isExposedRoute && (
        <div className="bg-[#8eb934] flex  justify-center lg:gap-56 xl:gap-[350px] flex-wrap sm:flex-row">
          <div className="flex sm:justify-end gap-3 align-start py-3 lg:px-8 px-3">
            {!codigo && <MarcaPais />}
            <a
              className=" w-6 h-6 rounded-full flex items-center justify-center"
              href="https://www.facebook.com/visitaecuadorcom"
              target="_blank"
            >
              <span className="icon-[iconoir--facebook] text-white h-4 w-4"></span>
            </a>
            <a
              className=" w-6 h-6 rounded-full flex items-center justify-center"
              href="https://www.instagram.com/visitaecuadorcom/"
              target="_blank"
            >
              <span className="icon-[mdi--instagram] text-white h-4 w-4"></span>
            </a>
            <a
              className=" w-6 h-6 rounded-full flex items-center justify-center"
              href="https://walink.co/99db0b"
              target="_blank"
            >
              <span className="icon-[mdi--whatsapp] text-white h-4 w-4"></span>
            </a>
            <a
              className=" w-6 h-6 rounded-full flex items-center justify-center"
              href="https://www.tiktok.com/@visitaecuador.com"
              target="_blank"
            >
              <span className="icon-[ph--tiktok-logo] text-white h-4 w-4"></span>
            </a>
            <a
              className="w-6 h-6 rounded-full flex items-center justify-center"
              href="https://www.youtube.com/@VisitaEcuador-com"
              target="_blank"
            >
              <span className="icon-[ph--youtube-logo-bold] text-white h-4 w-4"></span>
            </a>
            <a
              className="w-6 h-6 rounded-full flex items-center justify-center"
              href="https://www.linkedin.com/in/visita-ecuador-44411353"
              target="_blank"
            >
              <span className="icon-[uil--linkedin-alt] h-4 w-4 text-white"></span>
            </a>
            <a
              className=" w-6 h-6 rounded-full flex items-center justify-center"
              href="https://x.com/clubvisita"
              target="_blank"
            >
              <span className="icon-[flowbite--x-company-solid] text-white h-3 w-3"></span>
            </a>
           
          </div>
            {!isExposedRoute && (
            <div className=" flex gap-2 justify-end sm:justify-start items-center pr-8 sm:pr-4">
              {/* Desktop view */}
              <div className="sr-only sm:not-sr-only md:flex gap-2">
                <a
                  className="flex gap-1 text-white border-white rounded-md border-2 px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-300"
                  href="/smart/"
                >
                  Registrar alojamiento
                </a>
                <div className="flex justify-center relative">
                  <button
                    className="flex gap-1 text-greenVE-600 bg-white rounded-md px-5 py-1 text-xs hover:border-gray-300 hover:text-gray-500"
                    onClick={handleClickSuscribing}
                  >
                    Suscribirse
                  </button>
                  {openSuscription && (
                    <ClickAwayListener onClickAway={handleClickSuscribing}>
                      <div className="absolute z-50 bg-white flex flex-col items-start py-2 top-12  gap-2 shadow-2xl rounded-md ">
                        <button
                          className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2 "
                          onClick={handleClickSuscription}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: icons.Data.Buy }}
                          />
                          Comprar suscripción
                        </button>
                        <button
                          className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2"
                          onClick={handleClickPack}
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: icons.Data.Gift }}
                          />
                          Activar VisitaPack
                        </button>
                        <label className="text-xs font-medium text-center w-full">
                          Prueba gratis con:
                        </label>
                        <div className="flex justify-center items-center w-full gap-2  pb-3">
                          {isLoadingGoogle ? (
                            <Spinner
                              color="blue"
                              className="text-greenVE-300"
                            ></Spinner>
                          ) : (
                            <a
                              dangerouslySetInnerHTML={{
                                __html: icons.Data["LoginGoogleSM"],
                              }}
                              className="border p-2 rounded-md hover:border-greenVE-500"
                              onClick={() => handleClickGoogle()}
                            />
                          )}
                          {isLoadingFB ? (
                            <Spinner
                              color="blue"
                              className="text-greenVE-300"
                            ></Spinner>
                          ) : (
                            <a
                              dangerouslySetInnerHTML={{
                                __html: icons.Data["LoginFacebookSM"],
                              }}
                              className="border p-2 rounded-md hover:border-greenVE-500"
                              onClick={() => handleClickFacebook()}
                            />
                          )}
                        </div>
                      </div>
                    </ClickAwayListener>
                  )}
                </div>
                {nivel === "visitante" && (
                  <button
                    className="flex gap-1 text-greenVE-600 bg-white rounded-md  px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-500"
                    onClick={() => (activo != 6 ? handleClickLogin() : {})}
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>

              {/* Mobile hamburger menu */}
              <div className="flex md:hidden gap-2 ml-auto items-center">
                {nivel !== "visitante" && (
                  <img
                    src={foto}
                    onClick={handleClickMobileProfile}
                    className="rounded-full h-8 w-8 border-2 border-white cursor-pointer"
                    alt="Profile"
                  />
                )}
                 {nivel === "visitante" ? (
                <button
                  onClick={handleClickMenu}
                  className="text-white p-2 "
                >
                  {openMenu ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button> ) : (
                  <></>
                )}
              </div>
               

              <div className="hidden md:flex items-end justify-end">
                {foto !== "" && nivel !== "visitante" && (
                  <div
                    className="flex gap-2 items-center cursor-pointer hover:bg-white hover:bg-opacity-20 hover:rounded-md p-1"
                    onClick={() => handleClickProfile()}
                  >
                    <img
                      src={foto}
                      className="rounded-full h-10 w-10 border-2 hidden md:block"
                    />
                    <div className="flex flex-col ">
                      <label className="font-semibold text-white cursor-pointer">
                        {nombre}
                      </label>
                      <label className="capitalize text-xs text-white cursor-pointer">
                        {nivel}
                      </label>
                    </div>
                  </div>
                )}
                {nivel !== "visitante" && openProfile && (
                  <ClickAwayListener onClickAway={handleClickProfile}>
                    <div className="md:absolute z-50 bg-white flex flex-col items-start py-2 top-14  gap-2 shadow-2xl rounded-md ">
                      <button
                        className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2"
                        onClick={handleClickProfileSet}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: icons.Data.Account,
                          }}
                        />{" "}
                        Mi perfil
                      </button>
                      <button
                        onClick={handleClickBookHistory}
                        className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 text-start flex items-center gap-2"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: icons.Data.HistorialReservas,
                          }}
                        />
                        Historial de reservas
                      </button>
                      <button
                        onClick={handleClickFavorites}
                        className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 text-start flex items-center gap-2"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: icons.Data.Favoritos,
                          }}
                        />
                        Favoritos
                      </button>
                      <button
                        className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2"
                        onClick={handleClickAdministrador}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: icons.Data.Administrador,
                          }}
                        />{" "}
                        Administrador
                        {isLoadingAdmin && (
                          <Spinner className="h-4 w-4" color="white"></Spinner>
                        )}
                      </button>
                      {beta && (
                        <button
                          className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2"
                          onClick={handleClickAdministradorBeta}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: icons.Data.Administrador,
                            }}
                          />{" "}
                          Administrador (Beta)
                          {isLoadingAdminBeta && (
                            <Spinner className="h-4 w-4" color="white"></Spinner>
                          )}
                        </button>
                      )}
                      {yaGanaste && (
                        <button
                          className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2"
                          onClick={handleClickYaGanaste}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: icons.Data.CrearUsuario,
                            }}
                          />{" "}
                          Crear Suscripción
                        </button>
                      )}
                      {dashboard && (
                        <button
                          onClick={() => handleClickDashboard()}
                          className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 flex items-center gap-2"
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: icons.Data.Dashboard,
                            }}
                          />
                          Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => handleClickLogOut()}
                        className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 flex items-center gap-2"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: icons.Data.Logout,
                          }}
                        />
                        Cerrar sesión
                        {isLoagingLogOut && (
                          <Spinner className="h-4 w-4" color="white"></Spinner>
                        )}
                      </button>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div className={`flex mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8 ${router ? "hidden" : ""} ${route ? "hidden" : ""}`}>
     
        <div
          className={`flex flex-col align-center align-middle items-center ${
            codigo ? "w-full" : "w-10/12"
          } justify-between `}
        >
        
          <div className=" relative z-40 w-full flex justify-center">
            <div className="flex w-full max-w-7xl items-center justify-between px-4">
              {(activo > 0 ||
                location.pathname === "/suscripcion ||" ||
                location.pathname.includes("/busqueda")) && (
                <div className="hidden md:flex gap-0.5 items-end mt-4 sm:mt-0 flex-wrap">
                  <button
                    className={`flex w-fit gap-2 ${
                      activo == 1 ? "bg-white text-gray-800" : "bg-white/20 text-white hover:bg-white/40"
                    } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
                    onClick={handleClickInicio}
                  >
                    <img
                      src="https://visitaecuador.com/img/web/homeMenu.svg"
                      style={{ height: "20px" }}
                    ></img>
                    <label className="hidden md:flex cursor-pointer font-medium">
                      Hospedaje
                    </label>
                  </button>

                  <button
                    className={`flex gap-2 ${
                      activo == 2 ? "bg-white text-gray-800" : "bg-white/20 text-white hover:bg-white/40"
                    } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
                    onClick={handleClickInfotour}
                  >
                    <img
                      src="https://visitaecuador.com/img/web/infotourMenu.svg"
                      style={{ height: "20px" }}
                    ></img>
                    <label className="hidden md:flex cursor-pointer font-medium">
                      InfoTour
                    </label>
                  </button>
                  <button
                    className={`flex gap-2 ${
                      activo == 3 ? "bg-white text-gray-800" : "bg-white/20 text-white hover:bg-white/40"
                    } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
                    onClick={handleClickDisney}
                  >
                    <img
                      src="https://visitaecuador.com/img/web/disneyMenu.svg"
                      style={{ height: "20px" }}
                    ></img>
                    <label className="hidden md:flex cursor-pointer font-medium">
                      Disney Concierge
                    </label>
                  </button>
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenBeneficios(true)}
                    onMouseLeave={() => setOpenBeneficios(false)}
                  >
                    <button
                      className={`flex gap-2 ${
                        activo == 4 ? "bg-white text-gray-800" : "bg-white/20 text-white hover:bg-white/40"
                      } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
                    >
                      <div
                        className="rounded-full bg-white p-0.5"
                        style={{ height: "22px", width: "22px" }}
                      >
                        <img
                          src="https://visitaecuador.com/img/web/benefit.svg"
                          className="rounded-full"
                          style={{ height: "100%", width: "100%" }}
                        />
                      </div>
                      <label className="hidden md:flex cursor-pointer font-medium">
                        Beneficios
                      </label>
                    </button>

                    {openBeneficios && (
                      <div className="absolute left-0 pt-2 w-48 z-[60]">
                        <div className="rounded-md bg-white shadow-xl">
                          <button
                            onClick={() => {
                              setOpenBeneficios(false);
                              handleClickVinos();
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-greenVE-500 hover:text-white hover:bg-greenVE-500 rounded-t-md"
                          >
                            Ruta de vinos
                          </button>
                          <button
                            onClick={() => {
                              setOpenBeneficios(false);
                              handleClickBYD();
                            }}
                            className="w-full text-left px-4 py-2 text-xs text-greenVE-500 hover:text-white hover:bg-greenVE-500"
                          >
                            Puntos de carga
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className={`flex gap-2 ${
                      activo == 5 ? "bg-white text-gray-800" : "bg-white/20 text-white hover:bg-white/40"
                    } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
                    onClick={handleClickVisas}
                  >
                    <div
                      className="rounded-full bg-white p-0.5"
                      style={{ height: "22px", width: "22px" }}
                    >
                      <img
                        src="https://visitaecuador.com/img/web/visas-concierge.jpeg"
                        className="rounded-full"
                        style={{ height: "100%", width: "100%" }}
                      ></img>
                    </div>
                    <label className="hidden md:flex cursor-pointer font-medium">
                      Visas
                    </label>
                  </button>
                  <button
                    className={`flex gap-2 ${
                      activo == 6 ? "bg-white text-gray-800" : "bg-white/20 text-white hover:bg-white/40"
                    } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
                    onClick={handleClickNosotros}
                  >
                    <div
                      className="rounded-full bg-white p-0.5"
                      style={{ height: "22px", width: "22px" }}
                    >
                      <img
                        src="https://visitaecuador.com/img/web/nosotrosMenu.svg"
                        className="rounded-full"
                        style={{ height: "100%", width: "100%" }}
                      ></img>
                    </div>
                    <label className="hidden md:flex cursor-pointer font-medium">
                      Nosotros
                    </label>
                  </button>
                  <button
                    className={`flex gap-1 ${
                      activo == 7 ? "bg-white text-gray-800" : "bg-white/20 text-white hover:bg-white/40"
                    } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
                    onClick={handleClickContactanos}
                  >

                    <div
                      className="rounded-full bg-white p-1"
                      style={{ height: "22px", width: "22px" }}
                    >
                      <img
                        src="https://visitaecuador.com/img/web/contacto.svg"
                        className="rounded-full"
                        style={{ height: "100%", width: "100%" }}
                      ></img>
                    </div>
                    <label className="hidden md:flex cursor-pointer">
                      Contactanos
                    </label>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu
        openMenu={openMenu}
        openMobileProfile={openMobileProfile}
        nivel={nivel}
        nombre={nombre}
        foto={foto}
        beta={beta}
        isLoadingGoogle={isLoadingGoogle}
        isLoadingFB={isLoadingFB}
        isLoadingAdmin={isLoadingAdmin}
        isLoadingAdminBeta={isLoadingAdminBeta}
        icons={icons}
        handleClickMenu={handleClickMenu}
        handleClickLogo={handleClickLogo}
        handleClickLogin={handleClickLogin}
        handleClickSuscription={handleClickSuscription}
        handleClickGoogle={handleClickGoogle}
        handleClickFacebook={handleClickFacebook}
        handleClickMobileProfile={handleClickMobileProfile}
        setOpenMobileProfile={setOpenMobileProfile}
        handleClickProfileSet={handleClickProfileSet}
        handleClickAdministrador={handleClickAdministrador}
        handleClickAdministradorBeta={handleClickAdministradorBeta}
        handleClickBookHistory={handleClickBookHistory}
        handleClickFavorites={handleClickFavorites}
        handleClickLogOut={handleClickLogOut}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        activo={activo}
        onClickInicio={handleClickInicio}
        onClickDisney={handleClickDisney}
        onClickVinos={handleClickVinos}
        onClickVisas={handleClickVisas}
        onClickContactanos={handleClickContactanos}
      />
    </header>
  );
};

export default Navbar;