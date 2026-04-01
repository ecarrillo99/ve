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

    return (
        <div 
            className="relative rounded-lg overflow-hidden cursor-pointer group h-56 mx-2"
            onClick={()=>handleClickDestino()}
        >
            {/* Imagen de fondo */}
            <img 
                src={destino.Icono} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                alt={destino.Titulo}
            />
            
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Contenido */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-2xl mb-1">{destino.Titulo}</h3>
                <p className="font-light text-sm opacity-90">{destino.Valor}</p>
            </div>
        </div>
    )
}

export default DestinoItem;