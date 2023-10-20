
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-footerColor ">
      <div className=" mx-auto max-w-6xl py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <h3 className="text-footerTextColor font-bold text-sm">Nosotros</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Quienes somos</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm" >Contáctanos</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Remate y consulta</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Oficina</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Emprende con nosotros</a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-footerTextColor font-bold text-sm">Servicio premium</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Disney Concierge</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Cashback</a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-footerTextColor font-bold text-sm">SMART Hoteles</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Registrar establecimiento</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Administrar establecimiento</a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-footerTextColor font-bold text-sm">Descargar App</h3>
            <a target="_blank" href="https://apps.apple.com/ec/app/visitaecuador-com/id1385161516">
              <img src="/img/astore.png"  style={{ width: "150px", height: "auto" }} className="py-2 pl-3"/>
            </a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.visitaEcuador">
              <img src="/img/gplay.png"  style={{ width: "150px", height: "auto" }} className="pl-3"/>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-4 pt-5">
          <div className="col-span-1">
            <h3 className="text-footerTextColor font-bold text-sm">InfoTour Ecuador</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Ir al sitio web</a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-footerTextColor font-bold text-sm">Suscripciones</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Comprar suscripción</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Activar VisitaPack</a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-footerTextColor font-bold text-sm">Legal</h3>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Políticas de privacidad</a>
            </div>
            <div className="pl-3">
              <a href="https://www.ejemplo.com" className="text-footerTextColor font-thin hover:text-greenVE-500 text-sm">Términos y condiciones</a>
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 pt-10">
          <a target="_blank" href="https://facebook.com/visitaecuadorcom" className="fill-current text-footerTextColor hover:text-greenVE-500">
            <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
              viewBox="-143 145 512 512" space="preserve">
              <g>
                <path d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z M339,617c0,5.5-4.5,10-10,10h-432c-5.5,0-10-4.5-10-10V185c0-5.5,4.5-10,10-10h432c5.5,0,10,4.5,10,10V617z"/>
                <path d="M146.8,313.7c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H51.2v38.3h26.5v133h49.6v-133h39.3l2.9-38.3h-42.2v-29.9C127.3,317.4,136.5,313.7,146.8,313.7z"/>
              </g>
            </svg>
          </a>
          <a target="_blank" href="https://instagram.com/visitaecuadorcom" className="fill-current text-footerTextColor hover:text-greenVE-500">
            <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
              viewBox="-143 145 512 512" space="preserve">
              <g>
                <path d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z M339,617c0,5.5-4.5,10-10,10h-432c-5.5,0-10-4.5-10-10V185c0-5.5,4.5-10,10-10h432c5.5,0,10,4.5,10,10V617z"/>
                <path d="M191.6,273h-157c-27.3,0-49.5,22.2-49.5,49.5v52.3v104.8c0,27.3,22.2,49.5,49.5,49.5h157c27.3,0,49.5-22.2,49.5-49.5V374.7	v-52.3C241,295.2,218.8,273,191.6,273z M205.8,302.5h5.7v5.6v37.8l-43.3,0.1l-0.1-43.4L205.8,302.5z M76.5,374.7	c8.2-11.3,21.5-18.8,36.5-18.8s28.3,7.4,36.5,18.8c5.4,7.4,8.5,16.5,8.5,26.3c0,24.8-20.2,45.1-45.1,45.1C88,446.1,68,425.8,68,401	C68,391.2,71.2,382.1,76.5,374.7z M216.1,479.5c0,13.5-11,24.5-24.5,24.5h-157c-13.5,0-24.5-11-24.5-24.5V374.7h38.2	c-3.3,8.1-5.2,17-5.2,26.3c0,38.6,31.4,70,70,70c38.6,0,70-31.4,70-70c0-9.3-1.9-18.2-5.2-26.3h38.2V479.5z"/>
              </g>
            </svg>
          </a>
          <a target="_blank" href="https://www.youtube.com/@VisitaEcuador-com" className="fill-current text-footerTextColor hover:text-greenVE-500" >
            <svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"
              viewBox="-143 145 512 512" space="preserve">
              <g>
                <path d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z M339,617c0,5.5-4.5,10-10,10h-432c-5.5,0-10-4.5-10-10V185c0-5.5,4.5-10,10-10h432c5.5,0,10,4.5,10,10V617z"/>
                <path d="M196.9,311.2H29.1c0,0-44.1,0-44.1,44.1v91.5c0,0,0,44.1,44.1,44.1h167.8c0,0,44.1,0,44.1-44.1v-91.5 C241,355.3,241,311.2,196.9,311.2z M78.9,450.3v-98.5l83.8,49.3L78.9,450.3z"/>
              </g>
            </svg>
          </a>
        </div>
        <div className="flex justify-center pt-4">
          <h4 className="text-footerTextColor text-sm">© VisitaEcuador.com {year} </h4>
        </div>
      </div>
    </div>
  )
}

export default Footer