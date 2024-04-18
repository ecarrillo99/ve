import React from 'react';

const SearchResultSkeleton = () => {
    return (
        <>
            {
                Array(5).fill(null).map((item, index) => (
                    <div className={`flex py-4 border-b border-greenVE-300`}>
                        <div className='w-1/3 px-3'>
                            <div className='h-full pb-8 bg-gray-300 animate-pulse rounded-lg'>
                                <div className='bg-gray-300 animate-pulse'></div>
                            </div>
                        </div>
                        <div className='w-2/3 flex flex-col gap-2 mr-3'>
                            <div className='font-semibold leading-5 bg-gray-300 animate-pulse h-4 mb-1 rounded-full'></div>
                            {/* Aquí agregamos el contenedor flex para alinear elementos verticalmente */}
                            <div className='flex flex-col gap-2 h-full'>
                                {/* Asegúrate de que el contenedor tenga la clase h-full para que tome la altura completa */}
                                <div className='flex animate-pulse'>
                                    {Array(5).fill(null).map((item, index) => (
                                        <div className="bg-gray-300 rounded-full ml-1 h-4 w-4 text-amber-500"></div>
                                    ))}
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <div className='h-4 w-4 bg-gray-300 animate-pulse rounded-full'></div>
                                    <div className='h-3 w-4/12 bg-gray-300 animate-pulse rounded-full'></div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='h-6 animate-pulse flex gap-1 w-1/2 bg-gray-300 justify-center rounded-lg py-1 items-center'> </div>
                                    <div className='h-6 animate-pulse flex gap-1 w-1/2 bg-gray-300 justify-center rounded-lg py-1 items-center'> </div>
                                </div>
                                <div className='flex gap-1 h-3 rounded-full w-7/12 bg-gray-300 my-1'></div>
                                <div className='flex gap-2 items-center'>
                                    <div className='flex gap-1 h-3 rounded-full w-7/12 bg-gray-300 my-1'></div>
                                    <div className='flex gap-1 h-3 rounded-full w-7/12 bg-gray-300 my-1'></div>
                                    <div className='flex gap-1 h-3 rounded-full w-7/12 bg-gray-300 my-1'></div>
                                </div>
                                <div className='flex items-center gap-1 text-sm'>
                                    <div className='flex gap-1 h-3 rounded-full w-7/12 bg-gray-300 my-1'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>

    );
};

export default SearchResultSkeleton;