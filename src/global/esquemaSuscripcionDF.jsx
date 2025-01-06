import Config from "./config";

export function generarEsquemaSusDF(datos) {
    var esquema = {
        id_empresa: Config.IDEMPRESA,
        tiempo: 5,
        canal: "web",
        aceptocondiciones: 1,
        notificar: false,
        verificar: false,
        id_servicio: Config.IDSERVICIO,
        metodo: "visitaecuador",
        personal: {
            ci: datos?.customer?.identificationDocId || "",
            nombres: datos?.customer?.givenName || "",
            celular: datos?.customer?.phone || "",
            email: datos?.customer?.email || "",
            pais: Config.IDPAIS,
            ciudad: 297,
        },
        producto: {
            id_codigo_promocional: datos?.customParameters?.id_codigo_promocional || "",
            beneficio_cantidad_tiempo: datos?.customParameters?.beneficio_cantidad_tiempo || 0,
            beneficio_tipo_tiempo: datos?.customParameters?.beneficio_tipo_tiempo || 0,
            id_usuario_vendedor: datos?.customParameters?.id_usuario_vendedor || "",
            id_suscripcion_vendedor: datos?.customParameters?.id_suscripcion_vendedor || "",
            cantidad: 1,
            fecha_final: "",
            precio: parseFloat(datos?.amount || 0).toFixed(2),
            id_producto: datos?.customParameters?.id_producto || "",
            id_lista_precio_producto: datos?.customParameters?.id_lista_precio_producto || "",
            id_prod_suscripcion: datos?.customParameters?.id_prod_suscripcion || "",
            id_tipo_canal: datos?.customParameters?.id_tipo_canal || "",
            pago: [
                {
                    tipo_pago: datos?.customParameters?.tipo_pago || 0,
                    id_prepago: 0,
                    tipo_pago_boton: datos?.customParameters?.tipo_pago_boton || 0,
                    intereses: datos?.customParameters?.SHOPPER_interes === "0" ? "2" : "1",
                    diferido: datos?.recurring?.numberOfInstallments || 0,
                    envio: 0,
                    subtotal: parseFloat(datos?.customParameters?.SHOPPER_VAL_BASEIMP || 0).toFixed(2),
                    iva: parseFloat(datos?.customParameters?.SHOPPER_VAL_IVA || 0).toFixed(2),
                    total: parseFloat(datos?.amount || 0).toFixed(2),
                    cuenta: {
                        nombreTitular: datos?.customer?.givenName || "",
                        id_diferido: datos?.customParameters?.id_diferido || 0,
                        datapago: datos?.id || "",
                    },
                    transaccion: datos || {},
                },
            ],
        },
    };

    return esquema;
}
