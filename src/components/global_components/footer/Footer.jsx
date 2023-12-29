import Icons from "../../../global/icons";

const Footer = () => {
  const year = new Date().getFullYear();
  const icons = new Icons()
  return (
    
    <div className="bg-footerColor mt-20">
      <div className="mx-auto max-w-6xl py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-y-5">
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">Nosotros</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Quienes somos</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Remate y consulta</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Emprende con nosotros</a>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">Servicio Premium</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Disney Destinations Concierge</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Remate y consulta</a>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">SMART Hoteles</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Registrar establecimiento</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Administrar establecimiento</a>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">Desacargar APP</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Descargar para iOS</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Descargar para Android</a>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">Contácanos</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Formulario de consulta</a>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">InfoTour</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Ir al sitio web</a>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">Suscripciones</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Comprar suscripción</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Activar suscripción</a>
            </div>
          </div>
          <div className="w-1/2 md:w-1/4">
            <h3 className="text-greenVE-700 font-bold text-sm">Legal</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Políticas de privacidad</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-xs">Términos y condiciones</a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          <div className="w-12 h-12 p-2" dangerouslySetInnerHTML={{ __html: icons.Data.Facebook }} />
          <div className="w-12 h-12 p-2" dangerouslySetInnerHTML={{ __html: icons.Data.Instagram }} />
          <div className="w-12 h-12 p-2" dangerouslySetInnerHTML={{ __html: icons.Data.WhatsappF }} />
          <div className="w-12 h-12 p-2" dangerouslySetInnerHTML={{ __html: icons.Data.TikTok }} />
          <div className="w-12 h-12 p-2" dangerouslySetInnerHTML={{ __html: icons.Data.YouTube }} />
          <div className="w-12 h-12 p-2" dangerouslySetInnerHTML={{ __html: icons.Data.LinkedIn }} />
          <div className="w-12 h-12 p-2" dangerouslySetInnerHTML={{ __html: icons.Data.Twitter }} />
        </div>
        <div className="flex flex-col items-center text-center text-xxs text-gray-400 mt-3">
          <label>Copyright © {year} Visitaecuador.com. Todos los derechos reservados</label>
          <label>VisitaEcuador.com forma parte de Aracno Cia. Ltda., Líder nacional en viajes online y servicios nacionales.</label>
        </div>
      </div>
    </div>
  );
};

export default Footer;
