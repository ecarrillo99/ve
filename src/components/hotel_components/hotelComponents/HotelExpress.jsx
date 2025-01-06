import { useState } from "react";
import { createReservation, getCertificado, sendMailReservaExpress } from "../../../controllers/establecimiento/establecimientoController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import Config from "../../../global/config";
import HotelConfirmationDetail from "./HotelConfirmationDetail";
import { loginRemote } from "../../../controllers/suscripcion/suscripcionController";

const HotelExpress = ({ Ofertas, isOpen, Establecimiento, Fechas, Valores, OnClose, OnBack, Opciones, setCorrecto, correcto }) => {
    const contactosHotel = Establecimiento.Contactos;
    const contactosCentral = Establecimiento.ContactosCentral;
    const user = JSON.parse(localStorage.getItem('datos'));
    const id = user != null ? user.data.codigo : "";
    const nombre = user != null ? user.data.nombre : "";
    const nivel = user != null ? user.data.nivel : "";
    const ci=user != null ? user.data.ci : "";
    const email=user != null ? user.data.email : "";
    const celular=user != null ? user.data.celular : "";
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [cedula, setCedula] = useState(nivel=="express"?ci:null);
    const [errorCedula, setErrorCedula] = useState(false);
    const [nombres, setNombres] = useState(nivel=="express"?nombre:null);
    const [errorNombres, setErrorNombres] = useState(false);
    const [telefono, setTelefono] = useState(nivel=="express"?celular:null);
    const [errorTelefono, setErrorTelefono] = useState(false);
    const [correo, setCorreo] = useState(nivel=="express"?email:null);
    const [errorCorreo, setErrorCorreo] = useState(false);

    function formatDateToAAAAMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }
    const icons = new Icons();
    if (!isOpen) return null;

    const handleClickReservar = () => {
        var error = false;
        if (!cedula) {
            setErrorCedula(true);
            error = true;
        } else {
            setErrorCedula(false);
        }
        if (!telefono) {
            setErrorTelefono(true);
            error = true;
        } else {
            setErrorTelefono(false);
        }

        if (!nombres) {
            setErrorNombres(true);
            error = true;
        } else {
            setErrorNombres(false);
        }

        if (!correo) {
            setErrorCorreo(true);
            error = true;
        } else {
            setErrorCorreo(false);
        }

        if(!error){
            setIsLoading(true)
            var nom="";
            var ape="";
            var arrayNom=nombres.split(" ");

            if(arrayNom.length==4){
                nom=`${arrayNom[0]} ${arrayNom[1]}`
                ape=`${arrayNom[2]} ${arrayNom[3]}`
            }
            if(arrayNom.length==3){
                nom=`${arrayNom[0]}`
                ape=`${arrayNom[1]} ${arrayNom[2]}`
            }
            if(arrayNom.length==2){
                nom=`${arrayNom[0]}`
                ape=`${arrayNom[1]}`
            }
            const params={
                "id": cedula,
                "pass": cedula.slice(0, 5),
                "servicio": Config.SERVICIO,
                "metodo": Config.METODO_EXPRESS,
                "username": nom, 
                "nombre": nom,
                "apellido":ape,
                "email": correo,
                "identificacion":cedula,
                "telefono":telefono,
                "id_servicio": Config.IDSERVICIO,
                "id_metodo": Config.IDMETODO_EXPRESS,
                "id_lugar":297
            }

            var reservas =[]

            loginRemote(params)
            .then(async (result) => {
                if(result){
                    var total=0;
                    var datosReserva={
                        id_tbl_estado_reserva:1,
                        id_empresa:1,
                    }
    
                    var listaOfertas=[];
                    for (const oferta of Ofertas) {
                        listaOfertas.push({
                            "id_tbl_establecimiento": oferta.IdEstablecimiento,
                            "id_tbl_info_indice_oferta": oferta.Id,
                            "adultos": oferta.Adultos,
                            "ninos": oferta.Ninos?oferta.Ninos:"0",
                            "cantidad_ofertas": oferta.NumOfertas,
                            "fecha_inicio": formatDateToAAAAMMDD(Fechas[0].startDate),
                            "fecha_fin": formatDateToAAAAMMDD(Fechas[0].endDate),
                            "precio_total": oferta.Final*parseInt(oferta.NumOfertas),
                            "edades_ninos": Opciones.childrenAges.join(",")
                        });
                        total+=oferta.Final*parseInt(oferta.NumOfertas);
                    }
                    datosReserva.total_reserva=total;

                    createReservation(datosReserva,listaOfertas).then((res)=>{
                        setIsLoading(false)
                        if(res&&res.estado){
                            sendMailReservaExpress(correo, res.data.id_tbl_reserva)
                            setCorrecto(true);
                            OnClose();
                        }else{
                            alert("Ha ocurrido un error, intente nuevamente o escriba a nuestra central de reservas")
                        }
                    });
                    /*for (const oferta of Ofertas) {
                        await createReservation(oferta.Id, Opciones.adult, Opciones.children, oferta.TotalOfertas, formatDateToAAAAMMDD(Fechas[0].startDate), formatDateToAAAAMMDD(Fechas[0].endDate), Opciones.childrenAges)
                            .then((res) => {
                                
                                if (res) {
                                    reservas.push(res.id_reserva)
                                    
                                } else {
                                    alert("Ha ocurrido un error, intente nuevamente o escriba a nuestra central de reservas")
                                }
                            }).catch((error) => { ; setIsLoading(false) });
                    }
                    setIsLoading(false)
                    if(reservas.length>0){
                        setCorrecto(true);
                        OnClose();
                        sendMailReservaExpress(correo, reservas)
                    }else {
                        alert("Ha ocurrido un error, intente nuevamente o escriba a nuestra central de reservas")
                    }*/
                }else{
                    setIsLoading(false)
                    alert("Ha ocurrido un error, intente nuevamente")
                }
            })
            .catch((error) => { ; setIsLoading(false) })
        }

    }


    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-40">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 m-6 z-50">
                    <div className="bg-white px-3 rounded-md flex justify-center">
                        <div className="flex-col w-full justify-center">
                            <div className="flex flex-col w-full justify-center my-2 items-center">
                            <div className="flex justify-between w-full">
                                <button className={` text-gray-400 text-2xl rounded-full h-8 w-8 `} onClick={() => OnBack()} disabled={isLoading}><span class="icon-[ep--back]"></span></button>
                                <button className={` text-gray-400 text-2xl rounded-full h-8 w-8 `} onClick={() => OnClose()} disabled={isLoading}>x</button>
                            </div>
                                <label className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Reserva</label>
                            </div>
                            <HotelConfirmationDetail Ofertas={Ofertas} isOpen={isOpen} Establecimiento={Establecimiento} Fechas={Fechas} Valores={Valores} OnClose={OnClose} Opciones={Opciones} />
                            <div className="flex flex-col items-center ">
                                <label className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Datos Personales</label>
                                <div className="flex w-full mt-2">
                                    <div className="flex flex-col gap-4 w-1/2">
                                        <input disabled={nivel=="express"?true:false} value={cedula} onChange={(event) => setCedula(event.target.value)} className={`${nivel=="express"?"bg-gray-200":"bg-white"} border-2 ${errorCedula?"border-red-500":"border-greenVE-500"} px-2 mx-3 py-1 rounded-md outline-none`} type="text" placeholder="Cédula" />
                                        <input disabled={nivel=="express"?true:false} value={telefono} onChange={(event) => setTelefono(event.target.value)} className={`${nivel=="express"?"bg-gray-200":"bg-white"} border-2 border-greenVE-500 ${errorTelefono?"border-red-500":"border-greenVE-500"} px-2 mx-3 py-1 rounded-md outline-none`} type="text" placeholder="Teléfono o celular" />
                                    </div>
                                    <div className="flex flex-col gap-4 w-1/2">
                                        <input disabled={nivel=="express"?true:false} value={nombres} onChange={(event) => setNombres(event.target.value)} className={`${nivel=="express"?"bg-gray-200":"bg-white"} border-2 border-greenVE-500 ${errorNombres?"border-red-500":"border-greenVE-500"} px-2 mx-3 py-1 rounded-md outline-none`}type="text" placeholder="Nombres y apellidos" />
                                        <input disabled={nivel=="express"?true:false} value={correo} onChange={(event) => setCorreo(event.target.value)} className={`${nivel=="express"?"bg-gray-200":"bg-white"} border-2 border-greenVE-500 ${errorCorreo?"border-red-500":"border-greenVE-500"} px-2 mx-3 py-1 rounded-md outline-none`}type="text" placeholder="Correo electrónico" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full justify-center mt-6 mb-2 gap-2">
                                <button className="bg-greenVE-500 px-2 py-1 text-white font-semibold rounded-lg w-40" onClick={isLoading?()=>{}:() => handleClickReservar()}>{isLoading?<span className="icon-[line-md--loading-twotone-loop] h-6 w-6 -mb-2"></span>:"Generar reserva"}</button>
                            </div>
                        </div>
                    </div>
                </div>``
            </div>
        </>
    );
};

export default HotelExpress;
