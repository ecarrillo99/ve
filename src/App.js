//import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
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
      </Routes>
    </Router>
  );
}

export default App;
