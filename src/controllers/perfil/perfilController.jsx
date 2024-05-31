import { useEffect } from "react";
import DatosPersonales from "../../models/DatosPersonales";
import Detalle from "../../models/Detalle";
import PerfilService from "../../services/perfil/PerfilService";
import SuscripcionService from "../../services/suscripcion/SuscripcionService";

export const getProfileData = async function(){
    try{
        var perfilService= new PerfilService();
        var bd = JSON.parse(localStorage.getItem('datos'))
        const params={
            "token":bd['token']
        }
        const res = await perfilService.obtenerDatosPersonales(params);
       
        if(res["estado"]){   
            var datosPersonales = new DatosPersonales();
            var listaContactos= [];
            datosPersonales.Nombres=res["data"]["nombres"];
            datosPersonales.Codigo=res["data"]["codigo"];
            datosPersonales.Direccion=res["data"]["direccion"];
            datosPersonales.FechaNacimiento=res["data"]["fecha_nac"];
            datosPersonales.Foto=res["data"]["direccion_foto"];
            datosPersonales.IdLugar=res["data"]["id_tbl_lugar"]
            for(const contacto of res["data"]["contactos"]) {
                var contactoTmp= new Detalle();
                contactoTmp.Valor=contacto["id_tbl_tipo_contacto"];
                contactoTmp.Titulo=contacto["contacto"];
                contactoTmp.Icono=contacto["nombre_tipo_contacto"];
                listaContactos.push(contactoTmp);
            }
            datosPersonales.Contactos=listaContactos;
            return datosPersonales;
        }
        if(res.codigo==401){
            return 401;
        }

        return res.estado;
    }catch(e){
        return false;
    }
}

export const updateProfileData = async function(parametro, valor){
    try{
        var perfilService= new PerfilService();
        var bd = JSON.parse(localStorage.getItem('datos'))
        const params={
            "token":bd['token'],
            [parametro]:valor
        }
        const res = await perfilService.modificarDatosPersonales(params);
        if(res.codigo==401){
            return 401;
        }
        return res.estado;
    }catch(e){
        return false;
    }
}

export const saveRemotePhoto= async function(path){
    try{
        var perfilService= new PerfilService();
        var bd = JSON.parse(localStorage.getItem('datos'))
        const params={
            "token":bd['token'],
            "nombre":"custom"+Math.floor(Math.random() * 10).toString(),
            "img": path,
        }
        
        const res = await perfilService.actualizarFoto(params);
        if(res.estado==true){
            bd['data']['fotos']['m']=res['data']['urlImgExterno']['141x100']
            localStorage.setItem('datos', JSON.stringify(bd));
            return(res.estado);
        }
        if(res.codigo==401){
            return 401;
        }
        return(res.estado);
    }catch(e){
        return(false);
    }
}

export const changePassword= async function(oldPass, newPass){
    try{
        var perfilService= new PerfilService();
        var bd = JSON.parse(localStorage.getItem('datos'));
        const params={
            "token":bd['token'],
            "oldPass":oldPass,
            "newPass":newPass
        }

        const res = await perfilService.modificarContrasenia(params);
        if(res.estado){
            return res.estado;
        }
        if(res.codigo==401){
            return 401;
        }
        return false;
    }catch(e){

    }
}

export const changePromoCode = async function(code){
    try{
        var perfilService = new PerfilService();
        var bd = JSON.parse(localStorage.getItem('datos'));
        const params={
            "token":bd['token'],
            "nuevoCodigo":code
        }

        const res = await perfilService.actualizarCodigoPromocional(params);
        if(res.estado){
            return(res.estado);
        }
        if(res.codigo==401){
            return 401;
        }
        return(false);
    }catch{

    }
}

export const getCashbackInformation = async function( fechInicio, fechaFin, tipo){
    try{
        var suscripcionService = new SuscripcionService();
        var bd = JSON.parse(localStorage.getItem('datos'));
        const params={
            "token":bd['token'],
            "fechas":[fechInicio, fechaFin],
            "comision":tipo
        }

        const res = await suscripcionService.getInformacionCashback(params);
        
        if(res.estado){
            var total =0;
            if (res.data!=null&&res.data.red!=null){
                res.data.red.forEach((item)=>{
                    total+=parseFloat(item.valor);
                })
                
            }
            return {
                "total":total,
                "historial":res.data.red
            };
        }
    }catch{
        
    }
    return false;
}

export const setSolicitudCashback = async function(ids){
    try{
        var suscripcionService = new SuscripcionService();
        var bd = JSON.parse(localStorage.getItem('datos'));
        const params={
            "token":bd['token'],
            "ids_red":ids,
        }
        console.log(params);
        const res = await suscripcionService.setSolicitudPagoCashback(params);
        console.log(res);
        if(res.estado){
            suscripcionService.sendCorreoPagoCashback(res.data);
            return res.estado;
        }
    }catch{

    }
    return false;
}