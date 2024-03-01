import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";

const RewardsBanner=()=>{
    const icons = new Icons();
    const navigate = useNavigate();
    const onClickReward=(section)=>{
        navigate(`/nosotros/${section}`);
    }
    return(
        <div className="mt-10">
            <h1 className="font-bold text-xl">Reconocimientos</h1>
            <div className="flex justify-between mb-4">
                <h6 className="text-md">Conoce la trayectoria que nos respalda. !Descúbrelos aquí!</h6>
            </div>
             <div className="flex flex-wrap items-center justify-center cursor-pointer">
                <div className="flex flex-col items-center justify-center md:w-1/3 bg-gray-200 border-4 border-white py-2.5" onClick={()=>onClickReward("municipios")}>
                    <div dangerouslySetInnerHTML={{ __html: icons.Data.Municipio }} />
                    <label className="text-xs font-semibold text-center cursor-pointer">Reconocimientos de Municipios</label>
                </div>
                <div className="flex flex-col items-center justify-center md:w-1/3 bg-gray-200 border-4 border-white py-2.5 cursor-pointer" onClick={()=>onClickReward("ministerios")}>
                    <div dangerouslySetInnerHTML={{ __html: icons.Data.Ministerio }} />
                    <label className="text-xs font-semibold text-center cursor-pointer">Reconocimientos de Ministerios</label>
                </div>
                <div className="flex flex-col items-center justify-center md:w-1/3 bg-gray-200 border-4 border-white py-2.5 cursor-pointer" onClick={()=>onClickReward("entidades")}>
                <div dangerouslySetInnerHTML={{ __html: icons.Data.Entidades }} />
                    <label className="text-xs font-semibold text-center cursor-pointer">Reconocimientos de Entidades Particulares</label>
                </div>
            </div>
        </div>
    )
}

export default RewardsBanner;