import Config from "../../global/config";
import Detalle from "../../models/Detalle";
import Establecimiento from "../../models/Establecimiento";
import Noticia from "../../models/Noticia";
import ReservaReciente from "../../models/ReservaReciente";
import InfoService from "../../services/info/InfoService"

export const getNews = async function (){
    try{
        var bd = JSON.parse(localStorage.getItem('datos'))
        const infoService= new InfoService();
        const listaNoticias=[];
        const params={
            "token": bd['token'],
            "npag": 24,
            "pag":1,
            "id_metodo": Config.IDMETODO,
        }
        
        const res= await infoService.obtenerNoticias(params)
        if(res['estado']&&res['codigo']==0){
            for(const noticia of res['data']){
                const noticiaTmp= new Noticia();
                noticiaTmp.Id=noticia['id_tbl_noticia']
                noticiaTmp.Autor=noticia['nombreAutor']
                noticiaTmp.Fecha=noticia['fecha']
                noticiaTmp.Imagen=noticia['img']['300x1000']
                noticiaTmp.Titulo=noticia['titulo']
                noticiaTmp.Tipo=noticia['tipo']
                noticiaTmp.Url=noticia['url']
                listaNoticias.push(noticiaTmp)
            }
        }
        return listaNoticias;
    }catch{

    }
}

export const getHotels = async function (){
    try{
        var bd = JSON.parse(localStorage.getItem('datos'))
        const infoService= new InfoService();
        const listaHoteles=[];
        const params={
            "token": bd['token'],
            "id_empresa": Config.IDEMPRESA,
        }
        
        const res= await infoService.obtenerImágenesHoteles(params)
        if(res['estado']&&res['codigo']==0){
            for(const hotel of res['data']){
                const hotelTmp= new Detalle();
                hotelTmp.Titulo=hotel['establecimiento']
                hotelTmp.Icono=hotel['logoHotel']
                hotelTmp.Valor=hotel['oferta_mejor_precio']
                listaHoteles.push(hotelTmp)
            }
        }
        return listaHoteles;
    }catch{

    }
}

export const getReserves = async function (){
    try{
        var bd = JSON.parse(localStorage.getItem('datos'))
        const infoService= new InfoService();
        const listaRecientes=[];
        const params={
            "token": bd['token'],
        }
        
        const res= await infoService.obtenerActividadReservas(params)
        if(res['estado']&&res['codigo']==0){
            for(const reciente of res['data']){
                const recienteTmp = new ReservaReciente();
                recienteTmp.Costo=reciente['costo']
                recienteTmp.Establecimiento=reciente['establecimiento']
                recienteTmp.LugarEstablecimiento= reciente['lugarEstablecimiento']
                recienteTmp.LugarSuscriptor=reciente['lugarSuscriptor']
                listaRecientes.push(recienteTmp)
            }
        }
        return listaRecientes;
    }catch{

    }
}

export const getDestinoExpress = async function (lat, long){
    try{
        var bd = JSON.parse(localStorage.getItem('datos'))
        const infoService= new InfoService();
        const listaDestinos=[];
        const params={
            "token": bd['token'],
            "latitud":lat,
            "longitud":long,
        }
        
        const res= await infoService.obtenerDestinoExpress(params)
        if(res['estado']&&res['codigo']==0){
            console.log(res);
            for(const destino of res['data']){
                const destinoTmp = new Detalle();
                destinoTmp.Icono=destino['imagen']
                destinoTmp.Valor=destino['distancia']
                destinoTmp.Titulo= destino['destino_express']
                listaDestinos.push(destinoTmp)
            }
        }
        return listaDestinos;
    }catch{

    }
}