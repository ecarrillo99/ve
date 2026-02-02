import React from "react";

const WineOfferItemSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border md:border-0 border-gray-200">
      {/* Imagen skeleton */}
      <div className="bg-gray-200 rounded-t-xl md:rounded-xl animate-pulse relative w-full md:h-48 h-36"></div>

      {/* Contenido skeleton */}
      <div className="flex flex-col mt-3 gap-2 px-3 md:px-0 pb-3 md:pb-0">
        {/* Establecimiento */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="h-3 rounded-full w-24 bg-gray-200 animate-pulse"></div>
        </div>

        {/* Título */}
        <div className="h-4 rounded-full w-full bg-gray-200 animate-pulse"></div>
        <div className="h-4 rounded-full w-3/4 bg-gray-200 animate-pulse"></div>

        {/* Ubicación */}
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="h-3 rounded-full w-32 bg-gray-200 animate-pulse"></div>
        </div>

        {/* Descripción */}
        <div className="h-3 rounded-full w-full bg-gray-200 animate-pulse mt-1"></div>
        <div className="h-3 rounded-full w-2/3 bg-gray-200 animate-pulse"></div>

        {/* Fechas y badge */}
        <div className="flex items-center justify-between mt-2">
          <div className="h-4 rounded-full w-28 bg-gray-200 animate-pulse"></div>
          <div className="h-5 rounded-full w-16 bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default WineOfferItemSkeleton;