import Config from "../../global/config";
import Detalle from "../../models/Detalle";
import Establecimiento from "../../models/Establecimiento";
import Filtro from "../../models/Filtro";
import Oferta from "../../models/Oferta";
import OfertaInicio from "../../models/OfertaInicio";
import ResultadoBusqueda from "../../models/ResultadoBusqueda";
import Sugerencia from "../../models/Sugerencia";
import EstablecimientoService from "../../services/establecimiento/EstablecimientoService";
import { DefaultToken } from "../web/webController";

export const getRemoteOfertas = async function () {

    var bd = JSON.parse(localStorage.getItem('datos'))
    if (bd == null) {

        return DefaultToken()
            .then((result) => {
                if (result) {
                    return _getRemoteOfertas();
                }
            });
    } else {
        return _getRemoteOfertas()
    }
}

export const getDetalleOferta = async function (idOferta) {
    var bd = JSON.parse(localStorage.getItem('datos'))
    if (bd == null) {
        return DefaultToken()
            .then((result) => {
                if (result) {
                    return _getDetalleOferta(idOferta);
                }
            });
    } else {
        return _getDetalleOferta(idOferta)
    }
}

export const getEstablacimientoDestino = async function (termino) {
    var bd = JSON.parse(localStorage.getItem('datos'))
    if (bd == null) {
        return DefaultToken()
            .then((result) => {
                if (result) {
                    return _getEstablecimientoDestino(termino);
                }
            });
    } else {
        return _getEstablecimientoDestino(termino)
    }
}

export const getResultadoFiltro = async function (filtro) {
    var bd = JSON.parse(localStorage.getItem('datos'))
    if (bd == null) {
        return DefaultToken()
            .then((result) => {
                if (result) {
                    return _getResultadoFiltro(filtro);
                }
            });
    } else {
        return _getResultadoFiltro(filtro)
    }
}

const _getRemoteOfertas = async function () {

    const listadoOfertas = [];

    try {
        const establecimientoService = new EstablecimientoService;
        var bd = JSON.parse(localStorage.getItem('datos'))
        //console.log("Datos: "+JSON.stringify(datos))
        var params = {
            "token": bd['token']
        }

        const res = await establecimientoService.getOfertasPublicidad(params);
        if (res.estado && res.codigo == 0) {   // falso
            if (Object.values(res).length > 0) {
                var establecimientos = res['data']['establecimientos']
                var ofertas = res['data']['ofertas']
                var url = res['data']['url']['oferta']
                for (const oferta of ofertas) {
                    const ofertaInicio = new OfertaInicio(
                        oferta['id'],
                        url + oferta['foto'],
                        oferta['final'],
                        oferta['ciudad'],
                        establecimientos[oferta['id_establecimiento']]['titulo'],
                        oferta['tituloOferta'],
                        oferta['noches'],
                        oferta['dias'],
                        oferta['adultos'],
                        oferta['ninos'],
                    )
                    listadoOfertas.push(ofertaInicio)
                }
                return listadoOfertas
            }
        }
    } catch (e) {
        console.log(e)
    }
}


const _getDetalleOferta = async function (idOferta) {
    const oferta = new Oferta;
    const listOfertaDetalle = [];
    const listEstablecimientoServicios = [];
    const listEstablecimientoContactos = [];
    const listEstablecimientoGaleria = [];
    try {
        const establecimientoService = new EstablecimientoService;
        var bd = JSON.parse(localStorage.getItem('datos'))
        //console.log("Datos: "+JSON.stringify(datos))
        var params = {
            "token": bd['token'],
            "id_servicio": Config.IDSERVICIO,
            "id_oferta": idOferta
        }
        const res = await establecimientoService.getDetalleOferta(params);
        console.log(res)
        if (res.estado && res.codigo == 0) {   // falso
            if (Object.values(res).length > 0) {
                var url = res['data']['url']['oferta']
                var urlLogo = res['data']['url']['logo']
                var establecimientoID = res['data']['oferta']['id_establecimiento']
                var _oferta = res['data']['oferta']
                var _ofertaDetalle = res['data']['oferta']['detalle']
                var _establecimiento = res['data']['establecimiento'][establecimientoID]
                var _serviciosEstablecimiento = res['data']['establecimiento'][establecimientoID]['servicios']
                var _contactosEstablecimiento = res['data']['establecimiento'][establecimientoID]['contactos']
                var _galeriaEstablecimiento = res['data']['establecimiento'][establecimientoID]['galeria']
                var _whatsappReservas = res['data']['configApp']['contacto_reserva']['whatsapp']
                var _emailReservas = res['data']['configApp']['contacto_reserva']['email']['contacto']
                var _telefonoReservas = res['data']['configApp']['contacto_reserva']['telefono']['contacto']
                var _celularReservas = res['data']['configApp']['contacto_reserva']['telefono_reservas']['contacto']

                
                if(_serviciosEstablecimiento!=null){
                    for (const servicioEstablecimiento of _serviciosEstablecimiento) {
                        const servicioEstablecimientoTemp = new Detalle(
                            servicioEstablecimiento['nombre'],
                            servicioEstablecimiento['valor']
                        )
                        listEstablecimientoServicios.push(servicioEstablecimientoTemp)
                    }
                }

                for (const contactoEstablecimiento of _contactosEstablecimiento) {
                    const contactoEstablecimientoTemp = new Detalle(
                        contactoEstablecimiento['nombre'],
                        contactoEstablecimiento['valor']
                    )
                    listEstablecimientoContactos.push(contactoEstablecimientoTemp)
                }

                for (const galeriaEstablecimiento of _galeriaEstablecimiento) {
                    const galeriaEstablecimientoTemp = new Detalle(
                        galeriaEstablecimiento['nombre'],
                        url + galeriaEstablecimiento['img']
                    )
                    listEstablecimientoGaleria.push(galeriaEstablecimientoTemp)
                }

                for (const ofertaDetalle of _ofertaDetalle) {
                    const ofertaDetalleTemp = new Detalle(
                        ofertaDetalle['nombre'],
                        ofertaDetalle['valor']
                    )
                    listOfertaDetalle.push(ofertaDetalleTemp)
                }

                const establecimiento = new Establecimiento(
                    _establecimiento['titulo'],
                    _establecimiento['ciudad'],
                    _establecimiento['pais'],
                    _establecimiento['idPais'],
                    _establecimiento['idCiudad'],
                    _establecimiento['edad_nino'],
                    _establecimiento['catalogacion'],
                    _establecimiento['longitud'],
                    _establecimiento['latitud'],
                    urlLogo + _establecimiento['logo'],
                    _establecimiento['direccion'],
                    listEstablecimientoServicios,
                    listEstablecimientoContactos,
                    listEstablecimientoGaleria,
                )


                oferta.Id = _oferta['id']
                oferta.IdLugar = _oferta['id_lugar']
                oferta.EstadoBusqueda = _oferta['estadoBusqueda']
                oferta.IdOferta = _oferta['id_oferta']
                oferta.Habitaciones = _oferta['habitaciones']
                oferta.IdEstablecimiento = _oferta['id_establecimiento']
                oferta.AplicaEn = _oferta['aplicaen']
                oferta.TituloOferta = _oferta['tituloOferta']
                oferta.Ninos = _oferta['ninos']
                oferta.Adultos = _oferta['adultos']
                oferta.Dias = _oferta['dias']
                oferta.Noches = _oferta['noches']
                oferta.Certificado = _oferta['impresion']
                oferta.Detalle = listOfertaDetalle
                oferta.Ganga = _oferta['ganga']
                oferta.TextoGanga = _oferta['txtGanga']
                oferta.Rack = _oferta['rack']
                oferta.Final = _oferta['final']
                oferta.Ahorro = _oferta['ahorro']
                oferta.PorcentajeAhorro= Math.round(100-(parseInt(oferta.Final)*100)/parseInt(oferta.Rack))
                oferta.Ciudad = _oferta['ciudad']
                oferta.Provincia = _oferta['provincia']
                oferta.Favorito = _oferta['fav']
                oferta.FotoPrincipal = url + _oferta['foto']
                oferta.EstiloBeneficio = _oferta['estiloBeneficio']
                oferta.IdBeneficio = _oferta['idBeneficio']
                oferta.ColorBeneficio = _oferta['colorBeneficio']
                oferta.Localidad = _oferta['localidad']
                oferta.Incluye = _oferta['incluye']
                oferta.Establecimiento = establecimiento
            }
            return oferta;
        }
    } catch (e) {
        console.log(e)
    }
}

const _getEstablecimientoDestino =async function(termino){
    const listadoSugerencias = [];

    try {
        const establecimientoService = new EstablecimientoService;
        var bd = JSON.parse(localStorage.getItem('datos'))
        //console.log("Datos: "+JSON.stringify(datos))
        var params = {
            "token": bd['token'],
            "termino":termino
        }

        const res = await establecimientoService.getEstablecimientoDestino(params);
        if (res.estado && res.codigo == 0) {   // falso
            if (Object.values(res).length > 0) {
                var sugerencias = res['data']['sugerencias']
                for (const sugerencia of sugerencias) {
                    const sugerenciaBusqueda = new Sugerencia(
                        sugerencia['id'],
                        sugerencia['titulo'],
                        sugerencia['tipo']
                    )
                    listadoSugerencias.push(sugerenciaBusqueda)
                }
                return listadoSugerencias
            }
        }
    } catch (e) {
        console.log(e)
    }
}

const _getResultadoFiltro =async function(filtro){
    const listadoOfertas = [];
    const listadoCatalogaciones=[];
    const listadoLocaciones=[];
    const listadoServicios=[];
    const listadoOrdenes=[];
    const listadoBeneficios=[];

    try {
        const establecimientoService = new EstablecimientoService;
        var bd = JSON.parse(localStorage.getItem('datos'))
        //console.log("Datos: "+JSON.stringify(datos))
        var params = {
            "token": bd['token'],
            "id":filtro.IdDestino,
            "tipo":filtro.TipoDestino,
        }
        filtro.IdDestino&&(params.id=filtro.IdDestino); 
        filtro.TipoDestino&&(params.tipo=filtro.TipoDestino);
        filtro.txtBusqueda&&(params.txtBusqueda=filtro.txtBusqueda);
        filtro.IdBeneficios&&(params.beneficios=filtro.IdBeneficios); 
        filtro.IdServicios&&(params.idservicios=filtro.IdServicios);
        filtro.Personas&&(params.personas=filtro.Personas); 
        filtro.Tiempo&&(params.tiempo=filtro.Tiempo); 
        filtro.Precio&&(params.precio=filtro.Precio); 
        filtro.Habitaciones&&(params.habitaciones=filtro.Habitaciones); 
        filtro.Ordenar&&(params.ordenar=filtro.Ordenar); 
        filtro.Fechas&&(params.fechas=filtro.Fechas); 
        filtro.Pax&&(params.pax=filtro.Pax); 

        const res = await establecimientoService.filtro(params);
        
        if (res.estado && res.codigo == 0) {   // falso
            if (Object.values(res).length > 0) {
                console.log(res)
                var establecimientos = res['data']['demo']
                var beneficios=res['data']['beneficios']
                var catalogaciones=res['data']['filtro']['catalogacion']
                var locaciones=res['data']['filtro']['locacion']
                var precioMin=res['data']['filtro']['precios'][0]['MinPrecio']
                var precioMax=res['data']['filtro']['precios'][0]['MaxPrecio']
                var servicios=res['data']['filtro']['servicios']
                var ordenes=res['data']['opcionesOrden']
                var url = res['data']['url']['oferta']
                //var ofertas = res['data']['ofertas']
                //var url = res['data']['url']['oferta']
                for (const establecimientoTmp of establecimientos) {
                    const establecimiento = new Establecimiento()
                    establecimiento.Titulo=establecimientoTmp['titulo']
                    establecimiento.Ciudad=establecimientoTmp['ciudad']
                    establecimiento.Pais=establecimientoTmp['pais']
                    establecimiento.IdPais=establecimientoTmp['idPais']
                    establecimiento.IdCiudad=establecimientoTmp['idCiudad']
                    establecimiento.EdadNino=establecimientoTmp['edad_nino']
                    establecimiento.Catalogacion=establecimientoTmp['catalogacion']
                    establecimiento.Longitud=establecimientoTmp['longitud']
                    establecimiento.Latitud=establecimientoTmp['latitud']
                    establecimiento.Logo=establecimientoTmp['logo']
                    establecimiento.Direccion=establecimientoTmp['direccion']

                    const ofertas =establecimientoTmp['ofertas']
                    for(const ofertaTmp of ofertas){
                        const oferta = new Oferta()
                        oferta.Id=ofertaTmp['id']
                        oferta.IdLugar=ofertaTmp['id_lugar']
                        oferta.EstadoBusqueda=ofertaTmp['estadoBusqueda']
                        oferta.IdOferta=ofertaTmp['id_oferta']
                        oferta.Habitaciones=ofertaTmp['habitaciones']
                        oferta.IdEstablecimiento=ofertaTmp['id_establecimiento']
                        oferta.AplicaEn=ofertaTmp['aplicaen']
                        oferta.TituloOferta=ofertaTmp['tituloOferta']
                        oferta.Ninos=ofertaTmp['ninos']
                        oferta.Adultos=ofertaTmp['adultos']
                        oferta.Dias=ofertaTmp['dias']
                        oferta.Noches=ofertaTmp['noches']
                        oferta.Ganga=ofertaTmp['ganga']
                        oferta.Rack=ofertaTmp['rack']
                        oferta.Final=ofertaTmp['final']
                        oferta.Ahorro=ofertaTmp['ahorro']
                        oferta.PorcentajeAhorro= Math.round(100-(parseInt(oferta.Final)*100)/parseInt(oferta.Rack))
                        oferta.Ciudad=ofertaTmp['ciudad']
                        oferta.Provincia=ofertaTmp['provincia']
                        oferta.Favorito=ofertaTmp['fav']
                        oferta.FotoPrincipal=url+ofertaTmp['foto']
                        oferta.EstiloBeneficio=ofertaTmp['estiloBeneficio']
                        oferta.IdBeneficio=ofertaTmp['idBeneficio']
                        oferta.ColorBeneficio=ofertaTmp['colorBeneficio']
                        oferta.Localidad=ofertaTmp['localidad']
                        oferta.Incluye=ofertaTmp['incluye']
                        oferta.Beneficio=beneficios[ofertaTmp['idBeneficio']]['nombre']
                        oferta.Establecimiento=establecimiento
                        listadoOfertas.push(oferta)
                    }
                }

                for (const catalogacionTmp of catalogaciones){
                    const catalogacion = new Detalle()
                    catalogacion.Titulo=catalogacionTmp['nombre']
                    catalogacion.Valor=catalogacionTmp['catalogacion']
                    listadoCatalogaciones.push(catalogacion)
                }

                for (const locacionKey in locaciones){
                    const locacionValue=locaciones[locacionKey]
                    const locacion = new Detalle()
                    locacion.Titulo=locacionValue['nombre']
                    locacion.Valor=locacionKey
                    locacion.Icono=locacionValue['color']
                    listadoLocaciones.push(locacion)
                }

                for (const servicioKey in servicios){
                    const servicioValue=servicios[servicioKey]
                    const servicio = new Detalle()
                    servicio.Titulo=servicioValue['nombre']
                    servicio.Valor=servicioKey
                    servicio.Icono=servicioValue['estilo']
                    listadoServicios.push(servicio)
                }

                for (const ordenKey in ordenes){
                    const ordenValue=ordenes[ordenKey]
                    const orden = new Detalle()
                    orden.Titulo=ordenValue['name']
                    orden.Valor=ordenKey
                    orden.Icono=ordenValue['text']
                    listadoOrdenes.push(orden)
                }

                for (const beneficioKey in beneficios){
                    const beneficioValue=beneficios[beneficioKey]
                    const orden = new Detalle()
                    orden.Titulo=beneficioValue['nombre']
                    orden.Valor=beneficioKey
                    orden.Icono=beneficioValue['color']
                    listadoBeneficios.push(orden)
                }

                const resultadoBusqueda = new ResultadoBusqueda(
                    listadoOfertas,
                    precioMin,
                    precioMax,
                    listadoCatalogaciones,
                    listadoLocaciones,
                    listadoServicios,
                    listadoOrdenes,
                    listadoBeneficios
                )
                return resultadoBusqueda
            }
        }
    } catch (e) {
        console.log(e)
    }
}