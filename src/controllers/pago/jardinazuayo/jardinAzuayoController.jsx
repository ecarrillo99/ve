import PaymentService from "../../../services/payment/PaymentService";

class JardinAzuayoController {
    _paymentService = new PaymentService();
    async checkCuenta(cedula, cuenta, nomProd, precio) {
        var params = {
            "tipo": "validarCuenta",
            "cedula": cedula,
            "cuenta": cuenta,
            "desc_producto": nomProd,
            "precio": precio,
        };
        console.log(params);
        try {
            var _res = await this._paymentService.validarCuentaJA(params);
            //Map _res = await this._paymentService.testVerificarDF(id); // desarrollo
            console.log("consulta ws JARDIN AZUAYO pago");
            console.log(_res);
            return _res;
        } catch (e) {
            console.log(e)
        }
    }

    async checkOtp(cedula, cuenta, nomProd, precio, otp) {
        try {
            var params = {
                "tipo": "validarOTP",
                "cedula": cedula,
                "cuenta": cuenta,
                "otp": otp,
                "desc_producto": nomProd,
                "precio": precio,
                "idDispositivo": "web",
                "ipDispositivo": "200.93.222.206",
                "mac": "00:50:56:b7:a4:fb",
                "sistemaOperativo": navigator.platform,
                "userAgent": navigator.userAgent
            };
            var _res = await this._paymentService.validarCuentaJA(params);
            //Map _res = await this._paymentService.testVerificarDF(id); // desarrollo
            console.log("consulta ws JARDIN AZUAYO pago");
            _res.data=params
            console.log(_res);
            return _res;
        } catch (e) {

        }
    }
}
export default JardinAzuayoController;