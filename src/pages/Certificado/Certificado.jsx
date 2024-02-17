import React from 'react';
import { PDFViewer, Document, Page, View, Text, StyleSheet, Font, Image, Svg } from '@react-pdf/renderer';
import montserratRegular from '../../global/fonts/Montserrat/Montserrat-Regular.ttf';
import montserratBold from '../../global/fonts/Montserrat/Montserrat-Bold.ttf';
import Icons from '../../global/icons';


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
      backgroundColor: 'blue'
    },
    image: {
      width: 60, 
      height: '100%', 
      objectFit: 'contain', 
    }
});

const generateStaticMapImageUrl = (latitude, longitude) => {
  const apiKey = 'AIzaSyAwURL3bmODrFj1G0RUpgVT6DlGvlkhQzo'; // Reemplaza 'TU_API_KEY' con tu propia clave de la API de Google Maps
  const size = '1800x160'; // Tamaño de la imagen del mapa
  const markers = `${latitude},${longitude}`; // Marcador en las coordenadas dadas
  const apiUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${markers}&zoom=14&size=${size}&markers=${markers}&key=${apiKey}`;
  return apiUrl;
};
const latitude = 37.7749; // Latitud de San Francisco, por ejemplo
const longitude = -122.4194; 
const staticMapImageUrl = generateStaticMapImageUrl(latitude, longitude);
const Certificado = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <PDFViewer className="w-full h-full">
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column}>
                      <View style={styles.logoContainer}>
                        <Image src="/img/logo_verde.png" style={styles.logo} />
                      </View>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Certificado de Pre-Reserva</Text>
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
                            000000000
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
                            77123
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
                            EDISSON CARRILLO GONZAGA
                          </Text>
                        </View>
                    </View>
                </View>
                <View style={{...styles.row, borderBottom:0.5, paddingBottom:0, borderColor:'#D0D0D0'}}>
                  <View style={styles.column}>
                    <View style={{...styles.row, height:63}}>
                      <View style={styles.imageContainer}>
                        <Image style={styles.image} src="/img/logo_verde.png"/>
                      </View>
                      <View style={{...styles.column, width:'100%', }}>
                        <Text style={{...styles.paragraph, fontFamily:'Montserrat-Bold', fontSize:10 }}>
                          Hotel Polito
                        </Text>
                        <Text style={{...styles.paragraph }}>
                          Direccion: Panamericana Norte 12 km, 010150
                        </Text>
                        <Text style={{...styles.paragraph }}>
                          Cuenca, Ecuador
                        </Text>
                        <Text style={{...styles.paragraph }}>
                          Teléfono: +593999999999
                        </Text>
                        <Text style={{...styles.paragraph }}>
                          Email: +593999999999
                        </Text>
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
                          10
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center' }}>
                          FEBRERO
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                          Sábado
                        </Text>
                        <Image src="/img/clock.png" style={{height:10 , width: '100%', objectFit: 'contain'}} />
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                          de 14:00 a 00:00
                        </Text>
                      </View>
                      <View style={{...styles.column, width:'33.33%', borderLeft:0.5, borderColor:'#D0D0D0'}}>
                        <Text style={{...styles.paragraph, textAlign:'center', fontFamily:'Montserrat-Bold', fontSize:6, }}>
                          SALIDA
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:20 }}>
                          11
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center' }}>
                          FEBRERO
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                          Domingo
                        </Text>
                        <Image src="/img/clock.png" style={{height:10 , width: '100%', objectFit: 'contain'}} />
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:7 }}>
                          de 12:00 a 12:00
                        </Text>
                      </View>
                      <View style={{...styles.column, width:'33.33%', height:79,  borderLeft:0.5, borderColor:'#D0D0D0'}}>
                        <Text style={{...styles.paragraph, textAlign:'center', fontFamily:'Montserrat-Bold', fontSize:6}}>
                          HAB. / NOCHES
                        </Text>
                        <Text style={{...styles.paragraph, textAlign:'center', fontSize:20 }}>
                          2 / 1
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
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, fontSize:8 }}>
                      1 Habitacion
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, textAlign:'right', fontSize:8 }}>
                      $44.00
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, fontSize:8 }}>
                      1 Habitacion
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, textAlign:'right', fontSize:8 }}>
                      $192.00
                    </Text>
                  </View>
                </View>
                <View style={{...styles.row, marginTop:5}}>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, fontSize:13 }}>
                      Precio Subtotal
                    </Text>
                  </View>
                  <View style={styles.column}>
                    <Text style={{...styles.paragraph, textAlign:'right', fontSize:13 }}>
                      $192.00
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
                      $32.00
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
                      $268.00
                    </Text>
                  </View>
                </View>
                <View style={{...styles.row}}>
                  <Text style={{...styles.paragraph, fontSize:10, }}>
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
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3}}>
                  <Text style={{...styles.paragraph, fontSize:10, fontFamily:'Montserrat-Bold' }}>
                    Habitación Deluxe 1 Cama
                  </Text>
                </View>
                <View style={{...styles.row, paddingTop:3, borderBottom:0.5, borderColor: '#D0D0D0', paddingBottom:3 }}>
                  <Text style={{...styles.paragraph, fontSize:8, }}>
                    Incluye:
                  </Text>
                </View>
                
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}

export default Certificado;
