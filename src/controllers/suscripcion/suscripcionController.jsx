import Config from "../../global/config";
import SuscripcionService from "../../services/suscripcion/SuscripcionService";

export const loginRemote = async function (params) {
    console.log(params);
    const isLogged=false;
    
    try{
        const suscripcionService = new SuscripcionService() ;
        const res = await suscripcionService.getInformacionPerfil(params);
        if(res.estado && res.codigo == 0){
            if (Object.values(res).length > 0) {
                localStorage.setItem('datos', JSON.stringify(res));
            }
            return res.estado
        }
    }catch(e){}
}

export const getPermissions= async function(idUsuario){
    try{
        const suscripcionService = new SuscripcionService();
        var bd = JSON.parse(localStorage.getItem('datos'))
        const params={
            "id_usuario":idUsuario
        }
        console.log(params)
        const res = await suscripcionService.setAdministrador(params);
        if(res.estado){
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1); 

            document.cookie = `PHPSESSID=${res.data};expires=${expirationDate.toUTCString()}`;
            return res.estado;
        }
        /*if(res.estado){s
            sessionStorage.setItem("login", JSON.stringify(res.data))
            for(const key in res.data){
                sessionStorage.setItem(key, JSON.stringify(res.data[key]));
            }
            sessionStorage.setItem("token",  bd['token']);
            sessionStorage.setItem("stIdEstablecimiento",  "");

            const res2= await suscripcionService.setAdministrador({"permisos":res.data["stPermisosUsuario"]})  
            console.log("Respuesta 2")
            console.log(res2)
        } */
        return false;
    }catch(e){
        console.log(e)
    }
}

export const endRemoteSession=async function (){
    try{
        var bd = JSON.parse(localStorage.getItem('datos'))
        var params = {
            "token": bd['token']
        }

        const suscripcionService = new SuscripcionService() ;
        const res = await suscripcionService.cerrarSesion(params);

        if(res.estado&&res.codigo==0){
            localStorage.removeItem('datos')
            return res.estado;
        }
        if(res.codigo==401){
            return 401;
        }

    }catch(e){}
}