import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import encodePass from '../../../global/encodePass';
import Config from '../../../global/config';
import { endRemoteSession, loginRemote } from '../../../controllers/suscripcion/suscripcionController';
import { Spinner } from '@material-tailwind/react';
import MarcaPais from './MarcaPais';


const NavbarMobile = ({ activo }) => {
    const navigate = new useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [isLoadingGoogle, setisLoadingGoogle] = useState(false)
    const [isLoadingFB, setIsLoadingFB] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const gProvider = new GoogleAuthProvider();
    const fProvider = new FacebookAuthProvider();
    const session = JSON.parse(localStorage.getItem("datos"));
    const nivel = session ? session.data.nivel : "visitante";
    const nombre = session ? session.data.nombre : "";
    const foto = session ? (session.data.fotos ? session.data.fotos.m : "") : "";
    const handleClickLogo = () => {
        navigate("/");
    }
    const handleClickDisney = () => {
        navigate("/disney");
    }

    const handleClickInicio = () => {
        navigate("/");
    }

    const handleClickInfotour = () => {
        window.open("https://infotour.app/");
    }

    const handleClickMenu = () => {
        setOpenMenu(!openMenu)
    }

    const handleClickOpenProfile = () => {
        setOpenProfile(!openProfile)
    }

    const handleClickSuscription = () => {
        navigate("/suscripcion");
    };

    const handleClickProfile = () => {
        if (nivel == "visitante") {
            navigate("/login");
        } else {
            handleClickOpenProfile();
        }
    }

    const handleClickProfileSet = () => {
        navigate("/perfil");
    };

    const handleClickBookHistory=()=>{
        navigate("/historial");
    }

    const handleClickFavorites=()=>{
        navigate("/favoritos");
    }

    const handleClickLogOut = () => {
        try {
            endRemoteSession().then((result) => {
            if (result) {
                window.location.reload();
            }
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleClickGoogle = () => {
        if (!isLoadingGoogle) {
            signInWithPopup(auth, gProvider).then(async (result) => {
                setisLoadingGoogle(true);
                const user = result.user;
                try {
                    const random = () => Math.floor(Math.random() * 100);
                    const randomStr = Array.from({ length: 7 }, () => random()).join('');
                    const username = user.displayName ?? ('usuario' + randomStr.substring(0, 6));
                    const email = user.email ?? '';
                    var id = user.uid ?? randomStr;
                    var pass = encodePass(email);
                    if (email.trim() === '') {
                        setisLoadingGoogle(false)
                        alert("Correo inválido, intente con otra cuenta")
                        return;
                    }
                    const params = {
                        "id": id,
                        "pass": pass,
                        "servicio": Config.SERVICIO,
                        "metodo": Config.METODO_EX_GO,
                        "username": username,
                        "nombre": username,
                        "email": email,
                        "id_servicio": Config.IDSERVICIO,
                        "id_metodo": Config.IDMETODO_EX_GO,
                    }
                    try {
                        await loginRemote(params)
                            .then((result) => {
                                setisLoadingGoogle(false)
                                if (result) {
                                    window.location.reload();
                                } else {
                                    setisLoadingGoogle(false)
                                    alert("Ha ocurrido un error, intente nuevamente")
                                }
                            })
                            .catch((error) => { console.log(error) })

                    } catch (error) {
                        setisLoadingGoogle(false)
                        console.error("Error:", error);
                    }
                } catch (e) {

                }
            }).catch((error) => {
                console.log(error)
            });
        }
    }

    const handleClickFacebook = () => {
        if (!isLoadingFB) {
            signInWithPopup(auth, fProvider)
                .then(async (result) => {
                    setIsLoadingFB(true);
                    // The signed-in user info.
                    const user = result.user;
                    try {
                        const random = () => Math.floor(Math.random() * 100);
                        const randomStr = Array.from({ length: 7 }, () => random()).join('');
                        const username = user.displayName ?? ('usuario' + randomStr.substring(0, 6));
                        const email = user.email ?? '';
                        var id = user.uid ?? randomStr;
                        var pass = encodePass(email);
                        if (email.trim() === '') {
                            setIsLoadingFB(false)
                            alert("Correo inválido, intente con otra cuenta")
                            return;
                        }
                        const params = {
                            "id": id,
                            "pass": pass,
                            "servicio": Config.SERVICIO,
                            "metodo": Config.METODO_EX_FB,
                            "username": username,
                            "nombre": username,
                            "email": email,
                            "id_servicio": Config.IDSERVICIO,
                            "id_metodo": Config.IDMETODO_EX_FB,
                        }
                        try {
                            await loginRemote(params)
                                .then((result) => {
                                    setIsLoadingFB(false)
                                    if (result) {
                                        navigate(-1)
                                    } else {
                                        setIsLoadingFB(false)
                                        alert("Ha ocurrido un error, intente nuevamente")
                                    }
                                })
                                .catch((error) => { console.log(error) })

                        } catch (error) {
                            setIsLoadingFB(false)
                            console.error("Error:", error);
                        }
                    } catch (e) {

                    }
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = FacebookAuthProvider.credentialFromError(error);
                });
        }
    }

    return (
        <header className="bg-greenVE-500 ">
            <div className="flex mx-auto max-w-6xl py-2 px-4 sm:px-6 lg:px-8 justify-between items-center">
                <div className="w-2/12 flex cursor-pointer" onClick={handleClickLogo}>
                    <img src="./img/web/ve_logo.svg" style={{ width: "110px", height: "auto" }} />
                </div>
                <MarcaPais/>
                <div className='flex gap-3'>
                    <div onClick={() => handleClickProfile()}>
                        {
                            nivel === "visitante" || foto === ""
                                ? <svg className='h-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="9" r="3" stroke="#feffff" stroke-width="1.5"></circle> <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#feffff" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#feffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                                : <img src={foto} className="rounded-full h-8 w-8 border-2  block" />
                        }
                    </div>
                    <div onClick={() => handleClickMenu()}>
                        <svg className='h-8 w-8' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#feffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                </div>

            </div>
            
            <div>
                <div className='flex w-full items-center justify-center  gap-1 px-4 pb-2'>
                    
                    {
                        activo == null || activo == 1 ? (
                            <button className="flex gap-1 text-white border-2 border-white rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300" onClick={handleClickInicio} >
                                <img src="./img/web/homeMenu.svg" style={{ height: "18px" }}></img>
                                <label className="flex cursor-pointer">Hospedaje</label>
                            </button>
                        ) : (
                            <button className="flex gap-1 border-2 border-transparent text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white" onClick={handleClickInicio} >
                                <img src="./img/web/homeMenu.svg" style={{ height: "18px" }}></img>
                                <label className="flex cursor-pointer">Hospedaje</label>
                            </button>
                        )
                    }
                    {
                        activo == 2 ? (
                            <button className="flex gap-1 text-white border-2 border-white rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300" onClick={handleClickDisney}>
                                <img src="./img/web/disneyMenu.svg" style={{ height: "18px" }}></img>
                                <label className="flex cursor-pointer">Disney Destination Concierge</label>
                            </button>
                        ) : (
                            <button className="flex gap-1 border-2 border-transparent text-white hover:border-2  rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white" onClick={handleClickDisney}>
                                <img src="./img/web/disneyMenu.svg" style={{ height: "18px" }}></img>
                                <label className="flex cursor-pointer ">Disney</label>
                            </button>
                        )
                    }
                    {
                        activo == 3 ? (
                            <button className="flex gap-1 text-white border-2 border-white rounded-full px-3 py-1 text-xs items-center hover:border-gray-300 hover:text-gray-300" onClick={handleClickInfotour}>
                                <img src="./img/web/infotourMenu.svg" style={{ height: "18px" }}></img>
                                <label className="flex cursor-pointer">InfoTour</label>
                            </button>
                        ) : (
                            <button className="flex gap-1 border-2 border-transparent text-white hover:border-2 rounded-full px-3 py-1 text-xs items-center hover:border-white hover:text-white" onClick={handleClickInfotour}>
                                <img src="./img/web/infotourMenu.svg" style={{ height: "18px" }}></img>
                                <label className="flex cursor-pointer">InfoTour</label>
                            </button>
                        )
                    }
                </div>
            </div>
            {
                openMenu
                    ? <div className=' fixed  z-50 w-full right-0 top-0 bg-white h-full'>
                        <div onClick={() => handleClickMenu()} className='flex items-center justify-end pr-4 pt-2 text-3xl'>x</div>
                        <div className='px-6 pt-4 flex flex-col gap-6 justify-start items-start'>
                            {(nivel === "visitante" || nivel === "gratuito") && (
                                <div onClick={handleClickSuscription} className='flex gap-2'>
                                    <svg className='h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Shopping-Cart-2--Streamline-Flex"><desc>Shopping Cart 2 Streamline Icon: https://streamlinehq.com</desc><g id="shopping-cart-2--shopping-cart-checkout"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M13.2025 3.50475c-0.1208 1.27773 -0.4527 2.36809 -0.7668 3.12459 -0.2443 0.5883 -0.7576 1.00296 -1.3828 1.12534 -0.6405 0.12539 -1.61126 0.25118 -2.9279 0.25118 -0.92651 0 -1.711 -0.06229 -2.33829 -0.1429C4.68254 7.72107 3.9039 6.81795 3.7263 5.71895l-0.51927 -3.21309H12.25c0.5523 0 1.0045 0.44906 0.9525 0.99889Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M11.75 10.5059H6.2018c-0.981 0 -1.81718 -0.71155 -1.97421 -1.6799l-0.95518 -5.89028c-0.15703 -0.96835 -0.99322 -1.67986 -1.97421 -1.67986H0.75" stroke-width="1"></path><path id="Vector_3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M5.10352 12.7441c0.61808 0 1.11914 -0.501 1.11914 -1.1191s-0.50106 -1.1191 -1.11914 -1.1191c-0.61809 0 -1.11914 0.501 -1.11914 1.1191s0.50105 1.1191 1.11914 1.1191Z" stroke-width="1"></path><path id="Vector_4" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M11.75 12.7441c0.6181 0 1.1191 -0.501 1.1191 -1.1191s-0.501 -1.1191 -1.1191 -1.1191 -1.1191 0.501 -1.1191 1.1191 0.501 1.1191 1.1191 1.1191Z" stroke-width="1"></path></g></svg>
                                    <button>Comprar suscripción</button>
                                </div>
                            )}
                            {(nivel === "visitante" || nivel === "gratuito") &&
                                <div className='flex gap-2'>
                                    <svg className='h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Gift-2--Streamline-Flex"><desc>Gift 2 Streamline Icon: https://streamlinehq.com</desc><g id="gift-2--reward-box-social-present-gift-media-rating-bow"><path id="Intersect" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.11 12.94a40.16 40.16 0 0 0 2.89 0.09c1.078 0 2.031 -0.03 2.89 -0.091a2.59 2.59 0 0 0 2.39 -2.391c0.05 -0.622 0.08 -1.255 0.08 -1.903 0 -0.647 -0.03 -1.28 -0.08 -1.902a2.59 2.59 0 0 0 -2.39 -2.391A40.155 40.155 0 0 0 7 4.261c-1.078 0 -2.031 0.03 -2.89 0.092a2.59 2.59 0 0 0 -2.39 2.39 23.47 23.47 0 0 0 -0.08 1.903c0 0.648 0.03 1.281 0.08 1.903a2.59 2.59 0 0 0 2.39 2.39Z" stroke-width="1"></path><path id="Vector 312" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M1.64 8.646h10.72" stroke-width="1"></path><path id="Vector 313" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M7 13.031v-8.77" stroke-width="1"></path><path id="Vector 519" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="m7 4.243 1.521 -2.448c0.654 -1.052 2.213 -1 2.796 0.092 0.425 0.798 0.1 1.787 -0.719 2.183L10 4.36" stroke-width="1"></path><path id="Vector 520" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M7 4.243 5.479 1.795c-0.654 -1.052 -2.213 -1 -2.796 0.092 -0.425 0.798 -0.1 1.787 0.718 2.183L4 4.36" stroke-width="1"></path></g></svg>
                                    <button>Activar VisitaPack / Giftcard</button>
                                </div>
                            }
                            {(nivel === "visitante") &&
                                <div onClick={handleClickGoogle} className='flex gap-2'>
                                    {
                                        isLoadingGoogle
                                            ? <Spinner color="blue" className="text-greenVE-300"></Spinner>
                                            : <svg className='h-6' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4"></path> <path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853"></path> <path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z" fill="#FBBC05"></path> <path d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z" fill="#EB4335"></path> </g></svg>

                                    }
                                    <button>Probar grátis con google</button>
                                </div>
                            }
                            {(nivel === "visitante") &&
                                <div onClick={handleClickFacebook} className='flex gap-2'>
                                    {
                                        isLoadingFB
                                            ? <Spinner color="blue" className="text-greenVE-300"></Spinner>
                                            : <svg className='h-6' viewBox="0 0 266.895 266.895" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M252.164 266.895c8.134 0 14.729-6.596 14.729-14.73V14.73c0-8.137-6.596-14.73-14.729-14.73H14.73C6.593 0 0 6.594 0 14.73v237.434c0 8.135 6.593 14.73 14.73 14.73h237.434z" fill="#485a96"></path><path d="M184.152 266.895V163.539h34.692l5.194-40.28h-39.887V97.542c0-11.662 3.238-19.609 19.962-19.609l21.329-.01V41.897c-3.689-.49-16.351-1.587-31.08-1.587-30.753 0-51.807 18.771-51.807 53.244v29.705h-34.781v40.28h34.781v103.355h41.597z" fill="#ffffff"></path></g></svg>
                                    }
                                    <button>Probar grátis con facebook</button>
                                </div>
                            }
                            <div className='flex gap-2'>
                                <svg className='h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" id="Building-2--Streamline-Core"><desc>Building 2 Streamline Icon: https://streamlinehq.com</desc><g id="building-2--real-home-tower-building-house-estate"><path id="Vector" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M8.5 13.5h-8V4l4 -3.5 4 3.5v9.5Z" stroke-width="1"></path><path id="Vector_2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M8.5 13.5h5v-7h-5" stroke-width="1"></path><path id="Vector_3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M4.5 13.5v-2" stroke-width="1"></path><path id="Vector_4" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M3 8.5h3" stroke-width="1"></path><path id="Vector_5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" d="M3 5.5h3" stroke-width="1"></path></g></svg>
                                <button>Registrar alojamiento</button>
                            </div>

                        </div>
                    </div>
                    : <></>
            }
            {
                openProfile
                    ? <div className=' fixed  z-50 w-full right-0 top-0 bg-white h-full'>
                        <div onClick={() => handleClickProfile()} className='flex items-center justify-end pr-4 pt-2 text-3xl'>x</div>
                        <div className=' flex flex-col px-4 gap-6'>
                            <div className="flex gap-2 items-center cursor-pointer hover:bg-white hover:bg-opacity-20 hover:rounded-md p-1">
                                <img src={foto} className="rounded-full h-12 w-12 border-2 border-greenVE-600" />
                                <div className="flex flex-col ">
                                    <label className="font-semibold text-black cursor-pointer">{nombre}</label>
                                    <label className="capitalize text-xs text-greenVE-600 cursor-pointer">{nivel}</label>
                                </div>
                            </div>
                            <div onClick={handleClickProfileSet} className='flex gap-2 items-center'>
                                <svg class='h-4 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M16.5 6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM18 6A6 6 0 1 0 6 6a6 6 0 0 0 12 0zM3 23.25a9 9 0 1 1 18 0 .75.75 0 0 0 1.5 0c0-5.799-4.701-10.5-10.5-10.5S1.5 17.451 1.5 23.25a.75.75 0 0 0 1.5 0z'></path></svg>
                                <button>Mi perfil</button>
                            </div>
                            <div onClick={handleClickBookHistory} className='flex gap-2 items-center'>
                                <svg class='h-4 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M22.5 14.249v4.5a2.25 2.25 0 0 1-2.25 2.25H3.75a2.25 2.25 0 0 1-2.25-2.25v-9a2.25 2.25 0 0 1 2.25-2.25h16.5a2.25 2.25 0 0 1 2.25 2.25v4.5zm1.5 0v-4.5a3.75 3.75 0 0 0-3.75-3.75H3.75A3.75 3.75 0 0 0 0 9.749v9a3.75 3.75 0 0 0 3.75 3.75h16.5a3.75 3.75 0 0 0 3.75-3.75v-4.5zm-18-7.5v15a.75.75 0 0 0 1.5 0v-15a.75.75 0 0 0-1.5 0zm10.5 0v15a.75.75 0 0 0 1.5 0v-15a.75.75 0 0 0-1.5 0zm0 0v-3a2.25 2.25 0 0 0-2.25-2.25h-4.5a2.25 2.25 0 0 0-2.25 2.25v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 0 1.5 0z'></path></svg>
                                <button>Historial de Reservas</button>
                            </div>
                            <div onClick={handleClickFavorites} className='flex gap-2 items-center'>
                                <svg class='h-4 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12.541 21.325l-9.588-10a4.923 4.923 0 1 1 6.95-6.976l1.567 1.566a.75.75 0 0 0 1.06 0l1.566-1.566a4.923 4.923 0 0 1 6.963 6.962l-9.6 10.014h1.082zm-1.082 1.038a.75.75 0 0 0 1.082 0l9.59-10.003a6.418 6.418 0 0 0-.012-9.07 6.423 6.423 0 0 0-9.083-.001L11.47 4.854h1.06l-1.566-1.566a6.423 6.423 0 1 0-9.082 9.086l9.577 9.99z'></path></svg>
                                <button>Mis Favoritos</button>
                            </div>
                            <div onClick={handleClickLogOut} className='flex gap-2 items-center'>
                                <svg class='h-4 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'><path d='M1.19 66.83l20 20a4.002 4.002 0 1 0 5.66-5.66L13.67 68H88a4 4 0 0 0 0-8H13.67l13.18-13.17a4.002 4.002 0 1 0-5.66-5.66l-20 20c-.183.186-.35.387-.5.6 0 0 0 .11-.08.16a3 3 0 0 0-.28.53 2.25 2.25 0 0 0-.08.24 3 3 0 0 0-.15.51 3.94 3.94 0 0 0 0 1.58c.036.174.086.344.15.51.022.081.049.162.08.24.076.182.17.357.28.52 0 .06.05.11.08.16.15.216.317.42.5.61zm31.13 35c20.876 19.722 53.787 18.787 73.509-2.089 14.874-15.743 18.432-39.058 8.931-58.521-10.77-22.12-42-37.41-69.52-24a52 52 0 0 0-12.91 8.93 4.004 4.004 0 0 1-5.49-5.83 60.002 60.002 0 0 1 14.9-10.29C67.26-2.37 106.48 6 122 37.74c14.519 29.787 2.142 65.704-27.645 80.223-22.44 10.938-49.308 6.839-67.465-10.293a4 4 0 0 1 5.48-5.82z'></path></svg>
                                <button>Cerrar sesión</button>
                            </div>
                        </div>
                    </div>
                    : <></>
            }
        </header>
    );
};

export default NavbarMobile;