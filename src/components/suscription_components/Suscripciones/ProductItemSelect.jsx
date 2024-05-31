import { useEffect, useState } from "react";

const ProductItemSelect = ({ listaProductos, setOpcion }) => {
  const [selectedItem, setSelectedItem] = useState(listaProductos[0]);

  useEffect(() => {
    setSelectedItem(listaProductos[0]);
  }, [listaProductos]);

  const getTiempo = (TipoTiempo) => {
    if (TipoTiempo == 1) {
      return "año(s)"
    }
    if (TipoTiempo == 2) {
      return "mes(es)"
    }
    if (TipoTiempo == 3) {
      return "día(s)"
    }
    if (TipoTiempo == 4) {
      return "hora(s)"
    }
    if (TipoTiempo == 5) {
      return "minuto(s)"
    }
  }

  const handleChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedValue = listaProductos[selectedIndex];
    setSelectedItem(selectedValue);
  };

  const handleClick = () => {
    setOpcion(3)
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <label className="text-xs font-semibold mt-2">
        O seleccione la cantidad de años a continuación:
      </label>
      <div className="flex w-full rounded-md px-3 py-1">
        <div className="w-1/6">
          <img className="h-20" src="./img/web/suscription_card.png"></img>
        </div>
        <div className="w-5/6 flex justify-center items-center gap-1">
          <div className="flex flex-col w-full">
            <label className="text-xs text-greenVE-600 font-medium">{selectedItem.Titulo}</label>
            <label className="text-xs">
              {selectedItem.TiempoVendido + " " + getTiempo(selectedItem.TipoTiempo) + " de suscripción"}
            </label>
          </div>
          <div className="flex flex-col">
            <select
              onChange={(event) => handleChange(event)}
              className="border rounded-md px-2 py-1 text-sm my-2"
            >
              {listaProductos.map((option, index) => (
                <option key={index} value={option}>
                  {option.TiempoVendido} años - ${Math.round(option.PrecioProducto * 1.12)}
                </option>
              ))}
            </select>
            {/*<label className="text-md font-semibold text-greenVE-600 ">
              {"$" + Math.round(selectedItem.PrecioProducto * 1.12)}
            </label>*/}
            <button className="text-xs text-white font-semibold bg-greenVE-500 px-2 py-0.5 rounded-lg" onClick={handleClick}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSelect;
