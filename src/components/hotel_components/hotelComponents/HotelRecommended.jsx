import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import Icons from "../../../global/icons";
import { useState } from "react";

const HotelRecommended = (props) => {
    const {Establecimiento, Noches, Personas}=props;
    const icons = new Icons()
    console.log(Noches)
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
    const [count, setCount] = useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div className="border-l border-r border-t rounded-lg w-full">
            <label className="font-semibold p-2 text-xl">Recomedado para {Personas} personas y {Noches} noches </label>
            <div className="border-y w-full flex rounded-b-lg">
                <div className="w-10/12">
                    {Establecimiento.Recomendados.map((item, index) =>(
                        <div  className={`flex ${index !=  Establecimiento.Recomendados.length-1? 'border-b' : ''}`}>
                            <div className="w-10/12 p-2 flex flex-col">
                                <label className="font-semibold text-sm text-greenVE-600">{item.NumOfertas} x {item.TituloOferta}</label>
                                <label className="ml-2 text-xs font-semibold text-gray-500">Personas:</label>
                                <div className="flex ml-6 text-sm">
                                    <div dangerouslySetInnerHTML={{ __html: icons.Data["Adulto"] }} class='' />
                                    <label className="text-gray-500 text-[0.65rem]"> x {item.Adultos*item.NumOfertas} </label>
                                </div>
                                <label className="ml-2 text-xs font-semibold text-gray-500">Acomodación:</label>
                                <div className="flex ml-6 text-sm">
                                    <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => item.Acomodacion.includes(clave))] }} class='' />
                                    <label className="text-gray-500 text-[0.65rem] ">{item.Acomodacion}  x {item.NumOfertas} </label>
                                </div>
                                <Accordion open={open === index+1} icon={<Icon id={index+1} open={open} />}>
                                    <AccordionHeader  className=" p-0 text-xs pl-2 border-0 w-auto font-semibold text-blue-500 mt-4" onClick={() => handleOpen(index+1)}>Ver servicios y otros detalles</AccordionHeader>
                                    <AccordionBody className="p-0 pl-5">
                                        <div className="flex gap-2">
                                            {
                                                item.Incluye&&
                                                (<div className="flex-1 border-r pr-1">
                                                    <label className="text-xs font-semibold text-gray-500">Incluye</label>
                                                    {item.Incluye.map((itemIncluye) => (
                                                        <div className='flex gap-2 items-center'>
                                                            <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => itemIncluye.Titulo.includes(clave))] }} class='' />
                                                            <p dangerouslySetInnerHTML={{ __html: itemIncluye.Titulo }} className='my-0.5  text-[0.65rem] leading-3 font-light text-gray-500 '></p>
                                                        </div>
                                                    ))}
                                                </div>)
                                            }
                                            {
                                                item.NoIncluye&&
                                                (<div className="flex-1 border-r pr-1">
                                                    <label className="text-xs font-semibold text-gray-500">No Incluye</label>
                                                    {item.NoIncluye.map((itemNoIncluye) => (
                                                        <div className='flex gap-2 items-center'>
                                                            <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => itemNoIncluye.Titulo.includes(clave))] }} class='' />
                                                            <p dangerouslySetInnerHTML={{ __html: itemNoIncluye.Titulo }} className='my-0.5 text-[0.65rem] font-light text-gray-500 leading-3'></p>
                                                        </div>
                                                    ))}
                                                </div>)
                                            }
                                            {
                                                item.Restricciones&&
                                                (<div className="flex-1 border-r pr-1">
                                                    <label className="text-xs font-semibold text-gray-500">Restricciones</label>
                                                    {item.Restricciones.map((itemRestricciones) => (
                                                        <div className='flex gap-2 items-center'>
                                                            <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => itemRestricciones.Titulo.includes(clave))] }} class='' />
                                                            <p dangerouslySetInnerHTML={{ __html: itemRestricciones.Titulo }} className='text-sm my-0.5 text-[0.63rem] leading-3 font-light text-gray-500'></p>
                                                        </div>
                                                    ))}
                                                </div>)
                                            }
                                            {
                                                item.SistemaServicios&&
                                                (<div className="flex-1 pr-1">
                                                    <label className="text-xs font-semibold text-gray-500">Sistema de Servicios</label>
                                                    {item.SistemaServicios.map((itemSistemaServicios) => (
                                                        <div className='flex gap-2 items-center'>
                                                            <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => itemSistemaServicios.Titulo.includes(clave))] }} class='' />
                                                            <p dangerouslySetInnerHTML={{ __html: itemSistemaServicios.Titulo }} className='text-sm my-0.5 text-[0.62rem] leading-3 font-light text-gray-500'></p>
                                                        </div>
                                                    ))}
                                                </div>)
                                            }
                                        </div>
                                    </AccordionBody>
                                </Accordion>
                                
                            </div>
                            <div className="flex flex-col border-l p-2 items-center justify-center">
                                <label className="font-semibold text-2xl">${item.FinalSinImpuestos*item.NumOfertas}</label>
                                <label className="text-xs text-gray-500"> + ${item.Impuestos*item.NumOfertas} de impuestos</label>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-l w-2/12 flex flex-col p-2 items-center justify-center gap-1">
                    <label className="font-semibold text-3xl">${Establecimiento.PrecioSinImpuestos}</label>
                    <label className="text-xs text-gray-500">+ ${Establecimiento.Impuestos} de impuestos</label>
                    <button className="bg-greenVE-500 text-white py-1 px-2 rounded-lg border-greenVE-600 border-2">Pre-Reservar</button>
                </div>
            </div>
        </div>
        
    )
}

export default HotelRecommended