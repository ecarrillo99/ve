import React from "react";

const ItemRecomendedSkeleton = () => {


    return (
        <div class=" bg-white rounded-xl border-gray-200 cursor-pointer">
            <div className="bg-gray-200 rounded-md animate-pulse relative w-full h-0" style={{ paddingBottom: '100%' }}>
                
            </div>
            <div className="flex flex-col mt-3 gap-1.5">
                <div className="h-3 rounded-full w-24 bg-gray-200 animate-pulse"></div>
                <div className="h-3 rounded-full w-40 bg-gray-200 animate-pulse"></div>
                <div className="flex items-center space-x-1">
                   <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse"></div>
                   <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse"></div>
                   <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse"></div>
                   <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse"></div>
                   <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse"></div>
                </div>
                <div className="h-3 rounded-full w-40 bg-gray-200 animate-pulse"></div>
                <div className="h-4 rounded-full w-20 bg-gray-200 animate-pulse"></div>
            </div>
        </div>
    );
}

export default ItemRecomendedSkeleton;