import React, { useEffect } from 'react';
import ProductItem from './ProductItem';
import ProductItemSelect from './ProductItemSelect';
import { useLocation } from 'react-router-dom';

const Suscripciones = ({productos, setOpcion, setProducto, codigo, setCodigo}) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const producto = productos.find(map => map.IdProducto === searchParams.get("producto"));
    const precio=searchParams.get("value")
    const tiempoAdicional=searchParams.get("time")
    var firstProducts=productos.slice(0, 3);
    var secondProducts =productos.slice(3, productos.length)
    
    useEffect(()=>{
        if(producto){
            if(precio){
                producto.PrecioProducto=precio;
            }
            if(tiempoAdicional>0){
                if (!producto.Titulo.includes("+")) {
                    producto.Titulo+=" + "+tiempoAdicional+" mes(es) adicionales";
                }
                const porcentajeAdicional = ((tiempoAdicional/12) / producto.Tiempo) * 100;

                if(codigo.beneficio[0]&&codigo.beneficio[0].length>0){
                    codigo.beneficio[0].cantidad = porcentajeAdicional;
                    setCodigo(codigo);
                }
            }else{
                if(codigo.beneficio[0]&&codigo.beneficio[0].length>0){
                    codigo.beneficio[0].cantidad = 0;
                    setCodigo(codigo);
                }
            }
            setProducto(producto);
            setOpcion(3);
        }
    }, [producto])

    return (
        <div className='flex flex-col bg-gray-200 p-3 rounded-lg'>
            <label className='font-semibold text-xl md:text-2xl'>Elige</label>
            <label className='text-xs md:text-sm font-light text-gray-500 italic'>Escoge uno de nuestros productos.</label>
            <div className='border-b border-gray-400 my-2'></div>
            <div  className='flex flex-col gap-2'>
                {
                    firstProducts.map((item)=>(
                        <ProductItem Producto={item} setOpcion={setOpcion} setProducto={setProducto} codigo={codigo} setCodigo={setCodigo}></ProductItem>
                    ))
                }
                {
                    secondProducts.length>0
                    ?<ProductItemSelect setOpcion={setOpcion} listaProductos={secondProducts} setProducto={setProducto} codigo={codigo} setCodigo={setCodigo}></ProductItemSelect>
                    :<></>
                }
            </div>
        </div>
    );
};

export default Suscripciones;