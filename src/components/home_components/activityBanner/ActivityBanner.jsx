import { useEffect, useState } from "react";
import { getReserves } from "../../../controllers/info/infoController";
import ActivityItem from "./ActivityItem";
import ActivityItemSkeleton from "./ActivityItemSkeleton";

const ActivityBanner=()=>{
    const [data, setData] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                getReserves()
                    .then((result) => {
                        if(result==401){
                            localStorage.removeItem('datos');
                            window.location.reload();
                        }else{
                            setData(result)
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
                ?data.map((item, index)=>(
                    <ActivityItem key={index} actividad={item}/>
                ))
                :Array.from({ length: 4 }, (item, index) => <ActivityItemSkeleton key={index} actividad={item}></ActivityItemSkeleton>)
            }
            </div>
        </div>
    );
}
export default ActivityBanner;