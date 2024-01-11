import Icons from "../../global/icons";

const FavoriteItemSkeleton=({favorito})=>{

    const icons=new Icons();

    return (
        <div className="border rounded-lg">
            <div className="h-48 rounded-t-lg w-full object-cover bg-gray-200 animate-pulse"/>
            <div className="px-3 py-3 border-b overflow-hidden">
            <div className="h-5 w-44 rounded-md bg-gray-200 animate-pulse mb-1"/>
                <div className="flex items-center space-x-0.5">
                    <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"/>
                    <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"/>
                    <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"/>
                    <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"/>
                    <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"/>
                </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-3 border-b">
                <div className="h-5 w-5 rounded-full bg-slate-200 animate-pulse"/>
                <div className="h-3 w-20 rounded-md bg-slate-200 animate-pulse"/>
            </div>
            <div className="px-3 py-3">
                <button className="bg-gray-200 animate-pulse w-full h-6 rounded-md  text-white text-sm"></button>
            </div>
        </div>
    );
}
export default FavoriteItemSkeleton;