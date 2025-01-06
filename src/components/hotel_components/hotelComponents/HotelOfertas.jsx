import React, { useState, useEffect } from 'react';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import Icons from '../../../global/icons';
import HotelConfirmation from './HotelConfirmation';
import Alert from '../../global_components/alert/Alert';
import { useNavigate } from 'react-router-dom';
import { getIcon } from '../../../global/icons2';
import HotelExpress from './HotelExpress';
import HotelExpressConfirmacion from './HotelExpressConfirmacion';
import AlertExpress from '../../global_components/alert/AlertExpress';

const HotelOfertas = (props) => {
  const { Establecimiento, Noches, Fechas, Opciones, clickRecomendados, SetRecomendados} = props;
  const icons = new Icons();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpressOpen, setIsExpressOpen]=useState(false);
  const [isAlertLoginOpen, setIsAlertLoginOpen] = useState(false);
  const [ofertas, setOfertas] = useState([]);
  const [desExpress, setDescExpress]=useState();
  const [alerta, setAlerta]=useState("");
  const [correcto, setCorrecto]=useState();
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const navigate = new useNavigate();
  var adultos = 0;
  var ninos = 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if(clickRecomendados){
      function fetchData() {
        const nuevoEstado = {};
        for (const recomendado of Establecimiento.Recomendados) {
          nuevoEstado[recomendado.Id] = recomendado.NumOfertas;
        }
        setSelectedOptions(nuevoEstado);
      }
      fetchData();
    }
    SetRecomendados(false);
  }, [clickRecomendados]);

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  const [open, setOpen] = useState(0);
  const [count, setCount] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const options = [0, 1, 2, 3, 4, 5];
  const [total, setTotal] = useState(0);
  const [impuestos, setImpuestos] = useState(0);

  const handleSelectChange = (event, key) => {
    setAlerta("");
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[key] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const calcularTotal = () => {
    let total = {
      SinImpuestos: 0,
      Impuestos: 0,
    };
    for (const id in selectedOptions) {
      const selectedValue = selectedOptions[id];

      const objeto = Establecimiento.Ofertas.find((oferta) => oferta.Id.toString() === id.toString());
      if (objeto) {
        total.SinImpuestos += objeto.FinalSinImpuestos * selectedValue;
        total.Impuestos += objeto.Impuestos * selectedValue;
      }
    }
    return total;
  };

  const handleClickReservar = () => {
    setAlerta("");
    var descuento=0;
    if (nivel == "suscriptor"||(nivel == "visitante"||nivel == "express")||nivel == "gratuito") {
      const ofertasList = [];
      for (const id in selectedOptions) {
        if (selectedOptions[id] != 0) {
          const objeto = Establecimiento.Ofertas.find((oferta) => oferta.Id.toString() === id.toString());
          objeto.NumOfertas = selectedOptions[id];
          objeto.TotalOfertas = (objeto.Final / ((nivel == "visitante"||nivel == "express"||nivel == "gratis")?objeto.Base+10:objeto.Base)) * selectedOptions[id];
          descuento+=10*objeto.NumOfertas;
          ofertasList.push(objeto);
          adultos+=parseInt(objeto.Adultos)*objeto.NumOfertas
          ninos+=parseInt((objeto.Ninos!=""&&objeto.Ninos!=null)?objeto.Ninos:0)*objeto.NumOfertas
        }
      }
      setOfertas(ofertasList);
      setDescExpress(descuento*Noches)
      if(Opciones.children!=0){
        if(ninos<Opciones.children){
          if(adultos>=(Opciones.children+Opciones.adult)){
            (nivel == "visitante"||nivel == "express"||nivel == "gratuito")?setIsAlertLoginOpen(true):setIsModalOpen(true);
          }else if (Opciones.children>Opciones.adult){
            if ((ninos+adultos)>=(Opciones.adult+Opciones.children)){
              (nivel == "visitante"||nivel == "express"||nivel == "gratuito")?setIsAlertLoginOpen(true):setIsModalOpen(true);
            }if (Opciones.adult<adultos){
              setAlerta(`Todavia necesitas espacio para ${(Opciones.children+Opciones.adult)-adultos} ${((Opciones.children+Opciones.adult)-adultos)==1?"niño":"niños"} `)
            }else{
              setAlerta(`Todavia necesitas espacio para ${Opciones.children-ninos} ${(Opciones.children-ninos)==1?"niño":"niños"} ${(Opciones.adult-adultos)>0?`y ${Opciones.adult-adultos} ${(Opciones.adult-adultos)==1?"adulto":"adultos"}`:""} `)
            }
          }else if (Opciones.adult<=adultos){
            setAlerta(`Todavia necesitas espacio para ${(Opciones.children+Opciones.adult)-adultos} ${((Opciones.children+Opciones.adult)-adultos)==1?"niño":"niños"} `)
          }else{
            setAlerta(`Todavia necesitas espacio para ${Opciones.children-ninos} ${(Opciones.children-ninos)==1?"niño":"niños"} ${(Opciones.adult-adultos)>0?`y ${Opciones.adult-adultos} ${(Opciones.adult-adultos)==1?"adulto":"adultos"}`:""} `)
          }
        }else if(ninos>=Opciones.children||adultos>=Opciones.adult){
          (nivel == "visitante"||nivel == "express"||nivel == "gratuito")?setIsAlertLoginOpen(true):setIsModalOpen(true);
        }
      }else if(adultos>=Opciones.adult){
        (nivel == "visitante"||nivel == "express"||nivel == "gratuito")?setIsAlertLoginOpen(true):setIsModalOpen(true);
      }else{
        setAlerta(`Todavia necesitas espacio para ${Opciones.adult-adultos} ${(Opciones.adult-adultos)==1?"adulto":"adultos"}`)
      }
    } else {
      setIsAlertLoginOpen(true);
    }
  };

  const handleClickCancelar = () => {
    setIsModalOpen(false);
    setIsExpressOpen(false);
  };

  const handleClickBack = () => {
    setIsExpressOpen(false);
    setIsAlertLoginOpen(true);
  };

  const handleClickLoginAlertAceptar = () => {
    setIsAlertLoginOpen(false);
    navigate("/login");
  };

  const handleClickLoginAlertCancelar = () => {
    setIsAlertLoginOpen(false);
  };

  const handleClickReservaExpress= () => {
    setIsAlertLoginOpen(false);
    setIsExpressOpen(true);
  };

  return (
    <>
      <HotelExpressConfirmacion isOpen={correcto} OnClose={()=>setCorrecto(false)}/>
      <HotelConfirmation Ofertas={ofertas} isOpen={isModalOpen} Establecimiento={Establecimiento} Fechas={Fechas} Valores={calcularTotal()} OnClose={() => handleClickCancelar()} Opciones={Opciones} />
      <HotelExpress Ofertas={ofertas} isOpen={isExpressOpen} Establecimiento={Establecimiento} Fechas={Fechas} Valores={calcularTotal()} OnClose={() => handleClickCancelar()} OnBack={()=>handleClickBack()} Opciones={Opciones} setCorrecto={setCorrecto} correcto={correcto} />
      {
        (nivel=="visitante"||nivel=="express"||nivel=="gratuito")
        ?<AlertExpress 
          Titulo={"Nueva Reserva"} 
          Descripcion={"La reserva con cuentas gratuitas solo está disponible en la app móvil."} 
          isOpen={isAlertLoginOpen} Aceptar={handleClickLoginAlertCancelar} 
          Cancelar={handleClickReservaExpress}
          Subtotal={calcularTotal().SinImpuestos}
          Impuestos={calcularTotal().Impuestos}
          Descuento={desExpress}/>
        :<AlertExpress 
        Titulo={"Acción no permitida"} 
        Descripcion={"La reserva con cuentas gratuitas solo está disponible en la app móvil."} 
        isOpen={isAlertLoginOpen} Aceptar={handleClickLoginAlertCancelar} 
        Cancelar={handleClickLoginAlertCancelar}/>
      }
      
      <div className='relative w-full z-0'>
        <div className='sticky top-0 z-10'>
          <div className='table-fixed w-full'>
            <table id={'tabla-ofertas'} className=" table-auto w-full">
              <thead className="bg-greenVE-600 sticky top-0 z-50">
                <tr>
                  <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Ofertas</th>
                  <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Personas</th>
                  <th className="border border-greenVE-600 px-2 text-gray-100 font-medium leading-4 py-1.5">
                    {
                      Establecimiento.IdEstablecimiento=="443"
                      ?"Precio por un día"
                      :`Precio por ${Noches} noches`
                    }
                  </th>
                  <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Incluye</th>
                  <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Cantidad</th>
                  <th className="border border-greenVE-600 px-2 text-gray-100 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {Establecimiento.Ofertas.map((item, index) => (
                  <tr key={item.Id}>
                    <td className="border">
                      <div className="flex flex-col p-2">
                        <label className="font-semibold text-sm text-greenVE-600">{item.TituloOferta}</label>
                        {
                          item.Ganga?(<div className="ml-5 flex items-center text-xs text-orange-600  bg-orange-100 rounded-md px-2 gap-1.5 py-0.5 mb-2 w-36 border border-orange-200">
                          <span className="icon-[ic--outline-local-offer] rotate-90 h-5 w-5"></span>
                          <label className="text-orange-500 text-xs font-medium">Precio ganga</label>
                        </div>):(<></>)
                        }
                        <label className="ml-2 text-xs font-semibold text-gray-500">Aplica:</label>
                        <div className="flex ml-5 text-sm items-center gap-1">
                          <div className='flex items-center bg-blue-100 rounded-md px-1 py-1 border border-blue-200'>
                            <span className="icon-[material-symbols-light--calendar-month-rounded] text-[#3d82f5] h-5 w-5"></span>
                            <label className="text-blue-500 font-medium text-xs ">{item.AplicaEn} </label>
                          </div>
                        </div>
                        <label className="ml-2 text-xs font-semibold text-gray-500">Acomodación:</label>
                        {
                          Establecimiento.IdEstablecimiento=="443"
                          ?<div className="flex gap-1 ml-6 text-sm items-center">
                            <span className="icon-[ri--prohibited-2-line] text-[#3d82f5] h-5 w-5"></span>
                            <label className="text-gray-500 text-xs ">El establecimiento no ofrece hospedaje</label>
                          </div>
                          :<div className="flex gap-1 ml-6 text-sm items-center">
                            <span className="icon-[material-symbols--bed-outline-rounded] text-[#3d82f5] h-5 w-5"></span>
                            <label className="text-gray-500 text-xs ">{item.Acomodacion}</label>
                          </div>
                        }
                        
                        <Accordion open={open === index + 1} icon={<Icon id={index + 1} open={open} />}>
                          <AccordionHeader className=" p-0 text-xs pl-2 border-0 w-auto font-semibold text-blue-500 mt-4" onClick={() => handleOpen(index + 1)}>
                            Ver servicios y otros detalles
                          </AccordionHeader>
                          <AccordionBody className="p-0 pl-5">
                            <div className="flex gap-2">
                              {item.NoIncluye && (
                                <div className="flex-1 border-r pr-1">
                                  <label className="text-xs font-semibold text-gray-500">No Incluye</label>
                                  {item.NoIncluye.map((itemNoIncluye, noIncluyeIndex) => (
                                    <div key={noIncluyeIndex} className="flex gap-2 items-center">
                                      {
                                        getIcon({text:itemNoIncluye.Titulo, h:"h-5", w:"w-5", c:"text-[#3d82f5]"})
                                      }
                                      <p dangerouslySetInnerHTML={{ __html: itemNoIncluye.Titulo }} className="my-0.5 text-xs font-light text-gray-500 leading-3"></p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {item.Restricciones && (
                                <div className="flex-1 border-r pr-1">
                                  <label className="text-xs font-semibold text-gray-500">Restricciones</label>
                                  {item.Restricciones.map((itemRestricciones, restriccionesIndex) => (
                                    <div key={restriccionesIndex} className="flex gap-2 items-center">
                                      {
                                        getIcon({text:itemRestricciones.Titulo, h:"h-5", w:"w-5", c:"text-[#3d82f5]"})
                                      }
                                      <p dangerouslySetInnerHTML={{ __html: itemRestricciones.Titulo }} className="text-sm my-0.5 text-xs leading-3 font-light text-gray-500"></p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {item.SistemaServicios && (
                                <div className="flex-1 pr-1">
                                  <label className="text-xs font-semibold text-gray-500">Sistema de Servicios</label>
                                  {item.SistemaServicios.map((itemSistemaServicios, sistemaServiciosIndex) => (
                                    <div key={sistemaServiciosIndex} className="flex gap-2 items-center">
                                      {
                                        getIcon({text:itemSistemaServicios.Titulo, h:"h-5", w:"w-5", c:"text-[#3d82f5]"})
                                      }
                                      <p dangerouslySetInnerHTML={{ __html: itemSistemaServicios.Titulo }} className="text-sm my-0.5 text-xs leading-3 font-light text-gray-500"></p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </AccordionBody>
                        </Accordion>
                      </div>
                    </td>
                    <td className="border">
                      <div className='flex items-end'>
                        <div className="flex ml-1 text-sm">
                          {
                            Array.from({ length: item.Adultos }).map((item) => (
                              <span className="icon-[solar--user-rounded-outline] h-4 w-4 text-[#3d82f5]"></span>
                            ))
                          }
                        </div>
                        {item.Ninos && (
                          <div className="flex items-end text-sm">
                            <label> +</label>
                            {
                              Array.from({ length: item.Ninos }).map((item) => (
                                <span className="icon-[solar--user-rounded-outline] h-3 w-3 text-[#3d82f5]"></span>
                              ))
                            }
                          </div>
                        )}
                      </div>

                    </td>
                    <td className="border text-center">
                      <div className="flex flex-col p-2 items-center justify-center">
                        <label className="font-semibold text-2xl">${item.FinalSinImpuestos}</label>
                        <label className="text-xs text-gray-500"> + ${item.Impuestos} de impuestos</label>
                        <label className="text-[10.5px] mt-1 text-red-500 line-through">Tarifa rack ${item.Rack} </label>
                      </div>
                    </td>
                    <td className="border p-2">
                      {(item.Incluye != null && item.Incluye.length > 0) ? (
                        <div className="flex-1 pr-1">
                          {item.Incluye.map((itemIncluye, incluyeIndex) => (
                            <div key={incluyeIndex} className="flex gap-2 items-center">
                              <div dangerouslySetInnerHTML={{ __html: icons.Data.Check }} />
                              <p dangerouslySetInnerHTML={{ __html: itemIncluye.Titulo }} className="my-0.5 text-xs leading-3 font-light text-greenVE-600 "></p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="border align-top pt-4">
                      <div key={item.Id} className="flex justify-center items-start space-x-2 mb-2">
                        <select
                          id={`combobox-${item.Id}`}
                          name={`combobox-${item.Id}`}
                          value={selectedOptions[item.Id]}
                          onChange={(event) => handleSelectChange(event, item.Id)}
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
                    {index === 0 && (
                      <td className="border text-center align-top mt-2" rowSpan={Establecimiento.Ofertas.length}>
                        <div className="flex flex-col p-2 items-center gap-1 sticky top-20 bg-white">
                          <label className="font-semibold text-3xl text-center">${calcularTotal().SinImpuestos}</label>
                          <label className="text-xs text-gray-500 justify-center items-center">+ ${calcularTotal().Impuestos} de impuestos</label>
                          <button className="bg-greenVE-500 text-white py-1 px-2 rounded-lg border-greenVE-600 border-2" onClick={() => handleClickReservar()}>
                            Confirmar
                          </button>
                          <label className='text-xxs text-red-500 font-medium max-w-[110px]'>{alerta}</label>
                          {
                            alerta!=""
                            ?<label className='text-xxs text-blue-700 mt-5 font-medium max-w-[110px]'>Si necesitas ayuda, contáctate con nuestra central de reservas</label>
                            :<></>
                          }
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  );
};

export default HotelOfertas;
