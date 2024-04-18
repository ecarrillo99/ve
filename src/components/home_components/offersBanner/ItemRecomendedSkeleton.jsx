import React from "react";

const ItemRecomendedSkeleton = () => {


    return (
        <div className=" bg-white rounded-xl border md:border-0 border-gray-200 cursor-pointer">
            <div className="bg-gray-200 rounded-md animate-pulse relative w-full  md:h-48  h-32" >
                
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