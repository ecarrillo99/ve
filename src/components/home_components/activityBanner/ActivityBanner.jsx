import { useEffect, useState } from "react";
import { getReserves } from "../../../controllers/info/infoController";
import ActivityItem from "./ActivityItem";

const ActivityBanner=()=>{
    const [data, setData] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                getReserves()
                    .then((result) => {
                        if (result) {
                            setData(result)
                            console.log("resultados")
                            console.log(data);
                        }
                    })
                    .catch((error) => { console.log(error) })
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, []);

    return(
        <div>
            <h1 className="font-bold text-xl">Actividad</h1>
            <label className="font-medium text-md">Reporte desde la Central de Reservas</label>
            <div className="mt-4">
            {
                data
                ?data.map((item)=>(
                    <ActivityItem actividad={item}/>
                ))
                :<></>
            }
            </div>
        </div>
    );
}
export default ActivityBanner;