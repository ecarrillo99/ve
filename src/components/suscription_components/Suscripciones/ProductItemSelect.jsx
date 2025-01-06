import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductItemSelect = ({ listaProductos, setOpcion, setProducto }) => {
  const [selectedItem, setSelectedItem] = useState(listaProductos[0]);
  const [copiado, setCopiado] = useState(false);

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
    setProducto(selectedItem);
  }

  const handleCLickShare = () => {
    let currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('producto', selectedItem.IdProducto);
    navigator.clipboard.writeText(currentUrl.toString()).then(() => {
      setCopiado(true);
      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    })
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white">
      <label className="text-xxs md:text-xs font-semibold mt-2">
        O seleccione la cantidad de años a continuación:
      </label>
      <div className="flex w-full rounded-md px-3 py-1">
        <div className="w-1/6 flex items-center">
          <img className="h-10 md:h-20 object-contain" src="https://visitaecuador.com/img/web/suscription_card.png"></img>
        </div>
        <div className="w-5/6 flex justify-center items-center gap-1">
          <div className="flex flex-col w-full">
            <label className="text-xxs md:text-xs text-greenVE-600 font-medium">{selectedItem.Titulo}</label>
            <label className="text-xxs md:text-xs">
              {selectedItem.TiempoVendido + " " + getTiempo(selectedItem.TipoTiempo) + " de suscripción"}
            </label>
          </div>
          <div className="flex flex-col">
            <select
              onChange={(event) => handleChange(event)}
              className="border rounded-md px-2 py-1 text-xxs md:text-xs my-2"
            >
              {listaProductos.map((option, index) => (
                <option key={index} value={option}>
                  {option.TiempoVendido} años - ${(option.PrecioProducto * 1.12).toFixed(2)}
                </option>
              ))}
            </select>
            {/*<label className="text-md font-semibold text-greenVE-600 ">
              {"$" + Math.round(selectedItem.PrecioProducto * 1.12)}
            </label>*/}
            <button className="text-xxs md:text-xs text-white font-semibold bg-greenVE-500 px-2 py-0.5 rounded-lg" onClick={handleClick}>
              Comprar
            </button>
          </div>
          <div title="Compartir" className="pl-4  cursor-pointer" onClick={() => handleCLickShare()}>
              {
                copiado
                  ? <span className="icon-[octicon--check-circle-fill-12] h-5 w-5 text-greenVE-500"></span>
                  : <span className="icon-[entypo--share-alternitive] h-5 w-5 text-gray-400 hover:text-greenVE-500"></span>
              }
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSelect;
