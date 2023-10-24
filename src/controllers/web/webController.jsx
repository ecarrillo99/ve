import WebService from "../../services/web/WebService";

export const DefaultToken = async function (deviceid){
    var token=false
    var params={
        "udid":deviceid
    }
    try{
        const webService = new WebService;
        const datos = await webService.getDefaultToken(params);
        //console.log("Datos: "+JSON.stringify(datos))
        if (datos.estado && datos.codigo == 0) {   // falso
            if (Object.values(datos).length > 0) {     
                var _values =
                {
                    "token": datos['token'],
                    "tipoUsuario": -1, //visitante:-1 gratis:0 suscriptor:1
                    "permisos": datos['data']['permisos'],
                    "identificador": datos['identificador'],
                };     
                sessionStorage.setItem('datos', JSON.stringify(datos));    
            }
            token=true
            return token;
        }    
    }catch(e){
        console.log(e)
    }
}