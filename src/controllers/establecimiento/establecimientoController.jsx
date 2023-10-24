import Config from "../../global/config";
import Detalle from "../../models/Detalle";
import Establecimiento from "../../models/Establecimiento";
import Oferta from "../../models/Oferta";
import OfertaInicio from "../../models/OfertaInicio";
import EstablecimientoService from "../../services/establecimiento/EstablecimientoService";
import { DefaultToken } from "../web/webController";

export const getRemoteOfertas = async function () {
    var bd = JSON.parse(sessionStorage.getItem('datos'))
    if (bd == null) {
        try {
            DefaultToken("192.168.0.1")
                .then((result) => {
                    if (result) {
                        console.log("Token generado ahora")
                        return _getRemoteOfertas();
                    }
                })

        } catch (error) {
            console.error("Error:", error);
        }
    }else{
        console.log("Token ya generado anteriormente")
        return _getRemoteOfertas();
    }
}


export const getDetalleOferta = async function (idOferta) {
    const oferta = new Oferta;
    const listOfertaDetalle = [];
    const listEstablecimientoServicios = [];
    const listEstablecimientoContactos = [];
    const listEstablecimientoGaleria = [];
    try {
        const establecimientoService = new EstablecimientoService;
        var bd = JSON.parse(sessionStorage.getItem('datos'))
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
                var _whatsappReservas = res['data']['configApp']['contacto_reserva']['whatsapp']
                var _emailReservas = res['data']['configApp']['contacto_reserva']['email']['contacto']
                var _telefonoReservas = res['data']['configApp']['contacto_reserva']['telefono']['contacto']
                var _celularReservas = res['data']['configApp']['contacto_reserva']['telefono_reservas']['contacto']

                for (const servicioEstablecimiento of _serviciosEstablecimiento) {
                    const servicioEstablecimientoTemp = new Detalle(
                        servicioEstablecimiento['nombre'],
                        servicioEstablecimiento['valor']
                    )
                    listEstablecimientoServicios.push(servicioEstablecimientoTemp)
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

const _getRemoteOfertas = async function () {
    const listadoOfertas = [];
    
    try {
        const establecimientoService = new EstablecimientoService;
        var bd = JSON.parse(sessionStorage.getItem('datos'))
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
                console.log(listadoOfertas)
                return listadoOfertas
            }
        }
    } catch (e) {
        console.log(e)
    }
}