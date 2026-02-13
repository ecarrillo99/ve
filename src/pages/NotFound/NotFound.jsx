import React from 'react';
import { lazy, useEffect, useState, Suspense } from 'react';
import { useParams } from 'react-router-dom';
const Navbar = lazy(() => import("../../components/global_components/navbar/Navbar"));
const Footer = lazy(() => import("../../components/global_components/footer/Footer"));
const SearchBar = lazy(() => import("../../components/global_components/searchBar/searchBar"));

const NotFound = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { codigo } = useParams();
    if (codigo) {
        localStorage.setItem('codigo', codigo);
    } else {
        localStorage.removeItem('codigo')
    }
    return (
        <>
          <Suspense><Navbar activo={1} /></Suspense>
            
            <div class="bg-right bg-no-repeat bg-contain  w-full -mb-20" style={{ backgroundImage: "url('https://visitaecuador.com/img/web/404-background.webp')" }}>
                <div className="px-6 mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 -m-12 w-full pb-24">
                    <div className='flex flex-col gap-4 h-72 md:h-[500px] justify-center items-center'>
                        <div className='flex gap-2 w-full items-center justify-center'>
                            <div className='h-10 w-10 md:w-20 md:h-20'>
                                <span className="icon-[noto-v1--warning] w-10 h-10 md:w-20 md:h-20"></span>
                            </div>
                            <label className='text-5xl md:text-8xl font-bold text-gray-600'>Error 404</label>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex justify-center w-10 h-5 md:w-20 md:h-10'>
                                <span className="icon-[gala--search] w-5 h-5 md:w-10 md:h-10 text-gray-600"></span>
                            </div>
                            <label class='text-sm md:text-xl font-bold text-gray-600 leading-4'>Oops, parece que la página se perdió.<br></br>Retoma tu camino desde el principio.</label>
                        </div>
                    </div>
                    {
                        isMobile
                        ?<div className="pt-4">
                            <Suspense><SearchBar type={3}/></Suspense>
                            </div>
                        :<Suspense><SearchBar type={0}/></Suspense>
                    }
                </div>
            </div>
            {
                !codigo && <Suspense><Footer /></Suspense>
            }
        </>
    );
};

export default NotFound;