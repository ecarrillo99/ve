import Config from "../../global/config";
import GenericService from "../service";

class PerfilService extends GenericService{
    async obtenerDatosPersonales(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}obtenerDatosPersonales/`;
        return await this.post(url, params);
    }
    async actualizarFoto(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERAPP}setImgPerfil/`;
        return await this.post(url, params);
    }
    async modificarDatosPersonales(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}modificarDatosPersonales/`;
        return await this.post(url, params);
    }
}

export default PerfilService;