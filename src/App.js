import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Search from "./pages/search/search";
import React, { useEffect, useState } from "react";
function App() {
  
  return (
    (<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel/" element={<Search />} />
        <Route path="/hotel/:id" element={<Hotel />} />
      </Routes>
    </Router>)

  );
}

export default App;
