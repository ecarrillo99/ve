import Config from "../../global/config";
import ContactoService from "../../services/contacto/ContactoService";
import { SuscripcionProducto } from "./suscripcionProductoController";

export const CheckPromocionalCode = async function(codigo) {
    try {
        const contactoService = new ContactoService();
        const params = {
            "id_servicio": Config.IDSERVICIO,
            "codigo": codigo
        };

        const res = await contactoService.verificarCodigo(params);

        if (res.estado) {
            const result = await SuscripcionProducto(res.data.id_codigo_promocional);
            if (result) {
                return result;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
};

export const validatePromocionalCode = async function(codigo) {
    try {
        const contactoService = new ContactoService();
        const params = {
            "id_servicio": Config.IDSERVICIO,
            "codigo": codigo
        };

        const res = await contactoService.verificarCodigo(params);

        if (res.estado) {
            return res;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
};
