import React from "react";

const ItemRecomendedSkeleton = () => {


    return (
        <div class=" bg-white rounded-xl border border-1 border-gray-200 cursor-pointer"
        >

            <div class="animate-pulse">
            <div class="h-44 w-full object-cover rounded-t-xl bg-gray-300" />
                <div className="p-4">
                
                <div class="text-greenTitle font-bold text-center text-base h-8 flex items-center justify-center leading-4 ">
                    <div className="bg-gray-300 w-96 h-4 rounded-lg"></div>
                </div>
                <div class="text-greenTitle font-bold text-center text-base h-8 flex items-center justify-center leading-4 ">
                    <div className="bg-gray-300 w-32 h-4 rounded-lg"></div>
                </div>
                <div class="text-greenTitle font-bold text-center text-base h-8 flex items-center justify-center leading-4 ">
                    <div className="bg-gray-300 w-96 h-4 rounded-lg"></div>
                </div>
                <div class="text-greenTitle font-bold text-center text-base flex items-center justify-center leading-4 mt-2">
                    <div className="bg-gray-300 w-3/4 h-9 rounded-lg"></div>
                </div>
                
                </div>
                

            </div>
        </div>
    );
}

export default ItemRecomendedSkeleton;