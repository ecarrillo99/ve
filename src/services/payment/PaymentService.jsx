import React, { useState } from 'react';
import Config from '../../global/config';
import GenericService from '../service';

class PaymentService extends GenericService {

    async validarCuentaJA(params) {
        return this.post(Config.URL_SERVICIOS_PAGOS+'ApiJA.php', params);
    }

    testPay = async (params) => {
        const res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    cardToken: "54d3bf58-6404-450b-ae0e-c967dd289897",
                    authorizationCode: "633149",
                    messageCode: 0,
                    status: "Approved",
                    statusCode: 3,
                    transactionId: 3424769,
                    clientTransactionId: "MDEwMjY0ODM0MjAwMQ==",
                });
            }, 3000);
        });
        return res;
    };

    manualPay = async (params) => {
        const res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: "Registro de tarjeta. Pago manual",
                    statusCode: 3,
                });
            }, 3000);
        });
        return res;
    };

    pay = async (params) => {
        const headers = {
            Authorization: 'Bearer ' + Config.TOKENPP,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        };

        const url = Config.URL_PAYPHONE + '/Create/';
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error('Error:', data);
            return { ErrorCode: 900 };
        }
    };

    deferred = async (params) => {
        const headers = {
            Authorization: 'Bearer ' + Config.TOKENPP,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        };

        const url = Config.URL_PAYPHONE + '/Deferred/';
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            console.error('Error:', data);
            return { ErrorCode: 900 };
        }
    };

    /// --------
    /// DATAFAST
    /// --------
    /// simulacion de id

    testPrepareDF = async (urlData, customPar) => {
        const res = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    result: { code: "000.200.100", description: "successfully created checkout" },
                    buildNumber: "c19f71c1b4e2315bd6b40c35c9afdcc3fdd3beb6@2020-11-17 12:09:30 +0000",
                    timestamp: "2020-12-28 22:28:23+0000",
                    ndc: "91BDCE81661C0CFDCFFC251709B6105D.prod01-vm-tx02",
                    id: "91BDCE81661C0CFDCFFC251709B6105D.prod01-vm-tx02",
                });
            }, 3000);
        });
        return res;
    };


    prepareDF = async (urlData) => {
        const params = {
            urldata: urlData,
            id_servicio: Config.IDSERVICIO,
            // "mode": "test",
        };

        try {
            const response = await fetch(Config.URL_SERVICIOS + Config.VERPAY + 'getTransactionIdDFv3.1/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
                return { ErrorCode: 900 };
            }
        } catch (error) {
            console.error('Error:', error);
            return { ErrorCode: 700 };
        }
    };


    /// comprueba pago data fast api response
    verificarDFV3 = async (chekOutId) => {
        
        const params = {
            id: chekOutId,
            id_servicio: Config.IDSERVICIO,
            // "mode": "test",
        };

        try {
            const response = await fetch(Config.URL_SERVICIOS + Config.VERPAY + 'checkPagoDFv3.3/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (response.ok) {
                
                const data = await response.json();
                return data;
            } else {
                console.error(`Failed to fetch data. Status: ${response.status}`);
                return { ErrorCode: 900 }; // Puedes ajustar el código de error según tus necesidades.
            }
        } catch (error) {
            console.error('Error:', error);
            return { ErrorCode: 700 }; // Puedes ajustar el código de error según tus necesidades.
        }
    };

    /// simulacion de id
    testVerificarDF = async (chekOutId) => {
        try {
            const response = await new Promise(resolve => setTimeout(() => {
                resolve({
                    id: "8ac7a49f68f04f530168f310785c2459",
                    paymentType: "DB",
                    paymentBrand: "VISA",
                    amount: "112.00",
                    currency: "USD",
                    descriptor: "1350.5794.3221 Visita Ecuador",
                    result: { code: "000.100.112.prueba", description: "Request successfully processed in 'Merchant in Connector Test Mode'" },
                    resultDetails: {
                        ExtendedDescription: "Transaction succeeded",
                        clearingInstituteName: "Datafast",
                        AuthCode: "117548",
                        ConnectorTxID1: "8ac7a49f68f04f530168f310785c2459",
                        ReferenceNbr: "190215_002706",
                        AcquirerResponse: "00_04VI"
                    },
                    card: { bin: "476942", binCountry: "EC", last4Digits: "0000", holder: "geovanny orellana", expiryMonth: "12", expiryYear: "2020" },
                    customer: {
                        givenName: "Geovanny Orellana",
                        merchantCustomerId: "1104088902",
                        phone: "0987654321",
                        email: "geovanny6@gmail.com",
                        identificationDocType: "IDCARD",
                        identificationDocId: "1104088902",
                        browserFingerprint: {
                            value: "0400nyhffR+vPCUNf94lis1ztpaNnzv+lNq3ybFkPAzKyaSAk4JSCIeFdHYpPgQiEVyiFhADfeGQZO28FbUrrO5N6T\/KhUgGeNqKfeXqFvOptJOPLKV1ry2\/+soZtuRKwcfxEIinTC1FuaiHTKUkZ8zWbqtWOlIv+2+1qcesP69MTO+CuJoygDKlC7I+vS3zO1UWKyNRXh0mw7Kb1x4cMpEKIlmc2TtQ7lLwpXjqvRKtNIku7P4czcXXKf0uE\/n\/nVnccKirTPd+XhfqT3LYd4+PRV9Qp9yz7ocrVwPSUByNENHKrUjFA6T91\/pu+CYF20XxBuMsuZ3LTdZEh+QEM5Xu+JjZbrXvIF7l2\/Ec1nc2SuEaTRn0G1NCZdqF8c1RfaOfdOIYgHC\/3QY1fZwSVtWNySwAqo7XEZwL8ydRdFuSL63vUSbJ+Ltz3R3+1lLYqHZEKrui6fOHW+iHZd5lbna5jVxBjZhZzjBKKULPxBs5mS\/G2\/x50\/HUfH+F3aQa44zWp4hF3x7r\/xi5AUf1ExG2N7VNM6E+MU6gT+HoQVdeZcQLka7sRf2k00cOjS9hgMLfJMLraAXmI9htrNHzt95ePgXs+oQQc60trrGto44dFZ8zqbwpmWa8IyMAAWnl4iPM+F9+VNHlcz0waZWk5d3ocrOgSQ0Fzflca1WxiZ1a0z33\/rTYqQrmLD1SgAMgvGuiISKiq4yvoHcgBVMDdOYV885IvsRSnt\/S1YYITyzRwv8PXXpOa\/Fh\/Q7T6v45cktLrI9wc9lbzgeS5NUcxovdwOshaHYP8Oq6k+cVXJiV2yKAmeNHH6+w6rw70FYe3Xa46SoC\/e\/Y3bc3iOvysk5\/QGzAmAcLm8LfYFMn4gyMBaepdadPD+lAk9uKzX09vHBjlg3d6WhG9CkuLymmNmW9eVq44NyGTZasfYs6ZVAotR1h5Nwu1x6PIC3+wIIkEfI\/c0SSTviQWYFQO0XFAqyC\/PzndlpWeDmiTtU6fOHu\/7fbkJoUa\/wSv2okfqr7RRcbVkg7YPSjdyWUNe6vw6uTCo+olSIlfzAWCBGfFhkVyKyysRqfEatYu39AKGkPUHuYleFFg3SnwvgGkbPaleERU3j1nEU4a5Nnk7V2ykNBE3o="
                        },
                        customParameters: {
                            SHOPPER_EndToEndIdentity: "d418c743a09c12876d905fd7b44d0f6ce416bd5e744d8c87c192e5221582c2ba",
                            CTPE_DESCRIPTOR_TEMPLATE: "",
                            "1000000505_PD100406": "0081004012000000000012052012000000000000053012000000000100051008179131010030070103910",
                            SHOPPER_interes: "1"
                        },
                        risk: {
                            score: "0",
                            parameters: { USER_DATA2: "ClubVisita" }
                        },
                        cart: {
                            items: [
                                { name: "1 a\u00f1os de Suscripci\u00f3n", description: "1 a\u00f1os de Suscripci\u00f3n", quantity: "1", price: "112" }
                            ]
                        },
                        buildNumber: "f18b0332cc2924d75317fe72fa1a156d66b3d6e6@2019-02-12 12:27:02 +0000",
                        timestamp: "2019-02-15 21:29:32+0000",
                        ndc: "ECCF49241BA134C12802A8CEE18A0D57.uat01-vm-tx01",
                        recurring: { numberOfInstallments: 24 }
                    }
                });
            }, 3000));

            return response;
        } catch (error) {
            console.error('Error:', error);
            return { ErrorCode: 700 }; // Puedes ajustar el código de error según tus necesidades.
        }
    };

    /// prepara la transaccion
    prepareTransaction = async (params) => {
        const headers = {
            'Authorization':
                'Bearer _lHifGqe0mLy7wQ-NElk3oX62v6KzkOjEkmn6DJwN_qPMoWUpCBc5ThqnMRcENtYVEfHPUFtBsiBYjuWnJhNihqZoDFqktxQxQsPkW455r4rsDhurhaNNhE-B9mZVYCryWVGK-h9gzvYzEXzaDOAvPkuA7mAQhBvgcojamlhk0RBE-gXum-VwXd_wQk2Y5aokqjAN4h9o5wBcLmBJ9g8C_0pj_jiN85hdkqK6_Nujk8H1MEQqPcVRY5w5KzdSz-yKX6CsAxCfp6-UGzufSUh5OeTQsaACdQnOlVTZ495ktUp8SNklZ-hfJ7xTehAeX4vhlzX9g',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        };

        const url = 'https://pay.payphonetodoesposible.com/api/sale';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(params),
            });

            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                console.error('Cannot post to ' + url + '. Status:', response.status);
                return { "ErrorCode": 700 };
            }
        } catch (error) {
            console.error('Cannot post to ' + url + '. Error:', error);
            return { "ErrorCode": 700 };
        }
    };

    /// obtiene el estado de la transaccion
    getStatusTransaction = async (transactionID) => {
        const headers = {
            'Authorization':
                'Bearer _lHifGqe0mLy7wQ-NElk3oX62v6KzkOjEkmn6DJwN_qPMoWUpCBc5ThqnMRcENtYVEfHPUFtBsiBYjuWnJhNihqZoDFqktxQxQsPkW455r4rsDhurhaNNhE-B9mZVYCryWVGK-h9gzvYzEXzaDOAvPkuA7mAQhBvgcojamlhk0RBE-gXum-VwXd_wQk2Y5aokqjAN4h9o5wBcLmBJ9g8C_0pj_jiN85hdkqK6_Nujk8H1MEQqPcVRY5w5KzdSz-yKX6CsAxCfp6-UGzufSUh5OeTQsaACdQnOlVTZ495ktUp8SNklZ-hfJ7xTehAeX4vhlzX9g',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        };

        const url = `https://pay.payphonetodoesposible.com/api/sale/${transactionID}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers,
            });

            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                console.error('Cannot get data from ' + url + '. Status:', response.status);
                return { "ErrorCode": 700 };
            }
        } catch (error) {
            console.error('Cannot get data from ' + url + '. Error:', error);
            return { "ErrorCode": 700 };
        }
    };


};

export default PaymentService;