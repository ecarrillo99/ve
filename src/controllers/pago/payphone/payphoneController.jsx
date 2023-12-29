import Config from "../../../global/config";
import { btoa, dateFormat } from "../../../global/util";

class PayPhoneController {
    getParamsPrepareTransaction=(product)=> {
        const date = new Date();
        const formattedDate = dateFormat(date);
        `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      
        const tax = 0.12; // IVA Ecuador
        try {
          const params = {
            amount: (
              (product.precio_producto * 100) +
              (product.precio_producto * 0.12 * 100)
            ).toFixed(0),
            amountWithTax: (product.precio_producto * 100).toFixed(0),
            tax: (product.precio_producto * tax * 100).toFixed(0),
            clientTransactionId: btoa(
              this.personalInfo.dni + formattedDate
            ),
            currency: Config.MONEDA,
            documentId: this.personalInfo.dni,
            email: this.personalInfo.email,
            countryCode: this.personalInfo.countryCode.substring(1),
            phoneNumber: this.personalInfo.phone,
            reference: 'Compra de suscripción de Hoteles FullVacations',
          };
          return params;
        } catch (e) {
          console.error(e.toString());
        }
        return {};
      }
      
}