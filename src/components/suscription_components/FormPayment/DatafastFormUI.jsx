import React, { useEffect, useState } from 'react';
import jQuery from 'jquery';

const DatafastFormUI = ({trx, tarjeta, diferido}) => {
    const [nombreTarjeta, setNombreTarjeta]=useState()
    useEffect(()=>{
        if(tarjeta.Nombre.toUpperCase()==="MASTERCARD"){
            setNombreTarjeta("MASTER");
        }
        if(tarjeta.Nombre.toUpperCase()==="AMERICANEXPRESS"){
            setNombreTarjeta("AMEX");
        }
        if(tarjeta.Nombre.toUpperCase()==="VISA"){
            setNombreTarjeta("VISA");
        }
    }, [tarjeta])
    
  useEffect(() => {
    // Agregar jQuery
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js';
    document.head.appendChild(jqueryScript);

    jqueryScript.onload = () => {
      // Inicializar jQuery y manejar clics en el botón
      jQuery(document).ready(function () {
        jQuery('body').on('click', '.wpwl-button-pay', function (e) {
          console.log('notifica pago');
        });
      });
    };

    return () => {
      document.head.removeChild(jqueryScript);
    };
  }, []);

  useEffect(() => {
    // Agregar el script de pagoWidgets
    const paymentWidgetsScript = document.createElement('script');
    paymentWidgetsScript.src =
      'https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId='+trx.id;
    document.head.appendChild(paymentWidgetsScript);

    return () => {
      document.head.removeChild(paymentWidgetsScript);
    };
  }, []);

  useEffect(() => {
    // Configuración de opciones para el widget de pago
    const wpwlOptions = {
      useSummaryPage: false,
      locale: 'es',
      style: 'card',
      labels: { cvv: 'CVV' },
      registrations: { requireCvv: true, hideInitialPaymentForms: true },
      onError: function (error) {},
      onReady: function () {
        var numberOfInstallmentsHtml =
          '<input type="hidden" name="recurring.numberOfInstallments" value="'+(diferido.Meses==="1"?"0":diferido.Meses)+'"><input type="hidden" name="customParameters[SHOPPER_interes]" value="1">';
        var createRegistrationHtml =
          '<div className="customLabel" style="display:none;">¿Desea guardar de manera segura sus datos?<div className="customInput"><input type="checkbox" checked="checked" name="createRegistration" /></div></div>';
        jQuery('form.wpwl-form-card').find('.wpwl-button').before(numberOfInstallmentsHtml);
        jQuery('form.wpwl-form-card').find('.wpwl-button').before(createRegistrationHtml);
      },
    };

    window.wpwlOptions = wpwlOptions;
  }, []);

  return (
    <div id="divFormDF">
      <div className="mensaje"></div>
      <form action="https://visitaecuador.com/compratest/transaction/dfcv/" className="paymentWidgets" data-brands={nombreTarjeta}>
      </form>
      <br />
      <img
        src="https://www.datafast.com.ec/images/verified.png"
        style={{ display: 'block', margin: '0 auto', width: '100%' }}
      />
    </div>
  );
};

export default DatafastFormUI;
