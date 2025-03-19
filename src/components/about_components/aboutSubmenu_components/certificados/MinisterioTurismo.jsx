import { useState } from "react";
import Icons from "../../../../global/icons";

const MinisterioTurismo = () => {
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
            <h1 className="text-2xl font-semibold text-[#d0d0d0]">Ministerio del Turismo </h1>
            <div className="flex flex-col w-full">
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/MinTurismo/marzo2018/1.dif"}
                        />
                        <label className="text-sm text-center">Registro 2018 1/2 <br/>
                            Marzo 2018</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/MinTurismo-marzo2018/2.dif"}
                        />
                        <label className="text-sm text-center">Registro 2018 2/2 <br/>
                            Marzo 2018</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/MinTurismo1/org.dif"}
                        />
                        <label className="text-sm text-center">Registro 2017 1/2
                            Octubre 2017</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/MinTurismo2/org.dif"}
                        />
                        <label className="text-sm text-center">Registro 2017 2/2
                            Octubre 2017</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MinisterioTurismo
