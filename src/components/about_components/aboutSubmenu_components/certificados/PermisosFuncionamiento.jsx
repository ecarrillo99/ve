import { useState } from "react";
import Icons from "../../../../global/icons";

const PermisosF = () => {
    const icons = new Icons();
    function Icon({ defaultIcon, hoverIcon, link}) {
        const [icon, setIcon] = useState(defaultIcon);

        return (
            <a
                onMouseOver={() => setIcon(icons.Data.Descarga)}
                onMouseOut={() => setIcon(icons.Data.Reconocimiento)}
                href={link}
                className="cursor-pointer"
                dangerouslySetInnerHTML={{__html: icon}}
                download={true}
            />
        );
    }
    return (
        <div>
            <h1 className="text-2xl font-bold text-[#d0d0d0]">Permisos de Funcionamiento</h1>
            <div className="flex flex-col w-full">
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/funcionamiento-marzo2018.dif"}
                        />
                        <label className="text-sm text-center">Permiso Municipio de Cuenca <br/>
                            Marzo 2018</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/funcionamiento1-marzo2018.jpg"}
                        />
                        <label className="text-sm text-center">Permiso Bomberos <br/>
                            Marzo 2018</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PermisosF;
