import Config from "./config";

export function generarEsquemaSus(datos) {
    // Aseguramos que el precio sea un número válido
    var precio = parseFloat(datos?.precio || 0).toFixed(2);
    var subtotal = parseFloat(precio);
    var iva = (subtotal * 0.12).toFixed(2);
    var total = (subtotal * 1.12).toFixed(2);

    var esquema = {
        id_empresa: 1,
        tiempo: 5,
        id_canal: 1,
        aceptocondiciones: 1,
        notificar: false,
        verificar: false,
        id_servicio: 1,
        metodo: "visitaecuador",
        personal: {
            ci: datos?.cedula || "",
            nombres: datos?.nombres || "",
            celular: datos?.celular || "",
            email: datos?.email || "",
            pais: Config.IDPAIS,
            ciudad: 297,
        },
        producto: {
            id_codigo_promocional: 91087,
            beneficio_cantidad_tiempo: 0,
            beneficio_tipo_tiempo: 0,
            id_usuario_vendedor: 123522, // IDUSUARIO DE YA GANASTE
            id_suscripcion_vendedor: 84397, // ID SUSCRIPCION YA GANASTE
            cantidad: 1,
            fecha_final: "",
            precio: precio,
            id_producto: datos?.id_producto || "",
            id_lista_precio_producto: datos?.id_lista_precio_producto || "",
            id_prod_suscripcion: datos?.id_prod_suscripcion || "",
            id_tipo_canal: 15,
            id_suscripcion_renovacion: 11,
            pago: [
                {
                    tipo_pago: 24,
                    id_prepago: 0,
                    tipo_pago_boton: 9,
                    intereses: "0",
                    diferido: "0",
                    envio: 0,
                    subtotal: subtotal.toFixed(2),
                    iva: iva,
                    total: total,
                    cuenta: {
                        nombreTitular: datos?.nombres || "",
                        id_diferido: 0,
                        datapago: "",
                    },
                    transaccion: "",
                },
            ],
        },
    };

    return esquema;
}
