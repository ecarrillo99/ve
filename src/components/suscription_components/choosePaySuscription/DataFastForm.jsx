import { useEffect, useState } from "react";
import Config from "../../../global/config";
import DatafastController from "../../../controllers/pago/datafast/datafastController";
import DataFastUI from "./DatafastFormUI";

const DataFastForm = ({ tarjeta, diferido }) => {
  console.log(tarjeta)
  const [trx, setTrx] = useState();
  const Persona = {
    "dni": "0706980562",
    "address": "Cuenca",
    "names": "Edisson Carrillo",
    "email": "carrilloedisson@gmail.coM",
  };
  const Producto = {
    "precio_producto": "20",
    "titulo": "Suscripción 1 mes"
  };
  const datafastController = new DatafastController({ persona: Persona, product: Producto });

  useEffect(() => {
    async function fetchData() {
      try {
        datafastController.prepareRemotePayment(true, Persona, Producto).then((result) => {
          if (result) {
            setTrx(result);
          }
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [tarjeta, diferido]); // Agrega tarjeta y diferido como dependencias para que el efecto se dispare cuando cambien

  return (
    <div>
      {trx && <DataFastUI trx={trx} tarjeta={tarjeta} diferido={diferido}></DataFastUI>}
    </div>
  );
};

export default DataFastForm;
