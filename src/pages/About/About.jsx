import { useParams } from "react-router-dom";
import ActivarVisitaPack from "../../components/about_components/activar_visitapack";
import ComprarSuscripcion from "../../components/about_components/comprar_suscripcion";
import DescargarApp from "../../components/about_components/descargar_app";
import FilosofiaTrabajo from "../../components/about_components/filosofia_trabajo";
import GenerarCertificado from "../../components/about_components/generar_certificado";
import MisionVisionValores from "../../components/about_components/mision_vision_valores";
import Objetivos from "../../components/about_components/objetivos";
import QuienesSomos from "../../components/about_components/quienes_somos";
import ReconocimientosEntidades from "../../components/about_components/reconocimientos_entidades";
import ReconocimientosMinisterio from "../../components/about_components/reconocimientos_ministerio";
import ReconocimientosMunicipio from "../../components/about_components/reconocimientos_municipios";
import Reservar from "../../components/about_components/reservar";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import {Accordion, AccordionHeader, AccordionBody,} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";

const About=()=>{
    const { seccion } = useParams();
    const [refsReady, setRefsReady] = useState(false); 
    function Icon({ id, open }) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        );
    }

    const [open, setOpen] = useState(0);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const sectionRefs = {
        quienesSomos: useRef(null),
        mision: useRef(null),
        politicas: useRef(null),
        objetivos: useRef(null),
        descargarapp: useRef(null),
        suscripcion: useRef(null),
        reserva: useRef(null),
        certificado: useRef(null),
        codigo: useRef(null),
        municipios: useRef(null),
        ministerios: useRef(null),
        entidades: useRef(null),
        // Agrega tantas secciones como necesites
    };
    
    const scrollToSection = (section) => {
        sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        // Función para verificar si todas las referencias están definidas
        const areRefsReady = () => {
            for (const key in sectionRefs) {
                if (sectionRefs[key].current === null) {
                    return false;
                }
            }
            return true;
        };

        // Verifica si todas las referencias están listas
        const isReady = areRefsReady();

        // Si todas las referencias están listas, actualiza el estado
        if (isReady) {
            setRefsReady(true);
        }
    }, [sectionRefs]);

    useEffect(() => {
        if (refsReady && seccion && sectionRefs[seccion]) {
            sectionRefs[seccion].current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [seccion, refsReady, sectionRefs]);
    return(
        <>
        <Navbar/>
            <div className="flex flex-col mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 gap-7">
                <div className="flex">
                    <div className="w-1/3 pr-10 ">
                        <div className="sticky top-4">
                        <Accordion className="pb-1 " open={open === 2} icon={<Icon id={2} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-[#f9c267] font-medium text-white px-2 h-7" onClick={() => handleOpen(2)}>
                                <p className="font-normal ">Empresa</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-[#f9c267] py-2 border-b flex " onClick={()=>scrollToSection('quienesSomos')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white" >Quienes somos</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#f9c267] py-2  border-b" onClick={()=>scrollToSection('mision')}>
                                <div className="px-2  flex flex-col gap-1 ">
                                    <label className="text-white">Misión, visión y valores</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#f9c267] py-2  border-b" onClick={()=>scrollToSection('politicas')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white">Políticas de Calidad y Sostenibilidad</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#f9c267] py-2  border-b" onClick={()=>scrollToSection('objetivos')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white">Objetivos</label>
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <Accordion className="pb-1 " open={open === 1} icon={<Icon id={1} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-[#ad1d1d] font-medium text-white px-2 h-7" onClick={() => handleOpen(1)}>
                                <p className="font-normal ">App</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-[#ad1d1d] py-2 border-b flex " onClick={()=>scrollToSection('descargarapp')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white" >Descargar App</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#ad1d1d] py-2  border-b" onClick={()=>scrollToSection('suscripcion')}>
                                <div className="px-2  flex flex-col gap-1 ">
                                    <label className="text-white">Comprar suscripción</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#ad1d1d] py-2  border-b" onClick={()=>scrollToSection('reserva')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white">Generar reserva</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#ad1d1d] py-2  border-b" onClick={()=>scrollToSection('certificado')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white">Generar certificado</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#ad1d1d] py-2  border-b" onClick={()=>scrollToSection('codigo')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white">Activar códigos</label>
                                </div>
                            </AccordionBody>
                        </Accordion>
                        <Accordion className="pb-1 " open={open === 3} icon={<Icon id={3} open={open} />}>
                            <AccordionHeader className="-mt-1 text-base bg-[#006b68] font-medium text-white px-2 h-7" onClick={() => handleOpen(3)}>
                                <p className="font-normal ">Reconocimientos</p>
                            </AccordionHeader>
                            <AccordionBody className="bg-[#006b68] py-2 border-b flex " onClick={()=>scrollToSection('municipios')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white" >Municipios</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#006b68] py-2  border-b" onClick={()=>scrollToSection('ministerios')}>
                                <div className="px-2  flex flex-col gap-1 ">
                                    <label className="text-white">Ministerios</label>
                                </div>
                            </AccordionBody>
                            <AccordionBody className="bg-[#006b68] py-2  border-b" onClick={()=>scrollToSection('entidades')}>
                                <div className="px-2  flex flex-col gap-1">
                                    <label className="text-white">Entidades Particulares</label>
                                </div>
                            </AccordionBody>
                        </Accordion>
                        </div>    
                    </div>
                    <div className="w-2/3 flex flex-col gap-y-20" >
                        <div ref={sectionRefs.quienesSomos}>
                            <QuienesSomos />
                        </div>
                        <div ref={sectionRefs.mision}>
                            <MisionVisionValores />
                        </div>
                        <div ref={sectionRefs.politicas}>
                            <FilosofiaTrabajo />
                        </div>
                        <div ref={sectionRefs.objetivos}>
                            <Objetivos />
                        </div>
                        <div ref={sectionRefs.descargarapp}>
                            <DescargarApp />
                        </div>
                        <div ref={sectionRefs.suscripcion}>
                            <ComprarSuscripcion />
                        </div>
                        <div ref={sectionRefs.reserva}>
                            <Reservar />
                        </div>
                        <div ref={sectionRefs.certificado}>
                            <GenerarCertificado />
                        </div>
                        <div ref={sectionRefs.codigo}>
                            <ActivarVisitaPack />
                        </div>
                        <div ref={sectionRefs.municipios}>
                            <ReconocimientosMunicipio />
                        </div>
                        <div ref={sectionRefs.ministerios}>
                            <ReconocimientosMinisterio />
                        </div>
                        <div ref={sectionRefs.entidades}>
                            <ReconocimientosEntidades />
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
        </>
    );
}

export default About;