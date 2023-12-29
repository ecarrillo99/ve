import { useEffect, useState } from "react";
import { getRemoteTarjetas } from "../../../controllers/pago/pagoController";
import { Accordion, AccordionItem, AccordionBody, AccordionHeader, Card, Button } from "@material-tailwind/react";
import Icons from "../../../global/icons";
import PayPhoneForm from "../FormPayment/PayPhoneForm";
import DataFastForm from "../FormPayment/DataFastForm";

const PayOption = ({cambioSlider, tarjetaSeleccionada, diferidoSeleccionado, pagoSeleccionado}) => {
  const [data, setData] = useState();
  const [bancosList, setBancosList] = useState('');
  const [open, setOpen] = useState();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedDiferido, setSelectedDiferido] = useState({});
  const [tarjeta, setTarjeta] = useState();
  const [diferido, setDiferido] = useState();

  const icons = new Icons();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    setTarjeta(bancosList[value].ListaTarjetas[0]);
    setDiferido(bancosList[value].ListaTarjetas[0].ListaDiferidos[0])
    const newSelectedOptions = { ...selectedOptions };
    const newSelectedDiferido = { ...selectedDiferido };
    newSelectedDiferido[value] = 0;
    newSelectedOptions[value] = 0;
    setSelectedDiferido(newSelectedDiferido);
    setSelectedOptions(newSelectedOptions);
  }

  const handleRadioChange = (event) => {
    if (event.target.value > -1) {
      setBancosList(data[event.target.value].ListaBancos);
      setTarjeta(data[event.target.value].ListaBancos[0].ListaTarjetas[0]);
      setDiferido(data[event.target.value].ListaBancos[0].ListaTarjetas[0].ListaDiferidos[0]);
    }
  };

  const handleClickPagar = () => {
    tarjetaSeleccionada(tarjeta);
    diferidoSeleccionado(diferido);
  
    if (diferido.IdTipoBotonPago === "4") {
      pagoSeleccionado(<PayPhoneForm />);
    }
  
    if (diferido.IdTipoBotonPago === "6") {
      pagoSeleccionado(
        <DataFastForm
          key={`DataFastForm_${tarjeta.IdTipoTarjeta}`}
          tarjeta={tarjeta}
          diferido={diferido}
        />
      );
    }
  
    cambioSlider(3);
  };
  

  useEffect(() => {
    async function fetchData() {
      try {
        getRemoteTarjetas().then((result) => {
          if (result) {
            setData(result);
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  const handleSelectChange = (event, key) => {
    const newSelectedOptions = { ...selectedOptions };
    const newSelectedDiferido = { ...selectedDiferido };
    newSelectedDiferido[key] = 0;
    newSelectedOptions[key] = event.target.value;
    setSelectedDiferido(newSelectedDiferido);
    setSelectedOptions(newSelectedOptions);
    setTarjeta(bancosList[key].ListaTarjetas[event.target.value]);
  };
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-3 w-3 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  const handleSelectDiferido = (event, key) => {
    const newSelectedDiferido = { ...selectedDiferido };
    newSelectedDiferido[key] = event.target.value;
    setSelectedDiferido(newSelectedDiferido);
    setDiferido(tarjeta.ListaDiferidos[event.target.value]);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 justify-center mb-4 items-center">
        <div className="cursor-pointer" onClick={()=>cambioSlider(1)} dangerouslySetInnerHTML={{ __html: icons.Data.Back }} />
        <div className="flex bg-greenVE-500 h-7 w-7 justify-center items-center text-white font-bold rounded-full">3</div>
        <label className="font-semibold">Elige tu método de pago</label>
      </div>
      <div className="flex gap-6 justify-center">
        <div className="w-1/5">
          <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
            <li className="w-full border-gray-200 rounded-t-lg">
              <div className="flex items-center ps-3">
                <input
                  id="list-radio-license"
                  type="radio"
                  value="-1"
                  name="list-radio"
                  className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  onChange={handleRadioChange}
                />
                <label htmlFor="list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                  Botones de pago
                </label>
              </div>
            </li>
            {data &&
              data.map((item, index) => (
                <li key={item.Id} className="w-full border-gray-200">
                  <div className="flex items-center ps-3">
                    <input
                      id={`list-radio-${item.Id}`}
                      type="radio"
                      value={index}
                      name="list-radio"
                      className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100  focus:ring-blue-500 focus:ring-2"
                      onChange={handleRadioChange}
                    />
                    <label htmlFor={`list-radio-${item.Id}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                      {item.Nombre}
                    </label>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="w-2/5">
          <div className="flex flex-col">
            {
              bancosList && (
                bancosList.map((item, index) => (
                  <Accordion  className={open===index?`border-2 border-greenVE-500`:`pb-1`} open={open === index} icon={<Icon id={index} open={open} />}>
                    <AccordionHeader className={`h-12 text-base `+(open===index?`border-b border-greenVE-500`:`border border-gray-100 `)+` font-medium text-gray-400 px-2`} onClick={() => handleOpen(index)}>
                      <div className="flex items-center gap-2">
                        <img src={item.Logo} className="h-8 w-8" />
                        <label className="text-sm text-gray-600">{item.Nombre}</label>
                      </div>
                    </AccordionHeader>
                    <AccordionBody className="bg-white  py-2 flex flex-col gap-3 items-center px-2">
                      <div className="px-2 gap-3  flex justify-between w-full">
                        <div className="flex flex-col gap-2 w-1/2">
                          <label className="font-medium text-sm text-gray-500">Elija Tipo Tarjeta</label>
                          <div className="flex gap-2">
                            <img src={item.ListaTarjetas[selectedOptions[index]] != null ? item.ListaTarjetas[selectedOptions[index]].Logo : item.ListaTarjetas[0].Logo} className="h-6 w-6"></img>
                            <select
                              id={`combobox-${index}`}
                              name={`combobox-${index}`}
                              value={selectedOptions[index]}
                              onChange={(event) => handleSelectChange(event, index)}
                              className="border rounded-md px-2 py-1 text-xs w-full">
                              {item.ListaTarjetas.map((tarjeta, index) => (
                                <option key={index} value={index}>
                                  {tarjeta.Nombre}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                          <label className="font-medium text-sm text-gray-500">Elija Diferido</label>
                          <select
                            id={`combobox-${index}`}
                            name={`combobox-${index}`}
                            value={selectedDiferido[index]}
                            onChange={(event) => handleSelectDiferido(event, index)}
                            className="border rounded-md px-2 py-1 text-xs">
                            {(item.ListaTarjetas[selectedDiferido[index]] != null ? item.ListaTarjetas[selectedDiferido[index]].ListaDiferidos : item.ListaTarjetas[0].ListaDiferidos)
                              .map((diferido, index) => (
                                <option key={index} value={index}>
                                  {diferido.Titulo}
                                </option>
                              ))}
                          </select>
                        </div>
                        
                      </div>
                      <button className="bg-greenVE-500 h-8 w-1/2 text-white py-1 px-2 rounded-lg border-greenVE-600 border-2" onClick={()=>handleClickPagar()}>
                          Pagar
                        </button>
                    </AccordionBody>
                  </Accordion>
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PayOption;