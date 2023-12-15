const NewsItemSkeleton = () => {
    

    return (
        <div className="border-8 border-white">
            <div className="bg-gray-200 rounded-md h-40 flex p-1.5 animate-pulse" >
                <div className="bg-gray-300 rounded-full h-4 w-52 text-xs font-medium "></div>
            </div>
            <div className="flex justify-between items-center p-0.5">
                <div className="bg-gray-200 rounded-full h-3 w-20 text-xs font-medium "></div>
                <div className="bg-gray-200 rounded-full h-3 w-20 text-xs font-medium "></div>
                <div className="bg-gray-200 rounded-full h-3 w-20 text-xs font-medium "></div>
            </div>
        </div>
        
    )
}
export default NewsItemSkeleton;