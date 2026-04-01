import { useState } from "react";
import { createReservation, getCertificado } from "../../../controllers/establecimiento/establecimientoController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import Config from "../../../global/config";


const StepIndicator = ({ currentStep }) => {
    const steps = [
        { num: 1, label: "Resumen" },
        { num: 2, label: "Certificado" },
        { num: 3, label: "Contactar" },
    ];

    return (
        <div className="flex items-center justify-center px-4 ">
            {steps.map((step, index) => (
                <div key={step.num} className="flex items-center">
                    {/* Círculo del paso */}
                    <div className="flex flex-col items-center gap-1">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                                ${currentStep === step.num
                                    ? "bg-greenVE-600 border-greenVE-600 text-white shadow-md scale-110"
                                    : currentStep > step.num
                                        ? "bg-greenVE-500 border-greenVE-500 text-white"
                                        : "bg-white border-gray-300 text-gray-400"
                                }`}
                        >
                            {currentStep > step.num ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                step.num
                            )}
                        </div>
                        <span className={`text-[10px] font-medium transition-colors duration-300
                            ${currentStep === step.num ? "text-white" : currentStep > step.num ? "text-gray-300" : "text-gray-400"}`}>
                            {step.label}
                        </span>
                    </div>

                    {/* Línea conectora */}
                    {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-2 mb-4 rounded transition-all duration-500
                            ${currentStep > step.num ? "bg-greenVE-500" : "bg-gray-200"}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};


const Step1Resumen = ({ Ofertas, Establecimiento, Fechas, Valores, Opciones, WineOffer, user }) => {
    const formatDate = (date) => {
        if (!date) return '-';
        const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        try { return new Date(date).toLocaleDateString('es-ES', options); } catch { return '-'; }
    };

    const calcularNoches = () => {
        if (!Fechas?.[0]?.startDate || !Fechas?.[0]?.endDate) return 0;
        return Math.ceil(Math.abs(new Date(Fechas[0].endDate) - new Date(Fechas[0].startDate)) / (1000 * 60 * 60 * 24));
    };

    const wineOfferInfo = WineOffer ? {
        titulo: WineOffer.TituloOferta || WineOffer.title || 'Oferta Ruta del Vino',
        precio: parseFloat(WineOffer.price || WineOffer.Precio || 0),
        imagen: WineOffer.FotoPrincipal || WineOffer.image || '',
        inventarios: WineOffer.inventories || WineOffer.Inventarios || [],
    } : null;

    const nombreUsuario = user?.data?.nombre || '';
    const emailUsuario = user?.data?.email || '';
    const codigoUsuario = user?.data?.codigo || '';
    const nivelUsuario = user?.data?.nivel || 'visitante';

    const Section = ({ icon, title, children }) => (
        <div className="rounded-xl border border-gray-100 overflow-hidden mb-3 shadow-sm">
            <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center gap-2">
                <span className={`${icon} h-4 w-4 text-greenVE-600`}></span>
                <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
            </div>
            <div className="p-4">{children}</div>
        </div>
    );

    return (
        <div className="space-y-1">

            {/* ── Establecimiento ── */}
            <Section icon="icon-[mdi--hotel]" title="Establecimiento">
                <div className="flex gap-3">
                    {(Establecimiento.image || Establecimiento.FotoPrincipal) && (
                        <img
                            src={Establecimiento.image || Establecimiento.FotoPrincipal}
                            alt={Establecimiento.name || Establecimiento.Titulo}
                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm leading-tight">{Establecimiento.Titulo}</p>
                        <div className="flex gap-0.5 my-1">
                            {Array(+(Establecimiento.Catalogacion || 0)).fill(null).map((_, i) => (
                                <svg key={i} height="12px" width="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-amber-400">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-xs">{Establecimiento.Ciudad} · {Establecimiento.Direccion}</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ── Fechas y acomodación ── */}
            <Section icon="icon-[mdi--calendar-check]" title="Fechas de estadía">
                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-greenVE-50 rounded-lg p-2">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Check-in</p>
                        <p className="text-xs font-semibold text-gray-800 mt-0.5 leading-tight">{formatDate(Fechas?.[0]?.startDate)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2 flex flex-col items-center justify-center">
                        <p className="text-lg font-bold text-greenVE-700">{calcularNoches()}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">noches</p>
                    </div>
                    <div className="bg-greenVE-50 rounded-lg p-2">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide font-medium">Check-out</p>
                        <p className="text-xs font-semibold text-gray-800 mt-0.5 leading-tight">{formatDate(Fechas?.[0]?.endDate)}</p>
                    </div>
                </div>
            </Section>

            {/* ── Acomodación ── */}
            <Section icon="icon-[material-symbols--bed-outline-rounded]" title="Habitaciones seleccionadas">
                <div className="space-y-2">
                    {Ofertas.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                            <div className="flex items-center gap-2">
                                <span className="bg-greenVE-100 text-greenVE-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                    {item.NumOfertas}x
                                </span>
                                <p className="text-sm text-gray-700 font-medium">{item.TituloOferta}</p>
                            </div>
                            {item.Acomodacion && (
                                <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
                                    {item.Acomodacion}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </Section>

            {/* ── Personas ── */}
            <Section icon="icon-[solar--user-rounded-outline]" title="Personas">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {Array(Opciones.adult).fill(null).map((_, i) => (
                                <span key={i} className="icon-[solar--user-rounded-outline] h-5 w-5 text-greenVE-600"></span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{Opciones.adult} adulto{Opciones.adult !== 1 ? 's' : ''}</span>
                    </div>
                    {Opciones.children > 0 && (
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {Array(Opciones.children).fill(null).map((_, i) => (
                                    <span key={i} className="icon-[solar--user-rounded-outline] h-4 w-4 text-blue-400"></span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{Opciones.children} niño{Opciones.children !== 1 ? 's' : ''}</span>
                        </div>
                    )}
                    {Opciones.childrenAges?.length > 0 && (
                        <p className="text-xs text-gray-500 self-center">
                            Edades: {Opciones.childrenAges.join(', ')} años
                        </p>
                    )}
                </div>
            </Section>

            {/* ── Oferta Vino (si existe) ── */}
            {wineOfferInfo && (
                <Section icon="icon-[mdi--glass-wine]" title="Ruta del Vino incluida">
                    <div className="flex gap-3 items-center">
                        {wineOfferInfo.imagen && (
                            <img src={wineOfferInfo.imagen} alt={wineOfferInfo.titulo} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                        )}
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-amber-700">{wineOfferInfo.titulo}</p>
                            {wineOfferInfo.inventarios.length > 0 && (
                                <p className="text-xs text-gray-600 mt-0.5">
                                    🎁 {wineOfferInfo.inventarios.map(i => i.name).join(', ')}
                                </p>
                            )}
                            {wineOfferInfo.precio > 0 && (
                                <p className="text-xs font-bold text-amber-600 mt-1">${wineOfferInfo.precio.toFixed(2)}</p>
                            )}
                        </div>
                    </div>
                </Section>
            )}

            {/* ── Resumen de precio ── */}
            <Section icon="icon-[mdi--cash-multiple]" title="Resumen de precios">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal hospedaje</span>
                        <span className="font-semibold">${Valores.SinImpuestos}</span>
                    </div>
                    {wineOfferInfo && wineOfferInfo.precio > 0 && (
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Ruta del Vino</span>
                            <span className="font-semibold text-amber-600">${wineOfferInfo.precio.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Impuestos y servicios</span>
                        <span className="font-semibold">${Valores.Impuestos}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t border-gray-200 mt-1">
                        <span className="font-bold text-greenVE-700 text-base">Total</span>
                        <span className="font-bold text-greenVE-700 text-base">
                            ${(Valores.SinImpuestos + Valores.Impuestos + (wineOfferInfo?.precio || 0)).toFixed(2)}
                        </span>
                    </div>
                </div>
            </Section>

            {/* ── Datos del usuario ── */}
            {user && (
                <Section icon="icon-[solar--user-id-bold-duotone]" title="Datos del titular">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        {nombreUsuario && (
                            <div>
                                <p className="text-xs text-gray-500">Nombre</p>
                                <p className="font-medium text-gray-800">{nombreUsuario}</p>
                            </div>
                        )}
                        {codigoUsuario && (
                            <div>
                                <p className="text-xs text-gray-500">Código</p>
                                <p className="font-medium text-gray-800">{codigoUsuario}</p>
                            </div>
                        )}
                        {emailUsuario && (
                            <div className="col-span-2">
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="font-medium text-gray-800">{emailUsuario}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-xs text-gray-500">Tipo de cuenta</p>
                            <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-semibold capitalize
                                ${nivelUsuario === 'suscriptor' ? 'bg-greenVE-100 text-greenVE-700' : 'bg-gray-100 text-gray-600'}`}>
                                {nivelUsuario}
                            </span>
                        </div>
                    </div>
                </Section>
            )}
        </div>
    );
};


const Step2Certificado = ({ Ofertas, Establecimiento, Fechas, Opciones, WineOffer, onCertificateGenerated }) => {
    const [isCreatingCert, setIsCreatingCert] = useState(false);
    const [inputUser, setInputUser] = useState('');
    const [certGenerated, setCertGenerated] = useState(false);

    const fechaString = (fecha) => {
        const d = new Date(fecha);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    const wineOfferInfo = WineOffer ? {
        titulo: WineOffer.TituloOferta || WineOffer.title || 'Oferta Ruta del Vino',
        precio: parseFloat(WineOffer.price || WineOffer.Precio || 0),
        imagen: WineOffer.FotoPrincipal || WineOffer.image || '',
        descripcion: WineOffer.Detalle || WineOffer.description || '',
        idOferta: WineOffer.IdOferta || WineOffer.id,
        inventarios: WineOffer.inventories || WineOffer.Inventarios || [],
    } : null;

    const createCert = () => {
        if (isCreatingCert) return;
        if (!Fechas?.[0]) return;

        setIsCreatingCert(true);
        const dataOfertas = Ofertas.map(item => ({ cant: item.NumOfertas, oferta: item.Id }));
        const fechas = {
            inicio: fechaString(Fechas[0].startDate),
            fin: fechaString(Fechas[0].endDate),
        };

        // Parámetros de personas (garantizan que lleguen correctamente al certificado)
        const personasParams = `&Adultos=${Opciones.adult}&Ninos=${Opciones.children || 0}`;

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
                window.open("/certificado?" + result + personasParams + wineOfferParams, '_blank');
                setCertGenerated(true);
                onCertificateGenerated?.();
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Explicación */}
            <div className="bg-greenVE-50 border border-greenVE-200 rounded-xl p-4 text-center">
                <div className="w-14 h-14 bg-greenVE-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="icon-[ph--certificate-bold] h-7 w-7 text-greenVE-600"></span>
                </div>
                <h3 className="font-bold text-greenVE-800 text-base mb-1">Genera tu certificado de reserva</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    El certificado es el documento que necesitas para completar tu reserva.
                    Descárgalo y úsalo en el siguiente paso para contactar al hotel o a nuestra central.
                </p>
            </div>

            {/* Campo para otro usuario */}
            <div className="rounded-xl border border-gray-200 p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                    ¿El certificado es para otra persona?
                </label>
                <p className="text-xs text-gray-500 mb-3">
                    Deja este campo vacío si el certificado es para el titular de esta cuenta.
                </p>
                <input
                    className="w-full border border-gray-200 focus:border-greenVE-400 focus:ring-1 focus:ring-greenVE-200 rounded-lg px-3 py-2 text-sm outline-none transition-all"
                    type="text"
                    value={inputUser}
                    onChange={(e) => setInputUser(e.target.value)}
                    placeholder="ID de otro usuario (opcional)"
                />
            </div>

            {/* Botón generar */}
            <button
                onClick={createCert}
                disabled={isCreatingCert}
                className="w-full flex items-center justify-center gap-3 bg-greenVE-600 hover:bg-greenVE-700 disabled:opacity-60 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
                {isCreatingCert ? (
                    <>
                        <Spinner color="white" className="h-5 w-5" />
                        <span>Generando certificado...</span>
                    </>
                ) : (
                    <>
                        <span className="icon-[ph--download-bold] h-5 w-5"></span>
                        <span>Generar y descargar certificado</span>
                    </>
                )}
            </button>

            {/* Estado: certificado ya generado */}
            {certGenerated && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-green-700">¡Certificado generado!</p>
                        <p className="text-xs text-green-600">Ya puedes continuar al siguiente paso.</p>
                    </div>
                </div>
            )}

            {/* Tip */}
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <span className="icon-[mdi--information-outline] h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5"></span>
                <p className="text-xs text-amber-700">
                    El certificado se abrirá en una nueva pestaña. Guárdalo o descárgalo desde tu navegador.
                    Recuerda que necesitarás enviarlo al hotel o a la central para confirmar tu reserva.
                </p>
            </div>
        </div>
    );
};


const Step3Contactar = ({ Ofertas, Establecimiento, Fechas, Valores, Opciones, WineOffer, onReservaDirect, isLoading }) => {
    const contactosHotel = Establecimiento.Contactos;
    const contactosCentral = Establecimiento.ContactosCentral;
    const user = JSON.parse(localStorage.getItem('datos'));
    const id = user?.data?.codigo || '';
    const nombre = user?.data?.nombre || '';

    const wineOfferInfo = WineOffer ? {
        titulo: WineOffer.TituloOferta || WineOffer.title || 'Oferta Ruta del Vino',
        precio: parseFloat(WineOffer.price || WineOffer.Precio || 0),
        inventarios: WineOffer.inventories || WineOffer.Inventarios || [],
    } : null;

    const formatDate = (date) => {
        if (!date) return '-';
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        try { return new Date(date).toLocaleDateString('es-ES', options); } catch { return '-'; }
    };

    const mensaje = () => {
        const personas = Opciones.adult + (Opciones.adult > 1 ? " adultos" : " adulto") +
            (Opciones.children === 0 ? "" : ", " + Opciones.children + (Opciones.children > 1 ? " niños" : " niño"));
        let habitaciones = "\n";
        Ofertas.forEach(el => { habitaciones += (el.TotalOfertas) + "x " + el.TituloOferta + "\n"; });
        let wineMsg = "";
        if (wineOfferInfo) {
            wineMsg = `\n *Oferta Ruta del Vino:* ${wineOfferInfo.titulo}`;
            if (wineOfferInfo.precio > 0) wineMsg += ` - $${wineOfferInfo.precio.toFixed(2)}`;
            if (wineOfferInfo.inventarios.length > 0) wineMsg += `\n🎁 Regalos: ${wineOfferInfo.inventarios.map(i => i.name).join(', ')}`;
        }
        const total = "$" + Valores.SinImpuestos + " más $" + Valores.Impuestos + " de impuestos";
        return Config.MENSAJE
            .replaceAll("{{nombre}}", nombre)
            .replaceAll("{{id}}", id)
            .replaceAll("{{hotel}}", Establecimiento.Titulo)
            .replaceAll("{{checkin}}", formatDate(Fechas?.[0]?.startDate))
            .replaceAll("{{checkout}}", formatDate(Fechas?.[0]?.endDate))
            .replaceAll("{{personas}}", personas)
            .replaceAll("{{habitaciones}}", habitaciones + wineMsg)
            .replaceAll("{{total}}", total);
    };

    const encode = (text) => text.replaceAll(" ", "%20").replaceAll("\n", "%0A");

    const handleWhatsApp = (num) => window.open("https://wa.me/" + num + "?text=" + encode(mensaje()));
    const handleEmail = (email) => window.open("mailto:" + email + "?subject=Reserva&body=" + encode(mensaje()));

    const ContactBtn = ({ icon, iconBg, iconColor, label, sublabel, borderHover, onClick }) => (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 p-3 bg-white border border-gray-200 ${borderHover} rounded-xl transition-all hover:shadow-sm active:scale-95`}
        >
            <div className={`${iconBg} p-2 rounded-lg flex-shrink-0`}>
                <span className={`${icon} h-5 w-5 ${iconColor}`}></span>
            </div>
            <div className="flex-1 text-left overflow-hidden">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-700 truncate">{sublabel}</p>
            </div>
            <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-gray-300 flex-shrink-0"></span>
        </button>
    );

    return (
        <div className="space-y-5">
            {/* Instrucción */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="icon-[mdi--send-check-outline] h-4 w-4 text-blue-600"></span>
                    </div>
                </div>
                <div>
                    <p className="text-sm font-bold text-blue-800 mb-0.5">¡Último paso!</p>
                    <p className="text-sm text-blue-700 leading-relaxed">
                        Contáctate con nuestra central de reservas y recibe atención especializada en tu proceso de reserva o contacta con el hotel directamente y <strong>envía el certificado</strong> que generaste en el paso anterior para confirmar tu reserva.
                    </p>
                </div>
            </div>

            {/* Central de reservas */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="icon-[ph--phone-bold] h-4 w-4 text-greenVE-600"></span>
                    <h3 className="text-sm font-bold text-gray-700">Central de reservas</h3>
                </div>
                <div className="space-y-2">
                    {/* WhatsApp central — side by side si hay más de 1 */}
                    {contactosCentral?.Whatsapp?.length > 0 && (
                        <div className={contactosCentral.Whatsapp.length > 1 ? "flex flex-row gap-2" : ""}>
                            {contactosCentral.Whatsapp.map((item, i) => (
                                <ContactBtn key={i}
                                    icon="icon-[mdi--whatsapp]" iconBg="bg-green-100" iconColor="text-green-600"
                                    borderHover="hover:border-green-400"
                                    label="WhatsApp central" sublabel={item.valor}
                                    onClick={() => handleWhatsApp(item.formateado.replaceAll("+", "").replaceAll(" ", ""))}
                                />
                            ))}
                        </div>
                    )}

                    {/* Email central — side by side si hay más de 1 */}
                    {contactosCentral?.Email?.length > 0 && (
                        <div className={contactosCentral.Email.length > 1 ? "flex flex-row gap-2" : ""}>
                            {contactosCentral.Email.map((item, i) => (
                                <ContactBtn key={i}
                                    icon="icon-[material-symbols--mail-outline-rounded]" iconBg="bg-red-100" iconColor="text-red-600"
                                    borderHover="hover:border-red-400"
                                    label="Email central" sublabel={item.valor}
                                    onClick={() => handleEmail(item.valor)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Divisor */}
            {contactosHotel && (contactosHotel.Whatsapp?.length > 0 || contactosHotel.Telefono?.length > 0 || contactosHotel.Email?.length > 0) && (
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">o también</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>
            )}

            {/* Hotel directo */}
            {contactosHotel && (contactosHotel.Whatsapp?.length > 0 || contactosHotel.Telefono?.length > 0 || contactosHotel.Email?.length > 0) && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="icon-[mdi--hotel] h-4 w-4 text-greenVE-600"></span>
                        <h3 className="text-sm font-bold text-gray-700">Directo al hotel</h3>
                    </div>
                    <div className="space-y-2">
                        {/* WhatsApp hotel — side by side si hay más de 1 */}
                        {contactosHotel.Whatsapp?.length > 0 && (
                            <div className={contactosHotel.Whatsapp.length > 1 ? "flex flex-row gap-2" : ""}>
                                {contactosHotel.Whatsapp.map((item, i) => (
                                    <ContactBtn key={i}
                                        icon="icon-[mdi--whatsapp]" iconBg="bg-green-100" iconColor="text-green-600"
                                        borderHover="hover:border-green-400"
                                        label="WhatsApp hotel" sublabel={item}
                                        onClick={() => handleWhatsApp(item.replaceAll("+", "").replaceAll(" ", ""))}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Teléfono hotel */}
                        {contactosHotel.Telefono?.map((item, i) => (
                            <a key={i} href={`tel:${item}`}
                                className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 hover:border-blue-400 rounded-xl transition-all hover:shadow-sm">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <span className="icon-[ph--phone-bold] h-5 w-5 text-blue-600"></span>
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-xs text-gray-500">Teléfono hotel</p>
                                    <p className="text-sm font-medium text-gray-700">{item}</p>
                                </div>
                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-gray-300"></span>
                            </a>
                        ))}

                        {/* Email hotel — side by side si hay más de 1 */}
                        {contactosHotel.Email?.length > 0 && (
                            <div className={contactosHotel.Email.length > 1 ? "flex flex-row gap-2" : ""}>
                                {contactosHotel.Email.map((item, i) => (
                                    <ContactBtn key={i}
                                        icon="icon-[material-symbols--mail-outline-rounded]" iconBg="bg-red-100" iconColor="text-red-600"
                                        borderHover="hover:border-red-400"
                                        label="Email hotel" sublabel={item}
                                        onClick={() => handleEmail(item)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Reserva directa web */}
                        <button
                            onClick={onReservaDirect}
                            disabled={isLoading}
                            className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-greenVE-600 to-greenVE-500 hover:from-greenVE-700 hover:to-greenVE-600 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
                        >
                            <div className="bg-white/20 p-2 rounded-lg">
                                <span className="icon-[mdi--web] h-5 w-5 text-white"></span>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-xs text-white/80">Reserva directa en la plataforma</p>
                                <p className="text-sm font-semibold text-white">Confirmar ahora en la web</p>
                            </div>
                            {isLoading ? (
                                <Spinner color="white" className="h-5 w-5" />
                            ) : (
                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-4 w-4 text-white/80"></span>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Recordatorio certificado */}
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                <span className="icon-[ph--certificate] h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5"></span>
                <p className="text-xs text-amber-700">
                    Recuerda adjuntar o mencionar el <strong>certificado de reserva</strong> que generaste en el paso anterior al contactarte con el hotel o la central.
                </p>
            </div>
        </div>
    );
};

const HotelConfirmation = ({ Ofertas, isOpen, Establecimiento, Fechas, Valores, OnClose, Opciones, WineOffer }) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [certGenerated, setCertGenerated] = useState(false);

    const user = JSON.parse(localStorage.getItem('datos'));

    if (!isOpen) return null;

    const stepTitles = {
        1: "Resumen de tu reserva",
        2: "Genera tu certificado",
        3: "Confirma tu reserva",
    };
    const stepSubtitles = {
        1: "Verifica todos los detalles antes de continuar",
        2: "Descarga el certificado para presentarlo al hotel",
        3: "Envía el certificado y confirma tu estadía",
    };

    function formatDateToAAAAMMDD(date) {
        if (!date) return '';
        try {
            const d = new Date(date);
            return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
        } catch { return ''; }
    }

    const handleReservaDirect = async () => {
        if (isLoading) return;
        setIsLoading(true);
        let total = 0;
        try {
            const datosReserva = { id_tbl_estado_reserva: 1, id_empresa: 1 };
            const listaOfertas = [];

            if (!Fechas?.[0]) { setIsLoading(false); return; }

            for (const oferta of Ofertas) {
                listaOfertas.push({
                    id_tbl_establecimiento: oferta.IdEstablecimiento,
                    id_tbl_info_indice_oferta: oferta.Id,
                    adultos: oferta.Adultos,
                    ninos: oferta.Ninos || "0",
                    cantidad_ofertas: oferta.NumOfertas,
                    fecha_inicio: formatDateToAAAAMMDD(Fechas[0].startDate),
                    fecha_fin: formatDateToAAAAMMDD(Fechas[0].endDate),
                    precio_total: oferta.Final * parseInt(oferta.NumOfertas),
                    edades_ninos: Opciones.childrenAges?.join(",") || "",
                });
                total += oferta.Final * parseInt(oferta.NumOfertas);
            }

            const wineOfferInfo = WineOffer ? {
                idOferta: WineOffer.IdOferta || WineOffer.id,
                titulo: WineOffer.TituloOferta || WineOffer.title,
                precio: parseFloat(WineOffer.price || WineOffer.Precio || 0),
                inventarios: WineOffer.inventories || WineOffer.Inventarios || [],
            } : null;

            if (wineOfferInfo) {
                datosReserva.wine_offer = {
                    id_oferta_vino: wineOfferInfo.idOferta,
                    titulo: wineOfferInfo.titulo,
                    precio: wineOfferInfo.precio,
                    regalos: wineOfferInfo.inventarios.map(i => ({ nombre: i.name, precio: i.price || 0 })),
                };
                total += wineOfferInfo.precio;
            }
            datosReserva.total_reserva = total;

            createReservation(datosReserva, listaOfertas).then((res) => {
                setIsLoading(false);
                if (res) navigate("/historial");
            });
        } catch {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-end sm:items-center justify-center z-40">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => !isLoading && OnClose()}
            />

            {/* Modal */}
            <div className="relative w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-5/12 mx-auto z-50
                            max-h-[95vh] sm:max-h-[90vh] flex flex-col
                            rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl">

                {/* ── Header ── */}
                <div className="bg-greenVE-600 px-5 pt-5 pb-3 flex-shrink-0">
                    {/* Título y cerrar */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 pr-8">
                            <h2 className="text-white text-lg font-bold leading-tight">{stepTitles[currentStep]}</h2>
                            <p className="text-white/80 text-xs mt-0.5">{stepSubtitles[currentStep]}</p>
                        </div>
                        <button
                            onClick={() => !isLoading && OnClose()}
                            disabled={isLoading}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-full h-8 w-8 flex items-center justify-center transition-colors flex-shrink-0"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Step indicator */}
                    <div className="bg-white/10 rounded-xl px-2 pt-3 pb-1">
                        <StepIndicator currentStep={currentStep} />
                    </div>
                </div>

                {/* ── Contenido scrollable ── */}
                <div className="flex-1 overflow-y-auto bg-white px-4 py-4">
                    {currentStep === 1 && (
                        <Step1Resumen
                            Ofertas={Ofertas}
                            Establecimiento={Establecimiento}
                            Fechas={Fechas}
                            Valores={Valores}
                            Opciones={Opciones}
                            WineOffer={WineOffer}
                            user={user}
                        />
                    )}
                    {currentStep === 2 && (
                        <Step2Certificado
                            Ofertas={Ofertas}
                            Establecimiento={Establecimiento}
                            Fechas={Fechas}
                            Opciones={Opciones}
                            WineOffer={WineOffer}
                            onCertificateGenerated={() => setCertGenerated(true)}
                        />
                    )}
                    {currentStep === 3 && (
                        <Step3Contactar
                            Ofertas={Ofertas}
                            Establecimiento={Establecimiento}
                            Fechas={Fechas}
                            Valores={Valores}
                            Opciones={Opciones}
                            WineOffer={WineOffer}
                            onReservaDirect={handleReservaDirect}
                            isLoading={isLoading}
                        />
                    )}
                </div>

                {/* ── Footer navegación ── */}
                <div className="bg-white border-t border-gray-100 px-4 py-3 flex gap-3 flex-shrink-0">
                    {currentStep > 1 && (
                        <button
                            onClick={() => setCurrentStep(s => s - 1)}
                            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Anterior
                        </button>
                    )}

                    {currentStep < 3 && (
                        <button
                            onClick={() => setCurrentStep(s => s + 1)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-greenVE-600 hover:bg-greenVE-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            {currentStep === 1 ? 'Continuar a certificado' : 'Continuar a contactos'}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {currentStep === 3 && (
                        <button
                            onClick={OnClose}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition-all"
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelConfirmation;