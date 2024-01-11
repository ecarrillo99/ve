
const SearchItemSkeleton = () => {
  return (
    <div className="flex border border-gray-200 border-1 h-60 mb-3 rounded-md shadow-md animate-pulse">
      <div className="w-4/12 bg-gray-300 rounded-l-md">
        
      </div>
      <div className="w-8/12 pl-5 flex items-center">
        <div className="w-full pr-5">
          <div className="flex justify-between my-1">
          <div className=" h-5 w-full my-1 mr-5 bg-gray-300 rounded-lg"> </div>
            <div className="flex items-center w-24 h-5 bg-gray-300 my-1 rounded-lg"></div>
          </div>
          <div className="flex content-between my-1">
          <div className="h-4 w-4 bg-gray-300 rounded-lg mr-1"> </div>
          <div className="h-4 w-4 bg-gray-300 rounded-lg mr-1"> </div>
          <div className="h-4 w-4 bg-gray-300 rounded-lg mr-1"> </div>
          <div className="h-4 w-4 bg-gray-300 rounded-lg mr-1"> </div>
          <div className="h-4 w-4 bg-gray-300 rounded-lg mr-1"> </div>
          </div>
          <div className="flex items-center">
          <div className="flex items-center my-1">
                <div className="h-4 w-4 bg-gray-300 rounded-lg"> </div>
                <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg"> </div>
              </div>
          </div>
          <div className=" h-5 w-full my-3 bg-gray-300 rounded-lg"> </div>
          <div className="flex pt- items-center">
            <div className="w-3/4">
              <div className="flex items-center my-1">
                <div className="h-4 w-4 bg-gray-300 rounded-lg"> </div>
                <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg"> </div>
              </div>
              <div className="flex items-center my-1">
                <div className="h-4 w-4 bg-gray-300 rounded-lg"> </div>
                <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg"> </div>
              </div>

              <div className="flex items-center my-1">
                <div className="h-4 w-4 bg-gray-300 rounded-lg"> </div>
                <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg"> </div>
              </div>
            </div>

            <div className="pl-4 w-3/4">
              <div className="flex items-center my-1">
                <div className="h-4 w-4 bg-gray-300 rounded-lg"> </div>
                <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg"> </div>
              </div>
              <div className="flex items-center my-1">
                <div className="h-4 w-4 bg-gray-300 rounded-lg"> </div>
                <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg"> </div>
              </div>
              <div className="flex items-center my-1">
                <div className="h-4 w-4 bg-gray-300 rounded-lg"> </div>
                <div className="ml-1 h-3 w-24 bg-gray-300 rounded-lg"> </div>
              </div>
            </div>

            <div className="w-full flex justify-end items-end">
              <div className="flex flex-col items-center">
                <div className=" bg-gray-300 h-10 w-14 rounded-md font-bold  text-4xl text-center" ></div>
                <div className=" bg-gray-300 h-4 rounded-lg w-16 my-1  text-sm text-center" ></div>
                <div className="bg-gray-300 text-white px-2 py-1 rounded-xl h-7 w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItemSkeleton;
