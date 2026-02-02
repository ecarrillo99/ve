import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditOfferModal from "../admin/EditOfferModal";
import EditInventoryModal from "../admin/EditInventoryModal";

const WineOfferItem = ({ offer }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [openEditOffer, setOpenEditOffer] = useState(false);
  const [openEditInventory, setOpenEditInventory] = useState(false);
  const [inventoryToEdit, setInventoryToEdit] = useState(null);

  const isAdmin = () => {
    try {
      const idUsuario = localStorage.getItem('id_usuario');
      if (idUsuario) return idUsuario.toString() === '412';
      const datos = JSON.parse(localStorage.getItem('datos') || '{}');
      const idFromDatos = datos?.data?.id_usuario || datos?.id_usuario;
      return idFromDatos?.toString() === '412';
    } catch (e) {
      return false;
    }
  };

  const handleEditOffer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenEditOffer(true);
  };

  const handleEditInventory = (e, inventory) => {
    e.preventDefault();
    e.stopPropagation();
    setInventoryToEdit(inventory);
    setOpenEditInventory(true);
  };

  const handleClickItem = () => {
    // No navegar si hay un modal abierto
    if (openEditOffer || openEditInventory) return;
    navigate(`/vinos/oferta/${offer.id}`);
  };

const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const date = new Date(dateString);
  
  // Usar UTC para evitar desfases de zona horaria
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    timeZone: 'UTC'  // ← Esto corrige el problema
  });
};

  const getDaysRemaining = () => {
    const now = new Date();
    const endDate = new Date(offer.date_ed);
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <>
      {/* MODALES FUERA DEL CONTENEDOR PRINCIPAL */}
      {openEditOffer && (
        <EditOfferModal
          isOpen={openEditOffer}
          onClose={() => setOpenEditOffer(false)}
          offer={offer}
          onUpdated={(res) => {
            console.log('Oferta actualizada:', res);
            setOpenEditOffer(false);
            // Opcional: recargar la página o actualizar el estado
            window.location.reload();
          }}
        />
      )}
      
      {openEditInventory && inventoryToEdit && (
        <EditInventoryModal
          isOpen={openEditInventory}
          onClose={() => { 
            setOpenEditInventory(false); 
            setInventoryToEdit(null); 
          }}
          inventory={inventoryToEdit}
          onUpdated={() => { 
            setOpenEditInventory(false); 
            setInventoryToEdit(null);
            window.location.reload();
          }}
        />
      )}

      {/* CARD PRINCIPAL */}
      <div
        className="bg-white rounded-xl border md:border-0 border-gray-200 cursor-pointer group transition-all duration-300 hover:shadow-lg"
        onClick={handleClickItem}
      >
        {/* Imagen de la oferta */}
        <div className="relative w-full md:h-48 h-36 overflow-hidden rounded-t-xl md:rounded-xl">
          {!imageLoaded && (
            <div className="animate-pulse absolute inset-0 w-full bg-gray-200 rounded-t-xl md:rounded-xl h-full"></div>
          )}
          <img
            src={offer.image}
            alt={offer.title}
            className={`absolute inset-0 w-full h-full object-cover rounded-t-xl md:rounded-xl transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Edit button visible solo para admin */}
          {isAdmin() && (
            <button
              onClick={handleEditOffer}
              className="absolute top-2 right-2 bg-white/90 text-xs font-semibold py-1 px-2 rounded-md shadow-sm hover:bg-white z-10"
            >
              Editar
            </button>
          )}

          {/* Badge de días restantes */}
          {!isAdmin() && daysRemaining > 0 && daysRemaining <= 7 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              ¡{daysRemaining} días!
            </div>
          )}

          {/* Overlay con el regalo/inventario */}
          {offer.inventories && offer.inventories.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500 rounded-full p-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 7h-1.209A4.92 4.92 0 0 0 19 5.5C19 3.57 17.43 2 15.5 2c-1.622 0-2.705 1.482-3.404 3.085C11.407 3.57 10.269 2 8.5 2 6.57 2 5 3.57 5 5.5c0 .596.079 1.089.209 1.5H4c-1.103 0-2 .897-2 2v2c0 1.103.897 2 2 2v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-4.5-3c.827 0 1.5.673 1.5 1.5C17 7 16.374 7 16 7h-2.478c.511-1.576 1.253-3 1.978-3zM7 5.5C7 4.673 7.673 4 8.5 4c.888 0 1.714 1.525 2.198 3H8c-.374 0-1 0-1-1.5zM4 9h7v2H4V9zm2 11v-7h5v7H6zm12 0h-5v-7h5v7zm-5-9V9h7l.001 2H13z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-semibold truncate flex items-center">
                  🎁 Incluye: {offer.inventories[0].name}
                  {isAdmin() && (
                    <button
                      onClick={(e) => handleEditInventory(e, offer.inventories[0])}
                      className="ml-2 bg-white/90 text-black text-xxs px-1 rounded-md font-medium hover:bg-white"
                    >
                      Editar
                    </button>
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Información del establecimiento y oferta */}
        <div className="flex flex-col mt-3 gap-1 px-3 md:px-0 pb-3 md:pb-0">
          {/* Establecimiento */}
          {offer.establishment && (
            <div className="flex items-center gap-2">
              <img
                src={offer.establishment.logo}
                alt={offer.establishment.name}
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <label className="text-xs text-gray-500 font-medium truncate">
                {offer.establishment.name}
              </label>
            </div>
          )}

          {/* Título de la oferta */}
          <label className="text-sm font-semibold text-gray-800 line-clamp-2">
            {offer.title}
          </label>

          {/* Ubicación */}
          {offer.establishment && (
            <div className="flex items-center gap-1 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-xs">
                {offer.establishment.city}, {offer.establishment.country}
              </span>
            </div>
          )}

          {/* Descripción corta */}
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
            {offer.description}
          </p>

          {/* Fechas de validez */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
              </svg>
              <span>
                {formatDate(offer.date_st)} - {formatDate(offer.date_ed)}
              </span>
            </div>

            {/* Indicador de regalo */}
            {offer.inventories && offer.inventories.length > 0 && (
              <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                <span className="text-xs font-medium">
                  +{offer.inventories.length} regalo
                  {offer.inventories.length > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WineOfferItem;