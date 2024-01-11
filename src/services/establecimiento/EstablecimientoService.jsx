import Config from "../../global/config";
import GenericService from "../service";

class EstablecimientoService extends GenericService{
    async getEstablecimientoDestino(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}getEstablacimientoDestinoPost/`;
        return await this.post(url, params);
    }

    async filtro(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}filtropost/`;
        return await this.post(url, params);
    }

    async agregarFavorito(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}guardarFavorito/`;
        return await this.post(url, params);
    }

    async cambiarEstadoFavorito(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}setHotelFavorito/`;
        return await this.post(url, params);
    }

    async eliminarFavorito(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}eliminarFavorito/`;
        return await this.post(url, params);
    }

    async getFavoritos(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}getHotelesFavoritos/`;
        return await this.post(url, params);
    }

    async verOfertasFavoritas(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}verOfertasFavoritas/`;
        return await this.post(url, params);
    }

    async getDetalleOferta(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}ofertapost/`;
        return await this.post(url, params);
    }

    async getOfertasPublicidad(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}ofertasPublicidadpost/`;
        return await this.post(url, params);
    }

    async getOfertasPublicidadItour(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}ofertasPublicidadInfoTourPost/`;
        return await this.post(url, params);
    }

    async getOfertasPorEstablecimiento(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}ofertasPorEstablecimientopost/`;
        return await this.post(url, params);
    }

    async generarOfertaPdf(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}generarOfertaPdf/`;
        return await this.post(url, params);
    }

    async reserva(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}reservar/`;
        return await this.post(url, params);
    }

    async getSugerenciaST(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}getEstablacimientoDestinoPost_SK/`;
        return await this.post(url, params);
    }

    async getOfertasST(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}filtropost_SK/`;
        return await this.post(url, params);
    }

    async getDetalleST(params){
        const url = `${Config.URL_SERVICIOS}${Config.VEREST}establecimientopost_SK/`;
        return await this.post(url, params);
    }
}

export default EstablecimientoService;