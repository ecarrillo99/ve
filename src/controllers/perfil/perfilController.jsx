import DatosPersonales from "../../models/DatosPersonales";
import Detalle from "../../models/Detalle";
import PerfilService from "../../services/perfil/PerfilService";

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
        console.log(params);
        const res = await perfilService.modificarDatosPersonales(params);
        console.log(res);
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
        return(res.estado);
    }catch(e){
        return(false);
    }
}