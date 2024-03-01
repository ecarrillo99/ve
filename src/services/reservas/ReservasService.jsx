import Config from "../../global/config";
import GenericService from "../service";

class ReservasService extends GenericService{
    async getHistorialReservas(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}reservas/`;
        return await this.post(url, params)
    }
    async getCertificadoReserva(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}getCertificadoReserva/`;
        return await this.post(url, params);
    }
}

export default ReservasService;