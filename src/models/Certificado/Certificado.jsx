class Certificado{
    constructor(
        IdRes,
        NombreSus,
        CedulaSus,
        IdSus,
        Adultos,
        Ninos,
        FechaIn,
        FechaOut,
        CheckIn,
        CheckOut,
        Estado,
        NombreEst,
        DireccionEst,
        LugarEst,
        LatitudEst,
        LongitudEst,
        FotoEst,
        TelefonoEst,
        EmailEst,
        WhatsappEst,
        Subtotal,
        Impuestos,
        Total,
        Habitaciones,
        CantidadHab,
        serviciosEst,
        restriccionesEst,
        sistemaServEst,
        serviciosHabEst,
        incluyeEst,
        noIncluyeEst,
    ){
        this.IdRes=IdRes;
        this.NombreSus=NombreSus;
        this.CedulaSus=CedulaSus;
        this.IdSus=IdSus;
        this.Adultos=Adultos;
        this.Ninos=Ninos;
        this.CantidadHab=CantidadHab;
        this.FechaIn=FechaIn;
        this.FechaIn=FechaOut;
        this.CheckIn=CheckIn;
        this.CheckOut=CheckOut;
        this.Estado=Estado;
        this.NombreEst=NombreEst;
        this.DireccionEst=DireccionEst;
        this.LugarEst=LugarEst;
        this.LatitudEst=LatitudEst;
        this.LongitudEst=LongitudEst;
        this.FotoEst=FotoEst;
        this.TelefonoEst=TelefonoEst;
        this.EmailEst=EmailEst;
        this.WhatsappEst=WhatsappEst;
        this.Subtotal=Subtotal;
        this.Impuestos=Impuestos;
        this.Total=Total;
        this.Habitaciones=Habitaciones;
        this.serviciosEst=serviciosEst;
        this.restriccionesEst=restriccionesEst;
        this.sistemaServEst=sistemaServEst;
        this.serviciosHabEst=serviciosHabEst;
        this.incluyeEst=incluyeEst;
        this.noIncluyeEst=noIncluyeEst;
    }
}
export default Certificado;