import { useEffect, useState } from "react";
import { SuscripcionProducto } from "../../../controllers/suscripcion/suscripcionProductoController";
import ProductItem from "./ProductItem";
import ProductItemSelect from "./ProductItemSelect";
import { CheckPromocionalCode } from "../../../controllers/suscripcion/suscripcionCodigoPromocional";
import { Spinner } from "@material-tailwind/react";
import ProductListSkeleton from "./ProductListSkeleton";

const Productlist = ({cambioSlider, productoSeleccionado}) => {
  const [firstProducts, setFirstProducts] = useState();
  const [lastProducts, setLastProducts] = useState();
  const [codigoPromocional, setCodigoPromocional] = useState();
  const [codigoValido, setcodigoValido] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    async function fetchData() {

      try {
        SuscripcionProducto(4).then((result) => {
          if (result) {
            result.length > 4
              ? setFirstProducts(result.slice(0, 4))
              : setFirstProducts(result)
            setLastProducts(result.slice(4, result.length))
          }
        })

      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const handleClickValidar = () => {
    setIsLoading(true)
    if (!isLoading) {
      setcodigoValido(false)
      if (!codigoPromocional) {
        setcodigoValido(true)
        setIsLoading(false)
      } else {
        CheckPromocionalCode({codigo:codigoPromocional}).then((result) => {
          if (!result) {
            setcodigoValido(true)
            setIsLoading(false)
          } else {
            result.length > 4
              ? setFirstProducts(result.slice(0, 4))
              : setFirstProducts(result)
            setLastProducts(result.slice(4, result.length))
            setIsLoading(false)
          }
        })
      }
    }
  }

  const handleInputChange = (event) => {
    setCodigoPromocional(event.target.value);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 justify-center mb-4 items-center">
        <div className="flex bg-greenVE-500 h-7 w-7 justify-center items-center text-white font-bold rounded-full">1</div>
        <label className="font-semibold">Elige tu suscripción ideal</label>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-3 mb-5">
        <label className="text-sm font-medium mb-2 md:mb-0">Código promocional:</label>
        <div className="flex flex-col">
          <input
            type="text"
            className="border rounded-md text-center text-sm py-0.5 font-medium h-6 mb-2 md:mb-0 md:mr-3"
            onChange={handleInputChange}
          />
          {codigoValido && (
            <label className="text-xxs font-medium text-red-500 text-center md:text-left">
              *Código no válido, vuelva a intentar
            </label>
          )}
        </div>
        <button className="bg-greenVE-500 px-2 rounded-md text-white h-6 w-full md:w-20 flex items-center justify-center" onClick={handleClickValidar}>
          {isLoading ? (
            <Spinner className="p-1"></Spinner>
          ) : (
            <label className="cursor-pointer text-sm font-medium">Validar</label>
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-y-3 gap-x-3 items-center justify-center sm:flex-col md:flex-row">
        {firstProducts ?
          firstProducts.map((item) => (
            <ProductItem Producto={item} key={item.id} cambioSlider={cambioSlider} productoSeleccionado={productoSeleccionado}/>
          ))
          : <ProductListSkeleton></ProductListSkeleton>
        }
      </div>
      <div>
        {
          lastProducts &&
          <ProductItemSelect listaProductos={lastProducts} cambioSlider={cambioSlider}></ProductItemSelect>
        }
      </div>
    </div>

  )
}

export default Productlist;