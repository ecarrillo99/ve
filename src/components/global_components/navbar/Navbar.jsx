import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import { useState } from "react";
import { endRemoteSession, getPermissions, loginRemote, setPermissionsAdmin } from "../../../controllers/suscripcion/suscripcionController";
import { ClickAwayListener } from "@material-ui/core";
import { Spinner } from "@material-tailwind/react";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import encodePass from "../../../global/encodePass";
import Config from "../../../global/config";
import MarcaPais from "./MarcaPais";

const icons = new Icons();

const Navbar = ({ activo }) => {
  const codigo = localStorage.getItem('codigo');
  const navigate = new useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [openSuscription, setOpenSuscription] = useState(false);
  const [openNosotros, setOpenNosotros] = useState(false);
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
  const [isLoadingGoogle, setisLoadingGoogle] = useState(false)
  const [isLoadingFB, setIsLoadingFB] = useState(false)
  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleClickSuscription = () => {
    navigate("/suscripcion");
  };

  const handleClickProfileSet = () => {
    navigate("/perfil");
  };

  const handleClickBookHistory = () => {
    navigate("/historial");
  }

  const handleClickFavorites = () => {
    navigate("/favoritos");
  }

  const handleClickYaGanaste = () => {
    navigate("/yaganaste");
  }

  const handleClickDashboard = () => {
    window.open("/dashboard");
  }

  const handleClickPack = () => {
    navigate("/pack");
  }

  const handleClickLogo = () => {
    navigate("/");
  }




  const handleClickAdministradorBeta = () => {
    if (!isLoadingAdminBeta) {
      setLoadingAdminBeta(true);
      setPermissionsAdmin().then((result) => {
        if (result) {
          window.open("/administrador");
          setLoadingAdminBeta(false);
        }
      })
    }
  }

  const handleClickAdministrador = () => {
    if (!isLoadingAdmin) {
      setLoadingAdmin(true);
      getPermissions(session.data.id_usuario).then((result) => {
        if (result) {
          window.open("/ve/administrador");
          setLoadingAdmin(false);
        }
      })
    }
  }

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickSuscribing = () => {
    setOpenConvenios(false);
    setOpenSuscription(!openSuscription);
  }

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
  }

  const handleClickInicio = () => {
    navigate("/");
  }

  const handleClickInfotour = () => {
    window.open("https://infotour.app/");
  }

  const handleClickGoogle = () => {
    signInWithPopup(auth, gProvider).then(async (result) => {
      setisLoadingGoogle(true);
      const user = result.user;
      try {
        const random = () => Math.floor(Math.random() * 100);
        const randomStr = Array.from({ length: 7 }, () => random()).join('');
        const username = user.displayName ?? ('usuario' + randomStr.substring(0, 6));
        const email = user.email ?? '';
        var id = user.uid ?? randomStr;
        var pass = encodePass(email);
        if (email.trim() === '') {
          setisLoadingGoogle(false)
          alert("Correo inválido, intente con otra cuenta")
          return;
        }
        const params = {
          "id": id,
          "pass": pass,
          "servicio": Config.SERVICIO,
          "metodo": Config.METODO_EX_GO,
          "username": username,
          "nombre": username,
          "email": email,
          "id_servicio": Config.IDSERVICIO,
          "id_metodo": Config.IDMETODO_EX_GO,
        }
        try {
          await loginRemote(params)
            .then((result) => {
              setisLoadingGoogle(false)
              if (result) {
                window.location.reload();
              } else {
                setisLoadingGoogle(false)
                alert("Ha ocurrido un error, intente nuevamente")
              }
            })
            .catch((error) => {})

        } catch (error) {
          setisLoadingGoogle(false)
          console.error("Error:", error);
        }
      } catch (e) {

      }
    }).catch((error) => {
    });
  }

  const handleClickFacebook = () => {
    if (!isLoadingFB) {
      signInWithPopup(auth, fProvider)
        .then(async (result) => {
          setIsLoadingFB(true);
          // The signed-in user info.
          const user = result.user;
          try {
            const random = () => Math.floor(Math.random() * 100);
            const randomStr = Array.from({ length: 7 }, () => random()).join('');
            const username = user.displayName ?? ('usuario' + randomStr.substring(0, 6));
            const email = user.email ?? '';
            var id = user.uid ?? randomStr;
            var pass = encodePass(email);
            if (email.trim() === '') {
              setIsLoadingFB(false)
              alert("Correo inválido, intente con otra cuenta")
              return;
            }
            const params = {
              "id": id,
              "pass": pass,
              "servicio": Config.SERVICIO,
              "metodo": Config.METODO_EX_FB,
              "username": username,
              "nombre": username,
              "email": email,
              "id_servicio": Config.IDSERVICIO,
              "id_metodo": Config.IDMETODO_EX_FB,
            }
            try {
              await loginRemote(params)
                .then((result) => {
                  setIsLoadingFB(false)
                  if (result) {
                    navigate(-1)
                  } else {
                    setIsLoadingFB(false)
                    alert("Ha ocurrido un error, intente nuevamente")
                  }
                })
                .catch((error) => { })

            } catch (error) {
              setIsLoadingFB(false)
              console.error("Error:", error);
            }
          } catch (e) {

          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = FacebookAuthProvider.credentialFromError(error);
        });
    }
  }


  return (
    <header className="bg-greenVE-500">
      <div className="flex mx-auto max-w-6xl py-2 px-4 sm:px-6 lg:px-8">
        {
          !codigo && <div className="w-2/12 flex cursor-pointer" onClick={handleClickLogo}>
            <img src="https://visitaecuador.com/img/web/ve_logo.svg" style={{ width: "110px", height: "auto" }} />
          </div>
        }
        <div className={`flex flex-col  ${codigo ? "w-full" : "w-10/12"} justify-between `}>
          <div className="flex gap-2 justify-end items-center">
            <a className="flex gap-1 text-white border-white rounded-full border-2 px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-300" href="/smart/">
              Registrar alojamiento
            </a>
            <div className="flex justify-center">
              {(nivel === "visitante" || nivel === "gratuito") && (
                <button className="flex gap-1 text-greenVE-600 bg-white rounded-full px-5 py-1 text-xs hover:border-gray-300 hover:text-gray-500" onClick={handleClickSuscribing}>
                  Suscribirse
                </button>
              )}
              {
                (openSuscription) && (
                  <ClickAwayListener onClickAway={handleClickSuscribing}>
                    <div className="md:absolute z-50 bg-white flex flex-col items-start py-2 top-10  gap-2 shadow-2xl rounded-md ">
                      {
                        (nivel === "visitante") && (
                          <>
                            <div className="bg-greenVE-500 flex flex-col items-center justify-center rounded-xl w-[250px] mx-4 mt-2 cursor-pointer" onClick={()=>setOpenConvenios(!openConvenios)}>
                              <div className="flex items-center">
                                <label className="px-4 text-xs py-1 w-full text-center items-center gap-2  text-white -mr-4 cursor-pointer">Convenios Especiales</label>
                                <span class={`${openConvenios?"icon-[iconamoon--arrow-up-2-bold]":"icon-[iconamoon--arrow-down-2-bold]"} h-5 w-5 text-white`}></span>
                              </div>
                              {
                                !openConvenios
                                  ? <div className="flex w-full px-6 pb-2 justify-between">
                                    <div className="rounded-full bg-white h-7 w-7 p-1">
                                      <img src="https://visitaecuador.com/img/web/ba_logo.jpg" />
                                    </div>
                                    <div className="rounded-full bg-white h-7 w-7 p-1.5">
                                      <img src="https://visitaecuador.com/img/web/ja_logo.png" />
                                    </div>
                                    <div className="rounded-full bg-white h-7 w-7 p-1">
                                      <img src="https://visitaecuador.com/img/web/cpn_logo.jpg" />
                                    </div>
                                    <div className="rounded-full bg-white h-7 w-7 p-1 pt-2">
                                      <img src="https://visitaecuador.com/img/web/pp_logo.png" />
                                    </div>
                                    <div className="rounded-full bg-white h-7 w-7">
                                      <img src="https://visitaecuador.com/img/web/bp_logo.png" />
                                    </div>
                                  </div>
                                  :<div className="flex flex-col gap-2 pb-2">
                                    <label className="px-4 text-xxs py-1 w-full text-center items-center gap-2  text-white -mt-2 cursor-pointer">Continuar con...</label>
                                    <div className="rounded-full bg-white p-1 flex  items-center w-full" onClick={(event)=>{window.open("/convenio/bda", '_self'); }}>
                                      <img src="https://visitaecuador.com/img/web/ba_logo.jpg" className="h-6 w-6 pl-1" />
                                      <label className="px-1 text-xs py-1 w-full text-left items-center cursor-pointer">Banco del Austro</label>
                                    </div>
                                    <div className="rounded-full bg-white p-1 flex w-full items-center" onClick={(event)=>{window.open("/convenio/cja", "_self");}}>
                                      <img src="https://visitaecuador.com/img/web/ja_logo.png" className="h-5 w-6 pl-1 object-contain" />
                                      <label className="px-1 text-xs py-1  text-left items-center gap-2 cursor-pointer">Coop. Jardín Azuayo</label>
                                    </div>
                                    <div className="rounded-full bg-white p-1 flex w-full items-center" onClick={(event)=>{window.open("/convenio/cpn", '_self');}}>
                                      <img src="https://visitaecuador.com/img/web/cpn_logo.jpg" className="h-6 w-6 pl-1" />
                                      <label className="px-1 text-xs py-1  text-left items-center gap-2 cursor-pointer">Coop. Policía Nacional</label>
                                    </div>
                                    <div className="rounded-full bg-white p-1 flex w-full items-center" onClick={(event)=>{window.open("/convenio/pp", '_self');}}>
                                      <img src="https://visitaecuador.com/img/web/pp_logo.png" className="h-6 w-6 pl-2 object-contain " />
                                      <label className="px-1 text-xs py-1 text-left items-center gap-2 cursor-pointer">PayPhone</label>
                                    </div>
                                    <div className="rounded-full bg-white p-1 flex w-full items-center" onClick={(event)=>{window.open("/convenio/bp", '_self');}}>
                                      <img src="https://visitaecuador.com/img/web/bp_logo.png" className="h-6 w-6 object-contain " />
                                      <label className="px-1 text-xs py-1 w-[200px] text-left items-center gap-2 cursor-pointer">Banco Pichincha</label>
                                    </div>
                                  </div>
                              }
                            </div>
                            <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickSuscription}><div dangerouslySetInnerHTML={{ __html: icons.Data.Buy }} />Comprar suscripción</button>
                            <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickPack}><div dangerouslySetInnerHTML={{ __html: icons.Data.Gift }} />Activar VisitaPack</button>
                            <label className="text-xs font-medium text-center w-full">Prueba gratis con:</label>
                            <div className="flex justify-center items-center w-full gap-2  pb-3">
                              {
                                isLoadingGoogle
                                  ? <Spinner color="blue" className="text-greenVE-300"></Spinner>
                                  : <a dangerouslySetInnerHTML={{ __html: icons.Data['LoginGoogleSM'] }} className='border p-2 rounded-md hover:border-greenVE-500' onClick={() => handleClickGoogle()} />
                              }
                              {
                                isLoadingFB
                                  ? <Spinner color="blue" className="text-greenVE-300"></Spinner>
                                  : <a dangerouslySetInnerHTML={{ __html: icons.Data['LoginFacebookSM'] }} className='border p-2 rounded-md hover:border-greenVE-500' onClick={() => handleClickFacebook()} />
                              }
                            </div>
                          </>
                        )
                      }
                    </div>
                  </ClickAwayListener>)
              }
            </div>
            {
              nivel === "visitante" && (
                <button className="flex gap-1 text-greenVE-600 bg-white rounded-full px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-500" onClick={() => activo != 6 ? handleClickLogin() : {}}>
                  Iniciar Sesión
                </button>
              )
            }
            <div className="flex items-end justify-end">
              {(foto !== "" && nivel !== "visitante") && (
                <div className="flex gap-2 items-center cursor-pointer hover:bg-white hover:bg-opacity-20 hover:rounded-md p-1" onClick={() => handleClickProfile()}>
                  <img src={foto} className="rounded-full h-10 w-10 border-2 hidden md:block" />
                  <div className="flex flex-col ">
                    <label className="font-semibold text-white cursor-pointer">{nombre}</label>
                    <label className="capitalize text-xs text-white cursor-pointer">{nivel}</label>
                  </div>
                </div>
              )}
              {(nivel !== "visitante" && openProfile) && (
                <ClickAwayListener onClickAway={handleClickProfile}>
                  <div className="md:absolute z-50 bg-white flex flex-col items-start py-2 top-14  gap-2 shadow-2xl rounded-md ">
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickProfileSet}><div dangerouslySetInnerHTML={{ __html: icons.Data.Account }} /> Mi perfil</button>
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickBookHistory}><div dangerouslySetInnerHTML={{ __html: icons.Data.Historial }} /> Historial de Reservas</button>
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickFavorites}><div dangerouslySetInnerHTML={{ __html: icons.Data.Favorito }} /> Mis Favoritos</button>
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickAdministrador}><div dangerouslySetInnerHTML={{ __html: icons.Data.Administrador }} /> Administrador
                      {
                        isLoadingAdmin && <Spinner className="h-4 w-4" color="white"></Spinner>
                      }
                    </button>
                    {
                      beta && <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickAdministradorBeta}><div dangerouslySetInnerHTML={{ __html: icons.Data.Administrador }} /> Administrador (beta)
                        {
                          isLoadingAdminBeta && <Spinner className="h-4 w-4" color="white"></Spinner>
                        }
                      </button>
                    }
                    {
                      yaGanaste && <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickYaGanaste}><div dangerouslySetInnerHTML={{ __html: icons.Data.CrearUsuario }} /> Crear Suscripción</button>
                    }
                    {
                      dashboard && <button onClick={() => handleClickDashboard()} className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 flex items-center gap-2"><div dangerouslySetInnerHTML={{ __html: icons.Data.Dashboard }} />Dashboard</button>
                    }
                    <button onClick={() => handleClickLogOut()} className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 flex items-center gap-2"><div dangerouslySetInnerHTML={{ __html: icons.Data.Logout }} />Cerrar sesión
                      {
                        isLoagingLogOut && <Spinner className="h-4 w-4" color="white"></Spinner>
                      }
                    </button>
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className=" flex  justify-between">
            <div className="flex gap-2 items-end mt-4 sm:mt-0">
              <button className={`flex gap-1 border-2 ${(activo == null || activo == 1 ? "border-white" : "border-transparent")} text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white`} onClick={handleClickInicio} >
                <img src="https://visitaecuador.com/img/web/homeMenu.svg" style={{ height: "25px" }}></img>
                <label className="hidden md:flex cursor-pointer">Hospedaje</label>
              </button>
              <button className={`flex gap-1 border-2 ${activo == 2 ? "border-white" : "border-transparent"} text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white`} onClick={handleClickDisney}>
                <img src="https://visitaecuador.com/img/web/disneyMenu.svg" style={{ height: "25px" }}></img>
                <label className="hidden md:flex cursor-pointer">Disney Destination Concierge</label>
              </button>
              <button className={`flex gap-1 border-2 ${activo == 3 ? "border-white" : "border-transparent"} text-white hover:border-2 rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white`} onClick={handleClickInfotour}>
                <img src="https://visitaecuador.com/img/web/infotourMenu.svg" style={{ height: "25px" }}></img>
                <label className="hidden md:flex cursor-pointer">InfoTour</label>
              </button>
              <button className={`flex gap-1 border-2 ${activo == 4 ? "border-white" : "border-transparent"} text-white hover:border-2 rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white`} onClick={() => navigate("/nosotros")} onMouseOver={() => setOpenNosotros(true)} onMouseOut={() => setOpenNosotros(false)}>
                <img src="https://visitaecuador.com/img/web/nosotrosMenu.svg" style={{ height: "25px" }}></img>
                <label className="hidden md:flex cursor-pointer">Nosotros</label>
                {openNosotros && (
                  <ClickAwayListener onClickAway={() => setOpenNosotros(false)}>
                    <div className="md:absolute z-50  pt-2 top-[80px] -ml-12 ">
                      <div className="bg-white flex flex-col items-start py-2  gap-2 shadow-2xl rounded-md text-black">
                        <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={(event) => { navigate("/nosotros"); event.stopPropagation(); }}><span className="icon-[ph--user-circle-check] h-4 w-4"></span> Quienes somos</button>
                        <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={(event) => { window.open("https://visitaecuador.page.link/XktS"); event.stopPropagation(); }}><span className="icon-[material-symbols--download-for-offline-outline-rounded] h-4 w-4"></span> Descarga la App</button>
                        <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={(event) => { navigate("/contacto"); event.stopPropagation(); }}><span className="icon-[fluent--form-48-regular] h-4 w-4"></span> Contáctanos</button>
                        <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={(event) => { navigate("/politicas-privacidad"); event.stopPropagation(); }}><span className="icon-[carbon--vpn-policy] h-4 w-4"></span> Políticas de privacidad</button>
                        <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={(event) => { navigate("/terminos-condiciones"); event.stopPropagation(); }}><span className="icon-[iconoir--privacy-policy] h-4 w-4"></span> Términos y condiciones</button>
                      </div>
                    </div>
                  </ClickAwayListener>
                )}
              </button>
            </div>
            {
              !codigo && <MarcaPais />
            }
          </div>
        </div>
      </div>
    </header>
  )
};

export default Navbar;
