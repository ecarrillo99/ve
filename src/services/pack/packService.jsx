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



            const data = await this.post(url, params);

            if (data.estado === true && data.codigo === 0) {
                return {
                    success: true,
                    data: data.data,
                    message: data.msg
                };
            } else {
                throw new Error(data.msj || data.msg || 'Código inválido');
            }
        } catch (error) {

            throw error;  }
    }
}

export default new PackService();
