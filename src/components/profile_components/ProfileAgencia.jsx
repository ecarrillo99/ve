import React, { useState } from 'react';

const ProfileAgencia = ({profileData}) => {
    const url=`${window.location.origin}/marcablanca/${profileData.Codigo}`
    const UrlCompra=`${window.location.origin}/suscripcion?codigo=${profileData.Codigo}`
    const iframe=`<iframe src="${url}" frameborder="0" width="100%" height="2000"></iframe>`
    const share = `https://api.whatsapp.com/send?text=Te%20recuerdo%20que%20mi%20c%C3%B3digo%20promocional%20es%20*${profileData.Codigo}*%20y%20puedes%20hacer%20la%20compra%20en%20${UrlCompra.replace('#', '%23')}`;
    const [elementCopy, setElementCopy]=useState(0)

    const handleClickCopy = (text, element) => {
        navigator.clipboard.writeText(text);
        setElementCopy(element);
        setTimeout(() => {
            setElementCopy(0);
        }, 1500);
    };
    
    const handleClickShare=(url)=>{
        window.open(url)
    }


    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col">
                    <h1 className="font-semibold text-3xl">Página de Agencia / Socio</h1>
                    <label>Obtén tu marca blanca e incrustalo en tu sitio web</label>
                </div>
            </div>
            <div className="flex flex-col py-5 gap-3">
                <h2 className="font-semibold text-xl text-greenVE-500">Código promocional VisitaEcuador.com</h2>
                <div className='flex'>
                    <div className='flex flex-col items-center'>
                        <div className=' text-white text-sm  py-1 bg-greenVE-500 flex justify-center rounded-t-lg gap-3 w-52'>
                            <div className='flex items-center gap-1 cursor-pointer' onClick={()=>handleClickCopy(profileData.Codigo, 1)}>
                                {
                                    elementCopy==1
                                    ?<span class="icon-[material-symbols--check-circle-outline-rounded] h-5 w-5"></span>
                                    :<span class="icon-[mynaui--copy] h-5 w-5"></span>
                                }
                                <label className='cursor-pointer'>Copiar</label>
                            </div>
                            <div className='border'/>
                            <div className='flex items-center gap-1 cursor-pointer' onClick={()=>handleClickShare(share)}>
                                <span class="icon-[mdi--whatsapp] h-5 w-5"></span>
                                <label className='cursor-pointer'>Compartir</label>
                            </div>
                        </div>
                        <div className='py-2 bg-greenVE-100 flex justify-center rounded-b-lg w-52'>
                            <label className='text-3xl font-medium text-greenVE-600'>{profileData.Codigo}</label>
                        </div>
                    </div>
                </div>
                <h2 className="font-semibold text-xl text-greenVE-500">Marca Blanca</h2>
                <div className='flex w-full border-2 border-greenVE-100 rounded-lg py-2 px-3 text-sm'>
                    <div className='w-full flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <label>Url marca blanca </label>
                            <div className='flex items-center gap-1 cursor-pointer text-greenVE-600' onClick={()=>handleClickCopy(url, 2)}>
                                {
                                    elementCopy==2
                                    ?<span class="icon-[material-symbols--check-circle-outline-rounded] h-5 w-5"></span>
                                    :<span class="icon-[mynaui--copy] h-5 w-5"></span>
                                }
                                <label className='cursor-pointer'>Copiar</label>
                            </div>
                        </div>
                        <div className='bg-gray-100 w-full px-3 py-2 rounded-lg border-2 text-gray-500'>
                            <label>{url}</label>
                        </div>
                    </div>
                </div>
                <div className='flex w-full border-2 border-greenVE-100 rounded-lg py-2 px-3 text-sm'>
                    <div className='w-full flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <label>Insertar marca blanca en su sitio</label>
                            <div className='flex items-center gap-1 cursor-pointer text-greenVE-600' onClick={()=>handleClickCopy(iframe, 3)}>
                                {
                                    elementCopy==3
                                    ?<span class="icon-[material-symbols--check-circle-outline-rounded] h-5 w-5"></span>
                                    :<span class="icon-[mynaui--copy] h-5 w-5"></span>
                                }
                                <label className='cursor-pointer'>Copiar</label>
                            </div>
                        </div>
                        <div className='bg-gray-100 w-full px-3 py-2 rounded-lg border-2 text-gray-500'>
                            <label>{iframe}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileAgencia;