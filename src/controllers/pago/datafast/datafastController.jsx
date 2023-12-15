import Config from '../../../global/config';
import PaymentService from '../../../services/payment/PaymentService';

const { encodeURIComponent, dateFormat, btoa } = require('../../../global/util');

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
    this.prepareRemotePayment(true, this.persona, this.product);
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
        console.log(e);
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

    }
    return {}
  }
  

  _getUrlParams() {
    const cedulaDF = (this.persona.dni.length < 10) ? this.persona.dni.trim().padStart(10, '0') : this.persona.dni.trim();
    const date = dateFormat({ d: new Date() });
    let subtotal = parseInt(this.product.precio_producto);
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
      "&customer.identificationDocType=IDCARD" +
      "&customer.identificationDocId=" + cedulaDF.substring(0, 10) +
      "&risk.parameters[USER_DATA2]=" + Config.APPNAME +
      "&cart.items[0].name=" + encodeURI(this.product.titulo) +
      "&cart.items[0].description=" + encodeURI(this.product.titulo) +
      "&cart.items[0].price=" + subtotal.toFixed(2) +
      "&cart.items[0].quantity=1" +
      "&customParameters[SHOPPER_VAL_BASE0]=0" +
      "&customParameters[SHOPPER_VAL_BASEIMP]=" + parseInt(this.product.precio_producto).toFixed(2) +
      "&customParameters[SHOPPER_VAL_IVA]=" + (parseInt(this.product.precio_producto) * 0.12).toFixed(2);

    return _param;
  }

  /*_getUrlParams(persona, product) {
    console.log(persona)
    const cedulaDF = (persona.dni.length < 10) ? persona.dni.trim().padStart(10, '0') : persona.dni.trim();
    const date = dateFormat({ d: new Date() });
    let subtotal = parseInt(product.precio_producto);
    subtotal += subtotal * 0.12;
    console.log(subtotal)

    const _param =
      "amount=" + subtotal.toFixed(2) +
      "&currency=USD" +
      "&paymentType=DB" +
      "&customer.ip=127.0.0.1" +
      "&billing.street1=" + encodeURIComponent(persona.address.trim()) +
      "&customer.givenName=" + encodeURIComponent(persona.names.trim()) +
      "&customer.merchantCustomerId=" + cedulaDF +
      "&merchantTransactionId=transaction_" + btoa(cedulaDF + date) +
      "&customer.email=" + encodeURIComponent(persona.email.trim()) +
      "&customer.identificationDocType=IDCARD" +
      "&customer.identificationDocId=" + cedulaDF.substring(0, 10) +
      "&risk.parameters[USER_DATA2]=" + Config.APPNAME +
      "&cart.items[0].name=" + encodeURIComponent(product.titulo) +
      "&cart.items[0].description=" + encodeURIComponent(product.titulo) +
      "&cart.items[0].price=" + subtotal.toFixed(2) +
      "&cart.items[0].quantity=1" +
      "&customParameters[SHOPPER_VAL_BASE0]=0" +
      "&customParameters[SHOPPER_VAL_BASEIMP]=" + product.precio_producto.toFixed(2) +
      "&customParameters[SHOPPER_VAL_IVA]=" + (product.precio_producto * 0.12).toFixed(2);
    console.log("Parámetros")
    console.log(_param);
    return _param;
  }*/

}

export default DatafastController
