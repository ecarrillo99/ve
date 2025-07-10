import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
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
import ProfileBiosite from "../../components/profile_components/ProfileBiosite";

const Profile = ({}) => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [profileData, setProfileData] = useState();
  const [citiesData, setCitiesData] = useState();
  const [selectedMenu, setSelectedMenu] = useState(
      <ProfileEdit profileData={profileData} citiesData={citiesData} />
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú hamburguesa
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClickVeSites = () => {
    window.open("http://visitaecuador.com/biosite");
  };

  const handleChangeOption = (option) => {
    setSelectedOption(option);
    setIsMenuOpen(false); // Cerrar el menú al seleccionar una opción
    switch (option) {
      case 1:
        setSelectedMenu(
            <ProfileEdit profileData={profileData} citiesData={citiesData} />
        );
        break;
      case 2:
        setSelectedMenu(<ProfileAgencia profileData={profileData} />);
        break;
      case 3:
        setSelectedMenu(<Cashback />);
        break;
      case 4:
        setSelectedMenu(<ProfilePassword />);
        break;
      case 5:
        setSelectedMenu(<ProfileAdmin />);
        break;
      case 6:
        setSelectedMenu(<ProfileBiosite />);
        break;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        getProfileData()
            .then((result1) => {
              if (result1 == 401) {
                localStorage.removeItem("Datos");
                window.location.reload();
              } else {
                if (result1) {
                  getRemoteCities()
                      .then((result2) => {
                        if (result2) {
                          setProfileData(result1);
                          setCitiesData(
                              result2
                                  .slice()
                                  .sort((a, b) => a.Titulo.localeCompare(b.Titulo))
                          );
                          setSelectedMenu(
                              <ProfileEdit
                                  profileData={result1}
                                  citiesData={result2
                                      .slice()
                                      .sort((a, b) => a.Titulo.localeCompare(b.Titulo))}
                              />
                          );
                        }
                      })
                      .catch((error) => {});
                }
              }
            })
            .catch((error) => {});
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return sessionStatus() ? (
      citiesData != null && citiesData != null ? (
          <div>
            {isMobile ? <NavbarMobile activo={2} /> : <Navbar activo={2} />}
            <div
                className={`flex flex-col md:flex-row mx-5 md:mx-auto py-6 sm:px-6 lg:px-8 gap-7 ${
                    selectedOption !== 6 ? "max-w-6xl" : ""
                }`}
            >
              {/* Menú hamburguesa para opción 6 */}
              {selectedOption === 6 && (
                  <div className="fixed top-20 left-5 z-50">
                    <button
                        onClick={toggleMenu}
                        className="bg-white border border-gray-300 rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                      <div className="space-y-1">
                        <div className="w-6 h-0.5 bg-gray-600"></div>
                        <div className="w-6 h-0.5 bg-gray-600"></div>
                        <div className="w-6 h-0.5 bg-gray-600"></div>
                      </div>
                    </button>

                    {/* Menú desplegable */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl min-w-[250px] overflow-hidden">
                          <ProfileMenu
                              handleChangeOption={handleChangeOption}
                              selectedOption={selectedOption}
                              profileData={profileData}
                          />
                        </div>
                    )}
                  </div>
              )}

              {/* Menú normal para otras opciones */}
              {selectedOption !== 6 && (
                  <div className="w-full md:w-3/12">
                    <ProfileMenu
                        handleChangeOption={handleChangeOption}
                        selectedOption={selectedOption}
                        profileData={profileData}
                    />
                  </div>
              )}

              {/* Contenido principal */}
              <div className={`w-full ${selectedOption !== 6 ? "md:w-9/12" : ""}`}>
                {selectedMenu}
              </div>
            </div>
            <Footer />
          </div>
      ) : (
          <div className="h-screen w-screen flex flex-col justify-center items-center">
            <img
                src="https://visitaecuador.com/img/web/logo_verde.png"
                style={{ width: "300px", height: "auto" }}
            />
            <div className="animate-spin w-16 h-16 border-t-4 border-greenVE-500 rounded-full"></div>
          </div>
      )
  ) : (
      <Navigate to="/" />
  );
};

export default Profile;
