import { useLocation, useNavigate } from "react-router-dom";

const MenuTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Determinar el tab activo basándose en la ruta actual
  const getActiveTab = () => {
    if (pathname === "/" || pathname.startsWith("/busqueda") || pathname.startsWith("/hotel/")) return 1;
    if (pathname === "/vinos" || pathname === "/byd") return 4;
    if (pathname.startsWith("/disney")) return 3;
    if (pathname.startsWith("/visas-concierge")) return 5;
    if (pathname.startsWith("/nosotros")) return 6;
    if (pathname.startsWith("/contacto")) return 7;
    return 1;
  };

  const activo = getActiveTab();

  const handleClickInicio = () => navigate("/");
  const handleClickInfotour = () => window.open("https://www.infotour.app/");
  const handleClickDisney = () => navigate("/disney");
  const handleClickVinos = () => navigate("/vinos");
  const handleClickVisas = () => navigate("/visas-concierge");
  const handleClickNosotros = () => navigate("/nosotros");
  const handleClickContactanos = () => navigate("/contacto");

  // Items del menú
  const menuItems = [
    {
      id: 1,
      label: "Hospedaje",
      icon: "https://visitaecuador.com/img/web/homeMenu.svg",
      onClick: handleClickInicio,
      isImage: true
    },
    {
      id: 2,
      label: "InfoTour",
      icon: "https://visitaecuador.com/img/web/infotourMenu.svg",
      onClick: handleClickInfotour,
      isImage: true,
      external: true
    },
    {
      id: 3,
      label: "Disney",
      icon: "https://visitaecuador.com/img/web/disneyMenu.svg",
      onClick: handleClickDisney,
      isImage: true
    },
    {
      id: 4,
      label: "Beneficios",
      icon: "https://visitaecuador.com/img/web/benefit.svg",
      onClick: handleClickVinos,
      isImage: true,
      rounded: true
    },
    {
      id: 5,
      label: "Visas",
      icon: "https://visitaecuador.com/img/web/visas-concierge.jpeg",
      onClick: handleClickVisas,
      isImage: true,
      rounded: true
    },
    {
      id: 6,
      label: "Nosotros",
      icon: "https://visitaecuador.com/img/web/nosotrosMenu.svg",
      onClick: handleClickNosotros,
      isImage: true,
      rounded: true
    },
    {
      id: 7,
      label: "Contacto",
      icon: "https://visitaecuador.com/img/web/contacto.svg",
      onClick: handleClickContactanos,
      isImage: true,
      rounded: true
    }
  ];

  // Items principales para móvil (los más importantes - máximo 5)
  const mobileItems = [
    menuItems[0], // Hospedaje
    menuItems[2], // Disney
    menuItems[3], // Beneficios
    menuItems[4], // Visas
    menuItems[6], // Contacto
  ];

  const busqueda = location.pathname.startsWith("/busqueda");

  return (
    <>
      {/* ========== DESKTOP: Tabs superiores ========== */}
      <div className={`${busqueda ? "hidden" : ""}  hidden md:flex gap-0.5 items-end flex-wrap`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex gap-2 ${
              activo === item.id 
                ? "bg-white text-gray-800" 
                : "bg-[#ACCD7B] text-white hover:bg-white/40"
            } rounded-t-lg px-4 py-2 text-sm items-center transition-all`}
            onClick={item.onClick}
          >
            {item.rounded ? (
              <div
                className="rounded-full bg-white p-0.5"
                style={{ height: "22px", width: "22px" }}
              >
                <img
                  src={item.icon}
                  className="rounded-full"
                  style={{ height: "100%", width: "100%" }}
                  alt={item.label}
                />
              </div>
            ) : (
              <img
                src={item.icon}
                style={{ height: "20px" }}
                alt={item.label}
              />
            )}
            <label className="hidden md:flex cursor-pointer font-medium">
              {item.label}
            </label>
          </button>
        ))}
      </div>

      {/* ========== MOBILE: Menú inferior fijo ========== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-[60]">
        <div className="flex justify-around items-center py-2 px-2">
          {mobileItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                activo === item.id
                  ? "text-greenVE-600 bg-greenVE-50"
                  : "text-gray-500 hover:text-greenVE-500 hover:bg-gray-100"
              }`}
            >
              {item.rounded ? (
                <div
                  className={`rounded-full p-0.5 ${
                    activo === item.id ? "bg-greenVE-100" : "bg-gray-100"
                  }`}
                  style={{ height: "24px", width: "24px" }}
                >
                  <img
                    src={item.icon}
                    className="rounded-full w-full h-full object-cover"
                    alt={item.label}
                  />
                </div>
              ) : (
                <img
                  src={item.icon}
                  className={`h-5 w-5 ${
                    activo === item.id ? "opacity-100" : "opacity-70"
                  }`}
                  alt={item.label}
                />
              )}
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Safe area para dispositivos con notch */}
        <div className="h-safe-area-inset-bottom bg-white/95" />
      </nav>
    </>
  );
};

// Componente separado para el spacer (usar en las páginas donde se necesite)
export const MobileMenuSpacer = () => (
  <div className="md:hidden h-20" />
);

export default MenuTabs;