import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import Icons from "../../../global/icons";

const icons = new Icons();

const HotelContacts = (props) => {
    const {Contactos, ContactosCentral} = props
    
    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }
    
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const ContactSection = ({ title, contacts, idOffset }) => (
        <div className="mb-4">
            <div className="bg-greenVE-600 text-white px-4 py-2 rounded-t-lg">
                <p className="font-medium text-sm">{title}</p>
            </div>
            <div className="bg-white border border-greenVE-300 rounded-b-lg overflow-hidden">
                {contacts.Whatsapp.length > 0 && (
                    <Accordion className="border-b border-greenVE-200 last:border-b-0" open={open === idOffset + 1} icon={<Icon id={idOffset + 1} open={open} />}>
                        <AccordionHeader 
                            className="text-sm bg-greenVE-50 hover:bg-greenVE-100 text-greenVE-800 px-4 py-3 transition-colors" 
                            onClick={() => handleOpen(idOffset + 1)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5" dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("WA_White").includes(clave))] }} />
                                <span className="font-normal">WhatsApp</span>
                            </div>
                        </AccordionHeader>
                        <AccordionBody className="bg-white px-4 py-3">
                            <div className="flex flex-col gap-2">
                                {contacts.Whatsapp.map((item, index) => (
                                    <a 
                                        key={index} 
                                        className="text-greenVE-700 hover:text-greenVE-600 hover:underline transition-colors text-sm flex items-center gap-2" 
                                        target="_blank" 
                                        href={`https://wa.me/${(item.formateado || item).replace(/\s/g, '')}?text=${encodeURIComponent("Hola, deseo reservar esta oferta")}`}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                        {item.valor || item}
                                    </a>
                                ))}
                            </div>
                        </AccordionBody>
                    </Accordion>
                )}
                
                {contacts.Telefono.length > 0 && (
                    <Accordion className="border-b border-greenVE-200 last:border-b-0" open={open === idOffset + 2} icon={<Icon id={idOffset + 2} open={open} />}>
                        <AccordionHeader 
                            className="text-sm bg-greenVE-50 hover:bg-greenVE-100 text-greenVE-800 px-4 py-3 transition-colors" 
                            onClick={() => handleOpen(idOffset + 2)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5" dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("Tel_White").includes(clave))] }} />
                                <span className="font-normal">Teléfono</span>
                            </div>
                        </AccordionHeader>
                        <AccordionBody className="bg-white px-4 py-3">
                            <div className="flex flex-col gap-2">
                                {contacts.Telefono.map((item, index) => (
                                    <p key={index} className="text-greenVE-700 text-sm flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {item.valor || item}
                                    </p>
                                ))}
                            </div>
                        </AccordionBody>
                    </Accordion>
                )}
                
                {contacts.Email.length > 0 && (
                    <Accordion className="border-b border-greenVE-200 last:border-b-0" open={open === idOffset + 3} icon={<Icon id={idOffset + 3} open={open} />}>
                        <AccordionHeader 
                            className="text-sm bg-greenVE-50 hover:bg-greenVE-100 text-greenVE-800 px-4 py-3 transition-colors" 
                            onClick={() => handleOpen(idOffset + 3)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5" dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("Em_White").includes(clave))] }} />
                                <span className="font-normal">Correo</span>
                            </div>
                        </AccordionHeader>
                        <AccordionBody className="bg-white px-4 py-3">
                            <div className="flex flex-col gap-2">
                                {contacts.Email.map((item, index) => (
                                    <a 
                                        key={index} 
                                        className="text-greenVE-700 hover:text-greenVE-600 hover:underline transition-colors text-sm break-all flex items-center gap-2" 
                                        target="_blank" 
                                        href={`mailto:${(item.valor || item).replace(/\s/g, '')}?subject=${encodeURIComponent("Reserva - Hola, deseo reservar esta oferta")}`}
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        {item.valor || item}
                                    </a>
                                ))}
                            </div>
                        </AccordionBody>
                    </Accordion>
                )}
                
                {contacts.Web?.length > 0 && (
                    <Accordion className="last:border-b-0" open={open === idOffset + 4} icon={<Icon id={idOffset + 4} open={open} />}>
                        <AccordionHeader 
                            className="text-sm bg-greenVE-50 hover:bg-greenVE-100 text-greenVE-800 px-4 py-3 transition-colors" 
                            onClick={() => handleOpen(idOffset + 4)}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5" dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("W_White").includes(clave))] }} />
                                <span className="font-normal">Sitio Web</span>
                            </div>
                        </AccordionHeader>
                        <AccordionBody className="bg-white px-4 py-3">
                            <div className="flex flex-col gap-2">
                                {contacts.Web.map((item, index) => (
                                    <a 
                                        key={index} 
                                        className="text-greenVE-700 hover:text-greenVE-600 hover:underline transition-colors text-sm break-all flex items-center gap-2" 
                                        target="_blank" 
                                        href={`https://${item}`}
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </AccordionBody>
                    </Accordion>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-greenVE-50 to-greenVE-100 border-2 border-greenVE-300 rounded-xl p-5 my-5 shadow-sm ">
            <div className="text-center mb-6">
                <h3 className="text-greenVE-800 font-bold text-xl mb-1">Reserva en:</h3>
                <p className="text-greenVE-600 text-sm">Contacta directamente con nosotros</p>
            </div>
            
            <ContactSection 
                title="Establecimiento" 
                contacts={Contactos} 
                idOffset={0} 
            />
            
            <ContactSection 
                title="Central de Reservas" 
                contacts={ContactosCentral} 
                idOffset={10} 
            />
        </div>
    );
}

export default HotelContacts;