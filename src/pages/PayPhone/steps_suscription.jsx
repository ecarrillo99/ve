import React, { useState } from 'react';
import Promociones from '../../components/suscription_components/Promociones/promo.jsx';
import Suscripciones from '../../components/suscription_components/Suscripciones/Suscripciones';
import PayPhoneForm from '../../components/suscription_components/Payphone/PayPhoneForm';
import DataFast from '../../components/suscription_components/Datafast/DataFast';
import PayPhoneBP from '../../components/suscription_components/Payphone/PayPhoneBP.jsx';
import JardinAzuayo from '../../components/suscription_components/JardinAzuayo/JardinAzuayo.jsx';
import BancoAustroForm from '../../components/suscription_components/BancoAustro/BancoAustroForm.jsx';
import Informacion from './Informacion.jsx';

const StepsSuscription = () => {
    const [opcion, setOpcion] = useState(1)
    const [producto, setProducto] = useState(
        {
            "Titulo": "Suscripción PayPhone / VisitaEcuador.com 1 año",
            "TipoTiempo": "1",
            "PrecioProducto": 88.84,
            "AniosVendidos": "1",
            "Anios": "1",
            "Recurrencia": "2",
            "IdTablaListaPrecio": "144",
            "IdTablaServicioWeb": "1",
            "NombreComercial": "VisitaEcuador.com",
            "IdTipoDiferido": "3",
            "NombreTipoDiferido": "Todos",
            "IdProducto": "17081",
            "IdProductoSuscripcion": "408",
            "IdListaPrecioProducto": "1719",
            "TiempoVendido": "1",
            "Tiempo": "1"
          }
    );
    const [persona, setPersona] = useState();
    const [pago, setPago] = useState();
    const [codigo, setCodigo] = useState(
        {
            "id_codigo_promocional": 73793,
            "codigo": "CPP",
            "descripcion": "codigo generado automaticamente",
            "beneficio": [
              {
                "cantidad": 100,
                "tiempo": "2",
                "cantidad_tipo_tiempo": "2",
                "titulo": "Duplicamos tu tiempo de suscripción"
              }
            ],
            "vendedor": {
              "tipo": "vendedor",
              "nombre_grupo": "Empleados VE",
              "id_usuario_vendedor": "88627",
              "id_suscripcion_vendedor": "74163"
            }
          }
    );

    return (
        <div className='flex md:flex-row flex-col gap-8 px-8 '>
            <div className='flex flex-col md:w-9/12 order-2 md:order-1'>
                <div className='flex gap-2 my-4'>
                    <button className={`${opcion == 3 ? "bg-greenVE-600 text-white" :producto!=null?"bg-greenVE-500 text-white" : "bg-gray-100 text-gray-400"}  px-2 py-1 rounded-lg cursor-pointer`} onClick={producto!=null?()=>{setOpcion(1);setPago()}:null}>1. Información</button>
                    <button className={`${opcion == 4 ? "bg-greenVE-600 text-white" : "bg-gray-100 text-gray-400"} px-2 py-1 rounded-lg cursor-pointer`}>2. Pago</button>
                </div>
                {
                    opcion==1
                                ?<Informacion setOpcion={setOpcion} persona={persona} setPersona={setPersona} setPago={setPago}/>
                                :opcion==4&&<PayPhoneBP setOpcion={setOpcion} persona={persona} producto={producto} codigo={codigo}></PayPhoneBP>

                }
            </div>
            <div className='md:w-3/12 flex flex-col gap-3 order-1 md:order-2'>
                {
                    producto&&<div className='flex flex-col gap-3 shadow-xl rounded-xl p-3'>
                        <div className='flex  items-center gap-2 text-amber-500 '>
                            <span className="icon-[mdi--cart] h-5 w-5"></span>
                            <label className='text-lg font-semibold'>Resumen</label>
                        </div>
                        <label className='text-amber-500 font-semibold text-xs'>{producto.Titulo}</label>
                        <div className='flex justify-between bg-gray-200 p-2'>
                            <label className=''>Subtotal</label>
                            <label>{((producto.PrecioProducto*1.12) / 1.15).toFixed(2)}</label>
                        </div>
                        <div className='flex justify-between bg-gray-50 p-2 -mt-3'>
                            <label>IVA 15%</label>
                            <label>{((producto.PrecioProducto*1.12)-((producto.PrecioProducto*1.12) / 1.15)).toFixed(2)}</label>
                        </div>
                        <div className='flex justify-between text-xl font-semibold bg-gray-200 p-2 -mt-3'>
                            <label>Total</label>
                            <label>{(producto.PrecioProducto*1.12).toFixed(2)}</label>
                        </div>
                    </div>
                }
                
            </div>
        </div>
    );
};

export default StepsSuscription;