import { HmacSHA256 } from 'crypto-js';

function encodePass(target) {
  try {
    const key = '@pp';
    const extract = target.substring(0, target.indexOf('@'));
    const hmac = HmacSHA256(extract, key);
    const digest = hmac.toString();
    const salida = digest.substring(digest.length - 8);
    return salida;
  } catch (e) {
    console.error(e);
  }
  return target;
}

export default encodePass;
