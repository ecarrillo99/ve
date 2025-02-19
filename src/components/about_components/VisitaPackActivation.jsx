import React, { useState } from 'react';
import PackController from '../../controllers/pack/packController';

const VisitaPackActivation = () => {
    const [packCode, setPackCode] = useState('');
    const [activeStep, setActiveStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [packInfo, setPackInfo] = useState(null);
    const [formData, setFormData] = useState({
        documento: '',
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
        // Here you would implement the form submission logic
        // You can use the packInfo state to send the pack data along with the form
        if (!packInfo) {
            setError('Información del pack no disponible');
            return;
        }

        try {
            // You would implement your form submission logic here
            console.log('Form Data:', formData);
            console.log('Pack Info:', packInfo);
        } catch (err) {
            setError('Error al enviar el formulario');
        }
    };

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
                        padding: '0.25rem',
                        border: 'none',
                        backgroundColor: activeStep === 1 ? '#f04a3c' : '#f3f4f6',
                        color: activeStep === 1 ? 'white' : '#6b7280',
                        borderRadius: '0.375rem',
                        height: "30px",
                        cursor: activeStep === 2 ? 'pointer' : 'default',
                        display: 'flex',
                        justifyContent: 'start',

                    }}
                    onClick={() => activeStep === 2 && setActiveStep(1)}
                >
                    1. Activa Código
                </button>
                <button
                    style={{
                        flex: 1,
                        padding: '0.25rem',
                        border: 'none',
                        height: "30px",
                        backgroundColor: activeStep === 2 ? '#f04a3c' : '#f3f4f6',
                        color: activeStep === 2 ? 'white' : '#6b7280',
                        borderRadius: '0.375rem',
                        cursor: 'default',
                        display: 'flex',
                        justifyContent: 'start',
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
                        <img src="/api/placeholder/100/50" alt="Pack Logo" />
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ color: '#7c3aed', marginBottom: '0.25rem' }}>
                                {packInfo?.producto?.titulo || 'Gift Card VisitaEcuador.com'}
                            </div>
                            <div style={{ fontSize: '1.25rem', color: '#7c3aed' }}>
                                $ {packInfo?.producto?.precio_producto || '0.00'}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleFormSubmit}>
                    </form>
                </div>
            )}
        </div>
    );
};

export default VisitaPackActivation;
