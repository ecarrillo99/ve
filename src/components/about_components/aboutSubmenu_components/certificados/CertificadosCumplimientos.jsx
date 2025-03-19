import { useState } from "react";
import Icons from "../../../../global/icons";

const CertificadosC = () => {
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
            <h1 className="text-2xl font-bold text-[#d0d0d0]">Certificados de Cumplimiento</h1>
            <div className="flex flex-col w-full">
                <div className="grid grid-cols-5 md:grid-cols-5 gap-10 pt-10 gap-x-20 ml-12">
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/AkrosHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Akros <br/>
                            Quito</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/AmbatoHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Ambato <br/>
                            Ambato</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/ArhanaHosteria_org.dif"}
                        />
                        <label className="text-sm text-center">Arhaná Hostería <br/>
                            Gualaceo
                        </label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/CitimedHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Citimed Hotel <br/>
                            Quito</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/ElConquistadorHotel_org.dif"}
                        />
                        <label className="text-sm text-center">El Conquistador<br/>
                            Cuenca</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/ElTotoralHotel_org.dif"}
                        />
                        <label className="text-sm text-center">El Totoral <br/>
                            Ibarra</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/HowardJohnsonGye_org.dif"}
                        />
                        <label className="text-sm text-center">Howard Johnson <br/>
                            Guayaquil</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/HowardJohnsonLja_org.dif"}
                        />
                        <label className="text-sm text-center">Howard Johnson <br/>
                            Loja</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/LeparcHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Leparc Hotel <br/>
                            Quito</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/LuganoHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Lugano Hotel <br/>
                            Quito</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/MantahostHotel_org.dif"}
                        />
                        <label className="text-sm text-center">MantaHost Hotel <br/>
                            Manta</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/NuHouseHotel_org.dif"}
                        />
                        <label className="text-sm text-center">NuHouse Hotel <br/>
                            Quito</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/OroVerdeCue_org.dif"}
                        />
                        <label className="text-sm text-center">Oro Verde <br/>
                            Cuenca</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/OroVerdeCueMch_org.dif"}
                        />
                        <label className="text-sm text-center">Oro Verde
                            Machala</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/OroVerdeCueMch_org.dif"}
                        />
                        <label className="text-sm text-center">Oro Verde <br/>
                            Guayaquil</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/OroVerdeGye_org.dif"}
                        />
                        <label className="text-sm text-center">Veuxor <br/>
                            Machala</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/PresidenteHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Presidente Hotel <br/>
                            Cuenca</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/ReinaIsabel_org.dif"}
                        />
                        <label className="text-sm text-center">Reina Isabel <br/>
                            Quito</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/SheratonUio_org.dif"}
                        />
                        <label className="text-sm text-center">Sheraton <br/>
                            Quito</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/SonestaHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Sonesta Hotel <br/>
                            Guayaquil</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/UniparkHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Unipark Hotel <br/>
                            Guayaquil</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/VictoriaHotel_org.dif"}
                        />
                        <label className="text-sm text-center">Victoria <br/>
                            Cuenca</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/Zahir360_org.dif"}
                        />
                        <label className="text-sm text-center">Zahir 360 <br/>
                            Cuenca</label>
                    </div>
                    <div className="w-1/3 flex flex-col items-center">
                        <Icon
                            defaultIcon={icons.Data.Reconocimiento}
                            hoverIcon={icons.Data.Descarga}
                            link={"https://visitaecuador.com/nosotros/dg.php?f=https//www.visitaecuador.com/ve/img/contenido/informacion/certificado/Zamorano_org.dif"}
                        />
                        <label className="text-sm text-center">Zamorano <br/>
                            Loja</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CertificadosC;
