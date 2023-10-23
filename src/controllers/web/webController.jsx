import WebService from "../../services/web/WebService";

export const DefaultToken = async function (deviceid){
    var params={
        "udid":deviceid
    }
    try{
        const webService = new WebService;
        const datos = await webService.getDefaultToken(params);
        console.log("Datos: "+JSON.stringify(datos))
        if (!datos.estado) {   // falso               
            
            
        } else if (datos.estado && datos.codigo == 0) {   //verdadero          
        }        
    }catch(e){
        console.log(e)
    }
}