import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import {Navigate } from 'react-router-dom';
import ProfileMenu from "../../components/profile_components/ProfileMenu";
import ProfileEdit from "../../components/profile_components/ProfileEdit";
import ProfilePassword from "../../components/profile_components/ProfilePassword";
import { getProfileData } from "../../controllers/perfil/perfilController";
import { getRemoteCities } from "../../controllers/lugares/lugaresController";
import { sessionStatus } from "../../global/util";
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";
import Cashback from "../../components/profile_components/cashback/Cashback";
import ProfileAgencia from "../../components/profile_components/ProfileAgencia";
import ProfileAdmin from "../../components/profile_components/ProfileAdmin";

const Profile=({})=>{
    const [selectedOption, setSelectedOption]=useState(1);
    const [profileData, setProfileData]=useState();
    const [citiesData, setCitiesData]=useState();
    const [selectedMenu, setSelectedMenu]=useState(<ProfileEdit profileData={profileData} citiesData={citiesData}/>);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChangeOption=(option)=>{
        setSelectedOption(option)
        switch (option){
          case 1:
            setSelectedMenu(<ProfileEdit profileData={profileData} citiesData={citiesData}/>);
          break;
          case 2:
            setSelectedMenu(<ProfileAgencia  profileData={profileData}/>);
          break;
          case 3:
            setSelectedMenu(<Cashback/>);
          break;
          case 4:
            setSelectedMenu(<ProfilePassword/>);
          break;
          case 5:
            setSelectedMenu(<ProfileAdmin/>);
          break;
            case 6:
                setSelectedMenu(<ProfileAdmin/>);
            break;

        }
    }

    useEffect(() => {

        async function fetchData() {

            try {
                getProfileData()
                    .then((result1) => {
                      if(result1==401){
                        localStorage.removeItem("Datos");
                        window.location.reload();
                      }else{
                        if (result1) {
                          getRemoteCities()
                              .then((result2)=>{
                                  if(result2){
                                    setProfileData(result1)
                                    setCitiesData(result2.slice().sort((a,b)=>a.Titulo.localeCompare(b.Titulo)))
                                    setSelectedMenu(<ProfileEdit profileData={result1} citiesData={result2.slice().sort((a,b)=>a.Titulo.localeCompare(b.Titulo))}/>)
                                  }
                              })
                              .catch((error) => { })
                      }
                      }
                    })
                    .catch((error) => { })
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    

    return (
      sessionStatus()?(
        citiesData != null && citiesData != null ? (
            <div>
              {
                isMobile
                ?<NavbarMobile activo={2}/>
                :<Navbar activo={2} />
              }
              <div className="flex flex-col md:flex-row mx-5 md:mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 gap-7">
                <div className="w-full md:w-3/12">
                  <ProfileMenu handleChangeOption={handleChangeOption} selectedOption={selectedOption} profileData={profileData}/>
                </div>
                <div className="w-full md:w-9/12">
                  {selectedMenu}
                </div>
              </div>
              <Footer />
            </div>
          ) : (
            <div className="h-screen w-screen flex flex-col justify-center items-center">
              <img src="https://visitaecuador.com/img/web/logo_verde.png" style={{ width: "300px", height: "auto" }} />
              <div className="animate-spin w-16 h-16 border-t-4 border-greenVE-500 rounded-full"></div>
            </div>
          )
      ):(
        <Navigate to="/"/>
      )
    );
}

export default Profile;
