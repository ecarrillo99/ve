
const ProductListSkeleton = () => {

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-y-3 gap-x-3 items-center justify-center sm:flex-col md:flex-row ">
                <div className="flex justify-center items-center w-96 bg-gray-100 rounded-md px-3 py-1">
                    <div className="w-1/3">
                        <div className="h-16 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                    <div className="w-2/3 flex flex-col justify-center items-end text-end gap-1">
                        <label className="text-xs font-medium bg-gray-300 rounded-md w-44 h-4 animate-pulse"></label>
                        <label className="text-xs bg-gray-300 rounded-md w-36 h-4 animate-pulse"></label>
                        <label className="text-md font-semibold  bg-gray-300 rounded-md w-11 h-5 animate-pulse"></label>
                        <button className="text-xs text-white font-semibold bg-gray-300 rounded-md w-16 h-5 animate-pulse"></button>
                    </div>
                </div>
                <div className="flex justify-center items-center w-96 bg-gray-100 rounded-md px-3 py-1">
                    <div className="w-1/3">
                        <div className="h-16 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                    <div className="w-2/3 flex flex-col justify-center items-end text-end gap-1">
                        <label className="text-xs font-medium bg-gray-300 rounded-md w-44 h-4 animate-pulse"></label>
                        <label className="text-xs bg-gray-300 rounded-md w-36 h-4 animate-pulse"></label>
                        <label className="text-md font-semibold  bg-gray-300 rounded-md w-11 h-5 animate-pulse"></label>
                        <button className="text-xs text-white font-semibold bg-gray-300 rounded-md w-16 h-5 animate-pulse"></button>
                    </div>
                </div>
                <div className="flex justify-center items-center w-96 bg-gray-100 rounded-md px-3 py-1">
                    <div className="w-1/3">
                        <div className="h-16 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                    <div className="w-2/3 flex flex-col justify-center items-end text-end gap-1">
                        <label className="text-xs font-medium bg-gray-300 rounded-md w-44 h-4 animate-pulse"></label>
                        <label className="text-xs bg-gray-300 rounded-md w-36 h-4 animate-pulse"></label>
                        <label className="text-md font-semibold  bg-gray-300 rounded-md w-11 h-5 animate-pulse"></label>
                        <button className="text-xs text-white font-semibold bg-gray-300 rounded-md w-16 h-5 animate-pulse"></button>
                    </div>
                </div>
                <div className="flex justify-center items-center w-96 bg-gray-100 rounded-md px-3 py-1">
                    <div className="w-1/3">
                        <div className="h-16 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                    <div className="w-2/3 flex flex-col justify-center items-end text-end gap-1">
                        <label className="text-xs font-medium bg-gray-300 rounded-md w-44 h-4 animate-pulse"></label>
                        <label className="text-xs bg-gray-300 rounded-md w-36 h-4 animate-pulse"></label>
                        <label className="text-md font-semibold  bg-gray-300 rounded-md w-11 h-5 animate-pulse"></label>
                        <button className="text-xs text-white font-semibold bg-gray-300 rounded-md w-16 h-5 animate-pulse"></button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProductListSkeleton;