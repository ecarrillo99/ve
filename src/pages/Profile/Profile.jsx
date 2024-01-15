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

const Profile=({})=>{
    const [selectedOption, setSelectedOption]=useState(1);
    const [profileData, setProfileData]=useState();
    const [citiesData, setCitiesData]=useState();
    const [selectedMenu, setSelectedMenu]=useState(<ProfileEdit profileData={profileData} citiesData={citiesData}/>);

    const handleChangeOption=(option)=>{
        setSelectedOption(option)
        if(option==1){
            setSelectedMenu(<ProfileEdit profileData={profileData} citiesData={citiesData}/>)
        }
        if(option==2){
            setSelectedMenu(<ProfilePassword/>)
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
                              .catch((error) => { console.log(error) })
                      }
                      }
                    })
                    .catch((error) => { console.log(error) })
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
              <Navbar />
              <div className="flex flex-col md:flex-row mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 gap-7">
                <div className="w-full md:w-3/12">
                  <ProfileMenu handleChangeOption={handleChangeOption} selectedOption={selectedOption} />
                </div>
                <div className="w-full md:w-9/12">
                  {selectedMenu}
                </div>
              </div>
              <Footer />
            </div>
          ) : (
            <div className="h-screen w-screen flex flex-col justify-center items-center">
              <img src="/img/logo_verde.png" style={{ width: "300px", height: "auto" }} alt="Logo" />
              <div className="animate-spin w-16 h-16 border-t-4 border-greenVE-500 rounded-full"></div>
            </div>
          )
      ):(
        <Navigate to="/"/>
      )
    );
}

export default Profile;