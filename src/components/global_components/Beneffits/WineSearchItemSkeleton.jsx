const WineSearchItemSkeleton = () => {
  return (
    <div className="flex border border-gray-200 h-60 mb-3 rounded-md shadow-md animate-pulse">
      {/* Imagen */}
      <div className="w-4/12 bg-gray-300 rounded-l-md" />

      {/* Contenido */}
      <div className="w-8/12 pl-5 flex items-center">
        <div className="w-full pr-5">
          {/* Título + rating */}
          <div className="flex justify-between my-1">
            <div className="h-5 w-full my-1 mr-5 bg-gray-300 rounded-lg" />
            <div className="flex items-center w-24 h-5 bg-gray-300 my-1 rounded-lg" />
          </div>

          {/* Estrellas */}
          <div className="flex gap-1 my-1">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-300 rounded-lg" />
            ))}
          </div>

          {/* Ubicación */}
          <div className="flex items-center my-1">
            <div className="h-4 w-4 bg-gray-300 rounded-lg" />
            <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg" />
          </div>

          {/* Título oferta */}
          <div className="h-5 w-full my-3 bg-gray-300 rounded-lg" />

          {/* Detalles y precio */}
          <div className="flex pt-1 items-center">
            <div className="w-3/4">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="flex items-center my-1">
                  <div className="h-4 w-4 bg-gray-300 rounded-lg" />
                  <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg" />
                </div>
              ))}
            </div>
            <div className="pl-4 w-3/4">
              {Array(3).fill(null).map((_, i) => (
                <div key={i} className="flex items-center my-1">
                  <div className="h-4 w-4 bg-gray-300 rounded-lg" />
                  <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg" />
                </div>
              ))}
            </div>
            <div className="w-full flex justify-end items-end">
              <div className="flex flex-col items-center">
                <div className="bg-gray-300 h-10 w-14 rounded-md" />
                <div className="bg-gray-300 h-4 rounded-lg w-16 my-1" />
                <div className="bg-gray-300 h-7 w-20 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineSearchItemSkeleton;