const ProductItem=({Producto, cambioSlider, productoSeleccionado})=>{
    const getTiempo=(TipoTiempo)=>{
        if(TipoTiempo==1){
            return "año(s)"
        }
        if(TipoTiempo==2){
            return "mes(es)"
        }
        if(TipoTiempo==3){
            return "día(s)"
        }
        if(TipoTiempo==4){
            return "hora(s)"
        }
        if(TipoTiempo==5){
            return "minuto(s)"
        }
    }

    const handleClick=()=>{
        cambioSlider(1);
        productoSeleccionado(Producto);
    }
    
    return (
        <div className="flex justify-center items-center w-96 border rounded-md px-3 py-1">
            <div className="w-1/3">
                <img className="h-20" src="./img/web/suscription_card.png"></img>
            </div>
            <div className="w-2/3 flex flex-col justify-center items-end text-end gap-1">
                <label className="text-xs text-greenVE-600 font-medium">{Producto.Titulo}</label>
                <label className="text-xs">{Producto.TiempoVendido+" "+getTiempo(Producto.TipoTiempo)+" de suscripción"}</label>
                <label className="text-md font-semibold text-greenVE-600 ">{"$"+Math.round(Producto.PrecioProducto*1.12)}</label>
                <button className="text-xs text-white font-semibold bg-greenVE-500 px-2 py-0.5 rounded-lg" onClick={handleClick}>Comprar</button>
            </div>
        </div>
    )
}

export default ProductItem;