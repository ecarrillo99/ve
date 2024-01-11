import Config from "../../global/config";
import SuscripcionService from "../../services/suscripcion/SuscripcionService";

export const loginRemote = async function (params) {
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