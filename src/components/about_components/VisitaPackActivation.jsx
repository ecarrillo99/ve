import React, { useState } from 'react';
import PackController from '../../controllers/pack/packController';

const VisitaPackActivation = () => {
    const [packCode, setPackCode] = useState('');
    const [activeStep, setActiveStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [packInfo, setPackInfo] = useState(null);
    const [activationSuccess, setActivationSuccess] = useState(false);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        ci: '',
        nombres: '',
        celular: '',
        telefono: '',
        email: '',
        ciudad: 'Cuenca - Ecuador',
        direccion: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validatePackCode = async (code) => {
        setIsLoading(true);
        setError('');

        const controller = new PackController();

        try {
            const result = await controller.validateCode(code);

            if (result.success) {
                const extractedPackInfo = controller.extractPackInfo(result.data);
                setPackInfo(result.data);
                setActiveStep(2);
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Error al validar el código. Por favor, intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };



    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (packCode.length < 8) {
            setError('El código debe tener 8 caracteres');
            return;
        }
        validatePackCode(packCode);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');


        if (!packInfo) {
            setError('Información del pack no disponible');
            setIsLoading(false);
            return;
        }


        const requiredFields = {
            'cédula': formData.ci,
            'nombres': formData.nombres,
            'celular': formData.celular,
            'email': formData.email
        };

        for (const [field, value] of Object.entries(requiredFields)) {
            if (!value.trim()) {
                setError(`El campo ${field} es obligatorio`);
                setIsLoading(false);
                return;
            }
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            setError('El formato del email no es válido');
            setIsLoading(false);
            return;
        }

        const params = {
            id_prepago: packInfo.id_prepago,
            ci: formData.ci.trim(),
            nombres: formData.nombres.trim(),
            celular: formData.celular.trim(),
            telefono: formData.telefono.trim() || '',
            email: formData.email.trim().toLowerCase(),
            ciudad: formData.ciudad ,
            direccion: formData.direccion.trim() || '',
            id_suscripcion: packInfo.vendedor?.id_suscripcion
        };
        console.log('Submitting form with params:', params);
        const controller = new PackController();

        try {
            const result = await controller.registroTransaccion(params);
            console.log('Form submission result:', result);
            if (result.success) {

                setActivationSuccess(true);

                setUserData({
                    nombre: formData.nombres,
                    id: "78045",
                    clave: "01085",
                    fechaCaducidad: "21 de Marzo de 2025"
                });
            } else {
                setError(result.error || 'Error al activar el pack. Por favor, intente nuevamente.');
            }
        } catch (err) {
            console.error('Error during pack activation:', err);
            setError('Error al procesar la solicitud. Por favor, intente nuevamente más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    const SuccessScreen = () => {
        const firstName = userData.nombre.split(' ')[0];
        const lastName = userData.nombre.split(' ').slice(1).join(' ');

        return (
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <img
                        src="https://www.visitaecuador.com/pack/img/logopackb.png"
                        alt="VisitaPack Logo"
                        style={{ width: '60px', height: 'auto' }}
                    />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '1rem', color: '#333' }}>Activa tu VisitaPack. </span>
                            <span style={{ fontSize: '1rem', color: '#0d6efd', marginLeft: '0.5rem' }}>¿Cómo activar tu suscripción?</span>
                        </div>
                    </div>
                </div>

                <h2 style={{ color: '#e74c3c', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Hola {firstName} {lastName}.
                </h2>
                <p style={{ color: '#9333ea', fontSize: '1.25rem', marginBottom: '1rem' }}>
                    VisitaEcuador te da la Bienvenida !!!.
                </p>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                    Desde hoy formas parte de nuestro prestigioso Club de Viajes.
                </p>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    Te recordamos que estos son tus datos para el ingreso, y para tu tranquilidad los enviamos a tu cuenta de correo electrónico.
                </p>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                        <div style={{ width: '80px', color: '#666', fontWeight: '500' }}>ID:</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{userData.id}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                        <div style={{ width: '80px', color: '#666', fontWeight: '500' }}>Clave:</div>
                        <div style={{ fontWeight: '600', color: '#333' }}>{userData.clave}</div>
                    </div>
                </div>

                <p style={{ color: '#666', marginBottom: '2rem' }}>
                    No olvides que tu suscripción caduca el {userData.fechaCaducidad}
                </p>

                <a
                    href="https://visitaecuador.com"
                    style={{
                        display: 'block',
                        backgroundColor: '#9333ea',
                        color: 'white',
                        padding: '1rem',
                        textAlign: 'center',
                        borderRadius: '0.5rem',
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '1.25rem'
                    }}
                >
                    Disfruta tu suscripción ahora !!!<br/>
                    Clic Aquí
                </a>
            </div>
        );
    };

    // If activation was successful, show the success screen
    if (activationSuccess && userData) {
        return <SuccessScreen />;
    }

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', marginTop:"10px" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#8cc63f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.5rem'
                    }}>
                        <img src="https://www.visitaecuador.com/pack/img/logopackb.png" alt="Pack Logo"/>
                    </div>
                    <div>
                        <h1 style={{color: '#8cc63f', fontSize: '1rem', fontWeight: '500', margin: 0 }}>
                            Activa tu VisitaPack
                        </h1>
                        <h2 style={{ color: '#2563eb', fontSize: '1rem', margin: 0 }}>
                            ¿Cómo activar tu suscripción?
                        </h2>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div >
                        <img src="https://hotelesfullvacations.com/img/diseno/rasparPack.png"/>
                    </div>

                </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem', marginBottom: '2rem', marginTop:"-50px" }}>
                <h2 style={{ color: '#ef4444', fontSize: 'medium', marginBottom: '1rem',  }}>
                    ¿Cómo activar tu suscripción?
                </h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize:"small" }}>
                    {[
                        'Descarga y abre la APP VisitaEcuador.com.',
                        'Selecciona la opción VisitaPack.',
                        'Raspa y escanea el código de barras o ingresa el código.',
                        'Registra tus datos de suscriptor.'
                    ].map((text, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <span style={{ width: '8px', height: '8px', backgroundColor: '#8cc63f', borderRadius: '50%' }}/>
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ display: 'flex', marginBottom: '1.5rem', gap: '0.5rem',  }}>
                <button
                    style={{
                        flex: 1,
                        padding: '0.35rem',
                        border: 'none',
                        backgroundColor: activeStep === 1 ? '#f04a3c' : '#f3f4f6',
                        color: activeStep === 1 ? 'white' : '#6b7280',
                        borderRadius: '0.375rem',
                        height: "30px",
                        cursor: activeStep === 2 ? 'pointer' : 'default',
                        display: 'flex',
                        fontWeight:"bold",
                        justifyContent: 'start',
                        fontSize:"0.75rem"

                    }}
                    onClick={() => activeStep === 2 && setActiveStep(1)}
                >
                    1. Activa Código
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: '0.35rem',
                        border: 'none',
                        height: "30px",
                        backgroundColor: activeStep === 2 ? '#f04a3c' : '#f3f4f6',
                        color: activeStep === 2 ? 'white' : '#6b7280',
                        borderRadius: '0.375rem',
                        cursor: 'default',
                        display: 'flex',
                        fontWeight:"bold",
                        justifyContent: 'start',
                        fontSize:"0.75rem"
                    }}
                >
                    2. Registro datos personales
                </button>
            </div>

            {activeStep === 1 ? (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '1.5rem'
                }}>
                    <form onSubmit={handleCodeSubmit}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: 'medium', marginBottom: '0.5rem' }}>
                                Escribe tu código pack
                            </h3>
                            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <input
                                    type="text"
                                    value={packCode}
                                    onChange={(e) => {
                                        setError('');
                                        setPackCode(e.target.value.toUpperCase());
                                    }}
                                    placeholder="código de 8 caracteres(letras y números)"
                                    maxLength={8}
                                    style={{
                                        fontSize:"small",
                                        width: '100%',
                                        padding: '0.5rem',
                                        border: error ? '1px solid #dc2626' : '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        marginBottom: '0.5rem',
                                        height: '20px'
                                    }}
                                />
                                {error && (
                                    <div style={{ color: '#dc2626', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                        {error}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={isLoading || packCode.length < 8}
                                    style={{
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        padding: '0.25rem 1.0rem',
                                        borderRadius: '0.375rem',
                                        height:"30px",
                                        fontSize:"small",
                                        border: 'none',
                                        cursor: isLoading || packCode.length < 8 ? 'not-allowed' : 'pointer',
                                        opacity: isLoading || packCode.length < 8 ? 0.7 : 1
                                    }}
                                >
                                    {isLoading ? 'Verificando...' : 'Comprobar'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    padding: '1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '2rem',
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.375rem'
                    }}>
                        <img src="https://www.visitaecuador.com/pack/img/logopackb.png"
                             alt="Pack Logo"
                             style={{ height: '85px', width: 'auto' }}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#7c3aed', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                                {packInfo?.producto?.titulo || 'Gift Card VisitaEcuador.com 1 mes'}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#7c3aed' }}>
                                $ {packInfo?.producto?.precio_producto || '45.00'}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <label
                                    htmlFor="ci"
                                    style={{display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '400', fontSize: '0.875rem',}}
                                >
                                    Documento de Identificación <span style={{color: '#9333ea',}}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="ci"
                                    name="ci"
                                    value={formData.ci}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Cédula, pasaporte"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.675rem',
                                        height:"30px",
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="nombres"
                                    style={{display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500', fontSize: '0.875rem'}}
                                >
                                    Nombres Apellidos <span style={{color: '#9333ea'}}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nombres"
                                    name="nombres"
                                    value={formData.nombres}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Nombres y Apellidos completos"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.675rem',
                                        height:"30px",
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="celular"
                                    style={{display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500', fontSize: '0.875rem'}}
                                >
                                    Celular <span style={{color: '#9333ea'}}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="celular"
                                    name="celular"
                                    value={formData.celular}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese tu Teléfono Movil"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.675rem',
                                        height:"30px",
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="telefono"
                                    style={{display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500', fontSize: '0.875rem'}}
                                >
                                    Teléfono fijo
                                </label>
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.675rem',
                                        height:"30px",
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="email"
                                    style={{display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500', fontSize: '0.875rem'}}
                                >
                                    Email <span style={{color: '#9333ea'}}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese Correo electrónico"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.675rem',
                                        height:"30px",
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="ciudad"
                                    style={{display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500', fontSize: '0.875rem'}}
                                >
                                    Ciudad
                                </label>
                                <select
                                    id="ciudad"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.675rem',
                                        backgroundColor: 'white',
                                        height:"30px",
                                    }}
                                >
                                    <option value="Cuenca - Ecuador">Cuenca - Ecuador</option>
                                    <option value="Quito - Ecuador">Quito - Ecuador</option>
                                    <option value="Guayaquil - Ecuador">Guayaquil - Ecuador</option>
                                </select>
                            </div>
                        </div>

                        <div style={{marginBottom: '1.5rem'}}>
                            <label
                                htmlFor="direccion"
                                style={{display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: '500', fontSize: '0.875rem'}}
                            >
                                Dirección
                            </label>
                            <input
                                type="text"
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.675rem',
                                    height:"30px",
                                }}
                            />
                        </div>

                        {error && (
                            <div style={{color: '#dc2626', marginBottom: '1rem', fontSize: '0.875rem'}}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                backgroundColor: '#2563eb',
                                color: 'white',
                                padding: '0.25rem 1.0rem',
                                borderRadius: '0.375rem',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                opacity: isLoading ? 0.7 : 1,
                                fontWeight: '500',
                                fontSize: '0.875rem',
                                height:"30px",
                            }}
                        >
                            {isLoading ? 'Procesando...' : 'Activar Pack'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default VisitaPackActivation;
