import BiositeService from "../../services/biosite/BiositeService";

export const getSlugByCedula = async function (cedula) {
  try {
    const biositeService = new BiositeService();
    const res = await biositeService.getSlugByCedula(cedula);
    if (res.data != null && res.status === 200) {
      return res.data;
    }
    return false;
  } catch {}
};
