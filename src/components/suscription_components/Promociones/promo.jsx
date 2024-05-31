import React, { useState } from 'react';
import { CheckPromocionalCode } from '../../../controllers/suscripcion/suscripcionCodigoPromocional';

const Promociones = ({setProductos, setOpcion, setCodigo}) => {
    const [errorCode, setErrorCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState();
    const handleClickVerificar=()=>{
        setErrorCode(false);
        setLoading(true);
        try{
            CheckPromocionalCode(code).then((result)=>{
                if(result){
                    setProductos(result.productos);
                    setCodigo(result.codigo);
                    console.log(result.codigo);
                    setOpcion(2)
                }else{
                    setErrorCode(true);
                }
                setLoading(false);
            })
        }catch(e){
            setErrorCode(true);
            setLoading(false);
        }
    }
    const handleChangeCode=(event)=>{
        setCode(event.target.value)
    }
    return (
        <div className='flex flex-col bg-gray-200 p-3 rounded-lg'>
            <label className='font-semibold text-2xl'>Código Promocional</label>
            <label className='text-sm font-light text-gray-500 italic'>Ingresa el código promocional, que te obsequia tiempo extra en tu suscripción.</label>
            <div className='border-b border-gray-400 my-2'></div>
            <div className='flex mt-2 items-center mb-3'>
                <div className='flex flex-col w-7/12 gap-3'>
                    <label className='text-sm'>Código Promocional (Opcional)</label>
                    <input className={`w-full border ${errorCode?"border-red-500":"border-gray-400"} px-2 py-1 rounded-md` }onChange={handleChangeCode}></input>
                    <label className={`text-[9px] -mt-3 ${errorCode?"text-red-500":"text-gray-200"}`}>* El código no es válido</label>
                    <button className='bg-greenVE-500 text-white rounded-md flex items-center justify-center cursor-pointer py-1 font font-semibold' onClick={()=>handleClickVerificar()}>
                        {
                            loading
                            ?<span className="icon-[line-md--loading-twotone-loop] h-7 w-7"></span>
                            :<>
                                Continuar
                                <span className="icon-[ic--round-navigate-next] h-7 w-7"></span>
                            </>
                        }
                    </button>
                </div>
                <div className='w-5/12 px-12'>
                    <img src='https://visitaecuador.com/img/diseno/compra/codigopromocional.png'/>
                </div>
            </div>
        </div>
    );
};

export default Promociones;