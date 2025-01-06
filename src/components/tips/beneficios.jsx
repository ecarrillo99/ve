
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Beneficios = ({suscribirse}) => {
    const [expanded, setExpanded] = useState([false, false, false, false, false, false]);
    const navigation = useNavigate();
    const toggleExpand = (index) => {
        setExpanded(prevExpanded => {
          const newExpanded = [...prevExpanded]; // Hacer una copia del array original
          newExpanded[index] = !newExpanded[index]; // Modificar el valor específico
          return newExpanded; // Establecer el nuevo estado
        });
      };

    return (
        <>
            <div className='mx-auto max-w-6xl sm:px-6 lg:px-8 '  id="conocemas">
                <div className='flex items-center h-14 md:h-14 bg-greenVE-600 relative mx-3 rounded-t-2xl text-white text-xs md:text-2xl justify-between gap-6'>
                    <div className='flex items-center justify-center w-full font-semibold'>
                        <h1 >PREGUNTAS Y TIPS</h1>
                    </div>
                </div>
                <div>
                    <div className='flex flex-wrap mx-3 rounded-b-2xl shadow-2xl'>
                        <div className="flex items-start w-1/2 p-4 gap-2">
                            <img className="h-12 md:h-15" src="https://visitaecuador.com/img/web/ve.svg"  />
                            <div className='flex flex-col'>
                                <h2 className="text-sm md:text-xl font-bold mb-2">VisitaEcuador.com</h2>
                                <div className={`overflow-hidden text-xs md:text-sm ${expanded[0] ? 'block' : 'h-12'}`}>
                                    <p className='mb-2'>Plataforma de hospedaje nacional con ahorros de hasta un 50% en tarifas especiales</p>
                                    <p className='font-bold mb-1'>Beneficios para suscriptores:</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Ahorro de hasta un 50% en tarifas Rack.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Beneficios compartidos con familiares/amigos en presencia del suscriptor.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Reservas ilimitadas en todo el país.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Reservas directas con hoteles.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Reservas a través de un canal centralizado exclusivo.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Acceso al sistema de ofertas de VisitaEcuador.com.</p>
                                </div>
                                <button className="flex text-greenVE-500  items-start text-xs md:text-base" onClick={()=>toggleExpand(0)}>
                                    {expanded[0] ? 'Ver menos..▲' : 'Ver más..▼'}
                                </button>
                            </div>                        
                        </div>

                        <div className="flex items-start w-1/2 p-4 gap-2">
                            <img className="h-12 md:h-15" src="https://visitaecuador.com/img/web/disney.svg"  />
                            <div className='flex flex-col'>
                                <h2 className="text-sm md:text-xl font-bold mb-2">Disney Concierge</h2>
                                <div className={`overflow-hidden text-xs md:text-sm ${expanded[2] ? 'block' : 'h-12'}`}>
                                    <p className='mb-2'>Asistencia Personalizada Disney Destinations Concierge.</p>
                                    <p className='mt-1 mb-1'>Plataforma exclusiva y autorizada por Disney para servicios concierge. A través de WhatsApp, un Magic Planner brindará asesoría personalizada en español antes, durante y después del viaje en Disney.</p>
                                    <p className='mt-1 mb-1'>Nuestro equipo se comunica contigo y tus familiares mediante WhatsApp o reuniones en Zoom para entender tus necesidades y preferencias. El Magic Planner te brinda asesoría completa para tu experiencia Disney en todos los continentes, incluyendo:</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Cotización de pasajes y hoteles.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Compra de entradas para parques y paquetes turísticos.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Reservas en cruceros y actividades dentro de los parques.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Recomendaciones sobre dónde comer y comprar, cubriendo todas tus necesidades en el destino de manera directa.</p>                                   
                                </div>
                                <button className="flex text-greenVE-500  items-start text-xs md:text-base" onClick={()=>toggleExpand(2)}>
                                    {expanded[2] ? 'Ver menos..▲' : 'Ver más..▼'}
                                </button>
                            </div>                        
                        </div>
                        <div className="flex items-start w-1/2 p-4 gap-2">
                            <img className="h-12 md:h-15" src="https://visitaecuador.com/img/web/mascota.svg"  />
                            <div className='flex flex-col'>
                                <h2 className="text-sm md:text-xl font-bold mb-2">Hospedaje mascota por viaje</h2>
                                <div className={`overflow-hidden text-xs md:text-sm ${expanded[3] ? 'block' : 'h-16 md:h-11'}`}>                                   
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Asistencia veterinaria telefónica en todo el Ecuador, sin restricciones.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Servicio de hotel para mascotas durante el viaje del cliente, hasta 4 días una vez por año. Válido en Guayaquil, Quito y Cuenca.</p>                                    
                                </div>
                                <button className="flex text-greenVE-500  items-start text-xs md:text-base" onClick={()=>toggleExpand(3)}>
                                    {expanded[3] ? 'Ver menos..▲' : 'Ver más..▼'}
                                </button>
                            </div>                        
                        </div>
                        <div className="flex items-start w-1/2 p-4 gap-2">
                            <img className="h-12 md:h-15" src="https://visitaecuador.com/img/web/infotour.svg"  />
                            <div className='flex flex-col'>
                                <h2 className="text-sm md:text-xl font-bold mb-2">InfoTour</h2>
                                <div className={`overflow-hidden text-xs md:text-sm ${expanded[5] ? 'block' : 'h-12 md:h-10'}`}>                                   
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Guía turística para actividades dentro del país.</p>
                                    <p><label className='text-greenVE-500  font-bold'>✔</label> Comunicación vía WhatsApp con los municipios y operación turística de cada ciudad para recomendaciones de actividades en el destino seleccionado..</p>                                    
                                </div>
                                <button className="flex text-greenVE-500  items-start text-xs md:text-base" onClick={()=>toggleExpand(5)}>
                                    {expanded[5] ? 'Ver menos..▲' : 'Ver más..▼'}
                                </button>
                            </div>                              
                        </div>            
                    </div>
                </div>                
            </div>
        </>
    );
};

export default Beneficios;


