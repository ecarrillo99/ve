import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
//import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Search from "./pages/search/search";
import React, { useEffect, useState } from "react";
import Login from "./pages/login/login";
import Suscription from "./pages/suscription/Suscription";
import Profile from "./pages/Profile/Profile";
import BookHistory from "./pages/BookHistory/BookHistory";
import Favorites from "./pages/Favorites/Favorites";
function App() {
  
  return (
    (<Router basename="">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/busqueda/" element={<Search />} />
        <Route path="/perfil/" element={<Profile/>} />
        <Route path="/historial/" element={<BookHistory/>}/>
        <Route path="/favoritos/" element={<Favorites/>}/>
        <Route path="/suscripcion/" element={<Suscription />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/hotel/:nombre" element={<Hotel />} />
      </Routes>
    </Router>)

  );
}

export default App;
