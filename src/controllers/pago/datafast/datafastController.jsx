import Config from '../../../global/config';
import PaymentService from '../../../services/payment/PaymentService';

import { dateFormat, btoa } from '../../../global/util';

class DatafastController {
  constructor({persona, product} ) {
    this.result = null;
    this.persona = persona;
    this.product = product;
    this._resultTrans = {};
    this.reload = false;
    this._paymentService = new PaymentService();

    this.get_resultTrans = () => this._resultTrans;
    this.set_resultTrans = (value) => {
      this._resultTrans = value;
    };

    this.setInitParams(this.persona, this.product);
    //this.prepareRemotePayment(true, this.persona, this.product);
  }

  static params({ persona, product }) {
    return new DatafastController({ persona, product });
  }

  setInitParams(persona, product) {
    this.persona = persona;
    this.product = product;
  }
  
  async prepareRemotePayment(reload, persona, product) {
    if (reload) {
      this.setInitParams(persona, product);
      try {
        const _res = await this._paymentService.prepareDF(this._getUrlParams());
  
        //this.set_resultTrans(_res);
        this.reload = true;
        return _res
      } catch (e) {
        
      }
    } else {
      this.reload = false;
    }
  }

  async checkRemotePaymentV3(id){
    
    try{
      
        const res= await new Promise(
            response=>setTimeout(()=>{
                response(this._paymentService.verificarDFV3(id));
            }, 5000)
        );
        return res;
    }catch(e){
        console.log(e);
    }
    return {}
  }
  

  _getUrlParams() {
    const cedulaDF = (this.persona.dni.length < 10) ? this.persona.dni.trim().padStart(10, '0') : this.persona.dni.trim();
    const date = dateFormat({ d: new Date() });
    let subtotal = parseFloat(this.product.precio_producto);
    subtotal += subtotal * 0.12;

    const _param =
      "amount=" + subtotal.toFixed(2) +
      "&currency=USD" +
      "&paymentType=DB" +
      "&customer.ip=127.0.0.1" +
      "&billing.street1=" + encodeURI(this.persona.address.trim()) +
      "&customer.givenName=" + encodeURI(this.persona.names.trim()) +
      "&customer.merchantCustomerId=" + cedulaDF +
      "&merchantTransactionId=transaction_" + btoa(cedulaDF + date) +
      "&customer.email=" + encodeURI(this.persona.email.trim()) +
      "&customer.phone=" + encodeURI(this.persona.phone.trim()) +
      "&customer.identificationDocType=IDCARD" +
      "&customer.identificationDocId=" + cedulaDF.substring(0, 10) +
      "&risk.parameters[USER_DATA2]=" + Config.APPNAME +
      "&cart.items[0].name=" + encodeURI(this.product.titulo) +
      "&cart.items[0].description=" + encodeURI(this.product.titulo) +
      "&cart.items[0].price=" + subtotal.toFixed(2) +
      "&cart.items[0].quantity=1" +
      "&customParameters[SHOPPER_VAL_BASE0]=0" +
      "&customParameters[id_codigo_promocional]=" + encodeURI(this.product.id_codigo_promocional) +
      "&customParameters[beneficio_cantidad_tiempo]=" + encodeURI(this.product.beneficio_cantidad_tiempo) +
      "&customParameters[beneficio_tipo_tiempo]=" + encodeURI(this.product.beneficio_tipo_tiempo) +
      "&customParameters[id_usuario_vendedor]=" + encodeURI(this.product.id_usuario_vendedor) +
      "&customParameters[id_suscripcion_vendedor]=" + encodeURI(this.product.id_suscripcion_vendedor) +
      "&customParameters[id_producto]=" + encodeURI(this.product.id_producto) +
      "&customParameters[id_lista_precio_producto]=" + encodeURI(this.product.id_lista_precio_producto) +
      "&customParameters[id_prod_suscripcion]=" + encodeURI(this.product.id_prod_suscripcion) +
      "&customParameters[id_tipo_canal]=" + encodeURI(this.product.id_tipo_canal) +
      "&customParameters[tipo_pago]=" + encodeURI(this.product.tipo_pago) +
      "&customParameters[tipo_pago_boton]=" + encodeURI(this.product.tipo_pago_boton) +
      "&customParameters[id_diferido]=" + encodeURI(this.product.id_diferido) +
      "&customParameters[SHOPPER_VAL_BASEIMP]=" + parseFloat(this.product.precio_producto).toFixed(2) +
      "&customParameters[SHOPPER_VAL_IVA]=" + (parseFloat(this.product.precio_producto) * 0.12).toFixed(2);
    return _param;
  }

}

export default DatafastController
