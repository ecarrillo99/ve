import { useNavigate } from "react-router-dom"
import Icons from "../../../global/icons"
import "./navbar.css"
import { useState } from "react"
import { endRemoteSession } from "../../../controllers/suscripcion/suscripcionController"
const icons = new Icons()
const Navbar = () => {
  const navigate = new useNavigate()
  const handleClickLogin=()=>{
    navigate('/login')
  }
  const [openProfile, setOpenProfile]=useState(false)
  const session=JSON.parse(localStorage.getItem('datos'));
  const nivel=session?session.data.nivel:"visitante"
  const foto=session?session.data.fotos?session.data.fotos.m:"":""
  console.log(foto)

  const handleClickProfile=()=>{
    setOpenProfile(!openProfile)
  }

  const handleClickLogOut=()=>{
    try{
      endRemoteSession()
        .then((result)=>{
          if(result){
            window.location.reload();
            console.log("reload");
          }
        })
    }catch (error) {
      console.error("Error:", error);
    }
  }
  
  return (
    <div className="bg-greenVE-500">
      <div className="flex mx-auto max-w-6xl py-0 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-3 w-full">
          <div className="flex justify-between items-center">
            <img src="/img/ve_logo.svg" style={{ width: "75px", height: "auto" }} />
            <div className="flex gap-2 items-center">
              <button className="flex gap-1 text-white  rounded-3xl px-3 py-1.5 text-sm hover:border-gray-300 hover:text-gray-300">Registrar alojamiento</button>
              {
                (nivel=="visitante"||nivel=="gratuito")&&<button className="flex gap-1 text-greenVE-600 bg-white rounded-lg px-3 py-1.5 text-sm hover:border-gray-300 hover:text-gray-500">Adquirir Suscripción</button>
              }
              {
                nivel=="visitante"&&<button className="flex gap-1 text-greenVE-600 bg-white rounded-lg px-3 py-1.5 text-sm hover:border-gray-300 hover:text-gray-500" onClick={()=>handleClickLogin()}>Inciar Sesion</button>
              }
              {
                <div className="flex items-center">
                  {
                    (foto!=""&&nivel!="visitante")&&(
                    <img src={foto} className="rounded-full h-12 w-12 border-2 cursor-pointer" onClick={()=>handleClickProfile()}></img>
                    
                    )
                  }
                  {
                    (nivel!="visitante"&&openProfile)&&
                    <div className="absolute z-50 bg-white flex flex-col top-16 -ml-12 shadow-lg rounded-md gap-0.5">
                    <button className="hover:bg-greenVE-200 px-4 hover:rounded-t-lg">Mi perfil</button>
                    <div className="border"></div>
                    <button className="hover:bg-greenVE-200 px-4">Mis Favoritos</button>
                    <div className="border"></div>
                    <button className="hover:bg-greenVE-200 px-4">Administrador</button>
                    <div className="border"></div>
                    <button onClick={()=>handleClickLogOut()} className="hover:bg-greenVE-200 px-4 hover:rounded-b-lg">Cerrar sesión</button>
                  </div>
                  }
                </div>
              }
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex gap-1 text-white border-2 rounded-3xl px-3 py-1.5 text-sm hover:border-gray-300 hover:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: icons.Data['Cama'] }} className='' />
              <label>Hospedaje</label>
            </button>
            <button className="flex gap-1 text-white border-2 rounded-3xl px-3 py-1.5 text-sm hover:border-gray-300 hover:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: icons.Data['Disney'] }} className='' />
              <label>Disney Destination Concierge</label>
            </button>
            <button className="flex gap-1 text-white border-2 rounded-3xl px-3 py-1.5 text-sm hover:border-gray-300 hover:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: icons.Data['InfoTour'] }} className='' />
              <label>InfoTour</label>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar