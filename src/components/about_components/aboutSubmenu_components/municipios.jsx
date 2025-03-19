import React, {useState} from 'react';
import Icons from "../../../global/icons";

const Municipios =() => {
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
    return (
        <div>

        </div>
    )
}
export default Municipios
