import React from 'react';
import Footer from '../../components/global_components/footer/Footer';
import Navbar from '../../components/global_components/navbar/Navbar';
import SuscripcionForm from '../../components/yaganaste_components/suscripcion_form';
import { sessionYaGanaste } from '../../global/util';
import { Navigate } from 'react-router-dom';

const YaGanaste = () => {
    return sessionYaGanaste()?(
        <div className="h-screen">
            <Navbar></Navbar>
            <SuscripcionForm></SuscripcionForm>
            <Footer></Footer>
        </div>
    ):(
        <Navigate to="/"/>
    );
};

export default YaGanaste;