import PaymentService from "../../../services/payment/PaymentService";
import PayPhoneController from "./payphoneController";

class PayPhoneForm {
    async loadDataPayphone(product, personalInfo) {
        try {
            const mv = new PayPhoneController();
            const trx = await mv.prepareTransaction(product, personalInfo);
            if (trx && trx.code == 0) {
                return new Promise((resolve, reject) => {
                    let intervalId = setInterval(async () => {
                        try {
                            const val = await mv.getStatusTransaction(trx.transactionId);
                            if (val.transactionStatus !== "Pending") {
                                clearInterval(intervalId);
                                if (val.transactionStatus == "Canceled") {
                                    resolve({ code: 0 });
                                } else {
                                    resolve({ code: 1 });
                                }
                            }
                        } catch (error) {
                            clearInterval(intervalId);
                            reject({ code: -1 });
                        }
                    }, 2000);
                });
            } else {
                return { code: -1 };
            }
        } catch (error) {
            return { code: -1 };
        }
    }
    
}

export default PayPhoneBPController;