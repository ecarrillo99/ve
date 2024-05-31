import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { formatearFecha } from '../../../global/formatearFecha';
import Config from '../../../global/config';
import { getCertificado } from '../../../controllers/establecimiento/establecimientoController';

const HotelContacts = ({setOpenContacts, Establecimiento, options, date, seleccion}) => {
    const [isCreatingcert, setIsCreatingCert] = useState(false)
    const user = JSON.parse(localStorage.getItem('datos'));
    const id = user != null ? user.data.codigo : "";
    const nombre = user != null ? user.data.nombre : "";
    const navigate=useNavigate();
    const mensaje = () => {
        var subtotal=0;
        var impuestos=0;
        const personas = options.adult + (options.adult > 1 ? " adultos" : " adulto") +
            (options.children == 0 ? "" : ", " + options.children + (options.children > 1 ? " niños" : " niño"));

        var habitaciones = "\n";
        Establecimiento.Ofertas.forEach((element, index) => {
            if(seleccion[index]!=0){
                habitaciones = habitaciones + (seleccion[index]) + "x " + element.TituloOferta + "\n"
                subtotal+=element.FinalSinImpuestos;
                impuestos+=element.Impuestos
            }
        });
        const total = "$" + subtotal + " más $" + impuestos + " de impuestos y cargos";
        const msj = Config.MENSAJE
            .replaceAll("{{nombre}}", nombre)
            .replaceAll("{{id}}", id)
            .replaceAll("{{hotel}}", Establecimiento.Titulo)
            .replaceAll("{{checkin}}", formatearFecha({ fecha: date[0].startDate, nombreDia: true, dia: true, mes: true, anio:true}))
            .replaceAll("{{checkout}}", formatearFecha({ fecha: date[0].endDate, nombreDia: true, dia: true, mes: true, anio:true}))
            .replaceAll("{{personas}}", personas)
            .replaceAll("{{habitaciones}}", habitaciones)
            .replaceAll("{{total}}", total);
        return msj
    }
    const handleClickWhatsApp = async (contacto) => {
        window.open("https://wa.me/" + contacto + "?text=" + mensaje().replaceAll(" ", "%20").replaceAll("\n", "%0A"))
    }
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
                "inicio": fechaString(date[0].startDate),
                "fin": fechaString(date[0].endDate)
            }

            Establecimiento.Ofertas.forEach((item, index) => {
                if(seleccion[index]!=0){
                    dataOfertas.push(
                        {
                            "cant": seleccion[index],
                            "oferta": item.Id
                        }
                    );
                }
            })
            getCertificado(
                "",
                Establecimiento.IdEstablecimiento,
                dataOfertas,
                fechas,
                options.adult,
                options.children
            ).then((result) => {
                setIsCreatingCert(false);
                if (result) {
                    window.open(window.location.origin+"#/certificado?" + result, '_blank');
                }
            });
        }
    }

    const handleClickHome=()=>{
        navigate("/")
    }    

    return (
        <div className='w-full h-screen bg-white fixed top-0 left-0 z-50 flex flex-col overflow-y-auto'>
            <div className='flex py-1 mb-3 items-center  shadow-lg px-4 bg-white fixed z-50 w-full top-0'>
                <div onClick={() => setOpenContacts(false)} className='h-8 w-4 flex items-center justify-center text-3xl'>x</div>
                <div className='w-full'>
                    <div className='w-full text-center text-xl font-semibold text-greenVE-600'>Realiza tu reserva</div>
                </div>
                <span onClick={()=>handleClickHome()} className="icon-[tabler--home] h-6 w-6"></span>
            </div>
            <div className='p-3 mt-10 flex flex-col gap-3'>
                <div>
                    <label className='font-medium text-greenVE-600'>Reserva en {Establecimiento.Titulo}</label>
                </div>
                {
                    Establecimiento.Contactos.Whatsapp.length>0&&(
                        <Accordion className="pb-1" open={open === 1} icon={<Icon id={1} open={open} />}>
                            <AccordionHeader className={`-mt-1 text-base font-medium text-black px-2 h-7 pb-7 ${open==1?"border-white":""}`} onClick={() => handleOpen(1)}>
                                <span className="icon-[mdi--whatsapp] h-5 w-5"></span>
                                <p className="font-normal w-full pl-2">WhatsApp</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2 border-b">
                                <div className="px-2  flex flex-col gap-4">
                                    {Establecimiento.Contactos.Whatsapp.map((item, index) => (
                                        <a onClick={()=>handleClickWhatsApp(item.replace(/\s/g, ''))} key={index} className="hover:text-greenVE-500">
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <span className="icon-[mdi--whatsapp] h-5 w-5"></span>
                                                    <label >{item}</label>
                                                </div>
                                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    Establecimiento.Contactos.Telefono.length>0&&(
                        <Accordion className="pb-1" open={open === 2} icon={<Icon id={2} open={open} />}>
                            <AccordionHeader className={`-mt-1 text-base  font-medium text-black px-2 h-7 pb-7 ${open==2?"border-white":""}`} onClick={() => handleOpen(2)}>
                                <span className="icon-[ph--phone-bold] h-5 w-5"></span>
                                <p className="font-normal w-full pl-2">Teléfono</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2 border-b">
                                <div className="px-2  flex flex-col gap-4">
                                    {Establecimiento.Contactos.Telefono.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`tel:${item.replace(/\s/g, '')}`}>
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <span className="icon-[ph--phone-bold] h-5 w-5"></span>
                                                    <label >{item}</label>
                                                </div>
                                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    Establecimiento.Contactos.Email.length>0&&(
                        <Accordion className="pb-1" open={open === 3} icon={<Icon id={3} open={open} />}>
                            <AccordionHeader className={`-mt-1 text-base  font-medium text-black px-2 h-7 pb-7 ${open==3?"border-white":""}`} onClick={() => handleOpen(3)}>
                                <span className="icon-[material-symbols--mail-outline-rounded] h-5 w-5"></span>
                                <p className="font-normal w-full pl-2">Correo</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2 border-b">
                                <div className="px-2  flex flex-col gap-4">
                                    {Establecimiento.Contactos.Email.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`mailto:${item.replace(/\s/g, '')}?text=${encodeURIComponent("Hola, deseo reservar esta oferta")}`}>
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <span className="icon-[material-symbols--mail-outline-rounded] h-5 w-5"></span>
                                                    <label >{item}</label>
                                                </div>
                                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    Establecimiento.Contactos.Web.length>0&&(
                        <Accordion className="pb-1" open={open === 4} icon={<Icon id={4} open={open} />}>
                            <AccordionHeader className={`-mt-1 text-base font-medium text-black px-2 h-7 pb-7 ${open==4?"border-white":""}`} onClick={() => handleOpen(4)}>
                                <span className="icon-[mdi--web] h-5 w-5"></span>
                                <p className="font-normal w-full pl-2">Web</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2 border-b">
                                <div className="px-2  flex flex-col gap-4">
                                    {Establecimiento.Contactos.Web.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`https://${item}`}>
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <span className="icon-[mdi--web] h-5 w-5"></span>
                                                    <label >{item}</label>
                                                </div>
                                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                <div>
                    <label className='font-medium text-greenVE-600'>Central de Reservas</label>
                </div>
                {
                    Establecimiento.ContactosCentral.Whatsapp.length>0&&(
                        <Accordion className="pb-1" open={open === 5} icon={<Icon id={5} open={open} />}>
                            <AccordionHeader className={`-mt-1 text-base font-medium px-2 pb-7 h-7 ${open==5?"border-white":""}`} onClick={() => handleOpen(5)}>
                                <span className="icon-[mdi--whatsapp] h-5 w-5"></span>
                                <p className="font-normal w-full pl-2">WhatsApp</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2 border-b">
                                <div className="px-2  flex flex-col gap-4">
                                    {Establecimiento.ContactosCentral.Whatsapp.map((item, index) => (
                                        <a onClick={()=>handleClickWhatsApp(item['formateado'].replace(/\s/g, ''))} key={index} className="hover:text-greenVE-500">
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <span className="icon-[mdi--whatsapp] h-5 w-5"></span>
                                                    <label >{item['valor']}</label>
                                                </div>
                                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                <Accordion className="pb-1" open={open === 6} icon={<Icon id={6} open={open} />}>
                    <AccordionHeader className={`-mt-1 text-base  font-medium  px-2 h-7 pb-7 ${open==6?"border-white":""}`} onClick={() => handleOpen(6)}>
                        <span className="icon-[ph--phone-bold] h-5 w-5"></span>
                        <p className="font-normal w-full pl-2">Teléfono</p>
                    </AccordionHeader>
                    <AccordionBody className="bg-white py-2 border-b">
                        <div className="px-2  flex flex-col gap-4">
                                <a className="hover:text-greenVE-500" target="_blank" href={`tel:074134500`}>
                                    <div className='flex gap-2 items-center justify-between'>
                                        <div className='flex gap-1 items-center'>
                                            <span className="icon-[ph--phone-bold] h-5 w-5"></span>
                                            <label >074134500</label>
                                        </div>
                                        <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                    </div>
                                </a>
                        </div>
                    </AccordionBody>
                </Accordion>
                {
                    Establecimiento.ContactosCentral.Telefono.length>0&&(
                        <Accordion className="pb-1" open={open === 7} icon={<Icon id={7} open={open} />}>
                            <AccordionHeader className={`-mt-1 text-base  font-medium  px-2 h-7 pb-7 ${open==7?"border-white":""}`} onClick={() => handleOpen(7)}>
                                <span className="icon-[material-symbols--phone-android-outline] h-5 w-5"></span>
                                <p className="font-normal w-full pl-2">Teléfono Reservas</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2 border-b">
                                <div className="px-2  flex flex-col gap-4">
                                    {Establecimiento.ContactosCentral.Telefono.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`tel:${item['valor'].replace(/\s/g, '')}`}>
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <span className="icon-[material-symbols--phone-android-outline] h-5 w-5"></span>
                                                    <label >{item['valor']}</label>
                                                </div>
                                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                {
                    Establecimiento.ContactosCentral.Email.length>0&&(
                        <Accordion className="pb-1" open={open === 8} icon={<Icon id={8} open={open} />}>
                            <AccordionHeader className={`-mt-1 text-base  font-medium  px-2 h-7 pb-7 ${open==8?"border-white":""}`} onClick={() => handleOpen(8)}>
                                <span className="icon-[material-symbols--mail-outline-rounded] h-5 w-5"></span>
                                <p className="font-normal w-full pl-2">Correo</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-white py-2 border-b">
                                <div className="px-2  flex flex-col gap-4">
                                    {Establecimiento.ContactosCentral.Email.map((item, index) => (
                                        <a key={index} className="hover:text-greenVE-500" target="_blank" href={`mailto:${item['valor'].replace(/\s/g, '')}?text=${encodeURIComponent("Hola, deseo reservar esta oferta")}`}>
                                            <div className='flex gap-2 items-center justify-between'>
                                                <div className='flex gap-1 items-center'>
                                                    <span className="icon-[material-symbols--mail-outline-rounded] h-5 w-5"></span>
                                                    <label >{item['valor']}</label>
                                                </div>
                                                <span className="icon-[material-symbols--arrow-forward-ios-rounded] h-5 w-5"></span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </AccordionBody>
                        </Accordion>
                    )
                }
                <div className='flex pb-6 items-center  shadow-lg px-4 bg-white fixed z-50 w-full bottom-0 left-0 border-t py-4'>
                    <button onClick={()=>createCert()} className='bg-greenVE-500 w-full text-white rounded-md py-2 flex items-center gap-2 justify-center'>
                        {
                            !isCreatingcert
                            ?<>
                                <span className="icon-[ph--certificate] h-6 w-6"></span>
                                <label>Certificado</label>
                            </>
                            :<div className=" flex items-center justify-center "><Spinner color="#36D7B7" size={150} /></div>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelContacts;