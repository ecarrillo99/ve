export function formatearFecha({fecha, nombreDia=false, dia=false, mes=false, anio=false}) {
    var date = fecha instanceof Date ? fecha : new Date(fecha);
    var options = {};
    if(nombreDia){
        options["weekday"]='short';
    }
    if(dia){
        options["day"]='2-digit';
    }
    if(mes){
        options["month"]='short';
    }
    if(anio){
        options["year"]='numeric';
    }
    const formattedDate = date.toLocaleDateString('es-ES', options);
    return formattedDate;
};

export function calcularNoches(fechaInicio, fechaFin) {
    // Convertir ambas fechas a objetos Date si no lo están
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    // Calcular la diferencia en milisegundos entre las dos fechas
    const diferenciaEnMilisegundos = fin.getTime() - inicio.getTime();
    // Calcular el número de noches redondeando hacia arriba la diferencia en días
    const numeroDeNoches = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    return numeroDeNoches==1?"1 noche":(numeroDeNoches+ " noches");
}

export function generarPersonas(pax, opcion=0, hab=1) {
    if(opcion==0){
        return (pax.adultos==1?"1 adulto":(pax.adultos+" adultos"))+(pax.ninos!=0?(pax.ninos==1?", 1 niño":", "+pax.ninos+" niños"):"");
    }else{
        return ((hab==1?"1 habitación":hab+" habitaciones")+" • "+(pax.adultos==1?"1 adulto":(pax.adultos+" adultos")))+(pax.ninos!=0?(pax.ninos==1?" • 1 niño":" • "+pax.ninos+" niños"):" • Sin niños");
    }
}

export function fechaToString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for single-digit months
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
  
    return `${year}-${month}-${day}`;
  }