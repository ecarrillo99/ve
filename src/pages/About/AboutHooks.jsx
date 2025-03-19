import { useState, useEffect, useRef } from 'react';
import React from 'react';
import QuienesSomos from "../../components/about_components/aboutSubmenu_components/quienes_somos";
import MisionVisionValores from "../../components/about_components/aboutSubmenu_components/empresa/mision_vision_valores";
import FilosofiaTrabajo from "../../components/about_components/aboutSubmenu_components/empresa/filosofia_trabajo";
import Politica from "../../components/about_components/aboutSubmenu_components/empresa/Politica"
import Objetivos from "../../components/about_components/aboutSubmenu_components/empresa/objetivos";
import DescargarApp from "../../components/about_components/descargar_app";
import ComprarSuscripcion from "../../components/about_components/comprar_suscripcion";
import GenerarCertificado from "../../components/about_components/generar_certificado";
import ActivarVisitaPack from "../../components/about_components/activar_visitapack";
import ReconocimientosEntidades from "../../components/about_components/reconocimientos_entidades";
import ReconocimientosMinisterio from "../../components/about_components/reconocimientos_ministerio";
import ReconocimientosMunicipio from "../../components/about_components/reconocimientos_municipios";
import Reservar from "../../components/about_components/aboutSubmenu_components/reservar";
import ClubViajes from "../../components/about_components/club_viajes";
import Beneficios from "../../components/about_components/aboutSubmenu_components/beneficios";
import SuscripcionBusiness from "../../components/about_components/suscripcion_business";
import Smart from "../../components/about_components/smart";
import VisitaAwards from "../../components/about_components/visita_awards";
import Servicios from "../../components/about_components/servicios";
import VisaInternacional from "../../components/about_components/visa_internacional";
import ListadoHoteles from "../../components/about_components/listado_hoteles";
import TurismoExpress from "../../components/about_components/turismo_express";
import Certificaciones from "../../components/about_components/certificaciones";
import Testimonios from "../../components/about_components/testimonios";
import Prensa from "../../components/about_components/prensa";
import Enlaces from "../../components/about_components/enlaces";
import BeneficiosyVentajas from "../../components/about_components/aboutSubmenu_components/BenficiosyVentajas";
import ServiciosSubmenu from "../../components/about_components/aboutSubmenu_components/serviciosSubmenu";
import Edes from "../../components/about_components/aboutSubmenu_components/certificados/Edes";
import MinisiterioTurismo from "../../components/about_components/aboutSubmenu_components/certificados/MinisterioTurismo";
import SuperIntendencia from "../../components/about_components/aboutSubmenu_components/certificados/SuperIntendenciaBancos";
import MinisterioTrabajo from "../../components/about_components/aboutSubmenu_components/certificados/MinisterioTrabajo";
import IESS from "../../components/about_components/aboutSubmenu_components/certificados/IESS";
import MarcaPais from "../../components/about_components/aboutSubmenu_components/certificados/MarcaPais";
import SRI from "../../components/about_components/aboutSubmenu_components/certificados/SRI";
import SuperIntendenciaC from "../../components/about_components/aboutSubmenu_components/certificados/SuperCompañias";
import Hoteles from "../../components/about_components/aboutSubmenu_components/certificados/Hoteles";
import CertificadosC from "../../components/about_components/aboutSubmenu_components/certificados/CertificadosCumplimientos";
import PermisosF from "../../components/about_components/aboutSubmenu_components/certificados/PermisosFuncionamiento";
import QuitoT from "../../components/about_components/aboutSubmenu_components/certificados/QuitoTurismo";


export const menuStructure = [
    {
        key: 'empresa',
        title: 'Empresa',
        color: '#cab08a',
        hasSubmenu: true,
        submenuItems: [
            { key: 'quienesSomos', title: 'Quienes Somos', section: 'quienesSomos'  },
            { key: 'misionVision', title: 'Misión, Visión, Valores', section: 'mision' },
            { key: 'filosofia', title: 'Filosofía de Trabajo', section: 'filosofia' },
            { key: 'politicaCalidad', title: 'Política de Calidad', section: 'politica' },
            { key: 'objetivos', title: 'Objetivos', section: 'objetivos' },
            { key: 'boletines', title: 'Boletines', section: 'boletines' }
        ]
    },
    {
        key: 'clubVisita',
        title: 'Club Visita',
        color: '#9bca72',
        hasSubmenu: true,
        submenuItems: [
            { key: 'clubViajes', title: 'Club de Viajes', section: 'clubViajes' },
            { key: 'beneficios', title: 'Beneficios', section: 'beneficios' },
            { key: 'suscripcionBusiness', title: 'Suscripción Business', section: 'suscripcionBusiness' },
            { key: 'smart', title: 'SMART', section: 'smart' }
        ]
    },
    {
        key: 'app',
        title: 'App',
        color: '#e58e8e',
        hasSubmenu: true,
        submenuItems: [
            { key: 'comercial', title: 'Comercial', section: 'descargarapp' },
            { key: 'reservar', title: 'Reservar', section: 'reserva' }
        ]
    },
    {
        key: 'visitaAwards',
        title: 'VisitaEcuador Awards',
        color: '#c993c9',
        section: 'visitaAwards',
        hasSubmenu: false
    },
    {
        key: 'servicios',
        title: 'Servicios',
        color: '#7accc7',
        hasSubmenu: false,
    },
    {
        key: 'visaInternacional',
        title: 'Visa Internacional',
        color: '#98b7e5',
        section: 'visaInternacional',
        hasSubmenu: true,
        submenuItems: [
            { key: 'serviciosSubmenu', title: 'Servicios', section: 'serviciosSubmenu' },
            { key: 'beneficiosVentajas', title: 'Beneficios y Ventajas', section: 'beneficiosVentajas' }
        ]
    },
    {
        key: 'listadoHoteles',
        title: 'Listado de Hoteles',
        color: '#c993c9',
        section: 'listadoHoteles',
        hasSubmenu: false
    },
    {
        key: 'turismoExpress',
        title: 'Turismo Express',
        color: '#9bca72',
        section: 'turismoExpress',
        hasSubmenu: false
    },
    {
        key: 'reconocimientos',
        title: 'Reconocimientos',
        color: '#7accc7',
        section: 'entidades',
        hasSubmenu: true,
        submenuItems: [
            {key: 'entidades', title: 'Entidades', section: 'entidades'},
            { key: 'municipios', title: 'Municipios', section: 'municipios' },
            { key: 'ministerios', title: 'Ministerios', section: 'ministerios' }
        ]
    },
    {
        key: 'certificaciones',
        title: 'Certificaciones',
        color: '#a1a0a0',
        hasSubmenu: true,
        submenuItems: [
            { key: 'edes', title: 'Edes', section: 'edes' },
            { key: 'ministerioTurismo', title: 'Ministerio de Turismo', section: 'ministerioTurismo' },
            { key: 'superintendencia', title: 'Superintendencia de Bancos', section: 'superintendencia' },
            { key: 'ministerioTrabajo', title: 'Ministerio del Trabajo', section: 'ministerioTrabajo' },
            { key: 'iess', title: 'IESS', section: 'iess' },
            { key: 'marcaPais', title: 'Marca País', section: 'marcaPais' },
            { key: 'sri', title: 'SRI', section: 'sri' },
            { key: 'superCompanias', title: 'Super de Compañías', section: 'superCompanias' },
            { key: 'hoteles', title: 'Hoteles', section: 'hoteles' },
            { key: 'permisos', title: 'Permisos de Funcionamiento', section: 'permisos' },
            { key: 'certificados', title: 'Certificados de Cumplimiento', section: 'certificados' },
            { key: 'quitoTurismo', title: 'Quito Turismo', section: 'quitoTurismo' }
        ]
    },
    {
        key: 'testimonios',
        title: 'Testimonios',
        color: '#e58e8e',
        section: 'testimonios',
        hasSubmenu: false
    },
    {
        key: 'prensa',
        title: 'Prensa',
        color: '#7accc7',
        section: 'prensa',
        hasSubmenu: false
    },
    {
        key: 'enlaces',
        title: 'Enlaces',
        color: '#9bca72',
        section: 'enlaces',
        hasSubmenu:false,
    }
];

export const sectionGroups = {
    quienesSomos: { group: 'empresa' },
    mision: { group: 'empresa' },
    filosofia:{group: 'empresa'},
    politica: { group: 'empresa' },
    objetivos: { group: 'empresa' },
    boletines: { group: 'empresa' },

    clubViajes: { group: 'clubVisita' },
    beneficios: { group: 'clubVisita' },
    suscripcionBusiness: { group: 'clubVisita' },
    smart: { group: 'clubVisita' },

    descargarapp: { group: 'app' },
    reserva: { group: 'app' },

    visitaAwards: { group: 'visitaAwards' },

    servicios: { group: 'servicios' },

    visaInternacional: { group: 'visaInternacional' },
    serviciosSubmenu: { group: 'visaInternacional' },
    beneficiosVentajas: { group: 'visaInternacional' },

    listadoHoteles: { group: 'listadoHoteles' },

    turismoExpress: { group: 'turismoExpress' },

    entidades: { group: 'reconocimientos' },
    municipios: { group: 'reconocimientos' },
    ministerios: { group: 'reconocimientos' },

    certificaciones: { group: 'certificaciones' },
    edes: { group: 'certificaciones' },
    ministerioTurismo: { group: 'certificaciones' },
    superintendencia: { group: 'certificaciones' },
    ministerioTrabajo: { group: 'certificaciones' },
    iess: { group: 'certificaciones' },
    marcaPais: { group: 'certificaciones' },
    sri: { group: 'certificaciones' },
    superCompanias: { group: 'certificaciones' },
    hoteles: { group: 'certificaciones' },
    permisos: { group: 'certificaciones' },
    certificados: { group: 'certificaciones' },
    quitoTurismo: { group: 'certificaciones' },

    testimonios: { group: 'testimonios' },

    prensa: { group: 'prensa' },

    enlaces: { group: 'enlaces' },

    suscripcion: { group: 'suscripcion' },
    certificado: { group: 'certificado' },
    codigo: { group: 'codigo' },
};

export function useViewport() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { isMobile };
}

export function useSectionTracking(initialSection) {
    const [refsReady, setRefsReady] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [openSubmenus, setOpenSubmenus] = useState({});

    const observersRef = useRef({});

    const sectionRefs = {
        quienesSomos: useRef(null),
        mision: useRef(null),
        filosofia: useRef(null),
        politica: useRef(null),
        objetivos: useRef(null),
        boletines: useRef(null),
        descargarapp: useRef(null),
        suscripcion: useRef(null),
        reserva: useRef(null),
        certificado: useRef(null),
        codigo: useRef(null),
        municipios: useRef(null),
        ministerios: useRef(null),
        entidades: useRef(null),
        clubViajes: useRef(null),
        beneficios: useRef(null),
        suscripcionBusiness: useRef(null),
        smart: useRef(null),
        visitaAwards: useRef(null),
        servicios: useRef(null),
        visaInternacional: useRef(null),
        listadoHoteles: useRef(null),
        turismoExpress: useRef(null),
        certificaciones: useRef(null),
        testimonios: useRef(null),
        prensa: useRef(null),
        enlaces: useRef(null),
        serviciosSubmenu: useRef(null),
        beneficiosVentajas: useRef(null),
        edes: useRef(null),
        ministerioTurismo: useRef(null),
        superintendencia: useRef(null),
        ministerioTrabajo: useRef(null),
        iess: useRef(null),
        marcaPais: useRef(null),
        sri: useRef(null),
        superCompanias: useRef(null),
        hoteles: useRef(null),
        permisos: useRef(null),
        certificados: useRef(null),
        quitoTurismo: useRef(null)
    };

    const scrollToSection = (section) => {
        if (sectionRefs[section] && sectionRefs[section].current) {
            sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(section);

            const sectionInfo = sectionGroups[section];
            if (sectionInfo) {
                const menuItem = menuStructure.find(item => item.key === sectionInfo.group);
                if (menuItem && menuItem.hasSubmenu) {
                    setOpenSubmenus(prev => ({
                        ...prev,
                        [menuItem.key]: true
                    }));
                }
            }
        }
    };

    useEffect(() => {
        const areRefsReady = () => {
            for (const key in sectionRefs) {
                if (sectionRefs[key].current === null) {
                    return false;
                }
            }
            return true;
        };

        const checkRefsInterval = setInterval(() => {
            const isReady = areRefsReady();
            if (isReady) {
                setRefsReady(true);
                clearInterval(checkRefsInterval);
            }
        }, 100);

        return () => clearInterval(checkRefsInterval);
    }, []);

    useEffect(() => {
        if (refsReady) {
            Object.values(observersRef.current).forEach(observer => {
                if (observer) observer.disconnect();
            });

            Object.keys(sectionRefs).forEach(section => {
                if (sectionRefs[section].current) {
                    const observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                                    setActiveSection(section);

                                    const sectionInfo = sectionGroups[section];
                                    if (sectionInfo) {
                                        const menuItem = menuStructure.find(item => item.key === sectionInfo.group);
                                        if (menuItem && menuItem.hasSubmenu) {
                                            setOpenSubmenus(prev => ({
                                                ...prev,
                                                [menuItem.key]: true
                                            }));
                                        }
                                    }
                                }
                            });
                        },
                        { threshold: 0.5 }
                    );

                    observer.observe(sectionRefs[section].current);
                    observersRef.current[section] = observer;
                }
            });
        }

        return () => {
            Object.values(observersRef.current).forEach(observer => {
                if (observer) observer.disconnect();
            });
        };
    }, [refsReady]);

    useEffect(() => {
        if (refsReady && initialSection && sectionRefs[initialSection]?.current) {
            sectionRefs[initialSection].current.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(initialSection);

            const sectionInfo = sectionGroups[initialSection];
            if (sectionInfo) {
                const menuItem = menuStructure.find(item => item.key === sectionInfo.group);
                if (menuItem && menuItem.hasSubmenu) {
                    setOpenSubmenus(prev => ({
                        ...prev,
                        [menuItem.key]: true
                    }));
                }
            }
        }
    }, [initialSection, refsReady]);

    return {
        sectionRefs,
        activeSection,
        refsReady,
        openSubmenus,
        setOpenSubmenus,
        scrollToSection
    };
}


const AboutHooks = ({ sectionRefs }) => {
    return (
        <>
            <div ref={sectionRefs.quienesSomos}>
                <QuienesSomos/>
            </div>
            <div ref={sectionRefs.mision}>
                <MisionVisionValores/>
            </div>
            <div ref={sectionRefs.filosofia}>
                <FilosofiaTrabajo/>
            </div>
            <div ref={sectionRefs.politica}>
                <Politica/>
            </div>
            <div ref={sectionRefs.objetivos}>
                <Objetivos/>
            </div>
            <div ref={sectionRefs.boletines}>
                <div className="my-8">
                    <h2 className="text-2xl font-bold mb-4 text-[#ffa30f]">Boletines</h2>
                    <p>Contenido de boletines...</p>
                </div>
            </div>

            <div className="mt-10" ref={sectionRefs.clubViajes}>
                <ClubViajes/>
            </div>
            <div className="mt-10" ref={sectionRefs.beneficios}>
                <Beneficios/>
            </div>
            <div className="mt-10" ref={sectionRefs.suscripcionBusiness}>
                <SuscripcionBusiness/>
            </div>
            <div className="mt-10" ref={sectionRefs.smart}>
                <Smart/>
            </div>

            <div className="mt-10" ref={sectionRefs.descargarapp}>
                <DescargarApp/>
            </div>
            <div className="mt-10" ref={sectionRefs.reserva}>
                <Reservar/>
            </div>

            <div className="mt-10" ref={sectionRefs.visitaAwards}>
                <VisitaAwards/>
            </div>

            <div className="mt-10" ref={sectionRefs.serviciosSubmenu}>
                <Servicios/>
            </div>

            <div className="mt-10" ref={sectionRefs.visaInternacional}>
                <VisaInternacional/>
            </div>
            <div className="mt-10" ref={sectionRefs.serviciosSubmenu}>
                <ServiciosSubmenu/>
            </div>
            <div className="mt-10" ref={sectionRefs.beneficiosVentajas}>
                <BeneficiosyVentajas/>
            </div>

            <div className="mt-10" ref={sectionRefs.listadoHoteles}>
                <ListadoHoteles/>
            </div>

            <div className="mt-10" ref={sectionRefs.turismoExpress}>
                <TurismoExpress/>
            </div>

            <div className="mt-10" ref={sectionRefs.entidades}>
                <ReconocimientosEntidades/>
            </div>
            <div className="mt-10" ref={sectionRefs.municipios}>
                <ReconocimientosMunicipio/>
            </div>
            <div className="mt-10" ref={sectionRefs.ministerios}>
                <ReconocimientosMinisterio/>
            </div>

            <div className="mt-10" ref={sectionRefs.edes}>
                <Edes/>
            </div>
            <div className="mt-10" ref={sectionRefs.ministerioTurismo}>
                <MinisiterioTurismo/>
            </div>
            <div className="mt-10" ref={sectionRefs.superintendencia}>
                <SuperIntendencia/>
            </div>
            <div className="mt-10" ref={sectionRefs.ministerioTrabajo}>
                <MinisterioTrabajo/>
            </div>
            <div className="mt-10" ref={sectionRefs.iess}>
                <IESS/>
            </div>
            <div className="mt-10" ref={sectionRefs.marcaPais}>
                <MarcaPais/>
            </div>
            <div className="mt-10" ref={sectionRefs.sri}>
                <SRI/>
            </div>
            <div className="mt-10" ref={sectionRefs.superCompanias}>
                <SuperIntendenciaC/>
            </div>
            <div className="mt-10" ref={sectionRefs.hoteles}>
                <Hoteles/>
            </div>
            <div className="mt-10" ref={sectionRefs.permisos}>
                <PermisosF/>
            </div>
            <div className="mt-10" ref={sectionRefs.certificados}>
                <CertificadosC/>
            </div>
            <div className="mt-10" ref={sectionRefs.quitoTurismo}>
                <QuitoT/>
            </div>

            <div className="mt-10" ref={sectionRefs.testimonios}>
                <Testimonios/>
            </div>

            <div className="mt-10" ref={sectionRefs.prensa}>
                <Prensa/>
            </div>

            <div className="mt-10" ref={sectionRefs.enlaces}>
                <Enlaces/>
            </div>

            <div className="mt-10" ref={sectionRefs.suscripcion}>
                <ComprarSuscripcion/>
            </div>

            <div className="mt-10" ref={sectionRefs.certificado}>
                <GenerarCertificado/>
            </div>

            <div className="mt-10" ref={sectionRefs.codigo}>
                <ActivarVisitaPack/>
            </div>
        </>
    );
};

export default AboutHooks;
