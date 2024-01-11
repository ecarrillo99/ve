class Filtro {
    constructor(
        IdDestino,
        TipoDestino,
        IdBeneficios,
        IdEstablecimiento,
        IdServicios,
        Personas,
        Tiempo,
        Precio,
        Habitaciones,
        Ordenar,
        Pax,
        Fechas,
        txtBusqueda,
    ){
        this.IdDestino=IdDestino;
        this.TipoDestino=TipoDestino;
        this.IdEstablecimiento=IdEstablecimiento;
        this.IdBeneficios=IdBeneficios;
        this.IdServicios=IdServicios;
        this.Personas=Personas;
        this.Tiempo=Tiempo;
        this.Precio=Precio;
        this.Habitaciones=Habitaciones;
        this.Ordenar=Ordenar;
        this.Pax=Pax;
        this.Fechas=Fechas;
        this.txtBusqueda=txtBusqueda;
    }
}

export default Filtro;