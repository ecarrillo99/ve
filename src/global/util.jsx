//const { readFileSync } = require('fs');

// string to base 64
export function btoa(chars) {
  try {
    const resultBytes = new TextEncoder().encode(chars);
    return window.btoa(String.fromCharCode.apply(null, resultBytes));
  } catch (error) {
    console.error(error);
    return "";
  }
}

// format yyyy-mm-dd
export function dateFormatOnly(d) {
  try {
    const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
    return dateStr;
  } catch (e) {}
  return "";
}

// format yyyy-mm-ddHH:mm:ss
export function dateFormat({ d, b = "" }) {
  try {
    const dateStr = `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
    const hourStr = `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
    return dateStr + b + hourStr;
  } catch (e) {}
  return "";
}

// encode uri
export function encodeURI(uri) {
  try {
    return encodeURIComponent(uri);
  } catch (e) {}
  return "";
}

// image path to base64
/*export function strToBase64(path) {
  try {
    const bytes = readFileSync(path);
    const str64 = bytes.toString('base64');
    return str64;
  } catch (e) {
    ;
  }
  return "";
}*/

// decode string from base 64
export function base64ToStr(encoded) {
  try {
    const decoded = Buffer.from(encoded, "base64").toString("binary");
    return decoded;
  } catch (e) {}
  return "";
}

// cedula validate
export function validarCedula(cedula) {
  try {
    const re = /^\d{10}$/;
    if (!re.test(cedula)) {
      return false;
    }
    const coeficiente = "212121212";
    const modulo = 10;
    let suma = 0;
    for (let i = 0; i < cedula.length - 1; i++) {
      const n = parseInt(cedula[i]) * parseInt(coeficiente[i]);
      suma += n > 9 ? n - 9 : n;
    }
    const verificador = suma % modulo > 0 ? modulo - (suma % modulo) : 0;
    if (verificador.toString() === cedula[cedula.length - 1]) {
      return true;
    }
  } catch (e) {}
  return false;
}

export function sessionStatus() {
  var session = JSON.parse(localStorage.getItem("datos"));
  if (session != null) {
    if (session.data.nivel != "visitante") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function sessionYaGanaste() {
  var session = JSON.parse(localStorage.getItem("datos"));
  if (session != null) {
    if (session.data.permisos.perfil.yaGanaste) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export async function checkData(key) {
  return new Promise((resolve) => {
    const checkLocalStorage = () => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        resolve(value);
      } else {
        setTimeout(checkLocalStorage, 100);
      }
    };
    checkLocalStorage();
  });
}

export function capitalize(text) {
  if (typeof text !== "string") return text;

  return text
    .toLowerCase() // Primero convierte todo el texto a minúsculas
    .split(" ") // Divide el texto en palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
    .join(" "); // Une las palabras nuevamente con espacios
}

export function formatDate(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
