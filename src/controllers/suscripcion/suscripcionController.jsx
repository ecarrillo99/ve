import Config from "../../global/config";
import SuscripcionService from "../../services/suscripcion/SuscripcionService";

export const loginRemote = async function (params) {
  const isLogged = false;

  try {
    const suscripcionService = new SuscripcionService();
    const res = await suscripcionService.getInformacionPerfil(params);
    await suscripcionService.getInformacionBiosite({
      email: params.id,
      password: params.pass,
    });
    if (res.estado && res.codigo == 0) {
      if (res.data.fin != null) {
        if (new Date(res.data.fin) < new Date()) {
          return (
            <label>
              {"Cuenta caducada el " + res.data.fin}
              <br />{" "}
              <a
                className="text-blue-500 underline cursor-pointer"
                href={window.location.origin + "/suscripcion"}
              >
                Renueva aquí
              </a>
            </label>
          );
        }
      }
      if (Object.values(res).length > 0) {
        localStorage.setItem("datos", JSON.stringify(res));
      }
      return res.estado;
    }
    return false;
  } catch (e) {}
};

export const getPermissions = async function (idUsuario) {
  try {
    const suscripcionService = new SuscripcionService();
    var bd = JSON.parse(localStorage.getItem("datos"));
    const params = {
      id_usuario: idUsuario,
    };
    const res = await suscripcionService.setAdministrador(params);
    if (res.estado) {
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 8 * 60 * 60 * 1000);

      document.cookie = `PHPSESSID=${
        res.data
      };expires=${expirationDate.toUTCString()}`;
      return res.estado;
    }
    return false;
  } catch (e) {}
};

export const setPermissionsAdmin = async function () {
  try {
    const suscripcionService = new SuscripcionService();
    var bd = JSON.parse(localStorage.getItem("datos"));
    const params = {
      token: bd.token,
    };
    const res = await suscripcionService.getPermisos(params);
    if (res.estado) {
      localStorage.setItem("permisos", JSON.stringify(res.data));
      return res.estado;
    }
    return false;
  } catch (e) {}
};

export const endRemoteSession = async function () {
  try {
    var bd = JSON.parse(localStorage.getItem("datos"));
    var params = {
      token: bd["token"],
    };
    localStorage.removeItem("datos");
    localStorage.removeItem("permisos");
    // Expirar la cookie del administrador
    document.cookie =
      "PHPSESSID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const suscripcionService = new SuscripcionService();
    const res = await suscripcionService.cerrarSesion(params);
    if (res.estado && res.codigo == 0) {
      return res.estado;
    }
    if (res.codigo == 401) {
      return 401;
    }
  } catch (e) {}
};

export const gestionarSuscripcion = async function (params) {
  try {
    const suscripcionService = new SuscripcionService();
    const res = await suscripcionService.registroTransaccion(params);
    if (res.estado) {
      suscripcionService.sendNotificationSubscription({
        id_suscripcion_renovacion: res.data.id_suscripcion_renovacion,
      });
      return res;
    }
    return false;
  } catch (e) {}
};

export const resetContrasenia = async function (tipo, valor) {
  try {
    const params = {
      tipo: tipo,
      valor: valor,
      servicio: Config.SERVICIO,
    };
    const suscripcionService = new SuscripcionService();
    const res = await suscripcionService.reenviarContrasena(params);
    if (res != null) {
      return res;
    }
  } catch (e) {}
  return false;
};
