//import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
/*import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Search from "./pages/search/search";
import React, { useEffect, useState } from "react";
import Login from "./pages/login/login";
import Suscription from "./pages/suscription/Suscription";
import Profile from "./pages/Profile/Profile";
import BookHistory from "./pages/BookHistory/BookHistory";
import Favorites from "./pages/Favorites/Favorites";
import About from "./pages/About/About";
import Politicas from "./pages/Politicas/Politicas";
import Terminos from "./pages/Terminos/Terminos";
import Certificado from "./pages/Certificado/Certificado";
import Disney from "./pages/Disney/Disney";
import YaGanaste from "./pages/yaganaste/yaganaste";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/nosotros/:seccion?" element={<About/>} />
        <Route path="/busqueda/" element={<Search />} />
        <Route path="/perfil/" element={<Profile/>} />
        <Route path="/historial/" element={<BookHistory/>}/>
        <Route path="/favoritos/" element={<Favorites/>}/>
        <Route path="/suscripcion/" element={<Suscription />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/hotel/:nombre" element={<Hotel />} />
        <Route path="/politicas-privacidad/" element={<Politicas />} />
        <Route path="/terminos-condiciones/" element={<Terminos />} />
        <Route path="/certificado/" element={<Certificado />} />
        <Route path="/disney/" element={<Disney />} />
        <Route path="/yaganaste/" element={<YaGanaste />} />
      </Routes>
    </Router>
  );
}

export default App;*/

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Short from './pages/Short/short';

// Importa los componentes utilizando lazy
const Home = lazy(() => import('./pages/home/Home'));
const Hotel = lazy(() => import('./pages/hotel/Hotel'));
const HotelMobile = lazy(() => import('./pages/hotel/HotelMobile'));
const Search = lazy(() => import('./pages/search/search'));
const SearchMobile = lazy(() => import('./pages/search/SearchMobile'));
const Login = lazy(() => import('./pages/login/login'));
const Suscription = lazy(() => import('./pages/suscription/Suscription'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const BookHistory = lazy(() => import('./pages/BookHistory/BookHistory'));
const Favorites = lazy(() => import('./pages/Favorites/Favorites'));
const About = lazy(() => import('./pages/About/About'));
const Politicas = lazy(() => import('./pages/Politicas/Politicas'));
const Terminos = lazy(() => import('./pages/Terminos/Terminos'));
const Certificado = lazy(() => import('./pages/Certificado/Certificado'));
const Disney = lazy(() => import('./pages/Disney/Disney'));
const YaGanaste = lazy(() => import('./pages/yaganaste/yaganaste'));
const contactos = ["593986263432", "593980644467", "593981850436"]

const handleOnClick = () => {
  const contacto = contactos[Math.floor(Math.random() * contactos.length)];
  const path = "https://wa.me/" + contacto
  window.open(path, '_blank')
}
function App() {
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
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Suspense /*fallback={<div>Loading...</div>}*/><Home /></Suspense>} />
          <Route path="/nosotros/:seccion?" element={<Suspense><About /></Suspense>} />
          <Route path="/busqueda/" element={<Suspense>{isMobile ? <SearchMobile /> : <Search />}</Suspense>} />
          <Route path="/perfil/" element={<Suspense><Profile /></Suspense>} />
          <Route path="/historial/" element={<Suspense><BookHistory /></Suspense>} />
          <Route path="/favoritos/" element={<Suspense><Favorites /></Suspense>} />
          <Route path="/suscripcion/" element={<Suspense><Suscription /></Suspense>} />
          <Route path="/login/" element={<Suspense><Login /></Suspense>} />
          <Route path="/hotel/:nombre" element={<Suspense>{isMobile ? <HotelMobile /> : <Hotel />}</Suspense>} />
          <Route path="/politicas-privacidad/" element={<Suspense><Politicas /></Suspense>} />
          <Route path="/terminos-condiciones/" element={<Suspense><Terminos /></Suspense>} />
          <Route path="/certificado/" element={<Suspense><Certificado /></Suspense>} />
          <Route path="/disney/" element={<Suspense><Disney /></Suspense>} />
          <Route path="/yaganaste/" element={<Suspense><YaGanaste /></Suspense>} />
          <Route path="/short/:id" element={<Suspense><Short /></Suspense>} />
        </Routes>
      </Router>
      {!isMobile ? <div className="fixed bottom-5 right-0 bg-transparent  py-2 rounded-full cursor-pointer" onClick={() => handleOnClick()}>
        <img className='h-16 md:h-32 z-50' src="./img/web/central.svg" />
      </div> : <></>
      }
    </>

  );
}

export default App;
