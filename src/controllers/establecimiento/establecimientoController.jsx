import OfertaInicio from "../../models/OfertaInicio";
import EstablecimientoService from "../../services/establecimiento/EstablecimientoService";
import WebService from "../../services/web/WebService";

export const getRemoteOfertas = async function (){
    const listadoOfertas = [];
    try{
        const establecimientoService = new EstablecimientoService;
        var bd=JSON.parse(sessionStorage.getItem('datos'))   
        //console.log("Datos: "+JSON.stringify(datos))
        var params = {
            "token":bd['token']
        }
        const res = await establecimientoService.getOfertasPublicidad(params);
        if (res.estado && res.codigo == 0) {   // falso
            if (Object.values(res).length > 0) {     
                var establecimientos = res['data']['establecimientos']
                var ofertas = res['data']['ofertas']
                var url=res['data']['url']['oferta']
                for(const oferta of ofertas ){
                    const ofertaInicio = new OfertaInicio(
                        oferta['id_oferta'],
                        url+oferta['foto'],
                        oferta['final'],
                        oferta['ciudad'],
                        establecimientos[oferta['id_establecimiento']]['titulo'],
                        oferta['tituloOferta'],
                        oferta['noches'],
                        oferta['dias'],
                        oferta['adultos'],
                        oferta['ninos'],
                    )
                    listadoOfertas.push(ofertaInicio)
                }
                return listadoOfertas
            }
        }    
    }catch(e){
        console.log(e)
    }
}