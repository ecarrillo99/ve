class ResultadoBusqueda{
    constructor(
        Establecimientos,
        PrecioMinimo,
        PrecioMaximo,
        Catalogaciones,
        Locaciones,
        Servicios,
        Ordenes,
        Beneficios,
    ){
        this.Establecimientos=Establecimientos;
        this.PrecioMinimo=PrecioMinimo;
        this.PrecioMaximo=PrecioMaximo;
        this.Catalogacionesta=Catalogaciones;
        this.Locaciones=Locaciones;
        this.Servicios=Servicios;
        this.Ordenes=Ordenes;
        this.Beneficios=Beneficios
    }
}

export default ResultadoBusqueda;