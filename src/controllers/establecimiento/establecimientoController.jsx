import Config from "../../global/config";
import Contactos from "../../models/Contactos";
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
                var ofertas = res['data']['ofertas']
                console.log(ofertas)
                var url = res['data']['url']['oferta']
                for (const oferta of ofertas) {
                    const ofertaInicio = new OfertaInicio(
                        oferta['id'],
                        url + oferta['foto'],
                        oferta['final'],
                        oferta['ciudad'],
                        oferta['nombreEst'],
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
    const listEstablecimientoGaleria = [];
    const listEstablecimientoWhatsapp = [];
    const listEstablecimientoTelefonos = [];
    const listEstablecimientoEmails = [];
    const listEstablecimientoWeb = [];
    const listReservaWhatsapp = [];
    const listReservaTelefonos = [];
    const listReservaEmails = [];
    const listReservaWeb = [];
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
                var _whatsappReservas = res['data']['configApp']['contacto_reserva']['whatsapp']['contacto']
                var _emailReservas = res['data']['configApp']['contacto_reserva']['email']['contacto']
                var _telefonoReservas = res['data']['configApp']['contacto_reserva']['telefono']['contacto']
                var _celularReservas = res['data']['configApp']['contacto_reserva']['telefono_reservas']['contacto']
                
                console.log(_whatsappReservas)
                
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
                    if(contactoEstablecimiento['nombre'].includes("WhatsApp")){
                        listEstablecimientoWhatsapp.push(contactoEstablecimiento['valor'])
                    }
                    if(contactoEstablecimiento['nombre'].includes("Teléfono Reservas")){
                        listEstablecimientoTelefonos.push(contactoEstablecimiento['valor'])
                    }
                    if(contactoEstablecimiento['nombre'].includes("Email")){
                        listEstablecimientoEmails.push(contactoEstablecimiento['valor'])
                    }
                    if(contactoEstablecimiento['nombre'].includes("Página Web")){
                        listEstablecimientoWeb.push(contactoEstablecimiento['valor'])
                    }
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
                    listEstablecimientoWhatsapp,
                    listEstablecimientoEmails,
                    listEstablecimientoTelefonos,
                    listEstablecimientoWeb,
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
                oferta.FinalSinImpuestos=_oferta['sinImpuestos']
                oferta.Impuestos=_oferta['impuestos']
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
                oferta.Whatsapp=_whatsappReservas
                oferta.Telefono=_celularReservas
                oferta.Email=_emailReservas
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

const _getResultadoFiltro2 =async function(filtro){
    
    const listadoCatalogaciones=[];
    const listadoLocaciones=[];
    const listadoServicios=[];
    const listadoOrdenes=[];
    const listadoBeneficios=[];
    const listadoEstablecimientos=[];

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
        console.log(res)
        
        if (res.estado && res.codigo == 0) {   // falso
            if (Object.values(res).length > 0) {
                var establecimientos = res['data']['establecimientos']
                var centralReservas=res['data']['centralReserva']
                var beneficios=res['data']['beneficios']
                var catalogaciones=res['data']['filtro']['catalogacion']
                var locaciones=res['data']['filtro']['locacion']
                var precioMin=res['data']['filtro']['precios']['MinPrecio']
                var precioMax=res['data']['filtro']['precios']['MaxPrecio']
                var servicios=res['data']['filtro']['servicios']
                var ordenes=res['data']['opcionesOrden']
                var url = res['data']['url']['oferta']
                //var ofertas = res['data']['ofertas']
                //var url = res['data']['url']['oferta']
                for (const establecimientoTmp of establecimientos) {
                    const establecimiento = new Establecimiento()
                    const listEstablecimientoGaleria = [];
                    establecimiento.IdEstablecimiento=establecimientoTmp['id_establecimiento']
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
                    establecimiento.Foto=url+establecimientoTmp['fotoHotel']
                    
                    establecimiento.Direccion=establecimientoTmp['direccion']
                    establecimiento.Descripcion=establecimientoTmp['descripcionEst']

                    for (const galeriaEstablecimiento of establecimientoTmp['galeria']) {
                        const galeriaEstablecimientoTemp = new Detalle(
                            galeriaEstablecimiento['nombre'],
                            url + galeriaEstablecimiento['img']
                        )
                        listEstablecimientoGaleria.push(galeriaEstablecimientoTemp)
                    }
                    establecimiento.Galeria=listEstablecimientoGaleria

                    const ofertas =establecimientoTmp['ofertas']
                    const listadoOfertas = [];
                    for(const ofertaKey in ofertas){
                        const ofertaTmp=ofertas[ofertaKey]
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
                        oferta.FinalSinImpuestos=ofertaTmp['sinImpuestos']
                        oferta.Impuestos=ofertaTmp['impuestos']
                        oferta.PorcentajeAhorro= Math.round(100-(parseInt(oferta.Final)*100)/parseInt(oferta.Rack))
                        oferta.Ciudad=ofertaTmp['ciudad']
                        oferta.Provincia=ofertaTmp['provincia']
                        oferta.Favorito=ofertaTmp['fav']
                        oferta.FotoPrincipal=url+ofertaTmp['foto']
                        oferta.EstiloBeneficio=ofertaTmp['estiloBeneficio']
                        oferta.IdBeneficio=ofertaTmp['idBeneficio']
                        oferta.ColorBeneficio=ofertaTmp['colorBeneficio']
                        oferta.Localidad=ofertaTmp['localidad']
                        //oferta.Incluye=ofertaTmp['incluye']
                        oferta.Beneficio=beneficios[ofertaTmp['idBeneficio']]['nombre']
                        oferta.Acomodacion= ofertaTmp['acomodacion']

                        const incluye=ofertaTmp['incluyeOferta']
                        const listadoIncluye = [];
                        for(const incluyeKey in incluye){
                            const incluyeObj= new Detalle();
                            incluyeObj.Titulo=incluye[incluyeKey]
                            incluyeObj.Valor=incluyeKey
                            listadoIncluye.push(incluyeObj)
                        }
                        oferta.Incluye=listadoIncluye;

                        const noIncluye=ofertaTmp['noIncluyeOferta']
                        const listadoNoIncluye = [];
                        for(const noIncluyeKey in noIncluye){
                            const noIncluyeObj= new Detalle();
                            noIncluyeObj.Titulo=noIncluye[noIncluyeKey]
                            noIncluyeObj.Valor=noIncluyeKey
                            listadoNoIncluye.push(noIncluyeObj)
                        }
                        oferta.NoIncluye=listadoNoIncluye;

                        const restricciones=ofertaTmp['restriccionesOferta']
                        const listadoRestricciones = [];
                        for(const restriccionesKey in restricciones){
                            const restriccion= new Detalle();
                            restriccion.Titulo=restricciones[restriccionesKey]
                            restriccion.Valor=restriccionesKey
                            listadoRestricciones.push(restriccion)
                        }
                        oferta.Restricciones=listadoRestricciones;

                        const servicios=ofertaTmp['sistemaServiciosOferta']
                        const listadoServicios = [];
                        for(const serviciosKey in servicios){
                            const servicio= new Detalle();
                            servicio.Titulo=servicios[serviciosKey]
                            servicio.Valor=serviciosKey
                            listadoServicios.push(servicio)
                        }
                        oferta.SistemaServicios=listadoServicios;


                        listadoOfertas.push(oferta)
                    }
                    establecimiento.Ofertas=listadoOfertas;
                    
                    const listaServiciosEst=[]
                    const ofertasEst=establecimientoTmp['serviciosEst']
                    for(const servicioEstKey in ofertasEst){
                        const ofertaEst=new Detalle()
                        ofertaEst.Valor=servicioEstKey;
                        ofertaEst.Titulo=ofertasEst[servicioEstKey]['nombre'];
                        ofertaEst.Icono=ofertasEst[servicioEstKey]['estilo'];
                        listaServiciosEst.push(ofertaEst);
                    }
                    establecimiento.Servicios=listaServiciosEst;

                    const listaIncluyeEst=[]
                    const incluyeListEst=establecimientoTmp['incluyeEst']
                    for(const incluyeEstKey in incluyeListEst){
                        const incluyeEst=new Detalle()
                        incluyeEst.Valor=incluyeEstKey;
                        incluyeEst.Titulo=incluyeListEst[incluyeEstKey];
                        listaIncluyeEst.push(incluyeEst);
                    }
                    establecimiento.Incluye=listaIncluyeEst;

                    const listaNoIncluyeEst=[]
                    const noIncluyeListEst=establecimientoTmp['noIncluyeEst']
                    for(const noIncluyeEstKey in noIncluyeListEst){
                        const noIncluyeEst=new Detalle()
                        noIncluyeEst.Valor=noIncluyeEstKey;
                        noIncluyeEst.Titulo=noIncluyeListEst[noIncluyeEstKey];
                        listaNoIncluyeEst.push(noIncluyeEst);
                    }
                    establecimiento.NoIncluye=listaNoIncluyeEst;

                    const listaRestriccionesEst=[]
                    const restriccionesEst=establecimientoTmp['restriccionesEst']
                    for(const restriccionEstKey in restriccionesEst){
                        const restriccionEst=new Detalle()
                        restriccionEst.Valor=restriccionEstKey;
                        restriccionEst.Titulo=restriccionesEst[restriccionEstKey];
                        listaRestriccionesEst.push(restriccionEst);
                    }
                    establecimiento.Restricciones=listaRestriccionesEst;

                    const listaSistemasServiciosEst=[]
                    const SistemasServicosEst=establecimientoTmp['sistemaServEst']
                    for(const sistemaServicioEstKey in SistemasServicosEst){
                        const sistemaServicioEst=new Detalle()
                        sistemaServicioEst.Valor=sistemaServicioEstKey;
                        sistemaServicioEst.Titulo=SistemasServicosEst[sistemaServicioEstKey];
                        listaSistemasServiciosEst.push(sistemaServicioEst);
                    }
                    establecimiento.SistemaServicios=listaSistemasServiciosEst;
                    
                    const contactosEstablecimiento=establecimientoTmp['contactos']
                    const listaWhatsappEst=[]
                    const listaTelefonosEst=[]
                    const listaEmailsEst=[]
                    const listaWebEst=[]
                    for (const contactoEstablecimiento of contactosEstablecimiento) {
                        if(contactoEstablecimiento['nombre'].includes("WhatsApp")){
                            listaWhatsappEst.push(contactoEstablecimiento['valor'])
                        }
                        if(contactoEstablecimiento['nombre'].includes("Teléfono Reservas")){
                            listaTelefonosEst.push(contactoEstablecimiento['valor'])
                        }
                        if(contactoEstablecimiento['nombre'].includes("Email")){
                            listaEmailsEst.push(contactoEstablecimiento['valor'])
                        }
                        if(contactoEstablecimiento['nombre'].includes("Página Web")){
                            listaWebEst.push(contactoEstablecimiento['valor'])
                        }
                    }
                    const contactosEst= new Contactos()
                    contactosEst.Whatsapp=listaWhatsappEst
                    contactosEst.Telefono=listaTelefonosEst
                    contactosEst.Email=listaEmailsEst
                    contactosEst.Web=listaWebEst
                    establecimiento.Contactos=contactosEst

                    
                    const contactosCR= new Contactos()
                    contactosCR.Whatsapp=centralReservas['whatsapp']['contacto']
                    contactosCR.Telefono=centralReservas['telefono_reservas']['contacto']
                    contactosCR.Email=centralReservas['email']['contacto']
                    establecimiento.ContactosCentral=contactosCR


                    const recomendados =establecimientoTmp['recomendados']
                    const listadoRecomendados = [];
                    for(const recomendadoTmp of recomendados){
                        const ofertaTmp=establecimientoTmp['ofertas'][recomendadoTmp['id']]
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
                        oferta.FinalSinImpuestos=ofertaTmp['sinImpuestos']
                        oferta.Impuestos=ofertaTmp['impuestos']
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
                        oferta.NumOfertas=recomendadoTmp['numOfertas']
                        oferta.Beneficio=beneficios[ofertaTmp['idBeneficio']]['nombre']
                        oferta.Acomodacion= ofertaTmp['acomodacion']

                        const incluye=ofertaTmp['incluyeOferta']
                        const listadoIncluye = [];
                        for(const incluyeKey in incluye){
                            const incluyeObj= new Detalle();
                            incluyeObj.Titulo=incluye[incluyeKey]
                            incluyeObj.Valor=incluyeKey
                            listadoIncluye.push(incluyeObj)
                        }
                        oferta.Incluye=listadoIncluye;

                        const noIncluye=ofertaTmp['noIncluyeOferta']
                        const listadoNoIncluye = [];
                        for(const noIncluyeKey in noIncluye){
                            const noIncluyeObj= new Detalle();
                            noIncluyeObj.Titulo=noIncluye[noIncluyeKey]
                            noIncluyeObj.Valor=noIncluyeKey
                            listadoNoIncluye.push(noIncluyeObj)
                        }
                        oferta.NoIncluye=listadoNoIncluye;

                        const restricciones=ofertaTmp['restriccionesOferta']
                        const listadoRestricciones = [];
                        for(const restriccionesKey in restricciones){
                            const restriccion= new Detalle();
                            restriccion.Titulo=restricciones[restriccionesKey]
                            restriccion.Valor=restriccionesKey
                            listadoRestricciones.push(restriccion)
                        }
                        oferta.Restricciones=listadoRestricciones;

                        const servicios=ofertaTmp['sistemaServiciosOferta']
                        const listadoServicios = [];
                        for(const serviciosKey in servicios){
                            const servicio= new Detalle();
                            servicio.Titulo=servicios[serviciosKey]
                            servicio.Valor=serviciosKey
                            listadoServicios.push(servicio)
                        }
                        oferta.SistemaServicios=listadoServicios;
                        listadoRecomendados.push(oferta)
                    }
                    establecimiento.Recomendados=listadoRecomendados;
                    establecimiento.PrecioSinImpuestos=establecimientoTmp['precioRecomendadoSinImp'];
                    establecimiento.PrecioConImpuestos=establecimientoTmp['precioRecomendadoFinal']
                    establecimiento.Rack=establecimientoTmp['precioRecomendadoRack'];
                    establecimiento.Impuestos=establecimientoTmp['precioRecomendadoImpuestos'];
                    listadoEstablecimientos.push(establecimiento);
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
                    listadoEstablecimientos,
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


const _getResultadoFiltro = async function (filtro) {
    try {
        const establecimientoService = new EstablecimientoService();
        const bd = JSON.parse(localStorage.getItem('datos'));
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
        console.log("hola", res)
        if (res.estado && res.codigo === 0) {
            //const { data, opcionesOrden, beneficios, url } = res.data;
            //console.log(res.data)
            const {
                establecimientos,
                centralReserva,
                opcionesOrden,
                beneficios,
                url,
                filtro: { catalogacion, locacion, precios, servicios },
            } = res.data;

            const listadoCatalogaciones = createDetalles(catalogacion, 'nombre', 'catalogacion');
            const listadoLocaciones = createDetalles(locacion, 'nombre', 'color', 'Icono');
            const listadoServicios = createDetalles(servicios, 'nombre', 'estilo', 'Icono');
            const listadoOrdenes = createDetalles(opcionesOrden, 'name', 'text', 'Icono');
            const listadoBeneficios = createDetalles(beneficios, 'nombre', 'color', 'Icono');

            const resultadoBusqueda = new ResultadoBusqueda(
                createEstablecimientos(establecimientos, url.oferta, beneficios, centralReserva),
                precios.MinPrecio,
                precios.MaxPrecio,
                listadoCatalogaciones,
                listadoLocaciones,
                listadoServicios,
                listadoOrdenes,
                listadoBeneficios
            );
            
            return resultadoBusqueda;
        }
    } catch (e) {
        console.error(e);
    }
};

// Función para crear una lista de objetos Detalle a partir de un objeto
function createDetalles(data, titleKey, valueKey, iconKey) {
    if(data!=null){
        return Object.values(data).map((item) => {
            const detalle = new Detalle();
            detalle.Titulo = item[titleKey];
            detalle.Valor = item[valueKey];
            if (iconKey && item[iconKey]) {
                detalle.Icono = item[iconKey];
            }
            return detalle;
        });
    }
}

// Función para crear una lista de objetos Establecimiento a partir de un array
function createEstablecimientos(establecimientos, url, beneficios, centralReservas) {
    console.log(url);

    // Función para mapear propiedades de oferta
    function mapPropiedadesOferta(ofertaTmp) {
        const oferta = new Oferta();
        const propiedadesOfertaObj = ['Id', 'IdLugar', 'EstadoBusqueda', 'IdOferta', 'Habitaciones', 'IdEstablecimiento', 'AplicaEn', 'TituloOferta', 'Ninos', 'Adultos', 'Dias', 'Noches', 'Ganga', 'Rack', 'Final', 'Ahorro', 'FinalSinImpuestos', 'Impuestos', 'Ciudad', 'Provincia', 'Favorito', 'FotoPrincipal', 'EstiloBeneficio', 'IdBeneficio', 'ColorBeneficio', 'Localidad', 'Acomodacion', 'Incluye', 'NoIncluye', 'Restricciones', 'SistemaServicios', 'NumOfertas'];
        const propiedadesOferta = ['id', 'id_lugar', 'estadoBusqueda', 'id_oferta', 'habitaciones', 'id_establecimiento', 'aplicaen', 'tituloOferta', 'ninos', 'adultos', 'dias', 'noches', 'ganga', 'rack', 'final', 'ahorro', 'sinImpuestos', 'impuestos', 'ciudad', 'provincia', 'fav', 'foto', 'estiloBeneficio', 'idBeneficio', 'colorBeneficio', 'localidad', 'acomodacion', 'incluyeOferta', 'noIncluyeOferta', 'restriccionesOferta', 'sistemaServiciosOferta', 'numOfertas'];

        propiedadesOferta.forEach((prop, index) => oferta[propiedadesOfertaObj[index]] = ofertaTmp[prop]);

        // Porcentaje de ahorro
        oferta.PorcentajeAhorro = Math.round(100 - (parseInt(oferta.Final) * 100) / parseInt(oferta.Rack));

        // Beneficio
        oferta.Beneficio = beneficios[ofertaTmp.idBeneficio].nombre;

        // Detalles
        const propiedadesObj=['Incluye', 'NoIncluye', 'Restricciones', 'SistemaServicios'];
        ['incluyeOferta', 'noIncluyeOferta', 'restriccionesOferta', 'sistemaServiciosOferta'].forEach((detalle, index) => {
            ofertaTmp[detalle]&&(oferta[propiedadesObj[index]] = Object.entries(ofertaTmp[detalle]).map(([key, value]) => new Detalle(value, key, "")));
        });

        return oferta;
    }

    return establecimientos.map(establecimientoTmp => {
        console.log("Establecimiento", establecimientoTmp)
        const establecimiento = new Establecimiento();

        // Mapeo de propiedades
        const propiedadesObj = ['IdEstablecimiento', 'Titulo', 'Ciudad', 'Pais', 'IdPais', 'IdCiudad', 'EdadNino', 'Catalogacion', 'Longitud', 'Latitud', 'Logo', 'Direccion', 'Descripcion'];
        const propiedades = ['id_establecimiento', 'titulo', 'ciudad', 'pais', 'idPais', 'idCiudad', 'edad_nino', 'catalogacion', 'longitud', 'latitud', 'logo', 'direccion', 'descripcionEst'];
        propiedades.forEach((prop, index) => establecimiento[propiedadesObj[index]] = establecimientoTmp[prop]);

        // Foto
        establecimiento.Foto = url + establecimientoTmp.fotoHotel;

        // Galería
        establecimiento.Galeria = establecimientoTmp.galeria.map(g => new Detalle(g.nombre, url + g.img));

        // Ofertas
        establecimiento.Ofertas = Object.values(establecimientoTmp.ofertas).map(mapPropiedadesOferta);

        // Servicios
        const propiedadesServ=['Servicios', 'Incluye', 'NoIncluye', 'Restricciones', 'SistemaServicios'];
        ['serviciosEst', 'incluyeEst', 'noIncluyeEst', 'restriccionesEst', 'sistemaServEst'].forEach((servicio, index) => {
            if(servicio=='serviciosEst'){
                establecimientoTmp[servicio]&&(establecimiento[propiedadesServ[index]] = Object.entries(establecimientoTmp[servicio]).map(([key, value]) => new Detalle(value.nombre, key, value.estilo)));
            }
            else{
                establecimientoTmp[servicio]&&(establecimiento[propiedadesServ[index]] = Object.entries(establecimientoTmp[servicio]).map(([key, value]) => new Detalle(value, key)));
            }
        });

        // Contactos Establecimiento
        const listaContactos = {
            Whatsapp: [],
            Telefono: [],
            Email: [],
            Web: []
        };

        establecimientoTmp.contactos.forEach(contacto => {
            if (contacto.nombre.includes("WhatsApp")) listaContactos.Whatsapp.push(contacto.valor);
            if (contacto.nombre.includes("Teléfono Reservas")) listaContactos.Telefono.push(contacto.valor);
            if (contacto.nombre.includes("Email")) listaContactos.Email.push(contacto.valor);
            if (contacto.nombre.includes("Página Web")) listaContactos.Web.push(contacto.valor);
        });

        establecimiento.Contactos = new Contactos(listaContactos.Whatsapp, listaContactos.Email,  listaContactos.Telefono,listaContactos.Web);

        // Contactos Central Reservas
        const contactosCR=new Contactos();
        contactosCR.Whatsapp=centralReservas.whatsapp.contacto;
        contactosCR.Telefono=centralReservas.telefono_reservas.contacto;
        contactosCR.Email=centralReservas.email.contacto;

        establecimiento.ContactosCentral = contactosCR;

        // Recomendados
        establecimiento.Recomendados = establecimientoTmp.recomendados.map(recomendadoTmp => {
            const ofertaTmp = establecimientoTmp.ofertas[recomendadoTmp.id];
            ofertaTmp.numOfertas=recomendadoTmp.numOfertas;
            return mapPropiedadesOferta(ofertaTmp);
        });

        // Precio y otros datos
        establecimiento.PrecioSinImpuestos = establecimientoTmp.precioRecomendadoSinImp;
        establecimiento.PrecioConImpuestos = establecimientoTmp.precioRecomendadoFinal;
        establecimiento.Rack = establecimientoTmp.precioRecomendadoRack;
        establecimiento.Impuestos = establecimientoTmp.precioRecomendadoImpuestos;

        return establecimiento;
    });
}
