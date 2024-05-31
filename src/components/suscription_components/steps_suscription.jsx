import React, { useState } from 'react';
import Promociones from './Promociones/promo';
import Suscripciones from './Suscripciones/Suscripciones';
import Informacion from './Informacion/Informacion';
import PayPhoneForm from './Payphone/PayPhoneForm';
import DataFast from './Datafast/DataFast';
import PayPhoneBP from './Payphone/PayPhoneBP.jsx';
import JardinAzuayo from './JardinAzuayo/JardinAzuayo.jsx';
import BancoAustroForm from './BancoAustro/BancoAustroForm.jsx';

const StepsSuscription = () => {
    const [opcion, setOpcion] = useState(1)
    const [productos, setProductos] = useState()
    const [producto, setProducto] = useState();
    const [persona, setPersona] = useState();
    const [pago, setPago] = useState();
    const [codigo, setCodigo] = useState();
    console.log("Datos");
    console.log(pago);
    console.log(producto);
    console.log(persona);
    return (
        <div className='flex gap-8'>
            <div className='flex flex-col w-9/12'>
                <div className='flex gap-2 my-4'>
                    <button className={`${opcion == 1 ? "bg-greenVE-600" : "bg-greenVE-500"} text-white px-2 py-1 rounded-lg cursor-pointer`} onClick={()=>setOpcion(1)}>1. Promociones</button>
                    <button className={`${opcion == 2 ? "bg-greenVE-600 text-white" :productos!=null?"bg-greenVE-500 text-white" :"bg-gray-100 text-gray-400"} px-2 py-1 rounded-lg cursor-pointer`} onClick={productos!=null?()=>setOpcion(2):null}>2. Suscripciones</button>
                    <button className={`${opcion == 3 ? "bg-greenVE-600 text-white" :producto!=null?"bg-greenVE-500 text-white" : "bg-gray-100 text-gray-400"}  px-2 py-1 rounded-lg cursor-pointer`} onClick={producto!=null?()=>{setOpcion(3);setPago()}:null}>3. Información</button>
                    <button className={`${opcion == 4 ? "bg-greenVE-600 text-white" : "bg-gray-100 text-gray-400"} px-2 py-1 rounded-lg cursor-pointer`}>4. Pago</button>
                </div>
                {
                    opcion == 1
                        ? <Promociones setCodigo={setCodigo} setOpcion={setOpcion} setProductos={setProductos} />
                        : opcion == 2
                            ? <Suscripciones productos={productos} setProducto={setProducto} setOpcion={setOpcion}></Suscripciones>
                            : opcion==3
                                ?<Informacion setOpcion={setOpcion} persona={persona} setPersona={setPersona} setPago={setPago}/>
                                :opcion==4
                                    ?pago.IdTipoBotonPago=="4"
                                        ?<PayPhoneForm></PayPhoneForm>
                                            :pago.IdTipoBotonPago=="5"
                                            ?<BancoAustroForm/>
                                            :pago.IdTipoBotonPago=="6"
                                            ?<DataFast persona={persona} producto={producto} pago={pago} codigo={codigo}></DataFast>
                                            :pago.IdTipoBotonPago=="7"
                                            ?<PayPhoneBP setOpcion={setOpcion} persona={persona} producto={producto} codigo={codigo}></PayPhoneBP>
                                            :pago.IdTipoBotonPago=="8"
                                            ?<JardinAzuayo setOpcion={setOpcion} persona={persona} producto={producto} codigo={codigo}></JardinAzuayo>
                                            :<></>
                                    :<></>
                }
            </div>
            <div className='w-3/12 flex flex-col gap-3'>
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
                {
                    pago&&<div className='flex flex-col gap-3 shadow-xl rounded-xl p-3'>
                        <div className='flex  items-center gap-2 text-amber-500 '>
                            <span className="icon-[material-symbols--payments-outline-rounded] w-5 h-5"></span>
                            <label className='text-lg font-semibold'>Forma de pago</label>
                        </div>
                        {
                            pago.botonLogo&&<div className='flex  justify-center items-center'>
                                <img className='h-16' src={pago.botonLogo}/>
                            </div>
                        }
                        <div className='flex gap-6 px-3'>
                            <img className='w-1/2' src={pago.LogoBanco}/>
                            <img className='w-1/2' src={pago.LogoTarjeta}/>
                        </div>
                        <div className='flex justify-between bg-gray-200 p-2'>
                            <label className=''>Cuotas</label>
                            <label>{pago.Meses}</label>
                        </div>
                        <div className='flex justify-between bg-gray-50 p-2 -mt-3'>
                            <label>Valor cuota</label>
                            <label>{((producto.PrecioProducto*1.12) / parseInt(pago.Meses)).toFixed(2)}</label>
                        </div>
                        <div className='flex justify-between  bg-gray-200 p-2 -mt-3'>
                            <label>Intereses</label>
                            <label>{pago.Intereses=="1"?"Si":"No"}</label>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default StepsSuscription;