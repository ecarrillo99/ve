import React from 'react';
import ProductItem from './ProductItem';
import ProductItemSelect from './ProductItemSelect';

const Suscripciones = ({productos, setOpcion, setProducto}) => {
    var firstProducts=productos.slice(0, 3);
    var secondProducts =productos.slice(3, productos.length)
    return (
        <div className='flex flex-col bg-gray-200 p-3 rounded-lg'>
            <label className='font-semibold text-2xl'>Elige</label>
            <label className='text-sm font-light text-gray-500 italic'>Escoge uno de nuestros productos.</label>
            <div className='border-b border-gray-400 my-2'></div>
            <div  className='flex flex-col gap-2'>
                {
                    firstProducts.map((item)=>(
                        <ProductItem Producto={item} setOpcion={setOpcion} setProducto={setProducto}></ProductItem>
                    ))
                }
                {
                    secondProducts.length>0
                    ?<ProductItemSelect setOpcion={setOpcion} listaProductos={secondProducts} setProducto={setProducto}></ProductItemSelect>
                    :<></>
                }
            </div>
        </div>
    );
};

export default Suscripciones;