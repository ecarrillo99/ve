import Producto from "../../models/Producto";
import ContactoService from "../../services/contacto/ContactoService";

export const SuscripcionProducto=async function (codigo){
    const contactoService = new ContactoService()
    try{
        const params={
            "id_codigo_promocional":codigo
        }
        const res = await contactoService.cargaProductos(params);
        if(res.estado){
            if (Object.values(res.data.productos).length > 0) {
                const listaproductos=[];
                for(const producto of res.data.productos){
                    const productoTmp=new Producto()
                    productoTmp.Titulo=producto["titulo"];
                    productoTmp.TipoTiempo=producto["tiempo_tipo"];
                    productoTmp.PrecioProducto=producto["precio_producto"];
                    productoTmp.AniosVendidos=producto["anios_vendidos"];
                    productoTmp.Anios=producto["anios"]
                    productoTmp.Recurrencia=producto["recurrencia"]
                    productoTmp.IdTablaListaPrecio=producto["id_tbl_lista_precio"]
                    productoTmp.IdTablaServicioWeb=producto["id_tbl_servicio_web"]
                    productoTmp.NombreComercial=producto["nombrecomercial"]
                    productoTmp.IdTipoDiferido=producto["id_tipo_diferido"]
                    productoTmp.NombreTipoDiferido=producto["nombre_tipo_diferido"]
                    productoTmp.IdProducto=producto["id_producto"]
                    productoTmp.IdProductoSuscripcion=producto["id_prod_suscripcion"]
                    productoTmp.IdListaPrecioProducto=producto["id_lista_precio_producto"]
                    productoTmp.TiempoVendido=producto["tiempo_vendidos"]
                    productoTmp.Tiempo=producto["tiempo"]
                    listaproductos.push(productoTmp);
                }
                return listaproductos;
            }
        }
    }catch(e){
        console.log(e)
    }
}