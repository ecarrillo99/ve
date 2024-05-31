import React from 'react';

const HotelDescription = ({Descripcion}) => {
    return (
        <div className='p-3'>
            <label className='font-semibold'>Descripción</label>
            <p>{Descripcion}</p>
        </div>
    );
};

export default HotelDescription;