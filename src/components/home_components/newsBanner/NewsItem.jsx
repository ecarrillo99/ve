const NewsItem = ({ noticia }) => {
    return (
        <div className="border-8 border-white">
            <div className="bg-cover bg-gray-200 rounded-md h-40 flex p-1.5" style={{ backgroundImage: "url("+noticia.Imagen+")", boxShadow: 'inset 0px 40px 20px rgba(0, 0, 0, 0.7)' }}>
                <label className="text-xs font-medium text-greenVE-200">{noticia.Titulo}</label>
            </div>
            <div className="flex justify-between">
                <label className="text-xxs"><b>Fecha: </b>{noticia.Fecha.split(' ')[0]}</label>
                <label className="text-xxs font-semibold"><b>Categoria: </b>{noticia.Tipo}</label>
                <button className="text-xxs text-blue-600" onClick={()=>window.open(noticia.Url)}>Ver más</button>
            </div>
        </div>
    )
}
export default NewsItem;