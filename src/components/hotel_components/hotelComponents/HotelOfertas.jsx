import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import Icons from "../../../global/icons";
import { useState } from "react";

const HotelOfertas = (props) => {
    const {Establecimiento, Noches}=props;
    const icons = new Icons()

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

    const options = [0, 1, 2, 3, 4, 5];

    const [total, setTotal]=useState(0);
    const [impuestos, setImpuestos]=useState(0)

    const [selectedOptions, setSelectedOptions] = useState(options.map(() => options[0]));

    const handleSelectChange = (event, index) => {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;
        setSelectedOptions(newSelectedOptions);
    };

    const calcularTotal = () => {
        let total = {
            SinImpuestos:0,
            Impuestos:0
        };
        for (const id in selectedOptions) {
          const selectedValue = selectedOptions[id];
          const objeto = Establecimiento.Ofertas[id];
          if (objeto) {
            total.SinImpuestos += objeto.FinalSinImpuestos * selectedValue;
            total.Impuestos += objeto.Impuestos * selectedValue;
          }
        }
        return total;
      };

    return (
        
    <table class="table-auto w-full">
    <thead className="bg-greenVE-600">
      <tr >
        <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Ofertas</th>
        <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Personas</th>
        <th className="border border-greenVE-600 px-2 text-gray-100 font-medium leading-4 py-1.5">Precio por {Noches} noches</th>
        <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Incluye</th>
        <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Cantidad</th>
        <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Total</th>
      </tr>
    </thead>
    <tbody>
      {
        Establecimiento.Ofertas.map((item, index)=>(
            <tr>
                <td className="border ">
                    <div className="flex flex-col p-2">
                        <label className="font-semibold text-sm text-greenVE-600">{item.TituloOferta}</label>
                        <label className="ml-2 text-xs font-semibold text-gray-500">Acomodación:</label>
                        <div className="flex ml-6 text-sm">
                            <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => item.Acomodacion.includes(clave))] }} class='' />
                            <label className="text-gray-500 text-[0.65rem] ">{item.Acomodacion}  </label>
                        </div>
                        <Accordion open={open === index+1} icon={<Icon id={index+1} open={open} />}>
                                    <AccordionHeader  className=" p-0 text-xs pl-2 border-0 w-auto font-semibold text-blue-500 mt-4" onClick={() => handleOpen(index+1)}>Ver servicios y otros detalles</AccordionHeader>
                                    <AccordionBody className="p-0 pl-5">
                                        <div className="flex gap-2">
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
                </td>
                <td className="border">
                    <div className="flex ml-6 text-sm">
                        <div dangerouslySetInnerHTML={{ __html: icons.Data["Adulto"] }} class='' />
                        <label className="text-gray-500 text-[0.65rem]"> x {item.Adultos} </label>
                    </div>
                    {
                        item.Ninos&&(
                            <div className="flex ml-6 text-sm">
                                <div dangerouslySetInnerHTML={{ __html: icons.Data["niños"] }} class='' />
                                <label className="text-gray-500 text-[0.65rem]"> x {item.Ninos} </label>
                            </div>
                        )
                    }
                </td>
                <td className="border text-center">
                    <div className="flex flex-col p-2 items-center justify-center">
                        <label className="font-semibold text-2xl">${item.FinalSinImpuestos}</label>
                        <label className="text-xs text-gray-500"> + ${item.Impuestos} de impuestos</label>
                    </div>
                </td>
                <td className="border p-2">
                {
                    item.Incluye.length>0
                    ?(<div className="flex-1 pr-1">
                        {item.Incluye.map((itemIncluye) => (
                            <div className='flex gap-2 items-center'>
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => itemIncluye.Titulo.includes(clave))] }} class='' />
                                <p dangerouslySetInnerHTML={{ __html: itemIncluye.Titulo }} className='my-0.5  text-[0.65rem] leading-3 font-light text-gray-500 '></p>
                            </div>
                        ))}
                    </div>)
                    :(<></>)
                }
                </td>
                <td className="border p-2">
                    <div key={index} className="flex items-center justify-center space-x-2 mb-2">
                        <select
                            id={`combobox-${index}`}
                            name={`combobox-${index}`}
                            value={selectedOptions[index]}
                            onChange={(event) => handleSelectChange(event, index)}
                            className="border rounded-md px-2 py-1 text-sm"
                        >
                            {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                    </div>
                </td>
                {
                    index==0
                    &&(<td className=" border text-center" rowSpan={Establecimiento.Ofertas.length}>
                        <div className="flex flex-col p-2 items-center gap-1">
                            <label className="font-semibold text-3xl text-center">${calcularTotal().SinImpuestos}</label>
                            <label className="text-xs text-gray-500 justify-center items-center">+ ${calcularTotal().Impuestos} de impuestos</label>
                            <button className="bg-greenVE-500 text-white py-1 px-2 rounded-lg border-greenVE-600 border-2">Pre-Reservar</button>
                        </div>
                    </td>)
                }
                
            </tr>
        ))
      }
    </tbody>
  </table>

    )
}

export default HotelOfertas
    function ComboBox() {
        const [options, setOptions] = useState(['Opción 1', 'Opción 2', 'Opción 3']);
      
        const handleChange = (event) => {
          console.log(`Seleccionaste la opción ${event.target.value}`);
        };
      
        return (
          <select onChange={handleChange}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }