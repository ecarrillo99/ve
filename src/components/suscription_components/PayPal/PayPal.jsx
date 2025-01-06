import { PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PayPal = ({persona, producto, pago, codigo}) => {
    const navigate = useNavigate();
    return (
        <PayPalButtons
            createOrder={(data, actions, err) => {
                return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                        {
                            amount: {
                                value: (producto.PrecioProducto * 1.12).toFixed(2),
                                currency_code: 'USD', 
                            }
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                if(order.status=="COMPLETED"){
                    pago.transaccion=order;
                    navigate('/bienvenida', { state: { persona, producto, codigo, pago } });
                }                
            }}
        />
    );
};

export default PayPal;