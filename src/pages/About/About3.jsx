import React, { Suspense } from 'react';
import { useParams } from "react-router-dom";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";
import AboutMenu from "./AboutMenu";
import AboutHooks from "./AboutHooks";
import { useViewport, useSectionTracking } from "./AboutHooks";

const About = () => {
    const { seccion } = useParams();
    const { isMobile } = useViewport();
    const {
        sectionRefs,
        activeSection,
        refsReady,
        openSubmenus,
        setOpenSubmenus,
        scrollToSection
    } = useSectionTracking(seccion);

    return (
        <>
            {isMobile
                ? <Suspense fallback={<div>Cargando...</div>}><NavbarMobile activo={1}/></Suspense>
                : <Suspense fallback={<div>Cargando...</div>}><Navbar activo={1}/></Suspense>
            }
            <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 md:pr-6">
                        <AboutMenu
                            activeSection={activeSection}
                            openSubmenus={openSubmenus}
                            setOpenSubmenus={setOpenSubmenus}
                            scrollToSection={scrollToSection}
                        />
                    </div>

                    <div className="w-full md:w-3/4 mt-6 md:mt-0">
                        <AboutHooks sectionRefs={sectionRefs} />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default About;
