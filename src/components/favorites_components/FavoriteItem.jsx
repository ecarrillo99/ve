import { useNavigate } from "react-router-dom";
import Icons from "../../global/icons";
import { useState } from "react";
import { changeFavoritoStatus } from "../../controllers/establecimiento/establecimientoController";

const FavoriteItem=({favorito, date, options, eliminarFavorito})=>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading]=useState()
    const icons=new Icons();
    const [destination, setDestination] = useState(
        ({
            Titulo: favorito.Titulo,
            Tipo: "establecimiento",
            Id: favorito.Id,
            Lugar: favorito.Titulo
        })
    );

    const HandleClickItem = () => {
        navigate(`/hotel/${favorito.Titulo.toLowerCase().replaceAll(" - ","-").replaceAll(" ","-")}/?id=${favorito.Id}&fechas=${encodeURIComponent(JSON.stringify(date))}&destino=${encodeURIComponent(JSON.stringify(destination))}&opciones=${encodeURIComponent(JSON.stringify(options))}`);
    }

    const handleClickFav = () => {
        if (!isLoading) {
          setIsLoading(true)
          changeFavoritoStatus(favorito.Id, false).then((res) => {
            if (res) {
                if(res==401){
                    localStorage.removeItem("datos");
                    window.location.reload();
                }else{
                    setIsLoading(false)
                    eliminarFavorito(favorito.Id);
                }
            } else {
              setIsLoading(false)
            }
          })
        }
      }

    return (
        <div className="border rounded-lg">
            <div className="absolute z-10 h-7 w-7 bg-black rounded-full ml-3 mt-3 flex justify-center items-center cursor-pointer font-bold border-2 border-white text-white" onClick={()=>handleClickFav()}>
            {

                isLoading
                ? <div className="w-4 h-4 border-l-2 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                : ("X")
            }
            </div>
            <img className="h-48 rounded-t-lg w-full object-cover" src={favorito.Foto}/>
            <div className="px-3 py-3 border-b overflow-hidden">
            <label className="text-greenVE-500 font-medium text-lg truncate">{favorito.Titulo}</label>
                <div className="flex items-center space-x-0.5">
                    {Array(+(favorito.Catalogacion)).fill(null).map((item, index) => (
                        <svg key={index} height="14px" width="14px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current text-yellow-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    ))}
                </div>
            </div>
            <div className="flex items-center h-16 gap-1 px-3 py-3 border-b">
                <div dangerouslySetInnerHTML={{ __html: icons.Data.MapPin}} />
                <label className=" text-xxs">{favorito.Direccion}</label>
            </div>
            <div className="px-3 py-3">
                <button className="bg-greenVE-500 w-full rounded-md py-0.5 text-white text-sm" onClick={()=>HandleClickItem()}>Ver alojamiento</button>
            </div>
        </div>
    );
}
export default FavoriteItem;