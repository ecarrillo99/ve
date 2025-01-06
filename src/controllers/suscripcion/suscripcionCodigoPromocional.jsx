import Config from "../../global/config";
import ContactoService from "../../services/contacto/ContactoService";
import { SuscripcionProducto } from "./suscripcionProductoController";

export const CheckPromocionalCode = async function({codigo, convenio=""}) {
    try {
        const contactoService = new ContactoService();
        var idCodigo;
        const params = {
            "id_servicio": Config.IDSERVICIO,
            "codigo": codigo
        };

        const res = await contactoService.verificarCodigo(params);

        if (res.estado) {
            switch(convenio){
                case "bda":
                    switch (res.data.id_codigo_promocional) {
                        case 91123:
                            idCodigo = 91123; //Código  pruebas POLITO1
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            break;
                        case 4:
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            idCodigo=91128; //Código BDA sin beneficios
                            break;
                        default:
                            idCodigo=91758;//Código BDA con beneficios
                    }
                    //res.data.vendedor.id_suscripcion_vendedor=4380;
                    //res.data.vendedor.id_usuario_vendedor=4655;
                    break;
                case "cja":
                    switch(res.data.id_codigo_promocional){
                        case 91123:
                            idCodigo=91123; //Código CJA empleados
                            res.data.beneficio=[]; // No obtiene beneficios
                            break;
                        case 91139:
                            idCodigo=91139; //Código CJA pruebas POLITO1
                            res.data.beneficio=[]; //No obtiene beneficios
                            break;
                        case 4:
                            idCodigo=91096; //Código CJA sin beneficos
                            res.data.beneficio=[]; //No obtiene beneficios
                            break;
                        default:
                            idCodigo=91759; //Código CJA con beneficios
                    }
                    //res.data.vendedor.id_suscripcion_vendedor=84402;
                    //res.data.vendedor.id_usuario_vendedor=124035;
                    break;
                case "cpn":
                    switch (res.data.id_codigo_promocional) {
                        case 91123:
                            idCodigo = 91123; //Código  pruebas POLITO1
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            break;
                        case 4:
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            idCodigo=75057; //Código CPN sin beneficios
                            break;
                        default:
                            idCodigo=91760;//Código CPN con beneficios
                    }
                    //res.data.vendedor.id_suscripcion_vendedor=75429;
                    //res.data.vendedor.id_usuario_vendedor=89994;
                    break;
                case "pp":
                    switch (res.data.id_codigo_promocional) {
                        case 91123:
                            idCodigo = 91123; //Código  pruebas POLITO1
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            break;
                        case 4:
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            idCodigo=73793; //Código PayPal sin beneficios
                            break;
                        default:
                            idCodigo=91761;//Código PayPal con beneficios
                    }
                    //res.data.vendedor.id_suscripcion_vendedor=74163;
                    //res.data.vendedor.id_usuario_vendedor=88627;
                    break;
                case "bp":
                    switch (res.data.id_codigo_promocional) {
                        case 91123:
                            idCodigo = 91123; //Código  pruebas POLITO1
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            break;
                        case 4:
                            res['data']['beneficio'] = []; //No obtiene beneficios
                            idCodigo = 91776; //Código Banco Pichincha sin beneficios
                            break;
                        default:
                            idCodigo = 91777; //Código Banco Pichincha  con beneficios
                    }
                    //res.data.vendedor.id_suscripcion_vendedor=74163;
                    //res.data.vendedor.id_usuario_vendedor=88627;
                    break;
                default:
                    idCodigo=res.data.id_codigo_promocional;
                    break;
            }
            const result = await SuscripcionProducto(idCodigo);
            if (result) {
                return {
                    codigo:res.data,
                    productos: result
                };
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        ;
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
        ;
    }
};
