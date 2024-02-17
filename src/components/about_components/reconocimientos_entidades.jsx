import { useState } from "react";
import Icons from "../../global/icons";

const ReconocimientosEntidades=()=>{
    const icons = new Icons();
    function Icon({ defaultIcon, hoverIcon, link}) {
        const [icon, setIcon] = useState(defaultIcon);
        
        return (
            <a
            onMouseOver={() => setIcon(icons.Data.Descarga)}
            onMouseOut={() => setIcon(icons.Data.Reconocimiento)}
            href={link}
            className="cursor-pointer"
            dangerouslySetInnerHTML={{ __html: icon }}
            download={true}
            />
        );
    }
    return(
        <div>
            <h1 className="text-2xl font-semibold text-[#006b68]">Reconocimientos Entidades Particulares</h1>
            <div className="flex flex-col w-full">
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/mmecuador-org.jpg"}
                        />
                        <label className="text-[#006b68] font-semibold pt-2">Cumplimiento</label>
                        <label className="text-sm text-center">Por su cumplimiento con los parámetros de calidad exigidos por Corporación Mucho Mejor Ecuador - JUNIO 2018</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReconocimientosEntidades;