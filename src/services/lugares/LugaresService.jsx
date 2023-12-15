import Config from "../../global/config";
import GenericService from "../service";

class LugaresService extends GenericService{
    async listaPaises(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERLUG}paises/`;
        return await this.post(url, params);
    }

    async listaCiudades(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERLUG}ciudades/`;
        return await this.post(url, params);
    }

    async getLugarParams(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERLUG}meta/`;
        return await this.post(url, params);
    }
}

export default LugaresService;