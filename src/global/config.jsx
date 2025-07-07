class Config {
  // App config
  static get URL_SERVICIOS() {
    //return "https://apidev.visitaecuador.com/v1.8";
    return "https://apidev.visitaecuador.com/v1.7";
    //return "http://181.198.122.14:8080/v1.7";
  }

  static get URL_CRM() {
    return "https://api.visitaecuador.com/v1.7";
  }

  static get CRM_TOKEN() {
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3Njc4MDE2NTcsImF1ZCI6IjI1NGMyOTA1OTg1MmRkN2I4MjI3OTk3MTY5ZTMzOTJlNzUxZWU0ZjYiLCJkYXRhIjp7ImNvZGlnbyI6InZpc2l0YWVjdWFkb3IiLCJub21icmVzIjoiVmlzaXRhRWN1YWRvci5jb20iLCJpZF91c3VhcmlvIjoiMCIsImlkX3NlcnZpY2lvIjoyNTUsIm1ldG9kbyI6bnVsbCwib3JpZ2VuIjoiYXBwIiwiaWRfY2FuYWwiOm51bGwsImlkX3VzdWFyaW9fY3JtIjoiMTcxNyJ9fQ.1KQLvxoCha0hl20NgYqOeXEWvAzD_93Q9QaM40i_Ob8";
  }

  static get URL_SERVICIOS_PAGOS() {
    return "https://dev.visitaecuador.com/";
  }

  static get URL_WEB() {
    return "https://www.visitaecuador.com/";
  }

  static get URL_PAYPHONE() {
    return "https://pay.payphonetodoesposible.com/api/transaction";
  }

  static get METODO() {
    return "visitaecuador";
  }

  static get IDMETODO() {
    return "1"; //visita
  }

  static get METODO_EX_FB() {
    return "facebook";
  }

  static get METODO_EXPRESS() {
    return "express";
  }

  static get IDMETODO_EXPRESS() {
    return "45";
  }

  static get IDMETODO_EX_FB() {
    return "2";
  }

  static get METODO_EX_GO() {
    return "google";
  }

  static get IDMETODO_EX_GO() {
    return "3";
  }

  static get IDMETODO_EMAIL() {
    return "29";
  }

  static get METODO_EXPRESS() {
    return "express";
  }

  static get IDMETODO_EXPRESS() {
    return "45";
  }

  static get METODO_EX_APPLE() {
    return "apple";
  }

  static get IDMETODO_EX_APPLE() {
    return "30"; //30 apple visita
  }

  static get SERVICIO() {
    return "cv";
  }

  static get IDSERVICIO() {
    return "1"; // default 1 - para visita
  }

  static get IDEMPRESA() {
    return "1";
  }

  static get IDPAIS() {
    return "239"; // default pais ecuador. gitcambios
  }

  static get APPNAME() {
    return "CLub Visita Ecuador";
  }

  static get MAILCONTA() {
    return "contabilidad@clubvisita.com";
  }

  static get NOMBREPACK() {
    return "ClubPack Premium";
  }

  static get NOMBRECHAT() {
    return "ChatCenter";
  }

  static get MONEDA() {
    return "USD";
  }

  static get CODIGO_PROMOCIONAL() {
    return "G3N3R1C0";
  }

  static get PAYMENT_DATACARD_KEY() {
    return ".121*+75g";
  }

  static get ONESIGNAL_KEY() {
    return "1e02a035-15f6-4b18-b8df-b943034443fc";
  }

  static get URL_APP_FIREBASE() {
    return "https://clubvisita.page.link/ugkL";
  }

  static get DYNAMIC_URL() {
    return "https://clubvisita.com";
  }

  static get YOUTUBE_CHANNEL_INFOTOUR() {
    return "PLMA7SK6kHvZd_kpuZcKs9HA0q9hFY6AEG";
  }

  static get VERSUS() {
    return "/sus/";
  }

  static get VERAPP() {
    return "/app/";
  }

  static get VERLUG() {
    return "/lug/";
  }

  static get VEREST() {
    return "/est/";
  }

  static get VERINFO() {
    return "/inf/";
  }

  static get VERPAY() {
    return "/pay/";
  }

  static get ADMIN() {
    return "/adm";
  }

  static get RESERVAS() {
    return "/res/";
  }

  static get CRM_PERSONA() {
    return "/p";
  }

  static get CALLCENTER() {
    return "/call/";
  }

  static get TOKENPP() {
    return "jvAtIRktHfYT90uEZ1mp5A7fIgD0S40g2eYrS7IHvEFy7ZCVflXxPDZbjsVssdjRjPsfbIPg968yyp6pGSeRDgk49I31Q9xNDUZnZbWjI-zAxu3rGM4SE1ZkOi8oncLbYJrQu0by526kkcLuQ3gevQoAylkR0Mplxc5KeAcK00ShHeM_mKPRA4vI1pe6ssCKahJxpYRrWTdoI7VqPmlqGfIE8KV5YJzP1fcXWRJjV-Hj7mL7HRK2L-Nfy0nAAioiRb22TgWnL-0KptvdGCUi2HGXaICwLe5KYLCZJ7j2s7JW50M8OPhevz5m3zpI6jgOCkR2VA";
  }

  static get DEVELOPER_TOKEN() {
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjI2NTI5OTcxMDcsImF1ZCI6IjY0NzY2ZTJiYzllYWUxNGI3ZjBhZGIyZGQ4ZWYyNjJlOThkNzZjZjkiLCJkYXRhIjp7ImlkX3NlcnZpY2lvIjoxLCJpZF9tZXRvZG8iOjEsIm5vbWJyZXMiOm51bGwsIm9yaWdlbiI6ImFwcCIsImlkX2Rlc2Fycm9sbGFkb3IiOjMsImlkX3VzdWFyaW9fdmVuZGVkb3IiOjM5OCwiZXhwIjoiMTAwMDAwMDAwMCJ9fQ.5P7XYwxRz3Ex3ARExA3Fdr59vM8yIP-mB5NZJlDgPBM";
  }

  static get RECIBE_DATAFAST() {
    //return "https://visitaecuador.com/compratest/transaction/dfcv/";
    //return "https://visitaecuador.com/suscripcion/";
    return "/bienvenida";
  }

  static get MENSAJE() {
    return (
      "Hola, mi nombre es *{{nombre}}* suscriptor de VisitaEcuador.com con ID *{{id}}* y deseo realizar la siguiente reserva:\n" +
      "*Hotel:* {{hotel}}\n" +
      "*Check-In:* {{checkin}}\n" +
      "*Check-Out:* {{checkout}}\n" +
      "*Personas:* {{personas}}\n" +
      "*Habitaciones:* \n{{habitaciones}}\n\n" +
      "*Total:* {{total}}\n"
    );
  }

  static get LLAMADA() {
    return [
      {
        id: 1,
        nombre: "Sin llamar",
      },
      {
        id: 2,
        nombre: "Si contestó",
      },
      {
        id: 3,
        nombre: "No contestó",
      },
      {
        id: 4,
        nombre: "Gestionado",
      },
    ];
  }

  static obtenerLlamada(id) {
    const item = this.LLAMADA.find((elemento) => elemento.id === id);
    return item ? item.nombre : null;
  }

  static get VENTA() {
    return [
      {
        id: 1,
        nombre: "NO",
      },
      {
        id: 2,
        nombre: "SI",
      },
    ];
  }

  static obtenerVenta(id) {
    const item = this.VENTA.find((elemento) => elemento.id === id);
    return item ? item.nombre : null;
  }
}
export default Config;
