import Config from "../../global/config";
import GenericService from "../service";

class InfoService extends GenericService{
    async obtenerNoticias(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERINFO}getNoticias/`;
        return await this.post(url, params);
    }
    async obtenerImágenesHoteles(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}getHotelesActivos/`;
        return await this.post(url, params);
    }
    async obtenerActividadReservas(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERINFO}getActividadReservas/`;
        return await this.post(url, params);
    }
    async obtenerDestinoExpress(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERINFO}destinoExpress/`;
        return await this.post(url, params);
    }
}

export default InfoService