import Config from "./config";

export function generarEsquemaSusPP(datos){
    console.log("Banco Austor")
    var subtotal = parseFloat(datos.producto.PrecioProducto).toFixed(2);
    var total = (subtotal*1.12).toFixed(2);
    var iva = total-subtotal;

    var esquema= {
        id_empresa:Config.IDEMPRESA,
        tiempo:5,
        canal:"web",
        aceptocondiciones:1,
        notificar:false,
        verificar:false,
        id_servicio:Config.IDSERVICIO,
        metodo:Config.METODO,
        personal:{
            ci:datos.persona.cedula,
            nombres:datos.persona.nombres,
            celular:datos.persona.telefono,
            email:datos.persona.correo,
            pais: Config.IDPAIS,
            ciudad: 297,
        },
        producto:{
            id_codigo_promocional: datos.codigo.id_codigo_promocional,
            beneficio_cantidad_tiempo: datos.codigo.beneficio.length>0?datos.codigo.beneficio[0].cantidad_tipo_tiempo:"0",
            beneficio_tipo_tiempo: datos.codigo.beneficio.length>0?datos.codigo.beneficio[0].tiempo:"0",
            id_usuario_vendedor:datos.codigo.vendedor.id_usuario_vendedor,
            id_suscripcion_vendedor:datos.codigo.vendedor.id_suscripcion_vendedor,
            cantidad:1,
            fecha_final:"",
            precio: datos.producto.PrecioProducto,
            id_producto: datos.producto.IdProducto,
            id_lista_precio_producto: datos.producto.IdListaPrecioProducto,
            id_prod_suscripcion: datos.producto.IdProductoSuscripcion,
            id_tipo_canal: "11",
            pago:[
                {
                    tipo_pago: 2,
                    id_prepago:0,
                    tipo_pago_boton: datos.pago.IdTipoBotonPago,
                    intereses: datos.pago.Intereses,
                    diferido: datos.pago.Meses,
                    envio:0,
                    subtotal: subtotal,
                    iva: iva,
                    total: total,
                    cuenta:{
                        nombreTitular: datos.persona.nombres,
                        id_diferido:datos.pago.IdDiferido,
                        datapago: genDatacard(datos.pago.cardData),
                    },
                    transaccion: datos.pago.transaccion
                }
            ]
        },
    }
    return esquema;
}

function genDatacard(payment) {
    console.log(payment)
    let result = "";
    try {
        const key = Config.PAYMENT_DATACARD_KEY; //'.121*+75g';
        const cadena = `2::${payment.cardNumber}::${payment.monthExpire}::${payment.yearExpire}::${payment.cvc}`;
        let keychar = "";
        for (let i = 0; i < cadena.length; i++) {
            let char = cadena[i];
            let indiceTemp = (i % key.length) - 1;
            if (indiceTemp < 0) {
                indiceTemp = key.length - 1;
            }
            keychar = key[indiceTemp];
            const numAsc = char.charCodeAt(0) + keychar.charCodeAt(0);
            char = String.fromCharCode(numAsc);
            result += char;
        }
    } catch (e) {
        console.log(e);
    }
    return btoa(result);
}