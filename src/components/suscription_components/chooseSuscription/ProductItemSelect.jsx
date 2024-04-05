import { useEffect, useState } from "react";

const ProductItemSelect = ({ listaProductos, cambioSlider }) => {
  const [selectedItem, setSelectedItem] = useState(listaProductos[0]);

  useEffect(() => {
    setSelectedItem(listaProductos[0]);
  }, [listaProductos]);

  const getTiempo=(TipoTiempo)=>{
    if(TipoTiempo==1){
        return "año(s)"
    }
    if(TipoTiempo==2){
        return "mes(es)"
    }
    if(TipoTiempo==3){
        return "día(s)"
    }
    if(TipoTiempo==4){
        return "hora(s)"
    }
    if(TipoTiempo==5){
        return "minuto(s)"
    }
}

  const handleChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedValue = listaProductos[selectedIndex];
    setSelectedItem(selectedValue);
  };

  const handleClick=()=>{
    cambioSlider(1)
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <label className="text-xs font-semibold">
        Seleccione la cantidad de años a continuación:
      </label>

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
      <div className="flex w-96 border rounded-md px-3 py-1">
        <div className="w-1/3">
          <img className="h-20" src="./img/web/suscription_card.png"></img>
        </div>
        <div className="w-2/3 flex flex-col justify-center items-end text-end gap-1">
          <label className="text-xs text-greenVE-600 font-medium">{selectedItem.Titulo}</label>
          <label className="text-xs">
            {selectedItem.TiempoVendido + " " + getTiempo(selectedItem.TipoTiempo) + " de suscripción"}
          </label>
          <label className="text-md font-semibold text-greenVE-600 ">
            {"$" + Math.round(selectedItem.PrecioProducto * 1.12)}
          </label>
          <button className="text-xs text-white font-semibold bg-greenVE-500 px-2 py-0.5 rounded-lg" onClick={handleClick}>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItemSelect;
