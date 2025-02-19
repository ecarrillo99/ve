import Config from '../../global/config';
import GenericService from '../service';

class PackService extends GenericService {
    async validatePackCode(code) {
        try {
            const url = `${Config.URL_SERVICIOS}/app/checkCodigoPrepago/`;
            const params = {
                id_servicio: "1",
                codigo: code
            };

            const customHeaders = {
                'Origin': window.location.origin,

            };

            const data = await this.post(url, params, customHeaders);

            if (data.estado === true && data.codigo === 0) {
                return {
                    success: true,
                    data: data.data,
                    message: data.msg
                };
            } else {
                throw new Error(data.msg || 'Código inválido');
            }
        } catch (error) {
            throw new Error(error.message || 'Error en la validación del código');
        }
    }
}

export default new PackService();
