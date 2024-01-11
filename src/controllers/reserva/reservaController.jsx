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
                for(const habitacion of reservas[reserva]){
                    totalTmp=totalTmp+ parseFloat(habitacion["subtotal"]);
                }
                reservaTmp.Total=totalTmp;
                listaReservas.push(reservaTmp)
            }
        }
        if(res.codigo==401){
            return 401;
        }
        return listaReservas;
    }catch(e){
    }
}