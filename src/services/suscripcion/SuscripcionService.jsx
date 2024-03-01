import Config from "../../global/config";
import GenericService from "../service";

class SuscripcionService extends GenericService{
    async actualizarFoto(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERAPP}setImgPerfil/`;
        return await this.post(url, params);
    }
    async getInformacionPerfil(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}loginpost/`;
        return await this.post(url, params);
    }
    async getPermisos(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}obtenerPermisos/`;
        return await this.post(url, params);
    }
    async setAdministrador(params){
        const url = `https://visitaecuador.com/ve/librerias/funciones/autorizacionAdmin.php`;
        return await this.post(url, params);
    }
    async renovacionUsuario(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}enviarsolicitudrenovacion/`;
        return await this.post(url, params);
    }
    async actualizarCedula(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}actualizarCedulaTelefono/`;
        return await this.post(url, params);
    }
    async suscripcionUsuario(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}enviarsolicitudsuscripcion/`;
        return await this.post(url, params);
    }
    async cerrarSesion(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}cerrarsesionpost/`;
        return await this.post(url, params);
    }
    async refrescarToken(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}refrescartokenpost/`;
        return await this.post(url, params);
    }
    async eliminarCuenta(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}down/`;
        return await this.post(url, params);
    }
    async reenviarContrasena(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}solicitarcontrasena/`;
        return await this.post(url, params);
    }
    async servicioTerminos(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}verpoliticas/`;
        return await this.post(url, params);
    }
    async aceptoTerminos(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}aceptarcondiciones/`;
        return await this.post(url, params);
    }
    async getInformacionCashback(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}getCashBackResumenPorCliente/`;
        return await this.post(url, params);
    }
    async getInformacionAmigosCashback(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}getRedPorCliente/`;
        return await this.post(url, params);
    }
    async getEstadoRecurrencia(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}getEstadoRecurrencia/`;
        return await this.post(url, params);
    }
    async setEstadoRecurrencia(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}setEstadoRecurrencia/`;
        return await this.post(url, params);
    }
    async registroTransaccion(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}gestionarSuscripcion/`;
        return await this.post(url, params);
    }
    async sendNotificationSubscription(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}sendNotificacionSuscripcion/`;
        return await this.post(url, params);
    }
    async getCodigoVentas(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}getMiCodigoPromocional/`;
        return await this.post(url, params);
    }
    async verificarSuscripcion(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}getInformacion/`;
        return await this.post(url, params);
    }
    async setEventosWa(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}setEventosWa/`;
        return await this.post(url, params);
    }
    async getEventosWa(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}getEventosWa/`;
        return await this.post(url, params);
    }
    async setEventosWaConcierge(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}setEventosWaConcierge/`;
        return await this.post(url, params);
    }
    async getEventosWaConcierge(params){
        const url = `${Config.URL_SERVICIOS}${Config.VERSUS}getEventosWaConcierge/`;
        return await this.post(url, params);
    }
}
export default SuscripcionService;