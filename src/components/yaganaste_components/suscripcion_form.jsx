import React, { useEffect, useState } from 'react';
import { gestionarSuscripcion } from '../../controllers/suscripcion/suscripcionController';
import { generarEsquemaSus } from '../../global/esquemaSuscripcion';
import { SuscripcionProducto } from '../../controllers/suscripcion/suscripcionProductoController';

const SuscripcionForm = () => {
    const [nombresError, setNombresError]=useState();
    const [cedulaError, setCedulaError]=useState();
    const [telefonoError, setTelefonoError]=useState();
    const [correoError, setCorreoError]=useState();
    const [nombres, setNombres]=useState();
    const [cedula, setCedula]=useState();
    const [telefono, setTelefono]=useState();
    const [correo, setCorreo]=useState();
    const [data, setData]=useState();
    const [error, setError]=useState(false);
    const [correcto, setCorrecto]=useState(false);
    const [selectedSuscripcion, setSelectedSuscripcion]=useState();
    const [option, setOption]=useState();
    const [suscripcionData, setSuscripcionData]=useState();

    const handleChangeNombre=(event)=>{
        setNombres(event.target.value)
    }

    const handleChangeCedula=(event)=>{
        setCedula(event.target.value)
    }
    const handleChangeTelefono=(event)=>{
        setTelefono(event.target.value)
    }
    const handleChangeCorreo=(event)=>{
        setCorreo(event.target.value)
    }

    const handleChangeSuscripcion=(event)=>{
        setSelectedSuscripcion(suscripcionData[event.target.value]);
        setOption(event.target.value);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                SuscripcionProducto(91087).then((result) => {
                  if (result) {
                    result.sort((a, b) =>  a.IdProductoSuscripcion - b.IdProductoSuscripcion)
                    setSuscripcionData(result)
                    setSelectedSuscripcion(result[0])
                  }
                })
        
              } catch (error) {
                console.error("Error:", error);
              }
        }
        fetchData();
    }, []);


    
    const handleClickButton=()=>{
        setCorrecto(false);
        setError(false);
        (nombres==null||nombres=="")?setNombresError(true):setNombresError(false);
        (cedula==null||cedula=="")?setCedulaError(true): setCedulaError(false);
        (telefono==null||telefono=="")?setTelefonoError(true): setTelefonoError(false);
        (correo==null||correo=="")?setCorreoError(true):setCorreoError(false);

        if(!(nombres==null||nombres=="")&&!(cedula==null||cedula=="")&&
           !(telefono==null||telefono=="")&&!(correo==null||correo=="")){
            setError(false);
            var datos={
                cedula:cedula,
                nombres:nombres,
                celular:telefono,
                email:correo,
                precio: selectedSuscripcion["PrecioProducto"],
                id_producto: selectedSuscripcion["IdProducto"],
                id_lista_precio_producto:selectedSuscripcion["IdTablaListaPrecio"],
                id_prod_suscripcion:selectedSuscripcion["IdProductoSuscripcion"],
            }
            gestionarSuscripcion(generarEsquemaSus(datos)).then((result) => {
                if (result) {
                    if(result["estado"]){
                        setCorrecto(true);
                        setData(result.data);
                    }else{
                        setError(true);
                    }
                } else {
                    setError(true);
                }
            });
        }

    }
    return (
        <div className='flex flex-col justify-center items-center mb-6 gap-y-3 h-[500px]'>
            <label className='text-2xl font-semibold text-greenVE-600'>Ingreso de nuevo suscriptor Ya Ganaste</label>
            <div className="flex flex-row items-center border border-blackCPN-600 rounded-md w-1/2 h-10 pr-5">
            <svg className='h-6 w-8 pl-2 text-gra' id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><style></style></defs><path class="cls-1" d="M21.41,106.85A19.88,19.88,0,0,1,1.58,87V33A19.88,19.88,0,0,1,21.41,13.15H98.59A19.88,19.88,0,0,1,118.42,33V87a19.88,19.88,0,0,1-19.83,19.82ZM11.6,87a9.84,9.84,0,0,0,9.81,9.8H98.59A9.84,9.84,0,0,0,108.4,87V59.33H11.6Zm96.8-52V33a9.84,9.84,0,0,0-9.81-9.8H21.41A9.84,9.84,0,0,0,11.6,33v2Z"/><path class="cls-1" d="M98.6,104.71A17.7,17.7,0,0,0,116.27,87V33A17.7,17.7,0,0,0,98.6,15.29H21.41A17.7,17.7,0,0,0,3.73,33V87A17.7,17.7,0,0,0,21.4,104.71ZM21.41,21H98.6a12,12,0,0,1,11.94,12v4.15H9.46V33A12,12,0,0,1,21.4,21ZM9.46,87V57.18H110.54V87A12,12,0,0,1,98.6,99H21.4A12,12,0,0,1,9.46,87Z"/><path class="cls-1" d="M23,88.14a5,5,0,0,1,0-10H35.44a5,5,0,1,1,0,10Z"/><path class="cls-1" d="M35.44,86a2.87,2.87,0,1,0,0-5.73H23A2.87,2.87,0,1,0,23,86Z"/></svg>
                    <select className='w-full h-full bg-transparent outline-none px-4' value={option} onChange={handleChangeSuscripcion}>
                        {
                            suscripcionData &&
                            suscripcionData.map((item, index) => (
                                <option value={index}>{item.Titulo+"  $"+(item.PrecioProducto*1.12).toFixed(2).toString()}</option>
                            ))
                        }
                    </select>
                </div>
            <div className="flex items-center w-2/4 justify-center">
                <div className={`flex flex-row items-center border ${nombresError ? "border-red-500" : "border-blackCPN-600"} rounded-md w-full h-10`}>
                    <svg className='pl-3 w-10' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0">
                        </g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                        </g>
                        <g id="SVGRepo_iconCarrier">
                            <circle strokeWidth={1.5} cx="12" cy="8" r="3.5" stroke="#8b8b8b" stroke-linecap="round"></circle>
                            <path strokeWidth={1.5} d="M4.84913 16.9479C5.48883 14.6034 7.91473 13.5 10.345 13.5H13.655C16.0853 13.5 18.5112 14.6034 19.1509 16.9479C19.282 17.4287 19.3868 17.9489 19.4462 18.5015C19.5052 19.0507 19.0523 19.5 18.5 19.5H5.5C4.94772 19.5 4.49482 19.0507 4.55382 18.5015C4.6132 17.9489 4.71796 17.4287 4.84913 16.9479Z" stroke="#8b8b8b" stroke-linecap="round">
                            </path>
                        </g>
                    </svg>
                    <input type="text" value={nombres} placeholder="Nombres y apellidos" className="w-full h-full bg-transparent outline-none px-4" onChange={handleChangeNombre} />
                </div>
            </div>
            <div className="flex items-center w-2/4 justify-center">
                <div className={`flex flex-row items-center border ${cedulaError ? "border-red-500" : "border-blackCPN-600"} rounded-md w-full h-10`}>
                    <svg className='pl-3 w-10' viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0">
                        </g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                        </g>
                        <g id="SVGRepo_iconCarrier">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z" stroke="#8b8b8b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path d="M15.5 10H18.5" stroke="#8b8b8b" stroke-width="1.5" stroke-linecap="round">
                            </path>
                            <path d="M15.5 13H18.5" stroke="#8b8b8b" stroke-width="1.5" stroke-linecap="round">
                            </path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z" stroke="#8b8b8b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            </path>
                            <path d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16" stroke="#8b8b8b" stroke-width="1.5" stroke-linecap="round">
                            </path>
                        </g>
                    </svg>
                    <input type="text" value={cedula} placeholder="Cédula" className="w-full h-full bg-transparent outline-none px-4" onChange={handleChangeCedula} />
                </div>
            </div>
            <div className="flex items-center w-2/4 justify-center">
                <div className={`flex flex-row items-center border ${telefonoError ? "border-red-500" : "border-blackCPN-600"}  rounded-md w-full h-10`}>
                    <svg className='w-10 pl-3' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" stroke="#8b8b8b" stroke-width="1.5" stroke-linecap="round"></path>
                        </g>
                    </svg>
                    <input type="text" value={telefono} placeholder="Teléfono" className="w-full h-full bg-transparent outline-none px-4" onChange={handleChangeTelefono} />
                </div>
            </div>
            <div className="flex items-center w-2/4 justify-center">
                <div className={`flex flex-row items-center border ${correoError ? "border-red-500" : "border-blackCPN-600"} rounded-md w-full h-10`}>
                    <svg className='pl-3 w-10' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#8b8b8b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="#8b8b8b" stroke-width="1.5" stroke-linecap="round"></rect>
                        </g>
                    </svg>
                    <input type="text" value={correo} placeholder="Correo" className="w-full h-full bg-transparent outline-none px-4" onChange={handleChangeCorreo} />
                </div>
            </div>
            

            <div className='flex justify-center '>
                <button className=' w-32 py-2 bg-greenVE-500 text-white rounded-full text-lg' onClick={() => handleClickButton()}>Registrar</button>
            </div>
            {
                correcto&&<div className='bg-greenVE-100 p-4'>
                    <div className='flex'>
                        <div className='flex flex-col'>
                        <label className='text-xl font-bold text-greenVE-600'>Cuenta creada correctamente</label>
                        <label>Usuario: {data["identificacion"]} </label>
                        <label>Contraseña: {data["clave"]} </label>
                        </div>
                    </div>
                </div>
            }
            {
                error&&<div className='bg-red-100 p-4'>
                    <div className='flex'>
                        <div className='flex flex-col'>
                        <label className='text-xl font-bold text-red-600'>Ha ocurrido un error, intente nuevamente</label>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default SuscripcionForm;