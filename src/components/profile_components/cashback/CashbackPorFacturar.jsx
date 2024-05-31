import React, { useEffect, useState } from 'react';
import { getCashbackInformation } from '../../../controllers/perfil/perfilController';
import { Spinner } from '@material-tailwind/react';
import { fechaToString } from '../../../global/formatearFecha';

const CashbackPorFacturar = ({setHistorial, setTitle, cambiar, fechas}) => {
    const [total, setTotal]= useState();
    const [hist, setHist] = useState();

    const handleClickTotal=()=>{
        setHistorial(hist);
        setTitle("Ventas por facturar");
    }
    useEffect(() => {
        getCashbackInformation(fechaToString(new Date(fechas[0].startDate)),fechaToString(new Date(fechas[0].endDate)),"PorFacturar").then((resp)=>{
            if(resp){
                setTotal(resp.total)
                setHist(resp.historial)
            }
        });
    }, [cambiar])

    return (
        <div className='flex flex-col w-1/4 border rounded-lg bg-blue-500 text-white items-center justify-center gap-2 my-2 py-2 font-semibold text-xl cursor-pointer' onClick={()=>handleClickTotal()}>
            {
                total!=null
                ?<label className='text-3xl cursor-pointer'>${total.toFixed(2)}</label>
                :<Spinner className='h-9'></Spinner>
            }
            <label className='cursor-pointer'>Por Facturar</label>
        </div>
    );
};

export default CashbackPorFacturar;