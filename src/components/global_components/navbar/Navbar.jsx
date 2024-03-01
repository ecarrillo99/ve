import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import { useState } from "react";
import { endRemoteSession, getPermissions, loginRemote } from "../../../controllers/suscripcion/suscripcionController";
import { ClickAwayListener } from "@material-ui/core";
import { Spinner } from "@material-tailwind/react";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";
import encodePass from "../../../global/encodePass";
import Config from "../../../global/config";

const icons = new Icons();

const Navbar = ({activo}) => {
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
  const [openSuscription, setOpenSuscription] = useState(false);
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const nombre = session ? session.data.nombre:"";
  const foto = session ? (session.data.fotos ? session.data.fotos.m : "") : "";
  const [isLoadingAdmin, setLoadingAdmin]=useState(false);
  const [isLoadingGoogle, setisLoadingGoogle] = useState(false)
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false)
  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();

  const handleClickAdministrador=()=>{
    if(!isLoadingAdmin){
      setLoadingAdmin(true);
      getPermissions(session.data.id_usuario).then((result)=>{
        if(result){
          window.open("/ve/administrador");
          setLoadingAdmin(false);
        }
      })
    }
  }

  const handleClickProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleClickSuscribing=()=>{
    setOpenSuscription(!openSuscription);
  }

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

  const handleClickDisney=()=>{
    navigate("/disney");
  }

  const handleClickInicio=()=>{
    navigate("/");
  }

  const handleClickInfotour=()=>{
    window.open("https://infotour.app/");
  }

  const handleClickGoogle=()=>{
    signInWithPopup(auth, gProvider).then(async (result)=>{
        setisLoadingGoogle(true);
        const user = result.user;
        try{
            const random = () => Math.floor(Math.random() * 100);
            const randomStr = Array.from({ length: 7 }, () => random()).join('');
            const username = user.displayName ?? ('usuario' + randomStr.substring(0, 6));
            const email = user.email??'';
            var id = user.uid??randomStr;
            var pass = encodePass(email);
            if (email.trim() === '') {
                setisLoadingGoogle(false)
                alert("Correo inválido, intente con otra cuenta")
                return;
            }
            const params={
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
                        if(result){
                          window.location.reload();
                        }else{
                            setisLoadingGoogle(false)
                            alert("Ha ocurrido un error, intente nuevamente")
                        }
                    })
                    .catch((error) => { console.log(error) })

            } catch (error) {
                setisLoadingGoogle(false)
                console.error("Error:", error);
            }
        }catch(e){

        }
    }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <header className="bg-greenVE-500">
      <div className="flex mx-auto max-w-6xl py-2 px-4 sm:px-6 lg:px-8">
        <div className="w-2/12 flex cursor-pointer" onClick={handleClickLogo}>
          <img src="/img/ve_logo.svg" style={{ width: "110px", height: "auto" }} alt="Logo" />
        </div>
        <div className="flex flex-col w-10/12 justify-between ">
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
              (openSuscription)&&(
                <ClickAwayListener onClickAway={handleClickSuscribing}>
                  <div className="md:absolute z-50 bg-white flex flex-col items-start py-2 top-14  gap-2 shadow-2xl rounded-md ">
                    {
                      (nivel === "visitante")&&(
                        <>
                          <label className="text-xs font-medium text-center w-full">Prueba gratis con:</label>
                          <div className="flex justify-center items-center w-full gap-2  pb-3">
                            {
                              isLoadingGoogle
                              ?<Spinner color="blue" className="text-greenVE-300"></Spinner>
                              :<a  dangerouslySetInnerHTML={{ __html: icons.Data['LoginGoogleSM'] }} className='border p-2 rounded-md hover:border-greenVE-500' onClick={()=>handleClickGoogle()} />
                            }
                            {
                              isLoadingFacebook
                              ?<Spinner color="blue" className="text-greenVE-300"></Spinner>
                              :<a  dangerouslySetInnerHTML={{ __html: icons.Data['LoginFacebookSM'] }} className='border p-2 rounded-md hover:border-greenVE-500' />
                            }
                          </div>
                        </>
                      )
                    }
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickSuscription}><div dangerouslySetInnerHTML={{ __html: icons.Data.Buy }}/>Comprar suscripción</button>
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickBookHistory}><div dangerouslySetInnerHTML={{ __html: icons.Data.Gift}}  />Activar VisitaPack</button>
                  </div>
                </ClickAwayListener>)
            }
            </div>
            {
              nivel === "visitante" && (
                <button className="flex gap-1 text-greenVE-600 bg-white rounded-full px-3 py-1 text-xs hover:border-gray-300 hover:text-gray-500" onClick={() => handleClickLogin()}>
                  Iniciar Sesión
                </button>
              )
            }
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
                    <button className="hover:bg-greenVE-200 px-4 text-xs py-1 w-full text-start flex items-center gap-2" onClick={handleClickAdministrador}><div dangerouslySetInnerHTML={{ __html: icons.Data.Administrador }}  /> Administrador
                    {
                      isLoadingAdmin?<Spinner className="h-4 w-4" color="white"></Spinner>:<></>
                    }
                    </button>
                    <button onClick={() => handleClickLogOut()} className="hover:bg-greenVE-200 w-full px-4 text-xs py-1 flex items-center gap-2"><div dangerouslySetInnerHTML={{ __html: icons.Data.Logout }}  />Cerrar sesión</button>
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
          <div className="flex gap-2 items-end mt-4 sm:mt-0">
            {
              activo==null||activo==1?(
                <button className="flex gap-1 text-white border-2 border-white rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300" onClick={handleClickInicio} >
                <img src="/img/homeMenu.svg" style={{height:"25px"}}></img>
                  <label className="hidden md:flex cursor-pointer">Hospedaje</label>
                </button>
              ):(
                <button className="flex gap-1 border-2 border-transparent text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white" onClick={handleClickInicio} >
                <img src="/img/homeMenu.svg" style={{height:"25px"}}></img>
                  <label className="hidden md:flex cursor-pointer">Hospedaje</label>
                </button>
              )
            }
            {
              activo==2?(
                <button className="flex gap-1 text-white border-2 border-white rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300" onClick={handleClickDisney}>
                  <img src="/img/disneymenu.svg"  style={{height:"25px"}}></img>
                  <label className="hidden md:flex cursor-pointer">Disney Destination Concierge</label>
                </button>
              ):(
                <button className="flex gap-1 border-2 border-transparent text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white" onClick={handleClickDisney}>
                  <img src="/img/disneymenu.svg"  style={{height:"25px"}}></img>
                  <label className="hidden md:flex cursor-pointer">Disney Destination Concierge</label>
                </button>
              )
            }
            {
              activo==3?(
                <button className="flex gap-1 text-white border-2 border-white rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300" onClick={handleClickInfotour}>
                  <img src="/img/infotourMenu.svg" style={{height:"25px"}}></img>
                  <label className="hidden md:flex cursor-pointer">InfoTour</label>
                </button>
              ):(
                <button className="flex gap-1 border-2 border-transparent text-white hover:border-2 rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white" onClick={handleClickInfotour}>
                  <img src="/img/infotourMenu.svg" style={{height:"25px"}}></img>
                  <label className="hidden md:flex cursor-pointer">InfoTour</label>
                </button>
              )
            }
          </div>
        </div>
      </div>
    </header>

  )
};

export default Navbar;
