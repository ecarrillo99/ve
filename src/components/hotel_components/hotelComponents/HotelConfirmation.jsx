import { useState } from "react";
import { createReservation, getCertificado } from "../../../controllers/establecimiento/establecimientoController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import Config from "../../../global/config";
import HotelConfirmationDetail from "./HotelConfirmationDetail";

const HotelConfirmation = ({ Ofertas, isOpen, Establecimiento, Fechas, Valores, OnClose, Opciones, WineOffer }) => {
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
        if (!date) return '-';
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        try {
            return new Date(date).toLocaleDateString('es-ES', options);
        } catch (e) {
            return '-';
        }
    };

    function formatDateToAAAAMMDD(date) {
        if (!date) return '';
        try {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}/${month}/${day}`;
        } catch (e) {
            return '';
        }
    }

    const fechaString = (fecha) => {
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');
        return `${año}-${mes}-${dia}`;
    }

    const getWineOfferInfo = () => {
        if (!WineOffer) return null;
        return {
            titulo: WineOffer.TituloOferta || WineOffer.title || 'Oferta Ruta del Vino',
            precio: parseFloat(WineOffer.price || WineOffer.Precio || 0),
            imagen: WineOffer.FotoPrincipal || WineOffer.image || '',
            descripcion: WineOffer.Detalle || WineOffer.description || '',
            idOferta: WineOffer.IdOferta || WineOffer.id,
            inventarios: WineOffer.inventories || WineOffer.Inventarios || [],
        };
    };

    const wineOfferInfo = getWineOfferInfo();

    const createCert = () => {
        if (!isCreatingcert) {
            if (!Fechas || !Fechas[0]) {
                console.error('Fechas not set. Cannot create certificate.');
                return;
            }
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

            let wineOfferParams = '';
            if (wineOfferInfo) {
                wineOfferParams = `&WineOfferTitulo=${encodeURIComponent(wineOfferInfo.titulo)}` +
                    `&WineOfferPrecio=${wineOfferInfo.precio}` +
                    `&WineOfferImagen=${encodeURIComponent(wineOfferInfo.imagen)}` +
                    `&WineOfferDescripcion=${encodeURIComponent(wineOfferInfo.descripcion)}` +
                    `&WineOfferRegalos=${encodeURIComponent(wineOfferInfo.inventarios.map(i => i.name).join(', '))}`;
            }

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
                    window.open("/certificado?" + result + wineOfferParams, '_blank');
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

        let wineOfferMensaje = "";
        if (wineOfferInfo) {
            wineOfferMensaje = `\n🍷 *Oferta Ruta del Vino:* ${wineOfferInfo.titulo}`;
            if (wineOfferInfo.precio > 0) {
                wineOfferMensaje += ` - $${wineOfferInfo.precio.toFixed(2)}`;
            }
            if (wineOfferInfo.inventarios.length > 0) {
                wineOfferMensaje += `\n🎁 Regalos incluidos: ${wineOfferInfo.inventarios.map(i => i.name).join(', ')}`;
            }
        }

        const total = "$" + Valores.SinImpuestos + " más $" + Valores.Impuestos + " de impuestos y cargos";
        const msj = Config.MENSAJE
            .replaceAll("{{nombre}}", nombre)
            .replaceAll("{{id}}", id)
            .replaceAll("{{hotel}}", Establecimiento.Titulo)
            .replaceAll("{{checkin}}", formatDate(Fechas?.[0]?.startDate))
            .replaceAll("{{checkout}}", formatDate(Fechas?.[0]?.endDate))
            .replaceAll("{{personas}}", personas)
            .replaceAll("{{habitaciones}}", habitaciones + wineOfferMensaje)
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
                
                if (!Fechas || !Fechas[0]) {
                    console.error('Fechas not set. Cannot proceed with booking.');
                    setIsLoading(false);
                    return;
                }
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

                if (wineOfferInfo) {
                    datosReserva.wine_offer = {
                        id_oferta_vino: wineOfferInfo.idOferta,
                        titulo: wineOfferInfo.titulo,
                        precio: wineOfferInfo.precio,
                        regalos: wineOfferInfo.inventarios.map(i => ({
                            nombre: i.name,
                            precio: i.price || 0
                        }))
                    };
                    total += wineOfferInfo.precio;
                }

                datosReserva.total_reserva=total;

                createReservation(datosReserva,listaOfertas).then((res)=>{
                    setIsLoading(false)
                    if(res){
                        navigate("/historial");
                    }
                });
            } catch (e) {
            }
        }
    };

    return (
        <div className=" fixed inset-0 flex items-center justify-center z-40">
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => !isLoading && OnClose()}></div>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 m-6 z-50 max-h-[90vh] overflow-y-auto ">
                <div className="bg-white rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="bg-greenVE-600 p-4 rounded-t-lg relative">
                        <button 
                            className={`absolute top-4 right-4 ${isLoading ? 'bg-gray-400' : 'bg-white hover:bg-gray-100'} text-greenVE-600 rounded-full h-8 w-8 font-bold transition-colors flex items-center justify-center`} 
                            onClick={() => OnClose()} 
                            disabled={isLoading}
                        >
                            X
                        </button>
                        <h2 className="text-white text-xl font-semibold text-center pr-8">Confirmar Reserva</h2>
                        <p className="text-white text-sm text-center mt-1">Revisa los detalles y elige cómo contactar</p>
                    </div>

                    <div className="p-4">
                        {/* Detalles */}
                        <HotelConfirmationDetail 
                            Ofertas={Ofertas} 
                            isOpen={isOpen} 
                            Establecimiento={Establecimiento} 
                            Fechas={Fechas} 
                            Valores={Valores} 
                            OnClose={OnClose} 
                            Opciones={Opciones}
                            WineOffer={WineOffer}
                        />
                       
                        {/* Contactos */}
                        <div className="flex flex-wrap gap-4 mt-4">
                            {/* Directo al hotel */}
                             {contactosHotel.Whatsapp.length > 0 && contactosHotel.Telefono.length > 0 && contactosHotel.Email.length > 0 && (
                            <div>
                                <h3 className="font-semibold text-center mb-3 flex items-center justify-center gap-2">
                                    <span className="icon-[mdi--hotel] h-5 w-5 text-greenVE-600"></span>
                                    Directo al hotel
                                </h3>
                                <div className="flex flex-wrap space-y-2">
                                    {contactosHotel.Whatsapp.length > 0 && contactosHotel.Whatsapp.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleClickWhatsApp(item.replaceAll("+", "").replaceAll(" ", ""))}
                                            className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-green-400 rounded-lg transition-all"
                                        >
                                            <div className="bg-green-100 p-2 rounded-lg">
                                                <span className="icon-[mdi--whatsapp] h-5 w-5 text-green-600"></span>
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-xs text-gray-500">WhatsApp</p>
                                                <p className="text-sm font-medium text-gray-700">{item}</p>
                                            </div>
                                            <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-gray-400"></span>
                                        </button>
                                    ))}

                                    {contactosHotel.Telefono.length > 0 && contactosHotel.Telefono.map((item, index) => (
                                        <a
                                            key={index}
                                            href={`tel:${item}`}
                                            className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-blue-400 rounded-lg transition-all"
                                        >
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                                <span className="icon-[ph--phone-bold] h-5 w-5 text-blue-600"></span>
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-xs text-gray-500">Teléfono</p>
                                                <p className="text-sm font-medium text-gray-700">{item}</p>
                                            </div>
                                            <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-gray-400"></span>
                                        </a>
                                    ))}

                                    {contactosHotel.Email.length > 0 && contactosHotel.Email.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleClickEmail(item)}
                                            className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-red-400 rounded-lg transition-all"
                                        >
                                            <div className="bg-red-100 p-2 rounded-lg">
                                                <span className="icon-[material-symbols--mail-outline-rounded] h-5 w-5 text-red-600"></span>
                                            </div>
                                            <div className="flex-1 text-left overflow-hidden">
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="text-sm font-medium text-gray-700 truncate">{item}</p>
                                            </div>
                                            <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-gray-400"></span>
                                        </button>
                                    ))}
                                </div>
                            </div>)}

                            {/* Central de reservas */}
                            <div>
                                <h3 className="font-semibold text-center mb-3 flex items-center justify-center gap-2">
                                    <span className="icon-[ph--phone-bold] h-5 w-5 text-greenVE-600"></span>
                                    Central de reservas
                                </h3>
                                <div className="flex flex-wrap space-y-2">
                                    {contactosCentral.Whatsapp.length > 0 && contactosCentral.Whatsapp.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleClickWhatsApp(item.formateado.replaceAll("+", "").replaceAll(" ", ""))}
                                            className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-green-400 rounded-lg transition-all"
                                        >
                                            <div className="bg-green-100 p-2 rounded-lg">
                                                <span className="icon-[mdi--whatsapp] h-5 w-5 text-green-600"></span>
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="text-xs text-gray-500">WhatsApp</p>
                                                <p className="text-sm font-medium text-gray-700">{item.valor}</p>
                                            </div>
                                            <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-gray-400"></span>
                                        </button>
                                    ))}

                                    {contactosCentral.Email.length > 0 && contactosCentral.Email.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleClickEmail(item.valor)}
                                            className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-red-400 rounded-lg transition-all"
                                        >
                                            <div className="bg-red-100 p-2 rounded-lg">
                                                <span className="icon-[material-symbols--mail-outline-rounded] h-5 w-5 text-red-600"></span>
                                            </div>
                                            <div className="flex-1 text-left overflow-hidden">
                                                <p className="text-xs text-gray-500">Email</p>
                                                <p className="text-sm font-medium text-gray-700 truncate">{item.valor}</p>
                                            </div>
                                            <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-gray-400"></span>
                                        </button>
                                    ))}

                                    {/* Reservar en la web */}
                                    <button
                                        onClick={handleClickAceptar}
                                        disabled={isLoading}
                                        className="w-full flex items-center gap-3 p-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-all disabled:opacity-50"
                                    >
                                        <div className="bg-white/20 p-2 rounded-lg">
                                            <span className="icon-[mdi--web] h-5 w-5 text-white"></span>
                                        </div>
                                        <div className="flex-1 text-left">
                                            <p className="text-xs text-white">Reservar en la web</p>
                                            <p className="text-sm font-medium text-white">Click para pre-reservar</p>
                                        </div>
                                        {isLoading ? (
                                            <Spinner color="white" className="h-5 w-5" />
                                        ) : (
                                            <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-white"></span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Certificado */}
                        <div className="mt-4 bg-greenVE-50 border border-greenVE-200 rounded-lg p-4">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <span className="icon-[ph--certificate] h-6 w-6 text-greenVE-600"></span>
                                <h3 className="font-semibold text-greenVE-700">Generar Certificado</h3>
                            </div>
                            <p className="text-sm text-center text-gray-600 mb-3">
                                Llena el campo solo si el certificado no es para el titular de esta cuenta
                            </p>
                            <div className="flex gap-3">
                                <input
                                    className="flex-1 border border-greenVE-300 focus:border-greenVE-500 rounded-lg px-3 py-2 outline-none"
                                    type="text"
                                    value={inputUser}
                                    onChange={handleInputUserChange}
                                    placeholder="ID de Usuario (opcional)"
                                />
                                <button 
                                    className="bg-greenVE-600 hover:bg-greenVE-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50" 
                                    onClick={createCert} 
                                    disabled={isCreatingcert}
                                >
                                    {isCreatingcert ? (
                                        <Spinner color="white" className="h-5 w-5" />
                                    ) : (
                                        "Generar Certificado"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelConfirmation;