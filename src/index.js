import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const contactos = ["593986263432", "593980644467", "593981850436"]
const handleOnClick=()=>{
  const contacto = contactos[Math.floor(Math.random() * contactos.length)];
  const path = "https://wa.me/"+contacto
  window.open(path, '_blank')
}
root.render(
  <React.StrictMode>
    <App />
    <div className="fixed bottom-5 right-0 bg-transparent  py-2 rounded-full cursor-pointer" onClick={()=>handleOnClick()}>
      <img src="/img/central.svg" style={{ width: "100px", height: "auto" }} alt="Logo" />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals