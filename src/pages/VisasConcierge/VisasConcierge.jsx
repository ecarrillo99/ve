import { useState } from "react";
import { lazy, Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  NavbarSkeleton,
  ContentSkeleton,
} from "../../components/global_components/Skeleton/Loadingkeleton";

const Navbar = lazy(
  () => import("../../components/global_components/navbar/Navbar"),
);
const Footer = lazy(
  () => import("../../components/global_components/footer/Footer"),
);

const VisasConcierge = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil
  const { codigo } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    nombres: "",
    cedula: "",
    telefono: "",
    mail: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const { nombres, cedula, telefono, mail, mensaje } = formData;
    if (
      nombres.trim() !== "" &&
      cedula.trim() !== "" &&
      telefono.trim() !== "" &&
      mail.trim() !== "" &&
      mensaje.trim() !== ""
    ) {
      const whatsappNumber = "593958955143"; // replace with the actual WhatsApp number
      const textMessage = `Nombres: ${nombres}\nCédula: ${cedula}\nTeléfono: ${telefono}\nEmail: ${mail}\nMensaje: ${mensaje}`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        textMessage,
      )}`;
      window.open(url, "_blank");
    } else {
      alert("Por favor, complete todos los campos del formulario.");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    if (codigo) {
      localStorage.setItem("codigo", codigo);
    } else {
      localStorage.removeItem("codigo");
    }
  }, [codigo]);

  return (
    <>
    
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar activo={5} />
        </Suspense>
      <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 -m-12">
        <div className="flex items-center justify-center mt-20  mb-10">
          <img
            className="w-[250px]"
            src="https://visitaecuador.com/img/web/visas-concierge.jpeg"
            alt=""
          />
        </div>
        <form className="flex flex-col gap-4 px-20" onSubmit={handleSubmit}>
          <input
            className={`border rounded-lg p-2 ${
              isSubmitted && !formData.nombres.trim()
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="text"
            name="nombres"
            placeholder="Nombres Completos *"
            value={formData.nombres}
            onChange={handleChange}
            required
          />
          <input
            className={`border rounded-lg p-2 ${
              isSubmitted && !formData.cedula.trim()
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="text"
            name="cedula"
            placeholder="Cédula *"
            value={formData.cedula}
            onChange={handleChange}
            required
          />
          <input
            className={`border rounded-lg p-2 ${
              isSubmitted && !formData.telefono.trim()
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="tel"
            name="telefono"
            placeholder="Teléfono *"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
          <input
            className={`border rounded-lg p-2 ${
              isSubmitted && !formData.mail.trim()
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="email"
            name="mail"
            placeholder="Email *"
            value={formData.mail}
            onChange={handleChange}
            required
          />
          <textarea
            className={`border rounded-lg p-2 ${
              isSubmitted && !formData.mensaje.trim()
                ? "border-red-500"
                : "border-gray-300"
            }`}
            rows="4"
            name="mensaje"
            placeholder="Mensaje *"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
          <button
            className="bg-greenVE-500 hover:bg-greenVE-600 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
      {!codigo && (
        <Suspense fallback={<ContentSkeleton />}>
          <Footer />
        </Suspense>
      )}
    </>
  );
};

export default VisasConcierge;
