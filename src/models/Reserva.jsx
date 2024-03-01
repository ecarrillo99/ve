class Reserva{
    constructor(
        Ciudad,
        FechaInicio,
        FechaFin,
        FechaReserva,
        NombreHotel,
        FotoHotel,
        Total,
        Estado,
        IDs,
    ){
        this.Ciudad=Ciudad;
        this.FechaInicio=FechaInicio;
        this.FechaFin=FechaFin;
        this.NombreHotel=NombreHotel;
        this.FechaReserva=FechaReserva;
        this.FotoHotel=FotoHotel;
        this.Total=Total;
        this.Estado=Estado;
        this.IDs=IDs;
    }
}

export default Reserva;