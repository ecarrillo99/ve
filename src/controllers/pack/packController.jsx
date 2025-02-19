import packService from '../../services/pack/packService';

class PackController {
    constructor() {
        this.packService = packService;
    }

    async validateCode(code) {
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
}

export default PackController;
