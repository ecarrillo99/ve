const MobileBottomNav = ({ 
  activo, 
  onClickInicio, 
  onClickDisney, 
  onClickVinos, 
  onClickVisas, 
  onClickContactanos 
}) => {
  const mobileItems = [
    {
      id: 1,
      label: "Hospedaje",
      icon: "https://visitaecuador.com/img/web/homeMenu.svg",
      onClick: onClickInicio,
    },
    {
      id: 3,
      label: "Disney",
      icon: "https://visitaecuador.com/img/web/disneyMenu.svg",
      onClick: onClickDisney,
    },
    {
      id: 4,
      label: "Beneficios",
      icon: "https://visitaecuador.com/img/web/benefit.svg",
      onClick: onClickVinos,
      rounded: true
    },
    {
      id: 5,
      label: "Visas",
      icon: "https://visitaecuador.com/img/web/visas-concierge.jpeg",
      onClick: onClickVisas,
      rounded: true
    },
    {
      id: 7,
      label: "Contacto",
      icon: "https://visitaecuador.com/img/web/contacto.svg",
      onClick: onClickContactanos,
      rounded: true
    }
  ];

  return (
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
  );
};

export default MobileBottomNav;