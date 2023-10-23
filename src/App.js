import {Route, HashRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Search from "./pages/search/search";
import { DefaultToken } from "./controllers/web/webController";

function App() {
  DefaultToken("192.168.0.1")
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotelss" element={<Search/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
      </Routes>
    </Router>
  );
}

export default App;
