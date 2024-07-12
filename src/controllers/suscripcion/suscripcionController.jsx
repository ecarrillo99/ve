import Config from "../../global/config";
import SuscripcionService from "../../services/suscripcion/SuscripcionService";

export const loginRemote = async function (params) {
    console.log(params);
    const isLogged=false;
    
    try{
        const suscripcionService = new SuscripcionService() ;
        const res = await suscripcionService.getInformacionPerfil(params);
        if(res.estado && res.codigo == 0){
            if(res.data.fin!=null){
                if(new Date(res.data.fin)<new Date()){
                    return <label>{"Cuenta caducada el "+res.data.fin}<br/> <a className="text-blue-500 underline cursor-pointer" href={window.location.origin+"/#/suscripcion"}>Renueva aquí</a></label>
                }
            }
            if (Object.values(res).length > 0) {
                localStorage.setItem('datos', JSON.stringify(res));
            }
            return res.estado
        }
        return false
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
            expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000));

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
        localStorage.removeItem('datos')
        // Expirar la cookie del administrador
        document.cookie = 'PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        const suscripcionService = new SuscripcionService() ;
        const res = await suscripcionService.cerrarSesion(params);
        if(res.estado&&res.codigo==0){
            return res.estado;
        }
        if(res.codigo==401){
            return 401;
        }

    }catch(e){}
}

export const gestionarSuscripcion=async function (params){
    try{
        const suscripcionService = new SuscripcionService() ;
        const res = await suscripcionService.registroTransaccion(params);
        console.log(res)
        if(res.estado){
            suscripcionService.sendNotificationSubscription({"id_suscripcion_renovacion":res.data.id_suscripcion_renovacion})
            return res;
        }
        return false;
    }
    catch(e){}
}

export const resetContrasenia=async function (tipo, valor){
    try{
        const params ={
            tipo: tipo,
            valor: valor,
            servicio: Config.SERVICIO
        }
        const suscripcionService = new SuscripcionService();
        const res = await suscripcionService.reenviarContrasena(params)
        if(res!=null){
            return res;
        }
    }catch(e){

    }
    return false;
}