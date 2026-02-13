import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Short from "./pages/Short/short";
import {
  SearchBarSkeleton,
  OffersBannerSkeleton,
  ContentSkeleton,
} from "./components/global_components/Skeleton/Loadingkeleton.jsx";

// Importa los componentes utilizando lazy
const Home = lazy(() => import("./pages/home/Home"));
const Hotel = lazy(() => import("./pages/hotel/Hotel"));
const HotelMobile = lazy(() => import("./pages/hotel/HotelMobile"));
const Search = lazy(() => import("./pages/search/search"));
const SearchMobile = lazy(() => import("./pages/search/SearchMobile"));
const Login = lazy(() => import("./pages/login/login"));
const Suscription = lazy(() => import("./pages/suscription/Suscription"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const BookHistory = lazy(() => import("./pages/BookHistory/BookHistory"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));
const About = lazy(() => import("./pages/About/About"));
const Politicas = lazy(() => import("./pages/Politicas/Politicas"));
const Terminos = lazy(() => import("./pages/Terminos/Terminos"));
const Certificado = lazy(() => import("./pages/Certificado/Certificado"));
const Disney = lazy(() => import("./pages/Disney/Disney"));
const YaGanaste = lazy(() => import("./pages/yaganaste/yaganaste"));
const Bienvenida = lazy(() => import("./pages/Bienvenida/Bienvenida"));
const PayPhone = lazy(() => import("./pages/PayPhone/PayPhone"));
const Contacto = lazy(() => import("./pages/Contacto/Contacto"));
const Emprende = lazy(() => import("./pages/Emprende/Emprende"));
const Remate = lazy(() => import("./pages/Remate/Remate"));
const Pack = lazy(() => import("./pages/Pack/Pack"));
const Convenio = lazy(() => import("./pages/Convenio/Convenio"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const contactos = ["593986263432", "593981850436"];
const Promo = lazy(() => import("./pages/Promo/Promo"));
const Tips = lazy(() => import("./pages/Tips/Tips"));
const Suscribete = lazy(() => import("./pages/Suscribete/Suscribete"));
const SearchBar = lazy(
  () => import("./components/global_components/searchBar/searchBar")
);
const OffersBanner = lazy(
  () => import("./components/home_components/offersBanner/OffersBanner")
);
const VideosBanner = lazy(
  () => import("./components/home_components/videosBanner/VideosBanner")
);
const VisasConcierge = lazy(
  () => import("./pages/VisasConcierge/VisasConcierge")
);
const BiositeRedirect = lazy(
  () => import("./pages/BiositeRedirect/BiositeRedirect")
);

// Componentes de Vinos
const WineOffersBanner = lazy(
  () =>
    import("./components/vinos_components/wineOffersBanner/WineOffersBanner")
);
const WineSearchBar = lazy(
  () =>
    import("./components/vinos_components/wineOffersBanner/WineSearchBar")
);

// Skeleton para WineSearchBar
const WineSearchBarSkeleton = () => (
  <div className="bg-amber-600 relative rounded-sm w-full mt-10 animate-pulse">
    <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-flow-row">
      <div className="col-span-3 bg-amber-100 h-12 m-0.5 rounded-sm"></div>
      <div className="col-span-3 bg-amber-100 h-12 m-0.5 rounded-sm"></div>
      <div className="col-span-2 bg-amber-100 h-12 m-0.5 rounded-sm"></div>
      <div className="col-span-2 bg-amber-100 h-12 m-0.5 rounded-sm"></div>
      <div className="col-span-2 bg-amber-200 h-12 m-0.5 rounded-sm"></div>
    </div>
  </div>
);

const handleOnClick = () => {
  const contacto = contactos[Math.floor(Math.random() * contactos.length)];
  const path = "https://wa.me/" + contacto;
  window.open(path, "_blank");
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          >
            {/* Ruta principal (index) - muestra hoteles */}
            <Route
              index
              element={
                <>
                  {isMobile ? (
                    <div className="pt-4">
                      <Suspense fallback={<SearchBarSkeleton />}>
                        <SearchBar type={3} />
                      </Suspense>
                    </div>
                  ) : (
                    <Suspense fallback={<SearchBarSkeleton />}>
                      <SearchBar type={0} />
                    </Suspense>
                  )}
                  <Suspense fallback={<OffersBannerSkeleton />}>
                    <OffersBanner />
                  </Suspense>
                  <Suspense fallback={<ContentSkeleton />}>
                    <VideosBanner />
                  </Suspense>
                </>
              }
            />

            {/* Ruta de Vinos - muestra ofertas de vinos con WineSearchBar */}
            <Route
              path="vinos"
              element={
                <WineRouteContent isMobile={isMobile} />
              }
            />

            {/* Ruta de BYD */}
            <Route
              path="byd"
              element={
                <div className="h-40 text-black">Esta es la pagina 3</div>
              }
            />
          </Route>

          <Route
            path="/nosotros/:seccion?"
            element={
              <Suspense>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/busqueda/"
            element={
              <Suspense>{isMobile ? <SearchMobile /> : <Search />}</Suspense>
            }
          />
          <Route
            path="/perfil/"
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/historial/"
            element={
              <Suspense>
                <BookHistory />
              </Suspense>
            }
          />
          <Route
            path="/favoritos/"
            element={
              <Suspense>
                <Favorites />
              </Suspense>
            }
          />
          <Route
            path="/suscripcion/"
            element={
              <Suspense>
                <Suscription />
              </Suspense>
            }
          />
          <Route
            path="/login/"
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/hotel/:nombre"
            element={
              <Suspense> <Hotel /></Suspense>
            }
          />
          <Route
            path="/politicas-privacidad/"
            element={
              <Suspense>
                <Politicas />
              </Suspense>
            }
          />
          <Route
            path="/terminos-condiciones/"
            element={
              <Suspense>
                <Terminos />
              </Suspense>
            }
          />
          <Route
            path="/certificado/"
            element={
              <Suspense>
                <Certificado />
              </Suspense>
            }
          />
          <Route
            path="/disney/"
            element={
              <Suspense>
                <Disney />
              </Suspense>
            }
          />
          <Route
            path="/yaganaste/"
            element={
              <Suspense>
                <YaGanaste />
              </Suspense>
            }
          />
          <Route
            path="/short/:id"
            element={
              <Suspense>
                <Short />
              </Suspense>
            }
          />
          <Route
            path="/convenio/:codigo"
            element={
              <Suspense>
                <Convenio />
              </Suspense>
            }
          />
          <Route
            path="/marcablanca/:codigo"
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/bienvenida"
            element={
              <Suspense>
                <Bienvenida />
              </Suspense>
            }
          />
          <Route
            path="/payphone"
            element={
              <Suspense>
                <PayPhone />
              </Suspense>
            }
          />
          <Route
            path="/contacto"
            element={
              <Suspense>
                <Contacto />
              </Suspense>
            }
          />
          <Route
            path="/emprende"
            element={
              <Suspense>
                <Emprende />
              </Suspense>
            }
          />
          <Route
            path="/remate"
            element={
              <Suspense>
                <Remate />
              </Suspense>
            }
          />
          <Route
            path="/pack"
            element={
              <Suspense>
                <Pack />
              </Suspense>
            }
          />
          <Route
            path="/promo"
            element={
              <Suspense>
                <Promo />
              </Suspense>
            }
          />
          <Route
            path="/tips"
            element={
              <Suspense>
                <Tips />
              </Suspense>
            }
          />
          <Route
            path="/suscribete"
            element={
              <Suspense>
                <Suscribete />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <NotFound />
              </Suspense>
            }
          />
          <Route
            path="/:id"
            element={
              <Suspense>
                <BiositeRedirect />
              </Suspense>
            }
          />
          <Route
            path="/visas-concierge"
            element={
              <Suspense>
                <VisasConcierge />
              </Suspense>
            }
          ></Route>
        </Routes>
      </Router>
      {!isMobile ? (
        <div
          className="fixed bottom-5 right-0 bg-transparent py-2 rounded-full cursor-pointer"
          onClick={() => handleOnClick()}
        >
          <img
            className="h-16 md:h-32 z-50"
            src="https://visitaecuador.com/img/web/central.svg"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

// Componente separado para la ruta de vinos con estado de filtros
const WineRouteContent = ({ isMobile }) => {
  const [wineFilters, setWineFilters] = useState({
    country: "",
    city: "",
    type: "",
    rate: 0,
  });

  const handleFilterChange = (filters) => {
    setWineFilters(filters);
  };

  return (
    <>
      {isMobile ? (
        <div className="pt-4">
          <Suspense fallback={<WineSearchBarSkeleton />}>
            <WineSearchBar 
              type={3} 
              onFilterChange={handleFilterChange}
              initialFilters={wineFilters}
            />
          </Suspense>
        </div>
      ) : (
        <Suspense fallback={<WineSearchBarSkeleton />}>
          <WineSearchBar 
            type={0} 
            onFilterChange={handleFilterChange}
            initialFilters={wineFilters}
          />
        </Suspense>
      )}
      <Suspense fallback={<OffersBannerSkeleton />}>
        <WineOffersBanner filters={wineFilters} />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <VideosBanner />
      </Suspense>
    </>
  );
};

export default App;