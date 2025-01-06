import React, {useRef} from "react";
const Certificado = () =>{
    return(

        <div className="border-2 border-greenVE-500 m-5 rounded-xl">
            <div className="flex ">
                <div className="w-1/2">
                    <img src="https://visitaecuador.com/img/web/logo_verde.png" className="h-16 pl-5"></img>
                </div>
                <div className="w-1/2">
                    <label className="font-bold">
                        CERTIFICADO DE RESERVA
                    </label>
                    <div className="flex gap-x-2 text-xs font-bold">
                        <label >
                            NÚMERO DE RESERVA:
                        </label>
                        <label className="text-greenVE-500">
                            123123
                        </label>
                    </div>
                    <div className="flex gap-x-2 text-xs font-bold">
                        <label >
                            ID SUSCRIPTOR:
                        </label>
                        <label className="text-greenVE-500">
                            77123
                        </label>
                    </div>
                    <div className="flex gap-x-2 text-xs font-bold">
                        <label>
                            NOMBRE SUSCRIPTOR:
                        </label>
                        <label className="text-greenVE-500">
                            Edisson Carrillo Gonzaga
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Certificado;