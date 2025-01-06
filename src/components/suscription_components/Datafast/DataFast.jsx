import React, { useEffect, useState } from 'react';
import DatafastController from '../../../controllers/pago/datafast/datafastController';
import Config from '../../../global/config';

const DataFast = ({persona, producto, pago, codigo}) => {


    const [trx, setTrx] = useState();
    const Persona = {
        "dni": persona.cedula,
        "address": "Cuenca",
        "phone": persona.telefono,
        "names": persona.nombres,
        "email": persona.correo,
    };
    const Producto = {
        "precio_producto": producto.PrecioProducto,
        "titulo": producto.Titulo,
        "id_codigo_promocional": codigo.id_codigo_promocional,
        "beneficio_cantidad_tiempo":codigo["beneficio"].length>0?codigo["beneficio"][0]["cantidad"]:"0",
        "beneficio_tipo_tiempo":codigo["beneficio"].length>0?codigo["beneficio"][0]["cantidad_tipo_tiempo"]:"0",
        "id_usuario_vendedor":codigo.vendedor.id_usuario_vendedor,
        "id_suscripcion_vendedor":codigo.vendedor.id_suscripcion_vendedor,
        "id_producto":producto.IdProducto,
        "id_lista_precio_producto":producto.IdListaPrecioProducto,
        "id_prod_suscripcion":producto.IdProductoSuscripcion,
        "id_tipo_canal":"11",
        "tipo_pago":"2", //TARJETA DE CRÉDITO
        "tipo_pago_boton":pago.IdTipoBotonPago,
        "id_diferido":pago.IdDiferido,
    };

    const datafastController = new DatafastController({ persona: Persona, product: Producto });
    const [html, setHtml] = useState();
    const cardType = pago.Tarjeta;


    const getTemplate = () => {
        var _tpl = `<html lang="es"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>datafast</title></head>
        <body>
        <div id="divFormDF">
        <div class="mensaje"></div>
            <form  id="paymentForm" action="{{WEBHOOK}}" class="paymentWidgets" data-brands="{{CARDTYPE}}"></form>
            <br/>
            <img src='https://www.datafast.com.ec/images/verified.png' style='display:block;margin:0 auto; width:50%;'>
        </div>
        <style>
        /* default value, applies to all devices */
          .button {width: 100%}
          @media (min-width: 480px) {
            /* this rule applies only to devices with a minimum screen width of 480px */
            .button {
              width: 50%;
            }
          }
        .input,.button {
          height: 44px;
          width: 100%;
        }
        </style>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
        <script type='text/javascript'>
            jQuery( document ).ready(function() { 
                //jQuery('.mensaje').html('jquery listo en webview');
            });
            jQuery('body').on('click','.wpwl-button-pay',function(e){
                //jQuery('.mensaje').html('click en pagar');
                Print.postMessage('notifica pago');
            })
            var wpwlOptions = {
            useSummaryPage: false,
            locale: 'es',
            style: 'plain', //'card',
            labels:{ cvv:'CVV'} ,
            registrations:{
            requireCvv: true,
            hideInitialPaymentForms: true
            },
            onError:function(error){
            //  jQuery('.mensaje').html('error al cargar formulario. '+error);
            },
            //onAfterSubmit:function(){
            //  //Print.postMessage('evento on after submit');
            //  jQuery('.mensaje').html('evento afert submit');
            //},
            //onBeforeSubmitCard:function(event){
            //  Print.postMessage('evento on before submit');
            //  jQuery('.mensaje').html('evento before submit');
            //},
            //onSaveTransactionData:function(data){
            //  //Print.postMessage('evento on save transaction');
            //  jQuery('.mensaje').html('evento on save trx');
            //},
            onReady: function() {
              //jQuery('.mensaje').html('formulario con diferidos');
              var numberOfInstallmentsHtml = '{{DEFERRED}}';
              var createRegistrationHtml = '<div class="customLabel" style="display:none;">¿Desea guardar de manera segura sus datos?<div class="customInput"><input type="checkbox" checked="checked" name="createRegistration" /></div></div>';
              jQuery('form.wpwl-form-card').find('.wpwl-button').before(numberOfInstallmentsHtml);
              jQuery('form.wpwl-form-card').find('.wpwl-button').before(createRegistrationHtml);
              //interes
              //var frecuente = '{{INTERES}}';
              //jQuery('form.wpwl-form-card').find('.wpwl-button').before(frecuente);
            },
          };
        </script>
        <script src="https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId={{CHECKOUTID}}" ></script>
        <script type='text/javascript'>
            jQuery(document).ready(function() {
                jQuery('#paymentForm').submit(function() {
                    jQuery(this).attr('target', '_blank');
                });
            });
        </script>
        </body></html>`;
        return _tpl;
    }
    

    const getTemplateDiferido = (interes, diferido) => {
        /*var _dif = '<div class="wpwl-label wpwl-label-custom" style="display:inline-block">Diferidos:</div>';
        _dif += '<div class="wpwl-wrapper wpwl-wrapper-custom" style="display:inline- block">';
        _dif += '<select name="recurring.numberOfInstallments"><option value="'+diferido+'">'+diferido+'</option></select></div>';
        return _dif;*/
        var _diferidos = '<input type="hidden" name="recurring.numberOfInstallments" value="' + diferido + '">' +
            '<input type="hidden" name="customParameters[SHOPPER_interes]" value="' + interes + '">';
        return _diferidos;
    }

    const getTemplateCallback = () => {
        var _tpl = `""
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
        <p class='mensaje'></p>
        <input id="tarjeta" type='text' placeholder='ingresa tarjeta' value='123456' />
        <p><button id="boton" type="submit">Pagar datafast</button></p>
        <script type='text/javascript'> 
        jQuery( "#boton" ).click(function( event ) {
           var tarjeta = jQuery('#tarjeta').val();
           jQuery('.mensaje').html('hizo click en pagar');
           Print.postMessage('usuario hizo el pago. '+tarjeta);
           event.preventDefault();
        });
        jQuery( document ).ready(function() { 
           jQuery('.mensaje').html('jquery listo en webview');
        });
        </script>
        ""`;
        return _tpl;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await datafastController.prepareRemotePayment(true, Persona, Producto);
                if (result) {
                    setTrx(result);
                    var template = getTemplate();
                    template = template.replace("{{WEBHOOK}}", Config.RECIBE_DATAFAST);
                    template = template.replace("{{CHECKOUTID}}", result.id);
                    template = template.replace("{{CARDTYPE}}", cardType);
                    template = template.replace("{{DEFERRED}}", getTemplateDiferido(pago.Intereses=="1"?1:0,pago.Meses=="1"?0:parseInt(pago.Meses)));
                    setHtml(template);
                    /*if (webViewRef.current) { // Verifica que webViewRef.current no sea null
                        webViewRef.current.loadUrl(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
                    }*/
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, []);

    
    
    

    return (
        <div className='shadow-xl rounded-xl flex flex-col items-center justify-center'>
            <div className='rounded-t-xl w-full flex justify-center items-center bg-[#04ab91] h-20'><img src='https://www.datafast.com.ec/images/logo.png' className='h-16'/></div>
            {html != null ? (
                <iframe
                    className='w-full h-[450px]'
                    srcDoc={html}
                ></iframe>
            ) : (
                <div className='h-[450px] flex flex-col items-center justify-center'>
                    <span className="icon-[eos-icons--three-dots-loading] h-20 w-20 text-greenVE-500"></span>
                    <label className='text-sm'>Espere un momento.</label>
                </div>
            )}
        </div>
    );
};

export default DataFast;