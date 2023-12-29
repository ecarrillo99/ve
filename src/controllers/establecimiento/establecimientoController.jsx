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
        var params = {
            "token": bd['token']
        }

        const res = await establecimientoService.getOfertasPublicidad(params);
        console.log("Banners");
            console.log(res);
        if (res.estado && res.codigo == 0) { 
            
            if (Object.values(res).length > 0) {
                var ofertas = res['data']['ofertas']
                var establecimientos=res['data']['establecimientos']
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
                        establecimientos[oferta['id_establecimiento']]['catalogacion']
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
                    const sugerenciaBusqueda = new Sugerencia();

                    sugerenciaBusqueda.Id=sugerencia['id'];
                    sugerenciaBusqueda.Titulo=sugerencia['titulo'];
                    sugerenciaBusqueda.Lugar=sugerencia['descripcion'];
                    sugerenciaBusqueda.Tipo=sugerencia['tipo'];

                    listadoSugerencias.push(sugerenciaBusqueda)
                }
                return listadoSugerencias
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

        console.log(params)
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
        if (res.estado && res.codigo === 0) {
            //const { data, opcionesOrden, beneficios, url } = res.data;
            console.log(res.data)
            const {
                establecimientos,
                centralReserva,
                opcionesOrden,
                beneficios,
                url,
                filtro: { catalogacion, locacion, precios, servicios, serviciosHabEst, incluyeEst },
            } = res.data;

            const listadoCatalogaciones = createDetalles(catalogacion, 'nombre', 'catalogacion');
            const listadoLocaciones = createDetalles(locacion, 'nombre', 'color');
            const listadoServicios = createDetalles(servicios, 'nombre', 'estilo');
            const listadoServiciosHab = createDetalles(serviciosHabEst,  'nombre', 'estilo');
            const listadoIncluye = createDetalles(incluyeEst, 'nombre', 'Icono');
            const listadoOrdenes = createDetalles(opcionesOrden, 'name', 'text');
            const listadoBeneficios = createDetalles(beneficios, 'nombre',  'color');

            const resultadoBusqueda = new ResultadoBusqueda(
                createEstablecimientos(establecimientos, url.oferta, beneficios, centralReserva),
                precios.MinPrecio,
                precios.MaxPrecio,
                listadoCatalogaciones,
                listadoLocaciones,
                listadoServicios,
                listadoServiciosHab,
                listadoIncluye,
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
function createDetalles2(data, titleKey, valueKey, iconKey) {
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

function createDetalles(data, titleKey, iconKey) {
    const listDetalles = [];
    if (data) {
        for (const item in data) {
            if (data.hasOwnProperty(item)) {
                const detalle = new Detalle();
                detalle.Titulo = data[item][titleKey] || data[item];
                detalle.Valor = item;
                detalle.Icono = data[item][iconKey];
                listDetalles.push(detalle);
            }
        }
    }
    return listDetalles;
}

// Función para crear una lista de objetos Establecimiento a partir de un array
function createEstablecimientos(establecimientos, url, beneficios, centralReservas) {

    // Función para mapear propiedades de oferta
    function mapPropiedadesOferta(ofertaTmp) {
        const oferta = new Oferta();
        const propiedadesOfertaObj = ['Id', 'IdLugar', 'EstadoBusqueda', 'IdOferta', 'Habitaciones', 'IdEstablecimiento', 'AplicaEn', 'TituloOferta', 'Ninos', 'Adultos', 'Dias', 'Noches', 'Ganga', 'Rack', 'Final', 'Ahorro', 'FinalSinImpuestos', 'Impuestos', 'Ciudad', 'Provincia', 'Favorito', 'FotoPrincipal', 'EstiloBeneficio', 'IdBeneficio', 'ColorBeneficio', 'Localidad', 'Acomodacion', 'Incluye', 'NoIncluye', 'Restricciones', 'SistemaServicios', 'NumOfertas', 'Base'];
        const propiedadesOferta = ['id', 'id_lugar', 'estadoBusqueda', 'id_oferta', 'habitaciones', 'id_establecimiento', 'aplicaen', 'tituloOferta', 'ninos', 'adultos', 'dias', 'noches', 'ganga', 'rack', 'final', 'ahorro', 'sinImpuestos', 'impuestos', 'ciudad', 'provincia', 'fav', 'foto', 'estiloBeneficio', 'idBeneficio', 'colorBeneficio', 'localidad', 'acomodacion', 'incluyeOferta', 'noIncluyeOferta', 'restriccionesOferta', 'sistemaServiciosOferta', 'numOfertas', 'base'];

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
        const establecimiento = new Establecimiento();

        // Mapeo de propiedades
        const propiedadesObj = ['IdEstablecimiento', 'Titulo', 'Ciudad', 'Pais', 'IdPais', 'IdCiudad', 'EdadNino', 'Catalogacion', 'Longitud', 'Latitud', 'Logo', 'Direccion', 'Descripcion', 'Favorito'];
        const propiedades = ['id_establecimiento', 'titulo', 'ciudad', 'pais', 'idPais', 'idCiudad', 'edad_nino', 'catalogacion', 'longitud', 'latitud', 'logo', 'direccion', 'descripcionEst', 'favorito'];
        propiedades.forEach((prop, index) => establecimiento[propiedadesObj[index]] = establecimientoTmp[prop]);

        // Foto
        establecimiento.Foto = url + establecimientoTmp.fotoHotel;

        // Galería
        establecimiento.Galeria = establecimientoTmp.galeria.map(g => new Detalle(g.nombre, url + g.img));

        // Ofertas
        establecimiento.Ofertas = Object.values(establecimientoTmp.ofertas).map(mapPropiedadesOferta);

        // Servicios
        const propiedadesServ=['Servicios', 'Incluye', 'NoIncluye', 'Restricciones', 'SistemaServicios', 'ServiciosHab'];
        ['serviciosEst', 'incluyeEst', 'noIncluyeEst', 'restriccionesEst', 'sistemaServEst', 'serviciosHabEst'].forEach((servicio, index) => {
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

        //Calificacion
        establecimiento.Calificacion= new Detalle(
            establecimientoTmp.comentarios.calificacion,
            establecimientoTmp.comentarios.cantidadComentarios,
            establecimientoTmp.comentarios.puntuacion,
        )

        return establecimiento;
    });
}

export const createReservation = async function (id, adultos, ninos, cantidad, inicio, fin, edades){
    try{
        const establecimientoService = new EstablecimientoService();
        var bd = JSON.parse(localStorage.getItem('datos'))
        var params = {
            "token": bd['token'],
            "id_oferta":id,
            "adultos":adultos,
            "ninos":ninos, 
            "cantidad_ofertas":cantidad,
            "fecha_inicio":inicio,
            "fecha_fin":fin,
            "edad_ninos":edades
        }
        const res = await establecimientoService.reserva(params);
        if (res.estado && res.codigo === 0) {
            return res.estado;
        }
    }catch(e){

    }
    return false;
}

export const changeFavoritoStatus = async function (idEst, estado){
    try{
        const establecimientoService = new EstablecimientoService();
        var bd = JSON.parse(localStorage.getItem('datos'))
        var params={
            "token": bd['token'],
            "id_establecimiento":idEst,
            "favorito": estado?1:2
        }
        const res= await establecimientoService.cambiarEstadoFavorito(params);
        console.log(res)
        if (res.estado && res.codigo === 0) {
            return res.estado;
        }

    }catch{
        
    }
}