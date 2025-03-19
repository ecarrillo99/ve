import React, { useState } from "react";
import Icons from "../../../../global/icons";

const Edes = () => {
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

            <a href="#" className="inline-block w-full h-48 ml-5 ">
                <img
                    src="https://www.visitaecuador.com/ve/img/contenido/informacion/top-halldelafama.jpg"
                    alt="Google Play"
                    className="rounded-lg   w-11/12 h-48"
                />
            </a>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Certificaciones</h2>
            <h1 className="text-2xl font-bold text-[#d0d0d0]">Edes</h1>
            <div className="flex flex-col w-full">
                <div className="flex pt-10 gap-x-4">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/edes-junio2019.jpg"}
                        />
                        <label className="text-sm text-center">Certificado <br/>
                            Quito - Junio 2019</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Edes;
