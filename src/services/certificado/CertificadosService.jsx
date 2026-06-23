import Config from "../../global/config";
import GenericService from "../service";


class CertificadoService extends GenericService {

    async listarCertificados(params) {
        const url = `${Config.URL_SERVICIOS}${Config.CERT}listarCertificados/`;
        return await this.post(url, params);
    }

    async crearCertificado(params) {
        const url = `${Config.URL_SERVICIOS}${Config.CERT}crearCertificado/`;
        return await this.post(url, params);
    }

    async obtenerCertificado(params) {
        const url = `${Config.URL_SERVICIOS}${Config.CERT}obtenerCertificado/`;
        return await this.post(url, params);
    }

    async actualizarCertificado(params) {
        const url = `${Config.URL_SERVICIOS}${Config.CERT}actualizarCertificado/`;
        return await this.post(url, params);
    }

    async eliminarCertificado(params) {
        const url = `${Config.URL_SERVICIOS}${Config.CERT}eliminarCertificado/`;
        return await this.post(url, params);
    }

    async marcarCertificadoUsado(params) {
        const url = `${Config.URL_SERVICIOS}${Config.CERT}marcarCertificadoUsado/`;
        return await this.post(url, params);
    }
}

export default CertificadoService;