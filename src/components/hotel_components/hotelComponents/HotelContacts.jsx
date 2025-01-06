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

    const [openSuboption, setOpenSuboption] = useState(0);

    const handleOpenSuboption = (value) => setOpenSuboption(openSuboption === value ? 0 : value);


    return (
        <div className=" flex flex-col gap-1 mt-5 ml-3 border p-3 rounded-lg bg-greenVE-300 mb-6">
            <label className="text-center font-semibold text-xl ">Reserva en:</label>
            <label className="text-center font-normal text-lg ">Establecimiento</label>
            <div>
                {
                    Contactos.Whatsapp.length>0&&(
                        <Accordion className="pb-1" open={open === 1} icon={<Icon id={1} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-greenVE-600 font-medium text-white px-2 h-7" onClick={() => handleOpen(1)}>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("WA_White").includes(clave))] }} />
                                <p className="font-normal">WhatsApp</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2">
                                <div className="px-2  flex flex-col gap-1">
                                    {Contactos.Whatsapp.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`https://wa.me/${item.replace(/\s/g, '')}?text=${encodeURIComponent("Hola, deseo reservar esta oferta")}`}>{item}</a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    Contactos.Telefono.length>0&&(
                        <Accordion className="pb-1" open={open === 2} icon={<Icon id={2} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-greenVE-600 font-medium text-white px-2 h-7" onClick={() => handleOpen(2)}>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("Tel_White").includes(clave))] }} />
                                <p className="font-normal">Telefono</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2">
                                <div className="px-2  flex flex-col gap-1">
                                    {Contactos.Telefono.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    Contactos.Email.length>0&&(
                        <Accordion className="pb-1" open={open === 3} icon={<Icon id={3} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-greenVE-600 font-medium text-white px-2 h-7" onClick={() => handleOpen(3)}>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("Em_White").includes(clave))] }} />
                                <p className="font-normal">Correo</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2">
                                <div className="px-2  flex flex-col gap-1">
                                    {Contactos.Email.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`mailto:${item.replace(/\s/g, '')}?text=${encodeURIComponent("Hola, deseo reservar esta oferta")}`}>{item}</a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    Contactos.Web.length>0&&(
                        <Accordion className="pb-1" open={open === 4} icon={<Icon id={4} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-greenVE-600 font-medium text-white px-2 h-7" onClick={() => handleOpen(4)}>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("W_White").includes(clave))] }} />
                                <p className="font-normal">Web</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2">
                                <div className="px-2  flex flex-col gap-1">
                                    {Contactos.Web.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`https://${item}`}>{item}</a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
            </div>
            <label className="text-center font-normal  text-lg ">Central Reservas</label>
            <div>
                {
                    ContactosCentral.Whatsapp.length>0&&(
                        <Accordion className="pb-1" open={open === 5} icon={<Icon id={5} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-greenVE-600 font-medium text-white px-2 h-7" onClick={() => handleOpen(5)}>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("WA_White").includes(clave))] }} />
                                <p className="font-normal">WhatsApp</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2">
                                <div className="px-2  flex flex-col gap-1">
                                    {ContactosCentral.Whatsapp.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`https://wa.me/${item['formateado'].replace(/\s/g, '')}?text=${encodeURIComponent("Hola, deseo reservar esta oferta")}`}>{item['valor']}</a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    ContactosCentral.Telefono.length>0&&(
                        <Accordion className="pb-1" open={open === 6} icon={<Icon id={6} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-greenVE-600 font-medium text-white px-2 h-7" onClick={() => handleOpen(6)}>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("Tel_White").includes(clave))] }} />
                                <p className="font-normal">Telefono</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2">
                                <div className="px-2  flex flex-col gap-1">
                                    {ContactosCentral.Telefono.map((item, index) => (
                                        <a key={index} >{item['valor']}</a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    ContactosCentral.Email.length>0&&(
                        <Accordion className="pb-1" open={open === 7} icon={<Icon id={7} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-greenVE-600 font-medium text-white px-2 h-7" onClick={() => handleOpen(7)}>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => ("Em_White").includes(clave))] }} />
                                <p className="font-normal">Correo</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2">
                                <div className="px-2  flex flex-col gap-1">
                                    {ContactosCentral.Email.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`mailto:${item['valor'].replace(/\s/g, '')}?text=${encodeURIComponent("Hola, deseo reservar esta oferta")}`}>{item['valor']}</a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
            </div>
        </div>
    )
}

export default HotelContacts