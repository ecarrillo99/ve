import { useParams } from "react-router-dom";
import { getSlugByCedula } from "../../controllers/biosite/biositeController";
const BiositeRedirect = () => {
  const { id } = useParams();
  getSlugByCedula(id).then((result) => {
    if (result) {
      if (!result.slug) {
        result.slug = id;
      }
      window.open(
        window.location.origin + "/vesite/Ve.site/" + result.slug || id,
        "_self"
      );
    } else {
      window.open(window.location.origin, "_self");
    }
  });
};
export default BiositeRedirect;
