import Config from "../../global/config";
import SuscripcionService from "../../services/suscripcion/SuscripcionService";

export const loginRemote = async function (user, pass, metodo) {
    console.log("ingresé")
    const isLogged=false;
    var metodoParams=-1;
    if(metodo=="interno"){
        metodoParams=Config.IDMETODO
    }
    const params={
        "id_metodo": Config.IDMETODO,
        "id_servicio": Config.IDSERVICIO,
        "id": user,
        "pass": pass,
        "servicio": Config.SERVICIO,
        "metodo": Config.METODO,
      }
    try{
        const suscripcionService = new SuscripcionService() ;
        const res = await suscripcionService.getInformacionPerfil(params).then();
        
        if(res.estado && res.codigo == 0){
            if (Object.values(res).length > 0) {
                localStorage.setItem('datos', JSON.stringify(res));
            }
            return res.estado
        }
    }catch(e){}
    console.log("salí")
}