import { Spinner } from '@material-tailwind/react';
import React, { useState } from 'react';
import { resetContrasenia } from '../../controllers/suscripcion/suscripcionController';

const ResetPassword = ({ isOpen, handleClickCloseReset }) => {
    const [selectedOption, setSelectedOption] = useState('2');
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("* El campo es obligatorio")
    const [isLoading, setIsLoading] = useState(false);
    const [correct, setCorrecto] = useState(false);
    const [mensaje, setMensaje]=useState();
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleClickAccept = () => {
        setError(false);
        if (text == "") {
            setError(true);
            setErrorText("* El campo es obligatorio");
        } else {
            setIsLoading(true);
            resetContrasenia(selectedOption, text).then((resp) => {
                if (resp && resp.estado) {
                    setIsLoading(false);
                    setCorrecto(true);
                    setMensaje(resp.msj);
                    setText("");
                } else {
                    setIsLoading(false)
                    setError(true);
                    setErrorText(resp ? resp.msj : "Ha ocurrido un error de red");
                }
            });
        }
    }
    const handleClickCancelar = () => {
        setCorrecto(false);
        handleClickCloseReset();
    }
    const handleChangeText = (event) => {
        setText(event.target.value)
    }
    if (!isOpen) {
        return;
    }

    const resetForm = <div className='flex flex-col gap-y-3 '>
        <label className='font-semibold'>Recupere la contraseña con:</label>
        <div className='flex gap-3 justify-between'>
            <div className='flex items-center gap-2'>
                <svg className='h-6 w-6' viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.5 10H18.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15.5 13H18.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                <label>
                    Cédula de identidad
                </label>
            </div>
            <input
                type="radio"
                value="2"
                checked={selectedOption === '2'}
                onChange={handleOptionChange}
            />
        </div>
        <div className='flex gap-3 justify-between'>
            <div className='flex items-center gap-2'>
                <svg className='h-4 w-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <label>
                    Id de usuario
                </label>
            </div>
            <input
                type="radio"
                value="1"
                checked={selectedOption === '1'}
                onChange={handleOptionChange}
            />
        </div>
        <div>
            <div className='flex border-b-2 '>
                <input
                    className='w-full px-2'
                    type='text'
                    placeholder={selectedOption == '0' ? "Ingrese cédula de identidad" : "Ingrese Id de usuario"}
                    value={text}
                    onChange={handleChangeText}
                />
            </div>
            {
                error
                    ? <label className='text-xxs text-red-500'>{errorText}</label>
                    : <div />
            }
        </div>
        <div className='flex gap-2'>
            <button onClick={isLoading ? null : handleClickCancelar} className={isLoading ? 'bg-gray-500 text-white w-1/2 rounded-lg cursor-not-allowed' : 'bg-red-500 text-white w-1/2 rounded-lg'}>Cancelar</button>
            <button onClick={handleClickAccept} className='bg-greenVE-500 text-white w-1/2 rounded-lg flex items-center justify-center'>{
                !isLoading
                    ? "Aceptar"
                    : <Spinner className='p-1'></Spinner>
            }</button>
        </div>
    </div>

    const correctForm=<div className='flex justify-center flex-col'>
        <label className='font-semibold text-center w-full pb-3'>Reseteo exitoso</label>
        <p className='text-sm'>{mensaje}</p>
        <div className='flex w-full items-center justify-center pt-5'>
            <button onClick={handleClickCancelar} className='bg-greenVE-500 text-white w-1/2 rounded-lg flex items-center justify-center'>Aceptar</button>
        </div>
    </div>

    return (
        <div className='fixed h-screen w-full left-0 top-0 z-50 flex items-center justify-center'>
            <div className='fixed h-screen w-full bg-gray-700 opacity-70'></div>
            <div className='z-50 fixed h-screen top-0 w-full flex justify-center items-center'>
                <div className='h-auto w-72 bg-white rounded-lg flex flex-col p-4 gap-y-3 '>
                {
                    correct
                    ?correctForm
                    :resetForm
                }
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;