import {useState } from "react";

const ProductItem=({Producto, setOpcion, setProducto})=>{
    const [copiado, setCopiado]=useState(false);
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

    const handleCLickShare=()=>{
        let currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('producto', Producto.IdProducto);
        navigator.clipboard.writeText(currentUrl.toString()).then(()=>{
            setCopiado(true);
            setTimeout(() => {
                setCopiado(false);
            }, 2000);
        })
    }
    
    return (
        <div className="flex justify-between items-center  border rounded-md px-3 py-1 bg-white">
            <div className="w-1/6">
                <img className="h-10 md:h-20 object-contain" src="https://visitaecuador.com/img/web/suscription_card.png"></img>
                
            </div>
            <div className="w-5/6  flex justify-between items-center gap-1">
                <div className="flex flex-col w-full">
                    <label className="text-xxs md:text-xs text-greenVE-600 font-medium">{Producto.Titulo}</label>
                    <label className="text-xxs md:text-xs">{Producto.TiempoVendido+" "+getTiempo(Producto.TipoTiempo)+" de suscripción"}</label>
                </div>
                <div className="flex flex-col text-center">
                    <label className="text-xs md:text-base font-semibold text-greenVE-600 ">{"$"+(Producto.PrecioProducto*1.12).toFixed(2)}</label>
                    <button className="text-xxs md:text-xs text-white font-semibold bg-greenVE-500 px-2 py-0.5 rounded-lg" onClick={handleClick}>Comprar</button>
                </div>
                <div title="Compartir" className="pl-4  cursor-pointer" onClick={()=>handleCLickShare()}>
                    {
                        copiado
                        ?<span className="icon-[octicon--check-circle-fill-12] h-5 w-5 text-greenVE-500"></span>
                        :<span className="icon-[entypo--share-alternitive] h-5 w-5 text-gray-400 hover:text-greenVE-500"></span>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductItem;