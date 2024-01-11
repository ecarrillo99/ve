const historyItemSkeleton =({reserva})=>{
    return (
        <div className="flex flex-col">
        <div className="bg-gray-200 h-6 w-32 rounded-full animate-pulse"></div>
        <div className="h-2"></div>
        <div className="bg-gray-200 h-5 w-40 rounded-full animate-pulse"></div>
        <div className="flex border mt-3 shadow-lg rounded-lg p-4 gap-4">
            <div className="w-1/12 aspect-square relative">
                <div className="absolute inset-0 overflow-hidden rounded-xl bg-gray-200 animate-pulse">
                  
                </div>
            </div>
            <div className="w-10/12 flex flex-col justify-between">
                <div className="bg-gray-200 h-5 w-32 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-52 rounded-full animate-pulse"></div>
                <div className="bg-gray-200 h-3 w-16 rounded-full animate-pulse"></div>
            </div>
            <div className="w-1/12 flex justify-end">
            <div className="bg-gray-200 h-5 w-14 rounded-full animate-pulse"></div>
            </div>
        </div>
        </div>
    )
}

export default historyItemSkeleton;