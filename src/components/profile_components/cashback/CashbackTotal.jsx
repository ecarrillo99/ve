import React, { useEffect, useState } from 'react';
import { getCashbackInformation } from '../../../controllers/perfil/perfilController';
import { Spinner } from '@material-tailwind/react';
import { fechaToString } from '../../../global/formatearFecha';

const CashbackTotal = ({setHistorial, setTitle, cambiar, fechas}) => {
    const [total, setTotal]= useState();
    const [hist, setHist] = useState();

    const handleClickTotal=()=>{
        setHistorial(hist);
        setTitle("Ventas totales");
    }
    useEffect(() => {
        getCashbackInformation(fechaToString(new Date(fechas[0].startDate)),fechaToString(new Date(fechas[0].endDate)),"Total").then((resp)=>{
            if(resp){
                setTotal(resp.total)
                setHist(resp.historial)
            }
        });
    }, [cambiar])

    return (
        <div className='flex flex-col w-1/4 border rounded-lg bg-green-700 text-white items-center justify-center gap-2 my-2 py-2 font-semibold text-xl cursor-pointer' onClick={()=>handleClickTotal()}>
            {
                total!=null
                ?<label className='text-3xl cursor-pointer'>${total.toFixed(2)}</label>
                :<Spinner className='h-9'></Spinner>
            }
            <label className='cursor-pointer'>Total</label>
        </div>
    );
};

export default CashbackTotal;