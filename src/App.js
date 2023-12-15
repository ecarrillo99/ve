import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
//import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Search from "./pages/search/search";
import React, { useEffect, useState } from "react";
import Login from "./pages/login/login";
import Suscription from "./pages/suscription/Suscription";
function App() {
  
  return (
    (<Router  >
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/busqueda/" element={<Search />} />
        <Route path="/suscripcion/" element={<Suscription />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/hotel/:id" element={<Hotel />} />
      </Routes>
    </Router>)

  );
}

export default App;
