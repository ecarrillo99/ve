class Filtro {
    constructor(
        IdDestino,
        TipoDestino,
        IdBeneficios,
        IdServicios,
        Personas,
        Tiempo,
        Precio,
        Habitaciones,
        Ordenar
    ){
        this.IdDestino=IdDestino;
        this.TipoDestino=TipoDestino;
        this.IdBeneficios=IdBeneficios;
        this.IdServicios=IdServicios;
        this.Personas=Personas;
        this.Tiempo=Tiempo;
        this.Precio=Precio;
        this.Habitaciones=Habitaciones;
        this.Ordenar=Ordenar;
    }
}

export default Filtro;