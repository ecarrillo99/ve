import React from 'react';

const ProfileAdmin = () => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center border-b pb-2">
                <div className="flex flex-col">
                    <h1 className="font-semibold text-3xl">Administración</h1>
                    <label>Realiza tareas administrativas</label>
                </div>
            </div>

            {/* Botón Crear Cuenta */}
            <div className="mt-4">
                <button
                    className="text-white px-4 py-2 rounded hover:opacity-90"
                    style={{ backgroundColor: 'rgb(174, 189, 77)' }}
                >
                    Crear Cuenta
                </button>
            </div>

            {/* Tabla */}
            <div className="mt-6">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Fecha de Expiración</th>
                            <th className="border border-gray-300 px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ejemplo de fila */}
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">Juan Pérez</td>
                            <td className="border border-gray-300 px-4 py-2">2025-12-31</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="text-white px-3 py-1 rounded hover:opacity-90 flex items-center justify-center relative group mx-auto"
                                    style={{ backgroundColor: 'rgb(174, 189, 77)' }}
                                >
                                    {/* Ícono SVG */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16l-4-4m4 4l4-4m-4 4V8m0 12a9 9 0 100-18 9 9 0 000 18z"
                                        />
                                    </svg>
                                    {/* Texto al pasar el cursor */}
                                    <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Descargar Certificado
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProfileAdmin;