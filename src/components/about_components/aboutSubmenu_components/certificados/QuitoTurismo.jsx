import { useState } from "react";
import Icons from "../../../../global/icons";

const QuitoT = () => {
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
            <h1 className="text-2xl font-bold text-[#d0d0d0]">Quito Turismo</h1>
            <div className="flex flex-col w-full">
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/QuitoTurismoCoop1_org.dif"}
                        />
                        <label className="text-sm text-center">Quito Turismo <br/>
                            Convenio Cooperación(1 / 6)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/QuitoTurismoCoop2_org.dif"}
                        />
                        <label className="text-sm text-center">Quito Turismo <br/>
                            Convenio Cooperación(2 / 6)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/QuitoTurismoCoop3_org.dif"}
                        />
                        <label className="text-sm text-center">Quito Turismo <br/>
                            Convenio Cooperación(3 / 6)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/QuitoTurismoCoop4_org.dif"}
                        />
                        <label className="text-sm text-center">Quito Turismo <br/>
                            Convenio Cooperación(4 / 6)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/QuitoTurismoCoop5_org.dif"}
                        />
                        <label className="text-sm text-center">Quito Turismo <br/>
                            Convenio Cooperación(5 / 6)</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/QuitoTurismoCoop6_org.dif"}
                        />
                        <label className="text-sm text-center">Quito Turismo <br/>
                            Convenio Cooperación(6 / 6)</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QuitoT;
