import React, { useEffect, useState } from 'react';
import { PDFViewer, Document, Page, View, Text, StyleSheet, Font, Image, Svg } from '@react-pdf/renderer';
import montserratRegular from '../../global/fonts/Montserrat/Montserrat-Regular.ttf';
import montserratBold from '../../global/fonts/Montserrat/Montserrat-Bold.ttf';
import Icons from '../../global/icons';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


Font.register({ family: 'Montserrat', src: montserratRegular });
Font.register({ family: 'Montserrat-Bold', src: montserratBold });
// Define los estilos de Tailwind CSS convertidos a objetos de estilo de react-pdf/renderer
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      border: 2,
      borderRadius:10,
      borderColor: '#96c121'
    },
    row: {
        flexDirection: 'row',
        alignItems:'center'
    },
    column: {
        flexGrow: 1,
        width: '50%',
      },
    title: {
      fontSize: 12,
      textAlign: 'left',
      fontFamily: 'Montserrat-Bold',
      fontWeight: 'black',
      color:'#4d4d4d'
    },
    paragraph: {
      fontSize: 8,
      textAlign: 'left',
      fontFamily: 'Montserrat',
      color:'#4d4d4d'
    },
    logoContainer: {
      width: '100%', 
      aspectRatio: 1,
      height: 50,
      alignSelf: 'flex-start', 
    },
    logo: {
      width: 75, 
      height: '100%', 
      objectFit: 'contain', 
    },
    imageContainer: {
      width: '34%', 
      aspectRatio: 1,
      height: 60,
      alignSelf: 'flex-start', 
      marginRight:4
    },
    image: {
      width: "100%", 
      height: '100%', 
      objectFit: 'cover', 
    }
});

const generateStaticMapImageUrl = (latitude, longitude) => {
  const apiKey = 'AIzaSyAwURL3bmODrFj1G0RUpgVT6DlGvlkhQzo'; // Reemplaza 'TU_API_KEY' con tu propia clave de la API de Google Maps
  const size = '1800x160'; // Tamaño de la imagen del mapa
  const markers = `${latitude},${longitude}`; // Marcador en las coordenadas dadas
  const apiUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${markers}&zoom=16&size=${size}&markers=${markers}&key=${apiKey}`;
  return apiUrl;
};


const Certificado = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reserva = {};

  for (const [key, value] of searchParams) {
    if (value.startsWith('[') && value.endsWith(']')) {
      reserva[key] = JSON.parse(value);
    } else {
      reserva[key] = value;
    }
  }
  const latitude = reserva.LatitudEst; 
  const longitude = reserva.LongitudEst; 
  const staticMapImageUrl = generateStaticMapImageUrl(latitude, longitude);
  const formatDate = (date, option) => {
        var options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
      if(option=="weekday"){
         options = { weekday: 'long'};
      }
      if(option=="day"){
         options = {day: '2-digit'};
      }
      if(option=="month"){
         options = { month: 'long'};
      }
      const formattedDate = date.toLocaleDateString('es-ES', options);
      return formattedDate;
  };

  console.log(reserva);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <PDFViewer className="w-full h-full">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column}>
                      <View style={styles.logoContainer}>
                        <Image src="./img/logo_verde.png" style={styles.logo} />
                      </View>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Certificado de {reserva.Estado!="Confirmada"?"Pre-Reserva":"Reserva"}</Text>
                        <View style={styles.row}>
                          <Text style={{...styles.paragraph, ...{fontFamily:'Montserrat-Bold'}}}>
                            NÚMERO DE RESERVA:
                          </Text>
                          <Text style={
                            {
                              ...styles.paragraph, 
                              ...{
                                  fontFamily:'Montserrat-Bold', 
                                  color:'#96c121',
                                  marginLeft:4
                                }
                            }}>
                            {reserva.IdRes}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={
                            {
                              ...styles.paragraph, 
                              ...{
                                fontFamily:'Montserrat-Bold'
                              }
                            }}>
                            ID SUSCRIPTOR:
                          </Text>
                          <Text style={
                            {
                              ...styles.paragraph, 
                              ...{
                                  fontFamily:'Montserrat-Bold', 
                                  color:'#96c121',
                                  marginLeft:4
                                }
                            }}>
                            {reserva.IdSus}
                          </Text>
                        </View>
                        <View style={styles.row}>
                          <Text style={{...styles.paragraph, ...{fontFamily:'Montserrat-Bold'}}}>
                            NOMBRE SUSCRIPTOR:
                          </Text>
                          <Text style={
                            {
                              ...styles.paragraph, 
                              ...{
                                  fontFamily:'Montserrat-Bold', 
                                  color:'#96c121',
                                  marginLeft:4
                                }
                            }}>
                            {reserva.NombreSus}
                          </Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.row, borderBottom:0.5, paddingBottom:0, borderColor:'#D0D0D0'}}>
                  <View style={styles.column}>
                    <View style={{...styles.row, height:63}}>
                      <View style={styles.imageContainer}>
                        <Image style={styles.image} src={reserva.FotoEst}/>
                      </View>
                      <View style={{...styles.column, width:'100%', }}>
                        <Text style={{...styles.paragraph, fontFamily:'Montserrat-Bold', fontSize:10 }}>
                          {reserva.NombreEst}
                        </Text>
                        <Text style={{...styles.paragraph }}>
                          Direccion: {reserva.DireccionEst}
                        </Text>
                        <Text style={{...styles.paragraph }}>
                          {reserva.LugarEst}
                        </Text>
                        {
                          reserva.TelefonoEst!=null&&reserva.TelefonoEst!=""?
                          (
                            <Text style={{...styles.paragraph }}>
                              Teléfono: {reserva.TelefonoEst}
                            </Text>
                          ):(
                            <></>
                          )
                        }
                        {
                          reserva.WhatsappEst!=null&&reserva.WhatsappEst!=""?
                          (
                            <Text style={{...styles.paragraph }}>
                              Whatsapp: {reserva.WhatsappEst}
                            </Text>
                          ):(
                            <></>
                          )
                        }
                        {
                          reserva.EmailEst!=null&&reserva.EmailEst!=""?
                          (
                            <Text style={{...styles.paragraph }}>
                              Email: {reserva.EmailEst}
                            </Text>
                          ):(
                            <></>
                          )
                        }
                      </View>
                    </View>
                  </View>
                  <View style={styles.column}>
                    <View style={styles.row}>
                      <View style={{...styles.column, width:'33.33%', borderLeft:0.5, borderColor:'#D0D0D0'}}>
                        <Text style={{...styles.paragraph, textAlign:'center', fontFamily:'Montserrat-Bold', fontSize:6 }}>
                          ENTRADA
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:20 }}>
                          {formatDate(new Date(reserva.FechaIn), "day")}
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center' }}>
                          {formatDate(new Date(reserva.FechaIn), "month").toUpperCase()}
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                        {formatDate(new Date(reserva.FechaIn), "weekday")}
                        </Text>
                        <Image src="./img/clock.png" style={{height:10 , width: '100%', objectFit: 'contain'}} />
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                          desde {reserva.CheckIn}
                        </Text>
                      </View>
                      <View style={{...styles.column, width:'33.33%', borderLeft:0.5, borderColor:'#D0D0D0'}}>
                        <Text style={{...styles.paragraph, textAlign:'center', fontFamily:'Montserrat-Bold', fontSize:6, }}>
                          SALIDA
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:20 }}>
                        {formatDate(new Date(reserva.FechaOut), "day")}
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center' }}>
                        {formatDate(new Date(reserva.FechaOut), "month").toUpperCase()}
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                        {formatDate(new Date(reserva.FechaOut), "weekday")}
                        </Text>
                        <Image src="./img/clock.png" style={{height:10 , width: '100%', objectFit: 'contain'}} />
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                          hasta {reserva.CheckOut}
                        </Text>
                      </View>
                      <View style={{...styles.column, width:'33.33%', height:79,  borderLeft:0.5, borderColor:'#D0D0D0'}}>
                        <Text style={{...styles.paragraph, textAlign:'center', fontFamily:'Montserrat-Bold', fontSize:6}}>
                          HAB. / NOCHES
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:20 }}>
                          {reserva.CantidadHab} / {Math.round((new Date(reserva.FechaOut) - new Date(reserva.FechaIn)) / (1000 * 60 * 60 * 24))}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.row}>
                    <Text style={{...styles.paragraph, fontSize:13, }}>
                      Precio
                    </Text>
                </View>
                {reserva.Habitaciones.map((item, index) => (
                  <View key={index} style={styles.row}>
                    <View style={styles.column}>
                      <Text style={{ ...styles.paragraph, fontSize: 8 }}>
                        {item.Nombre}
                      </Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={{ ...styles.paragraph, textAlign: 'right', fontSize: 8 }}>
                        ${item.Subtotal.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
                <View style={{...styles.row, marginTop:5}}>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, fontSize:13 }}>
                      Precio Subtotal
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, textAlign:'right', fontSize:13 }}>
                      ${Number(reserva.Subtotal).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Cargos adicionales
                  </Text>
                </View>
                <View style={{...styles.row, width:'85%'}}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    El precio que aparece abajo es una aproximación que puede incluir cargos según la ocupación máxima. Puede incluir los impuestos locales o los cargos que haya configurado el alojamiento.
                  </Text>
                </View>
                <View style={{...styles.row, marginTop:5}}>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, fontSize:8 }}>
                      Impuestos / Servicios
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, textAlign:'right', fontSize:8 }}>
                      ${Number(reserva.Impuestos).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, fontSize:8, fontFamily:'Montserrat-Bold' }}>
                      Precio final
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, textAlign:'right', fontSize:8, fontFamily:'Montserrat-Bold' }}>
                      ${reserva.Total}.00
                    </Text>
                  </View>
                </View>
                <View style={{...styles.row}}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    (Impuestos incluidos)
                  </Text>
                </View>
                <View style={{...styles.row, marginTop:5}}>
                  <Text style={{...styles.paragraph, fontSize:10, }}>
                    El precio final que se muestra es el importe que pagarás al alojamiento
                  </Text>
                </View>
                <View style={{...styles.row}}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    VisitaEcuador.com central de reservas adiciona un fee por reserva realizada en sus canales.
                  </Text>
                </View>
                <View style={{...styles.row, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3}}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    La entidad emisora de su tarjeta puede aplicar un cargo por transacción internacional.
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, }}>
                    Información sobre el pago
                  </Text>
                </View>
                <View style={{...styles.row, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3}}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Hotel Polito gestiona todos los pagos.
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, }}>
                    Información adicional
                  </Text>
                </View>
                <View style={{...styles.row, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3, marginBottom:3}}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Los suplementos adicionales (como cama supletoria) no están incluidos en el precio total. Si no te presentas o cancelas la reserva, es posible que el alojamiento te cargue los impuestos correspondientes. Recuerda leer la información importante que aparece a continuación, ya que puede contener datos relevantes que no se mencionan aqui.
                  </Text>
                </View>
                <View style={{...styles.row, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3}}>
                  <Image src={staticMapImageUrl} style={{ width: '100%', height: '120px' }} />
                </View>
                {
                  reserva.Habitaciones.map((item, index)=>(
                    <>
                    <View style={{ ...styles.row, paddingTop: 3 }}>
                      <Text style={{ ...styles.paragraph, fontSize: 10, fontFamily: 'Montserrat-Bold' }}>
                        {item.Nombre}
                      </Text>
                    </View>
                    <View style={{ ...styles.row, paddingTop: 3, paddingBottom: 1 }}>
                      <Text style={{ ...styles.paragraph, fontSize: 8 }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold' }}>Incluye:</Text> {item.Incluye}
                      </Text>
                    </View>
                    <View style={{ ...styles.row, paddingTop: 1, borderBottom: 0.5, borderColor: '#D0D0D0', paddingBottom: 3 }}>
                      <Text style={{ ...styles.paragraph, fontSize: 8 }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold' }}>Acomodación:</Text> {item.Acomodacion}
                      </Text>
                    </View>
                    </>
                  ))
                }
                <View style={{ ...styles.row, paddingTop: 30, paddingBottom: 1 }}>
                  <Text style={{ ...styles.paragraph, fontSize: 6, fontFamily:  'Montserrat-Bold'}}>
                    Términos y condiciones:
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1 }}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                    - Para hacer la reserva sugerimos comunicarse con 5 días de anticipación al lugar de destino y realizar el pago respectivo.
                  </Text>
                  - Los beneficiarios deberán cancelar la suma del paq
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1 }}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                  - Los beneficiarios deberán cancelar la suma del paquete promocional previo a la utilización del mismo. Por ningún concepto cancele esta cantidad a otra persona o empresa que no sea la presentadora del servicio que está descrito en este certificado.
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1}}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                  - Los beneficiarios aceptan cancelar los gastos extras como: comida, bebida, fee de emisión y otros.
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1}}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                  - Este Certificado deslinda de toda responsabilidad a VisitaEcuador.com, el cumplimiento y alcance del mismo estará a cargo del hospedaje, por tal razón no nos hacemos responsables por el servicio brindado en el establecimiento hotelero.
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1}}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                  - Este Certificado es transferible hasta 1er Grado de Consanguineidad (Padres e hijos hasta 21 años, solteros).
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1}}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                  - Aplica no show. Aplica restricciones.
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1}}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                  - Horario de atención al cliente de la Central de Reservas de VisitaEcuador.com: Lunes a Viernes 08h30-13h00 y 14h30-18h00.
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, paddingBottom: 1}}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                  Este certificado es válido según los terminos especificados en el mismo.
                  </Text>
                </View>
                <View style={{ ...styles.row, paddingTop: 1, borderBottom: 0.5, borderColor: '#D0D0D0', paddingBottom: 3}}>
                  <Text style={{ ...styles.paragraph, fontSize: 6 }}>
                    <Text style={{ fontFamily: 'Montserrat-Bold' }}>PBX:</Text> +593 7 413 4500 :: 
                    <Text style={{ fontFamily: 'Montserrat-Bold' }}>DIR.:</Text> Calle del Batán 5-317 y Esmeraldas :: Cuenca ::
                    <Text style={{ fontFamily: 'Montserrat-Bold' }}>VisitaEcuador.com</Text> 
                  </Text>
                </View>
                <View style={styles.row}>
                  <View style={{...styles.column,width:"88%" }}>
                    <View style={styles.row}>
                      <Image src="./img/whatsapp_cert.png" style={{height:40 , width: 40, objectFit: 'contain'}}></Image>
                      <View style={styles.column}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize:8 }}>CENTRAL DE RESERVAS:</Text> 
                        <Text style={{ fontFamily: 'Montserrat', fontSize:7 }}>+593 98 064 4467</Text> 
                        <Text style={{ fontFamily: 'Montserrat', fontSize:7 }}>+593 98 185 0436</Text> 
                        <Text style={{ fontFamily: 'Montserrat', fontSize:7 }}>+593 98 626 3432</Text> 
                      </View>
                    </View>
                  </View>
                  <View style={styles.column}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize:8 }}>CON EL AUSPICIO DE:</Text> 
                    <Image src="./img/patrocinadores.png" style={{height:26 , width: 200, objectFit: 'contain'}}></Image>
                  </View>
                </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default Certificado;
