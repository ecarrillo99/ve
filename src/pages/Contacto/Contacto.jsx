import React, { Suspense, useEffect, useState } from 'react';
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';
import Navbar from '../../components/global_components/navbar/Navbar';
import Footer from '../../components/global_components/footer/Footer';

const Contacto = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [formData, setFormData] = useState({
        department: 'Reservas',
        ci: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        message: '',
        paymentMethod: '',
        verificationCode: ''
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDepartmentSelect = (department) => {
        setFormData({
            ...formData,
            department
        });
        setIsDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    const departmentOptions = [
        'Reservas',
        'Gerencia',
        'Subgerencia',
        'Comercial',
        'Relaciones Públicas',
        'Diseño',
        'Soporte',
        'Webmaster',
        'Reclamos'
    ];

    const ContactForm = () => (

        <div className="max-w-4xl mx-auto p-6 border border-green-200 rounded-md">
            <div className="mb-8">
                <div className="flex items-center text-blue-500 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <h2 className="text-lg font-medium">Envíanos un mensaje</h2>
                </div>
                <p className="text-gray-500 text-sm ml-7">Tu mensaje es bienvenido. Por favor completa el formulario, así podremos contactarte en caso de ser necesario.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <h3 className="text-blue-500 font-medium mb-4">Deseo contactarme con</h3>
                    <div className="relative">
                        <div
                            className="block w-60 appearance-none bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {formData.department}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute z-10 w-60 mt-1 bg-white border border-gray-300 rounded shadow-lg">
                                {departmentOptions.map((option) => (
                                    <div
                                        key={option}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                                        onClick={() => handleDepartmentSelect(option)}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-blue-500 font-medium mb-4">Información de contacto</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <label className="w-40 text-right pr-4">CI:</label>
                            <input
                                type="text"
                                name="ci"
                                value={formData.ci}
                                onChange={handleChange}
                                className="flex-grow border border-gray-300 p-2 rounded"
                                required
                            />
                            <span className="text-red-500 ml-1">*</span>
                        </div>

                        <div className="flex items-center">
                            <label className="w-40 text-right pr-4">Nombres / Apellidos:</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="flex-grow border border-gray-300 p-2 rounded"
                                required
                            />
                            <span className="text-red-500 ml-1">*</span>
                        </div>

                        <div className="flex items-center">
                            <label className="w-40 text-right pr-4">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="flex-grow border border-gray-300 p-2 rounded"
                                required
                            />
                            <span className="text-red-500 ml-1">*</span>
                        </div>

                        <div className="flex items-center">
                            <label className="w-40 text-right pr-4">Teléfonos:</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="flex-grow border border-gray-300 p-2 rounded"
                                required
                            />
                            <span className="text-red-500 ml-1">*</span>
                        </div>

                        <div className="flex items-center">
                            <label className="w-40 text-right pr-4">Dirección:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="flex-grow border border-gray-300 p-2 rounded"
                                required
                            />
                            <span className="text-red-500 ml-1">*</span>
                        </div>

                        <div className="flex items-center">
                            <label className="w-40 text-right pr-4">Ciudad:</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="flex-grow border border-gray-300 p-2 rounded"
                                required
                            />
                            <span className="text-red-500 ml-1">*</span>
                        </div>

                        <div className="flex items-center">
                            <label className="w-40 text-right pr-4">País:</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="flex-grow border border-gray-300 p-2 rounded"
                            />
                        </div>

                        <div className="col-span-1 md:col-span-2 flex">
                            <div className="w-40 text-right pr-4 pt-2">
                                <label>Mensaje:</label>
                            </div>
                            <div className="flex-grow">
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-32 border border-gray-300 p-2 rounded"
                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-blue-500 font-medium mb-4">Cuando viaja, como prefieres pagar?</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex flex-col items-center">
                            <div className="h-10 w-16 flex items-center justify-center mb-2">
                                <img
                                    src="https://visitaecuador.com/ve/img/diseno/remate/efectivo.png"
                                    alt="Efectivo"
                                    className="h-8"
                                />
                            </div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={formData.paymentMethod === "cash"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-10 w-16 flex items-center justify-center mb-2">
                                <img
                                    src="https://visitaecuador.com/ve/img/diseno/remate/diners.png"
                                    alt="Diners"
                                    className="h-8"
                                />
                            </div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="diners"
                                checked={formData.paymentMethod === "diners"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-10 w-16 flex items-center justify-center mb-2">
                                <img
                                    src="https://visitaecuador.com/ve/img/diseno/remate/mastercard.png"
                                    alt="Mastercard"
                                    className="h-8"
                                />
                            </div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="mastercard"
                                checked={formData.paymentMethod === "mastercard"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-10 w-16 flex items-center justify-center mb-2">
                                <img
                                    src="https://visitaecuador.com/ve/img/diseno/remate/american.png"
                                    alt="American Express"
                                    className="h-8"
                                />
                            </div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="amex"
                                checked={formData.paymentMethod === "amex"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-10 w-16 flex items-center justify-center mb-2">
                                <img
                                    src="https://visitaecuador.com/ve/img/diseno/remate/visa.png"
                                    alt="Visa"
                                    className="h-8"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/api/placeholder/48/30";
                                    }}
                                />
                            </div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="visa"
                                checked={formData.paymentMethod === "visa"}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="h-10 w-16 flex items-center justify-center mb-2">
                                <img
                                    src="https://visitaecuador.com/ve/img/diseno/remate/discover.png"
                                    alt="Discover"
                                    className="h-8"
                                />
                            </div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="discover"
                                checked={formData.paymentMethod === "discover"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    <div className="flex items-center">
                        <span className="text-blue-500 mr-4">Código de verificación</span>
                        <input
                            type="text"
                            name="verificationCode"
                            value={formData.verificationCode}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded mr-2 w-40"
                        />
                        <button type="button" className="bg-green-500 text-white px-4 py-2 rounded">
                            aTóc
                        </button>
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button type="submit" className="bg-green-400 hover:bg-green-500 text-white px-8 py-3 rounded">
                        Enviar contacto
                    </button>
                    <button type="button" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <>
            {isMobile
                ? <Suspense fallback={<div>Cargando...</div>}><NavbarMobile activo={1}/></Suspense>
                : <Suspense fallback={<div>Cargando...</div>}><Navbar activo={1}/></Suspense>
            }
            <div className="container mx-auto py-8">
                <div className="flex justify-center mb-8">
                    <nav className="flex space-x-8">
                        <a href="#" className="text-green-500 border-b-2 border-green-500 pb-1">Contacto</a>
                        <a href="#" className="text-gray-600 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Directorio Club Visita
                        </a>
                        <a href="#" className="text-gray-600 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            Oficinas
                        </a>
                        <a href="#" className="text-gray-600 flex items-center">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            Emprende con Nosotros
                        </a>
                    </nav>
                </div>

                <ContactForm />
            </div>

            <Footer />
        </>
    );
};

export default Contacto;
