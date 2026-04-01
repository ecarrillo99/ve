const NewsItem = ({ noticia }) => {
    return (
        <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden bg-white mx-2 my-2">
            {/* Imagen con overlay */}
            <div 
                className="relative bg-cover bg-center h-48 overflow-hidden" 
                style={{ backgroundImage: `url(${noticia.Imagen})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm font-semibold text-white line-clamp-2 leading-tight">
                        {noticia.Titulo}
                    </h3>
                </div>
            </div>
            
            {/* Información inferior */}
            <div className="p-3 flex items-center justify-between gap-2 bg-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                        <span className="icon-[mdi--calendar-blank] text-sm"></span>
                        {noticia.Fecha.split(' ')[0]}
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="icon-[mdi--tag] text-sm"></span>
                        {noticia.Tipo}
                    </span>
                </div>
                <button 
                    className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(noticia.Url, '_blank');
                    }}
                >
                    Ver más
                    <span className="icon-[mdi--arrow-right] text-sm"></span>
                </button>
            </div>
        </div>
    )
}
export default NewsItem;