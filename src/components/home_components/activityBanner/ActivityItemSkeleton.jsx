const ActivityItemSkeleton = () => {
    return (
        <div className="flex flex-col gap-1 mb-2.5">

            <div className="w-20 bg-gray-300 animate-pulse h-4 border-white rounded-full mb-1"/>
            <div className="w-full bg-gray-300 animate-pulse h-3 border-white rounded-full"/>
            <div className="w-full bg-gray-300 animate-pulse h-3 border-white rounded-full"/>
            <div className="w-24 bg-gray-300 animate-pulse h-4 border-white rounded-full mt-1"/>
        </div>
    )
}

export default ActivityItemSkeleton;