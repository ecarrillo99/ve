import React from 'react';
import StepsSuscription from './steps_suscription';

const BuySuscription = () => {
    return (
        <div className="px-6 flex flex-col mx-auto mb-28 max-w-6xl py-6  sm:px-6 lg:px-8 ">
            <label className='md:text-2xl font-semibold text-greenVE-500 w-full'>Estas a pocos pasos de disfrutar nuestra suscripción</label>
            <StepsSuscription />
        </div>
    );
};

export default BuySuscription;