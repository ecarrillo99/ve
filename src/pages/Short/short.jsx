import { useParams } from "react-router-dom";
import { shareHotel } from "../../controllers/establecimiento/establecimientoController";
const Short=()=>{
    const { id } = useParams(); 
    shareHotel("obtener", id).then((result)=>{
        if(result){
            window.open(window.location.origin+"/#/hotel/"+result, "_self")
        }else{
            window.open(window.location.origin, "_self");
        }
    })
}
export default Short;