import { useState } from "react";
import Icons from "../../global/icons";

const ReconocimientosMinisterio=()=>{
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
            <h1 className="text-2xl font-semibold text-[#006b68]">Reconocimientos Ministerios</h1>
            <div className="flex flex-col w-full">
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/ministerio-turismo-org.gif"}
                        />
                        <label className="text-sm text-center">Sitio Oficial de Promoción Turística de Ecuador (2001)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/ministerio-turismo_01-org.gif"}
                        />
                        <label className="text-sm text-center">Agradecimiento(2006)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/ministerio-turismo_02-org.jpg"}
                        />
                        <label className="text-sm text-center">Reconocimiento por fomentar el Turismo en la Región (2007)</label>
                    </div>
                </div>
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/ministerio-turismo_promo01-org.gif"}
                        />
                        <label className="text-sm text-center">Promoción de servicios Turísticos por Internet - Resolución 1/2(2009)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/ministerio-turismo_promo02-org.gif"}
                        />
                        <label className="text-sm text-center">Promoción de servicios Turísticos por Internet - Resolución 2/2 (2009)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/ministerio-turismo_promo03-org.gif"}
                        />
                        <label className="text-sm text-center">Promoción de servicios Turísticos por Internet - Adjudicación(2009)</label>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ReconocimientosMinisterio;