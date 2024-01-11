import { useNavigate } from "react-router-dom";

const DestinoItem = ({destino}) => {
    const navigate = useNavigate();
    const date=[{
            startDate: new Date(),
            endDate: new Date().setDate(new Date().getDate() + 1),
            key: "selection",
        }];

    const options={
            adult: 1,
            children: 0,
            childrenAges: [],
            room: 1,
        };

    const destination={
            Titulo: destino.Titulo
        };

    const handleClickDestino=()=>{
        navigate(`/busqueda/?destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`)
    }

    return (<div className="rounded-lg border-4 border-white cursor-pointer" onClick={()=>handleClickDestino()}>
        <div className="">
            <img src={destino.Icono} className="h-36 w-full object-cover rounded-md" />
        </div>
        <div className="flex flex-col">
            <label className="font-medium text-base">{destino.Titulo}</label>
            <label className="font-light text-sm">{destino.Valor}</label>
        </div>
    </div>)
}
export default DestinoItem;