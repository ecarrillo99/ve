import Certificado from "../../models/Certificado/Certificado";
import Habitacion from "../../models/Certificado/Habitacion";
import Reserva from "../../models/Reserva";
import ReservasService from "../../services/reservas/ReservasService"

export const getBookHistory=async function(){
    try{
        var reservasService= new ReservasService();
        var bd = JSON.parse(localStorage.getItem('datos'));
        var listaReservas=[];
        const params={
            "token":bd['token'],
        }

        const res= await reservasService.getHistorialReservas(params)
        if(res.estado){
            const reservas = res["data"]["reservas"]
            for(const reserva in reservas){
                var reservaTmp = new Reserva();
                reservaTmp.Ciudad=reservas[reserva][0]["ciudad"];
                reservaTmp.Estado=reservas[reserva][0]["estado_reserva"];
                reservaTmp.FechaInicio=reservas[reserva][0]["fecha_inicio"];
                reservaTmp.FechaFin=reservas[reserva][0]["fecha_fin"];
                reservaTmp.FechaReserva=reservas[reserva][0]["fecha"];
                reservaTmp.NombreHotel=reservas[reserva][0]["establecimiento"]
                reservaTmp.FotoHotel=res.data.url.hotel+reservas[reserva][0]["foto"];
                var totalTmp=0;
                var listIDs=[];
                for(const habitacion of reservas[reserva]){
                    totalTmp=totalTmp+ parseFloat(habitacion["subtotal"]);
                    listIDs.push(habitacion["id"]);
                }
                reservaTmp.Total=totalTmp;
                reservaTmp.IDs=listIDs;
                listaReservas.push(reservaTmp);
            }
        }
        if(res.codigo==401){
            return 401;
        }
        return listaReservas;
    }catch(e){
    }
}

export const getCertificadoReserva=async function(IDs){
    try{
        var reservasService= new ReservasService();
        var bd = JSON.parse(localStorage.getItem('datos'));
        const params={
            "reserva":IDs,
            "token":bd['token'],
        }        
        const res= await reservasService.getCertificadoReserva(params);
        console.log(res);
        if(res.estado){
            const certificado= new Certificado();
            const impuestos= (parseInt(res['data'][0]['iva'])+parseInt(res['data'][0]['servicios']))/100;
            certificado.NombreSus=res['data'][0]['nombre_suscriptor'];
            certificado.CedulaSus=res['data'][0]['ci_ruc'];
            certificado.IdSus=res['data'][0]['usu_o_email'];
            certificado.Adultos=res['data'][0]['adultos'];
            certificado.Ninos=res['data'][0]['ninos'];
            certificado.FechaIn=res['data'][0]['fecha_inicio'];
            certificado.FechaOut=res['data'][0]['fecha_fin'];
            certificado.CheckIn=res['data'][0]['check_in'];
            certificado.CheckOut=res['data'][0]['check_out'];
            certificado.Estado=res['data'][0]['nombre_estado_reserva'];
            certificado.NombreEst=res['data'][0]['hotel'];
            certificado.DireccionEst=res['data'][0]['direccion_establecimiento'];
            certificado.LatitudEst=res['data'][0]['latitud'];
            certificado.LongitudEst=res['data'][0]['longitud'];
            certificado.FotoEst=res['data'][0]['foto'];
            certificado.TelefonoEst=res['data'][0]['telefono'];
            certificado.EmailEst=res['data'][0]['email'];
            certificado.WhatsappEst=res['data'][0]['whatsApp'];
            certificado.LugarEst=res['data'][0]['lugar'];
            certificado.serviciosEst=res['data'][0]['serviciosEst'];
            certificado.sistemaServEst=res['data'][0]['sistemaServEst'];
            certificado.serviciosHabEst=res['data'][0]['serviciosHabEst'];
            certificado.incluyeEst=res['data'][0]['incluyeEst'];
            certificado.noIncluyeEst=res['data'][0]['noIncluyeEst'];
            certificado.restriccionesEst=res['data'][0]['restriccionesEst'];
            var habitaciones = [];
            var cantidad=0;
            var total=0;
            var imp=0;
            var subtotal=0;
            var idRes="";
            if(IDs.length>1){
                for (let i = 0; i < IDs.length; i++) {
                    idRes = idRes + IDs[i];
                    if (i !== IDs.length - 1) {
                        idRes = idRes + ".";
                    }
                }
            }else{
                idRes=IDs[0];
            }
            
            for(const reserva of res['data']){
                const habitacion = new Habitacion();
                habitacion.Nombre=reserva["habitacion"]
                habitacion.Cantidad=parseInt(reserva["cantidad"]);
                habitacion.Subtotal=(parseInt(reserva["cantidad"])*parseInt(reserva["precio"])*(1-impuestos));
                habitacion.Impuestos=(parseInt(reserva["cantidad"])*parseInt(reserva["precio"]*impuestos)).toFixed(2);
                habitacion.Impuestos=Number(habitacion.Impuestos);
                habitacion.Total=parseInt(reserva["cantidad"])*parseInt(reserva["precio"]);
                habitacion.Acomodacion=reserva["acomodacion"];
                habitacion.AplicaEn = reserva["aplicaEn"];
                habitacion.Ninos=reserva["ninosOferta"];
                habitacion.Adultos=reserva["adultosOferta"];
                habitaciones.push(habitacion);
                cantidad=cantidad+habitacion.Cantidad;
                total=total+habitacion.Total;
                imp=imp+habitacion.Impuestos;
                subtotal=subtotal+habitacion.Subtotal;
            }
            certificado.IdRes=idRes;
            certificado.Habitaciones=habitaciones;
            certificado.CantidadHab=cantidad;
            certificado.Subtotal=subtotal;
            certificado.Impuestos=imp;
            certificado.Total=total;
            return certificado;
        }
        return null;
    }catch(e){
    }
}