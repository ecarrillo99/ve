import React, { lazy, Suspense } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";
import BuySuscription from "../../components/suscription_components/buy_suscription";
import {
  NavbarSkeleton,
  ContentSkeleton,
} from "../../components/global_components/Skeleton/Loadingkeleton";
const Navbar = lazy(() =>
  import("../../components/global_components/navbar/Navbar")
);
const Footer = lazy(() =>
  import("../../components/global_components/footer/Footer")
);

const Suscribete = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil
  const { codigo } = useParams();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex w-full justify-center bg-greenVE-500">
        <img
          className="w-32 h-32"
          src="https://visitaecuador.com/img/web/ve_logo.svg"
          alt="Visita Ecuador Logo"
        />
      </div>
      <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 -m-12 mt-10">
        <div className="flex items-center justify-center w-full">
          <label className="text-greenVE-500 text-3xl font-semibold">
            El secreto para viajar en grande sin gastar de más
          </label>
        </div>
        <p className="text-center w-full italic text-xl py-3">
          Deja de soñar y comienza a viajar: disfruta de destinos de lujo a
          precios accesibles con Visita Ecuador.
        </p>
        <iframe
          className="w-full h-[500px]"
          src="https://www.youtube.com/embed/nMlbAsrsVvw?si=iQwg5vBNVVcT7Oz9"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <div className="w-full flex justify-center py-10">
          <button
            className="bg-greenVE-500 text-white py-2 px-4 rounded-full"
            onClick={handleOpen}
          >
            Empieza Tu Aventura Hoy
          </button>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <label className="text-orange-400 text-xl font-semibold py-3">
              Sabemos lo que Estás Viviendo
            </label>
            <p className="text-justify text-gray-400 text-lg">
              Como viajero apasionado, anhelas experiencias únicas en cada
              aventura. Sin embargo, los altos precios de los hoteles de lujo en
              Ecuador a menudo te impiden disfrutar al máximo de cada viaje.
              <br></br>
              <br></br>
              <ul className="list-disc pl-6">
                <li>
                  Quieres vivir experiencias exclusivas sin comprometer tu
                  presupuesto.
                </li>
                <li>
                  Te frustra ver cómo los altos costos limitan tus opciones.
                </li>
                <li>
                  Has soñado con explorar destinos increíbles, pero sientes que
                  siempre falta ese “algo” que haga tus viajes realmente
                  memorables.
                </li>
              </ul>
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center p-8">
            <img
              src="https://visitaecuador.com/img/web/seccion-1.jpg"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex items-center justify-center p-8">
            <img
              src="https://visitaecuador.com/img/web/seccion-2.jpg"
              className="w-full"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <label className="text-orange-400 text-xl font-semibold py-3">
              Aquí Es Donde Entramos Nosotros
            </label>
            <p className="text-justify text-gray-400 text-lg">
              En Visita Ecuador entendemos tus necesidades. Con más de 20 años
              en la industria del turismo, hemos creado un club exclusivo que
              conecta a viajeros como tú con los mejores hoteles de 4 y 5
              estrellas de Ecuador. Obtén descuentos de hasta el 50% y accede a
              experiencias de lujo sin sacrificar tu presupuesto.
            </p>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <label className="text-orange-400 text-xl font-semibold  py-3">
              Tu Plan en 3 Sencillos Pasos
            </label>
            <p className="text-justify text-gray-400 text-lg">
              <ol className="list-decimal ml-4">
                <li>
                  <b>Únete al Club:</b> Inscríbete por solo $97 USD al año o
                  elige 12 cómodos pagos de $8.08 USD.
                </li>
                <li>
                  <b>Reserva con Facilidad:</b> Accede a nuestra app exclusiva y
                  selecciona entre los hoteles más lujosos de Ecuador.
                </li>
                <li>
                  <b>Disfruta y Crea Recuerdos:</b> Transforma cada viaje en una
                  aventura inolvidable.
                </li>
              </ol>
            </p>
            <button
              className="bg-greenVE-500 text-white py-2 px-4 rounded-full my-5"
              onClick={handleOpen}
            >
              Únete Ahora y Transforma Tus Viajes
            </button>
          </div>
          <div className="w-1/2 flex items-center justify-center p-8">
            <img
              src="https://visitaecuador.com/img/web/seccion-3.jpg"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex items-center justify-center p-8">
            <img
              src="https://visitaecuador.com/img/web/seccion-4.jpg"
              className="w-full"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <label className="text-orange-400 text-xl font-semibold py-3">
              Imagina el Futuro de Tus Viajes
            </label>
            <p className="text-justify text-gray-400 text-lg">
              Visualiza despertar en destinos asombrosos, disfrutar de hoteles
              con amenidades de lujo y explorar cada rincón de Ecuador sin
              preocuparte por el costo. Con Visita Ecuador, cada viaje se
              convierte en una experiencia memorable, ya sea que viajes en
              familia, en pareja o solo.
            </p>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <label className="text-orange-400 text-xl font-semibold py-3">
              Oferta Especial: ¡Solo por Tiempo Limitado!
            </label>
            <p className="text-justify text-gray-400 text-lg">
              Regístrate en los próximos 60 minutos y recibe una guía exclusiva
              con los mejores destinos y actividades en Ecuador para que cada
              viaje sea perfecto.
            </p>
            <button
              className="bg-greenVE-500 text-white py-2 px-4 rounded-full my-5"
              onClick={handleOpen}
            >
              Aprovecha la Oferta y Únete Hoy
            </button>
          </div>
          <div className="w-1/2 flex items-center justify-center p-8">
            <img
              src="https://visitaecuador.com/img/web/seccion-5.jpg"
              className="w-full"
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex items-center justify-center p-8">
            <img
              src="https://visitaecuador.com/img/web/seccion-6.jpg"
              className="w-full"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <label className="text-orange-400 text-xl font-semibold py-3">
              Preguntas Frecuentes
            </label>
            <p className="text-justify text-gray-400 text-lg">
              <strong>¿Qué incluye la membresía?</strong> Acceso a descuentos
              exclusivos en hoteles de lujo, reservas garantizadas, asistencia
              personalizada y una app que te conecta con los mejores destinos en
              Ecuador.
              <br />
              <br />
              <strong>
                ¿Puedo reservar en fechas especiales y temporada alta?
              </strong>{" "}
              Sí, nuestros precios están bloqueados incluso en temporada alta
              para que nunca pierdas la oportunidad de viajar.
              <br />
              <br />
              <strong>¿Cómo se realiza el pago?</strong> Puedes pagar en un solo
              pago de $97 USD o en 12 cómodos pagos de $8.08 USD, de forma
              segura y sencilla.
            </p>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <label className="text-orange-400 text-xl font-semibold py-3">
              Tu Nueva Historia Comienza Ahora
            </label>
            <p className="text-justify text-gray-400 text-lg">
              Recuerda, tú eres el protagonista de tus aventuras. No permitas
              que los altos costos te roben la oportunidad de explorar el mundo
              y crear recuerdos inolvidables. Con Visita Ecuador, tu próxima
              gran aventura está a un clic de distancia.
            </p>
            <button
              className="bg-greenVE-500 text-white py-2 px-4 rounded-full my-5"
              onClick={handleOpen}
            >
              Únete a Visita Ecuador Ahora
            </button>
          </div>
          <div className="w-1/2 flex items-center justify-center p-8">
            <img
              src="https://visitaecuador.com/img/web/seccion-7.jpg"
              className="w-full"
            />
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-2/3  z-50">
            <div className="bg-white p-2 rounded-md flex justify-center items-center">
              <div className="flex-col w-full justify-center ">
                <button
                  className={`bg-${"red-600"} text-white rounded-full h-8 w-8 font-bold`}
                  onClick={() => handleClose()}
                >
                  X
                </button>
                <BuySuscription />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full justify-center bg-gray-500 mt-16">
        <img
          className="w-32 h-32"
          src="https://visitaecuador.com/img/web/ve_logo.svg"
          alt="Visita Ecuador Logo"
        />
      </div>
    </>
  );
};

export default Suscribete;
