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


export const getRemoteCities = async function (){
    try{
        const listaProvincias=[];
        const lugaresService= new LugaresService();
        const params={
            "id_pais":239
        }
        const res = await lugaresService.listaCiudades(params);
        if (res.estado) {
            for (const provinciaKey in res.data) {
                const listaCantones=[]
                const Provincia=new Detalle();
                Provincia.Titulo=provinciaKey;
                for(const cantonItem of res.data[provinciaKey]){
                    const Canton= new Detalle()
                    Canton.Titulo=cantonItem['nombre']
                    Canton.Valor=cantonItem['id_tbl_lugar']
                    listaCantones.push(Canton)
                }
                Provincia.Valor=listaCantones;
                listaProvincias.push(Provincia)
                console.log(provinciaKey)
            }
            return listaProvincias
        }
    }catch(e){

    }
}