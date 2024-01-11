import { useEffect, useState } from "react";
import { getRemoteCountries } from "../../../controllers/lugares/lugaresController";
import Icons from "../../../global/icons";
import Suscripcion from "../../../models/Suscripcion";

const SuscriptionForm = ({ cambioSlider, suscripcionForm }) => {
    const [listaPaises, setListaPaises] = useState();
    const [codePhone, setCodePhone] = useState();
    const [country, setCountry] = useState();
    const [isMailValid, setIsMailValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [names, setNames] = useState("")
    const [namesError, setNamesError] = useState(false)
    const [dni, setDni] = useState("")
    const [dniError, setDniError] = useState(false)
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("")
    const [adress, setAdress] = useState("");
    const [adressError, setAdressError] = useState(false)
    const [acceptTC, setAcceptTC] = useState(false)
    const [acceptTCError, setAcceptTCError] = useState(true)
    const icons = new Icons();


    useEffect(() => {

        async function fetchData() {

            try {
                getRemoteCountries().then((result) => {
                    if (result) {
                        setListaPaises(result);
                        setCountry(result.find((pais) => pais.Titulo === 'Ecuador'))
                        setCodePhone(result.find((pais) => pais.Icono === '+593'))
                    }
                })

            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    const handleChangeCountry = (event) => {
        setCountry(listaPaises[event.target.value]);
    };

    const handleChangeCodePhone = (event) => {
        setCodePhone(listaPaises[event.target.value]);
    };

    const validarCorreoElectronico = (event) => {
        // Expresión regular para validar un correo electrónico
        const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (regexCorreo.test(event.target.value)) {
            setIsMailValid(true)
            setMail(event.target.value)
        }
        else {
            setIsMailValid(false)
        }
    };

    const validarTelefono = (event) => {

        // Verificar si el nuevo valor es numérico y tiene 10 dígitos y comienza con "09"
        if (/^\d+$/.test(event.target.value) && event.target.value.length > 5) {
            setIsPhoneValid(true);
            setPhone(event.target.value)
        } else {
            setIsPhoneValid(false);
        }
    };

    const handleNames = (event) => {
        setNames(event.target.value)
    }

    const handleDNI = (event) => {
        setDni(event.target.value)
    }

    const handleAdress = (event) => {
        setAdress(event.target.value)
    }

    const handleChangeTC = (event) => {
        setAcceptTCError(!event.target.checked)
        setAcceptTC(event.target.checked)
    }


    const handleClickContinuar = () => {
        setNamesError(names === "");
        setDniError(dni === "");
        setIsMailValid(mail !== "");
        setIsPhoneValid(phone !== "");
        setAdressError(adress === "");

            if (!namesError && !dniError && isMailValid && isPhoneValid && !adressError && !acceptTCError) {
                const suscripcion= new Suscripcion();
                suscripcion.Nombres=names;
                suscripcion.DNI=dni;
                suscripcion.Pais=country;
                suscripcion.Correo=mail;
                suscripcion.Telefono=phone;
                suscripcion.Direccion=adress;
                suscripcion.Terminos=acceptTC;
                suscripcionForm(suscripcion);

                cambioSlider(2);
            }
    }


    return (
        <div className="w-full">
            <div className="flex gap-2 justify-center mb-4 items-center">
                <div className="cursor-pointer" onClick={() => cambioSlider(0)} dangerouslySetInnerHTML={{ __html: icons.Data.Back }} />
                <div className="flex bg-greenVE-500 h-7 w-7 justify-center items-center text-white font-bold rounded-full">2</div>
                <label className="font-semibold">Ingresa tus datos personales</label>
            </div>
            <div className="flex flex-wrap gap-y-3 gap-x-3 items-center justify-center sm:flex-col md:flex-row">
                <div className="flex flex-col justify-center">
                    <div className="mb-5">
                        <label for="names" className="block mb-2 text-sm font-medium text-gray-900 ">Nombres Completos</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </div>
                            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5" placeholder="Ingrese sus nombres" onChange={handleNames} />
                        </div>
                        <div className="h-2">
                            {
                                namesError && <label className="text-xxs text-red-600">* Campo obligatorio</label>
                            }
                        </div>
                    </div>
                    <div className="grid gap-x-6 mb-0 md:grid-cols-2">
                        <div className="mb-5">
                            <label for="company" className="block mb-2 text-sm font-medium text-gray-900 ">Documento de Identidad</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5" placeholder="Ingrese su DNI/CI/NIF" onChange={handleDNI} />
                            </div>
                            <div className="h-2">
                                {
                                    dniError && <label className="text-xxs text-red-600">* Campo obligatorio</label>
                                }
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">País</label>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-10" onChange={handleChangeCountry}>
                                    {listaPaises &&
                                        listaPaises.map((item, index) => (
                                            <option key={index} value={index} selected={item.Titulo === country.Titulo}>
                                                {item.Titulo}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label for="company" className="block mb-2 text-sm font-medium text-gray-900">Correo electrónico</label>
                            <div className="relative ">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <input type="mail" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5" placeholder="Ingrese su correo" onChange={validarCorreoElectronico} />
                            </div>
                            <div className="h-2">
                                {
                                    !isMailValid && <label className="text-xxs text-red-600">* Correo no válido</label>
                                }
                            </div>
                        </div>
                        <div className="mb-5">
                            <label for="company" className="block mb-2 text-sm font-medium text-gray-900">Número de teléfono</label>
                            <div className="relative flex items-center">
                                <select
                                    id="countryCode"
                                    className="appearance-none border border-gray-300 text-gray-900 text-sm rounded-l-lg px-4 py-2.5 focus:outline-none focus:ring focus:border-blue-500" onChange={handleChangeCodePhone}>
                                    {listaPaises && listaPaises.map((item, id) => (
                                        <option key={id} value={id} selected={item.Icono === codePhone.Icono}>{item.Icono}</option>
                                    ))}
                                </select>
                                <input type="tel" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg block w-full p-2.5" placeholder="Ingrese su teléfono" onChange={validarTelefono} />
                            </div>
                            <div className="h-2">
                                {
                                    !isPhoneValid && <label className="text-xxs text-red-600">* Teléfono no válido</label>
                                }
                            </div>
                        </div>

                    </div>
                    <div className="mb-10">
                        <label for="names" className="block mb-2 text-sm font-medium text-gray-900 ">Dirección</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </div>
                            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5" placeholder="Ingrese su dirección" onChange={handleAdress} />
                        </div>
                        <div className="h-2">
                            {
                                adressError && <label className="text-xxs text-red-600">* Campo obligatorio</label>
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-6">
                        <label for="remember" className="ms-2 text-xs font-medium  text-gray-400 text-center ">
                            Al suscribirte aceptas nuestros
                            <a href="#" className="text-blue-600 hover:underline dark:text-blue-500"> Términos y Condiciones de Uso</a>
                            <br />y el uso de tus datos personales de acuerdo a nuestras
                            <a href="#" className="text-blue-600 hover:underline dark:text-blue-500"> Políticas de Privacidad</a>.
                        </label>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center justify-center ">
                            <div className="flex items-center h-5">
                                <input onChange={handleChangeTC} checked={acceptTC} id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300   dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                            </div>
                            <label for="remember" className="ms-2 text-sm font-medium text-gray-600">Acepto los terminos y condiciones</label>
                        </div>
                        <div className="h-2 flex items-center justify-center">
                            {
                                acceptTCError && <label className="text-xxs text-red-600">* Acepte los T y C para continuar</label>
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className=" text-white bg-greenVE-500 rounded-lg text-sm w-20 sm:w-auto px-5 py-2.5 text-center" onClick={() => handleClickContinuar()}>Continuar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SuscriptionForm;