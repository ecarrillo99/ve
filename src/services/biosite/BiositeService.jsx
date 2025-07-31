import Config from "../../global/config";
import GenericService from "../service";

class BiositeService extends GenericService {
  async getSlugByCedula(cedula) {
    const url = `${Config.URL_BIOSITE}/biosites/by-cedula/${cedula}/`;
    return await this.get(url);
  }
}

export default BiositeService;
