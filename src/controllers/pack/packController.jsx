import packService from '../../services/pack/packService';
import SuscripcionService from '../../services/suscripcion/SuscripcionService'

class PackController {
    constructor() {
        this.packService = packService;
        this.suscripcionService = new SuscripcionService();
    }


    validarCedulaEcuatoriana(cedula) {
        cedula = cedula.toString().trim().replace(/-/g, '');

        if (!/^\d{10}$/.test(cedula)) {
            return false;
        }
        const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        const verificador = parseInt(cedula.charAt(9));
        let suma = 0;

        for (let i = 0; i < coeficientes.length; i++) {
            let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
            suma += valor > 9 ? valor - 9 : valor;
        }

        const digitoVerificador = suma % 10 === 0 ? 0 : 10 - (suma % 10);
        return verificador === digitoVerificador;
    }

    async validateCode(code) {
        console.log('Funcion executada')
        try {
            if (!code || code.length !== 8) {
                throw new Error('El código debe tener 8 caracteres');
            }

            const result = await this.packService.validatePackCode(code);

            return {
                success: true,
                data: result.data,
                message: result.message || 'Código validado correctamente'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    extractPackInfo(packData) {
        if (!packData) return null;

        return {
            id_prepago: packData.id_prepago,
            titulo: packData.producto?.titulo || '',
            tiempo: packData.producto?.tiempo || '',
            precio: packData.producto?.precio_producto || '',
            vendedor: packData.vendedor || null,
            id_suscripcion: packData.vendedor?.id_suscripcion || null
        };
    }


    async registroTransaccion(params) {
        console.log('Registering transaction with params:', params);
        try {
            const requiredFields = ['id_prepago', 'ci', 'nombres', 'celular', 'email'];
            for (const field of requiredFields) {
                if (!params[field]) {
                    return {
                        success: false,
                        error: `El campo ${field} es obligatorio`
                    };
                }
            }

            params.ci = params.ci.toString().trim().replace(/-/g, '');

           if (params.ci.length === 10 && /^\d+$/.test(params.ci)) {
                if (!this.validarCedulaEcuatoriana(params.ci)) {
                    return {
                        success: false,
                        error: 'El número de cédula no es válido'
                    };
                }
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(params.email)) {
                return {
                    success: false,
                    error: 'El formato del email no es válido'
                };
            }

            const formattedParams = {
                ...params,
                ci: params.ci.trim(),
                nombres: params.nombres.trim(),
                celular: params.celular.trim().replace(/\s+/g, ''),
                telefono: params.telefono ? params.telefono.trim().replace(/\s+/g, '') : '',
                email: params.email.trim().toLowerCase(),
                ciudad: params.ciudad || 'Cuenca - Ecuador',
                direccion: params.direccion ? params.direccion.trim() : ''
            };

            console.log('Sending formatted params:', formattedParams);

            const result = await this.suscripcionService.registroTransaccion(params);
            console.log('Transaction result:', result);

            if (result && (result.status === 'OK' || result.success)) {
                return {
                    success: true,
                    data: result.data,
                    message: result.message || 'Pack activado correctamente'
                };
            }else {
                if (result && result.msj === "No hay cedula") {
                    return {
                        success: false,
                        error: 'La cédula ingresada no es válida o no está registrada en el sistema'
                    };
                }

                return {
                    success: false,
                    error: result?.message || result?.msj || result?.error || 'Error al registrar la transacción'
                };
            }
        } catch (error) {
            console.error('Error registering transaction:', error);
            return {
                success: false,
                error: error.message || 'Error al registrar la transacción'
            };
        }
    }
}

export default PackController;
