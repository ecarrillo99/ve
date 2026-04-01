const NewsItemSkeleton = () => {
    return (
        <div className="rounded-lg overflow-hidden bg-white mx-2 my-2 animate-pulse">
            {/* Skeleton para la imagen */}
            <div className="bg-gray-200 h-48 relative">
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <div className="bg-gray-300 rounded h-4 w-3/4"></div>
                    <div className="bg-gray-300 rounded h-4 w-1/2"></div>
                </div>
            </div>
            
            {/* Skeleton para la información inferior */}
            <div className="p-3 bg-gray-50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                    <div className="bg-gray-200 rounded-full h-3 w-20"></div>
                    <div className="bg-gray-200 rounded-full h-3 w-24"></div>
                </div>
                <div className="bg-gray-200 rounded-full h-3 w-16"></div>
            </div>
        </div>
    )
}
export default NewsItemSkeleton;