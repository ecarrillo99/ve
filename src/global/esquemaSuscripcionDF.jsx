import Config from "./config";

export function generarEsquemaSusDF(datos){
    var esquema= {
        id_empresa:Config.IDEMPRESA,
        tiempo:5,
        canal:"web",
        aceptocondiciones:1,
        notificar:false,
        verificar:false,
        id_servicio:Config.IDSERVICIO,
        metodo:"visitaecuador",
        personal:{
            ci:datos["customer"]["identificationDocId"],
            nombres:datos["customer"]["givenName"],
            celular:datos["customer"]["phone"],
            email:datos["customer"]["email"],
            pais: Config.IDPAIS,
            ciudad: 297,
        },
        producto:{
            id_codigo_promocional: datos["customParameters"]["id_codigo_promocional"],
            beneficio_cantidad_tiempo:datos["customParameters"]["beneficio_cantidad_tiempo"],
            beneficio_tipo_tiempo:datos["customParameters"]["beneficio_tipo_tiempo"],
            id_usuario_vendedor:datos["customParameters"]["id_usuario_vendedor"],
            id_suscripcion_vendedor:datos["customParameters"]["id_suscripcion_vendedor"],
            cantidad:1,
            fecha_final:"",
            precio: datos["amount"],
            id_producto:datos["customParameters"]["id_producto"],
            id_lista_precio_producto:datos["customParameters"]["id_lista_precio_producto"],
            id_prod_suscripcion:datos["customParameters"]["id_prod_suscripcion"],
            id_tipo_canal: datos["customParameters"]["id_tipo_canal"],
            pago:[
                {
                    tipo_pago: datos["customParameters"]["tipo_pago"],
                    id_prepago:0,
                    tipo_pago_boton: datos["customParameters"]["tipo_pago_boton"],
                    intereses: datos["customParameters"]["SHOPPER_interes"]=="0"?"2":"1",
                    diferido: datos["recurring"]["numberOfInstallments"],
                    envio:0,
                    subtotal: datos["customParameters"]["SHOPPER_VAL_BASEIMP"],
                    iva: datos["customParameters"]["SHOPPER_VAL_IVA"],
                    total: datos["amount"],
                    cuenta:{
                        nombreTitular: datos["customer"]["givenName"],
                        id_diferido:datos["customParameters"]["id_diferido"],
                        datapago:datos["id"],
                    },
                    transaccion: datos
                }
            ]
        },
    }
    return esquema;
}