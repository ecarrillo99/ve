import React from 'react';

const HotelDescription = ({Descripcion}) => {
    return (
        <div className="p-3">
            <label className="font-semibold">Descripción</label>
            <p className="text-sm md:text-base">{Descripcion}</p>
        </div>
    );
};

export default HotelDescription;