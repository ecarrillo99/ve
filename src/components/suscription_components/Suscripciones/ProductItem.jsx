const ProductItem=({Producto, setOpcion, setProducto})=>{
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
        setOpcion(3);
        setProducto(Producto);
    }
    
    return (
        <div className="flex justify-between items-center  border rounded-md px-3 py-1 bg-white">
            <div className="w-1/6">
                <img className="h-20 object-contain" src="./img/web/suscription_card.png"></img>
            </div>
            <div className="w-5/6  flex justify-between items-center gap-1">
                <div className="flex flex-col">
                    <label className="text-xs text-greenVE-600 font-medium">{Producto.Titulo}</label>
                    <label className="text-xs">{Producto.TiempoVendido+" "+getTiempo(Producto.TipoTiempo)+" de suscripción"}</label>
                </div>
                <div className="flex flex-col text-center">
                    <label className="text-md font-semibold text-greenVE-600 ">{"$"+Math.round(Producto.PrecioProducto*1.12)}</label>
                    <button className="text-xs text-white font-semibold bg-greenVE-500 px-2 py-0.5 rounded-lg" onClick={handleClick}>Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;