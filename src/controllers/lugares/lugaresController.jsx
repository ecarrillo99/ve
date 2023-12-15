import Config from "../../global/config";
import Detalle from "../../models/Detalle";
import LugaresService from "../../services/lugares/LugaresService"

export const getRemoteCountries = async function (){
    try{
        const listaPaises=[];
        const lugaresService= new LugaresService();
        const params={
            "id_servicio":Config.IDSERVICIO
        }
        const res = await lugaresService.listaPaises(Config.IDSERVICIO);
        if (res.estado) {
            for (const pais of res.data.paises) {
                const paisTmp= new Detalle();
                paisTmp.Titulo=pais['nombre'];
                paisTmp.Icono=pais['codigo_marcacion']
                paisTmp.Valor=pais['id_lugar']
                listaPaises.push(paisTmp)
            }
            return listaPaises
        }
    }catch(e){

    }
}