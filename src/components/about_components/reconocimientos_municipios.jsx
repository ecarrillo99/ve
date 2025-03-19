import { useState } from "react";
import Icons from "../../global/icons";

const ReconocimientosMunicipio=()=>{
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
            <h1 className="text-2xl font-semibold text-[#7accc7]">Reconocimientos Municipios</h1>
            <div className="flex flex-col w-full">
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/municipio-manta2021.png"}
                        />
                        <label className="text-[#7accc7] font-semibold pt-2">Municipio de Manta</label>
                        <label className="text-sm text-center">Embajador social media de turismo infoTour</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/municipio-gualaceo2021.png"}
                        />
                        <label className="text-[#7accc7] font-semibold pt-2">Municipio de Gualaceo</label>
                        <label className="text-sm text-center">Embajador social media de turismo infoTour</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/municipio-chordeleg-org.jpg"}
                        />
                        <label className="text-[#7accc7] font-semibold pt-2">Municipio de Chordeleg</label>
                        <label className="text-sm text-center">Reconocimiento por fomentar el Turismo en el Cantón(2009)</label>
                    </div>
                </div>
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/municipio-chordeleg_01.jpg"}
                        />
                        <label className="text-[#7accc7] font-semibold pt-2">Municipio de Chordeleg</label>
                        <label className="text-sm text-center">Reconocimiento por fomentar el Desarrollo en el Cantón(2006)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/municipio-ibarra-org.jpg"}
                        />
                        <label className="text-[#7accc7] font-semibold pt-2">Municipio de Ibarra</label>
                        <label className="text-sm text-center">Reconocimiento por fomentar el Turismo en el Cantón(2009)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https://www.visitaecuador.com/ve/img/contenido/informacion/hall/concejo-provincial-guayas-org.jpg"}
                        />
                        <label className="text-[#7accc7] font-semibold pt-2">HCP Guayas</label>
                        <label className="text-sm text-center">Reconocimiento por fomentar el Turismo en la Provincia</label>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default ReconocimientosMunicipio;
