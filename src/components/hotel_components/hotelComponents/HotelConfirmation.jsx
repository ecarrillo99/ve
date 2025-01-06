import { useState } from "react";
import { createReservation, getCertificado } from "../../../controllers/establecimiento/establecimientoController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import Config from "../../../global/config";
import HotelConfirmationDetail from "./HotelConfirmationDetail";

const HotelConfirmation = ({ Ofertas, isOpen, Establecimiento, Fechas, Valores, OnClose, Opciones }) => {
    const contactosHotel = Establecimiento.Contactos;
    const contactosCentral = Establecimiento.ContactosCentral;
    const user = JSON.parse(localStorage.getItem('datos'));
    const id = user != null ? user.data.codigo : "";
    const nombre = user != null ? user.data.nombre : "";
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isCreatingcert, setIsCreatingCert] = useState(false)
    const [inputUser, setInputUser] = useState('');
    const handleInputUserChange = (event) => {
        setInputUser(event.target.value);
    };

    const icons = new Icons();
    if (!isOpen) return null;

    const formatDate = (date) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        return formattedDate;
    };

    function formatDateToAAAAMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    const fechaString = (fecha) => {
        // Obtener el año, mes y día de la fecha
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes ya que los meses van de 0 a 11
        const dia = String(fecha.getDate()).padStart(2, '0');

        // Construir el string en el formato YYYY-MM-DD
        return `${año}-${mes}-${dia}`;
    }


    const createCert = () => {
        if (!isCreatingcert) {
            setIsCreatingCert(true);
            var dataOfertas = [];
            var fechas = {
                "inicio": fechaString(Fechas[0].startDate),
                "fin": fechaString(Fechas[0].endDate)
            }

            Ofertas.forEach((item) => {
                dataOfertas.push(
                    {
                        "cant": item.NumOfertas,
                        "oferta": item.Id
                    }
                );
            })
            getCertificado(
                inputUser,
                Establecimiento.IdEstablecimiento,
                dataOfertas,
                fechas,
                Opciones.adult,
                Opciones.children
            ).then((result) => {
                setIsCreatingCert(false);
                if (result) {
                    window.open("/certificado?" + result, '_blank');
                }
            });
        }
    }

    const mensaje = () => {
        const personas = Opciones.adult + (Opciones.adult > 1 ? " adultos" : " adulto") +
            (Opciones.children == 0 ? "" : ", " + Opciones.children + (Opciones.children > 1 ? " niños" : " niño"));

        var habitaciones = "\n";
        Ofertas.forEach(element => {
            habitaciones = habitaciones + (element.TotalOfertas) + "x " + element.TituloOferta + "\n"
        });
        const total = "$" + Valores.SinImpuestos + " más $" + Valores.Impuestos + " de impuestos y cargos";
        const msj = Config.MENSAJE
            .replaceAll("{{nombre}}", nombre)
            .replaceAll("{{id}}", id)
            .replaceAll("{{hotel}}", Establecimiento.Titulo)
            .replaceAll("{{checkin}}", formatDate(Fechas[0].startDate))
            .replaceAll("{{checkout}}", formatDate(Fechas[0].endDate))
            .replaceAll("{{personas}}", personas)
            .replaceAll("{{habitaciones}}", habitaciones)
            .replaceAll("{{total}}", total);
        return msj
    }

    const handleClickWhatsApp = async (contacto) => {
        window.open("https://wa.me/" + contacto + "?text=" + mensaje().replaceAll(" ", "%20").replaceAll("\n", "%0A"))
    }

    const handleClickEmail = async (email) => {
        window.open("mailto:" + email + "?subject=Reserva" + "&body=" + mensaje().replaceAll(" ", "%20").replaceAll("\n", "%0A"));
    }

    const handleClickAceptar = async () => {
        if (!isLoading) {
            setIsLoading(true)
            var total = 0;
            try {
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
                    if(res){
                        navigate("/historial");
                    }
                });
                    /*await createReservation(oferta.Id, Opciones.adult, Opciones.children, oferta.TotalOfertas, formatDateToAAAAMMDD(Fechas[0].startDate), formatDateToAAAAMMDD(Fechas[0].endDate), Opciones.childrenAges)
                        .then((res) => {
                            if (res) {
                                if (res == 401) {
                                    localStorage.removeItem("datos");
                                    window.location.reload();
                                }
                            } else {
                                correcto = false;
                            }
                        }).catch((error) => { });
                }
                setIsLoading(false)
                if (correcto) {
                    
                }*/
            } catch (e) {
            }
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-40">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 m-6 z-50">
                    <div className="bg-white p-2 rounded-md flex justify-center">
                        <div className="flex-col w-full justify-center">
                            <div className="flex flex-col w-full justify-center my-2 items-center">
                                <button className={`bg-${isLoading ? 'gray-500' : 'red-600'} text-white rounded-full h-8 w-8 font-bold`} onClick={() => OnClose()} disabled={isLoading}>X</button>
                                <label className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Reserva</label>
                            </div>
                            <HotelConfirmationDetail Ofertas={Ofertas} isOpen={isOpen} Establecimiento={Establecimiento} Fechas={Fechas} Valores={Valores} OnClose={OnClose} Opciones={Opciones} />
                            <div className="flex">
                                <div className="w-1/2 text-center font-semibold">
                                    <label>Directo al hotel</label>
                                    {
                                        contactosHotel.Telefono.length > 0 && (
                                            <>
                                                {
                                                    contactosHotel.Telefono.map((item) => (
                                                        <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50 mb-2">
                                                            <div className="flex items-center w-2/12">
                                                                <div dangerouslySetInnerHTML={{ __html: icons.Data.Telefono }} />
                                                            </div>
                                                            <div className="flex flex-col w-8/12 justify-start items-start">
                                                                <label className="text-sm">Teléfono</label>
                                                                <div className="font-normal text-xs">{item}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        contactosHotel.Whatsapp.length > 0 && (
                                            <>
                                                {
                                                    contactosHotel.Whatsapp.map((item) => (
                                                        <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50 mb-2">
                                                            <div className="flex items-center w-2/12">
                                                                <div dangerouslySetInnerHTML={{ __html: icons.Data.WhatsApp }} />
                                                            </div>
                                                            <div className="flex flex-col w-8/12 justify-start items-start">
                                                                <label className="text-sm">WhatsApp</label>
                                                                <div className="font-normal text-xs cursor-pointer hover:underline hover:text-blue-500" onClick={() => handleClickWhatsApp(item.replaceAll("+", "").replaceAll(" ", ""))}>{item}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        contactosHotel.Email.length > 0 && (
                                            <>
                                                {
                                                    contactosHotel.Email.map((item) => (
                                                        <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50 mb-2">
                                                            <div className="flex items-center w-2/12">
                                                                <div dangerouslySetInnerHTML={{ __html: icons.Data.Email }} />
                                                            </div>
                                                            <div className="flex flex-col w-8/12 justify-start items-start">
                                                                <label className="text-sm">Email</label>
                                                                <div className="font-normal text-ellipsis text-start text-xs cursor-pointer hover:underline hover:text-blue-500" style={{ maxWidth: '100%', overflowWrap: 'break-word' }} onClick={() => handleClickEmail(item)}>{item}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                </div>
                                <div className="w-1/2 text-center font-semibold">
                                    <label>Central de reserva</label>
                                    {
                                        contactosCentral.Whatsapp.length > 0 && (
                                            <>
                                                {
                                                    contactosCentral.Whatsapp.map((item) => (
                                                        <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50 mb-2">
                                                            <div className="flex items-center w-2/12">
                                                                <div dangerouslySetInnerHTML={{ __html: icons.Data.WhatsApp }} />
                                                            </div>
                                                            <div className="flex flex-col w-8/12 justify-start items-start">
                                                                <label className="text-sm">WhatsApp / Teléfono</label>
                                                                <div className="font-normal text-xs cursor-pointer hover:underline hover:text-blue-500" onClick={() => handleClickWhatsApp(item.formateado.replaceAll("+", "").replaceAll(" ", ""))}>{item.valor}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        contactosCentral.Email.length > 0 && (
                                            <>
                                                {
                                                    contactosCentral.Email.map((item) => (
                                                        <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50 mb-2">
                                                            <div className="flex items-center w-2/12">
                                                                <div dangerouslySetInnerHTML={{ __html: icons.Data.Email }} />
                                                            </div>
                                                            <div className="flex flex-col w-8/12 justify-start items-start">
                                                                <label className="text-sm">Email</label>
                                                                <div className="font-normal text-ellipsis text-start text-xs cursor-pointer hover:underline hover:text-blue-500" style={{ maxWidth: '100%', overflowWrap: 'break-word' }} onClick={() => handleClickEmail(item.valor)}>{item.valor}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                    <div className="flex border-2 border-orange-300 cursor-pointer rounded-md mx-3 py-1 bg-orange-50 mb-2" onClick={() => handleClickAceptar()}>
                                        <div className="flex items-center w-2/12">
                                            <div dangerouslySetInnerHTML={{ __html: icons.Data.Web }} />
                                        </div>
                                        <div className="flex flex-col w-8/12 justify-start items-start cursor-pointer">
                                            <label className="text-sm cursor-pointer">Reservar en la web</label>
                                            <div className="font-normal text-xs cursor-pointer hover:underline hover:text-blue-500">Click para pre-reservar</div>
                                        </div>
                                        <div className="flex items-center just-end w-2/12 cursor-pointer">
                                            {isLoading ? <Spinner color="white"></Spinner> : <></>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border m-4 flex flex-col justify-center items-center rounded-lg">
                                <label className="text-md  font-semibold">Generar Certificado</label>
                                <label className="text-sm">Llena el campo solo si el certificado no es para el titular de esta cuenta.</label>
                                <div className="flex gap-3 mb-2 mt-2 w-3/4">
                                    <input
                                        className="border-2 border-greenVE-500 rounded-md px-2 py-1 w-1/2 outline-none "
                                        type="text"
                                        value={inputUser}
                                        onChange={handleInputUserChange}
                                        placeholder="Ingresar Id de Usuario" />
                                    <button className={`bg-greenVE-500 text-white px-2 py-1 rounded-md w-full md:w-1/2`} onClick={() => createCert(true)} disabled={isLoading}>{isCreatingcert ? <div className=" flex items-center justify-center "><Spinner color="#36D7B7" size={150} /></div> : "Generar Certificado"}</button>
                                </div>
                            </div>
                            <div className="flex w-full justify-center mt-6 mb-2 gap-2">

                            </div>
                        </div>
                    </div>
                </div>``
            </div>
        </>

    );
};

export default HotelConfirmation;
