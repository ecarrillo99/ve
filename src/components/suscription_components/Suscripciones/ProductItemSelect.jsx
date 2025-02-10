import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductItemSelect = ({ listaProductos, setOpcion, setProducto, codigo, setCodigo }) => {
  const [selectedItem, setSelectedItem] = useState(listaProductos[0]);
  const [copiado, setCopiado] = useState(false);
  const [tiempoAdicional, setTiempoAdicional]=useState(0);

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
    if(checkPermission()){
      changeTiempoAdicional();
    }
  }

  const changeTiempoAdicional=()=>{
    if(tiempoAdicional>0){
        const porcentajeAdicional = ((tiempoAdicional/12) / selectedItem.Tiempo) * 100;
        if(codigo.beneficio[0].length>0){
            codigo.beneficio[0].cantidad = porcentajeAdicional;
            setCodigo(codigo);
        }
    }else{
        if(codigo.beneficio[0].length>0){
            codigo.beneficio[0].cantidad = 0;
            setCodigo(codigo);
        }
    }
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

  const handleChangePrice=(event)=>{
    selectedItem.PrecioProducto = (event.target.value / 1.12).toFixed(2);
}

  const checkPermission=()=>{
    const data = JSON.parse(localStorage.getItem("datos"));
    if(data){
        if(data.data.permisos.perfil.suscripcionPersonalizada){
            return true;
    }}else{
        return false;
}}

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
          {
                    checkPermission()?
                    <div className="flex flex-col text-center gap-3 w-2/3">
                        <div className="flex  items-center gap-2">
                            <label className="text-xxs md:text-xs">Nuevo precio:</label>
                            <input className="w-20" type="number" defaultValue={(selectedItem.PrecioProducto*1.12).toFixed(2)}  onChange={handleChangePrice}></input>
                        </div>
                        <div className="flex  items-center gap-2">
                            <label className="text-xxs md:text-xs">Meses regalo:</label>
                            <input className="w-20"   type="number" value={tiempoAdicional} onChange={(event)=>{setTiempoAdicional(event.target.value)}}></input>
                        </div>
                    </div>
                    :<></>
                }
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
