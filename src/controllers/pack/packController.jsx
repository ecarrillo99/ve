import packService from '../../services/pack/packService';
import SuscripcionService from '../../services/suscripcion/SuscripcionService'

class PackController {
    constructor() {
        this.packService = packService;
        this.suscripcionService =  new SuscripcionService();
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
            titulo: packData.producto.titulo,
            tiempo: packData.producto.tiempo,
            precio: packData.producto.precio_producto,
            id_suscripcion: packData.vendedor.id_suscripcion
        };
    }


    async registroTransaccion(params) {

        try {
            console.log('Registering transaction with params:', params);
            if (!params.id_prepago || !params.ci || !params.nombres ||
                !params.celular || !params.email) {
                throw new Error('Faltan campos requeridos para activar el pack');
            }

            const result = await this.suscripcionService.registroTransaccion(params);
            if (result && (result.status === 'OK' || result.success)) {
            return {
                success: true,
                data: result.data,
                message: result.message || 'Pack activado correctamente'
            };
            } else {
                throw new Error(result?.message || result?.error || 'Error al registrar la transacción');
            }
        } catch (error) {

            return {
                success: false,
                error: error.message || 'Error al registrar la transacción'
            };
        }
    }
}

export default PackController;
