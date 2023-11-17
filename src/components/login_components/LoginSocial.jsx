import { useState } from "react";
import Icons from "../../global/icons";
const icons=new Icons
const LoginSocial=()=>{

    return(
        <div className="flex flex-col items-center justify-center gap-4 ">
            <h1 className="text-center w-1/2 font-bold text-greenVE-700 text-xl ">PRUEBA GRATIS CON:</h1>
            <div className="flex gap-8">
                <a dangerouslySetInnerHTML={{ __html: icons.Data['LoginGoogle'] }} className='border-2 p-2 rounded-md hover:border-greenVE-500' />
                <a dangerouslySetInnerHTML={{ __html: icons.Data['LoginFacebook'] }} className='border-2 p-2 rounded-md hover:border-greenVE-500' />
            </div>
            <h1 className="text-center w-1/2 font-bold text-greenVE-700 text-xl ">Ó</h1>
            <button className="bg-greenVE-500 px-4 py-1 rounded-md text-white w-1/2">Adquirir Suscripción</button>
        </div>
    )
}
export default LoginSocial;