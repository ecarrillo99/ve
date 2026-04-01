import { useNavigate } from "react-router-dom";

const ItemHotels = ({ hotel }) => {
  const navigate = useNavigate();

  const date = [{
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate() + 1),
    key: "selection",
  }];

  const options = {
    adult: 1,
    children: 0,
    childrenAges: [],
    room: 1,
  };

  const destination = {
    Titulo: hotel.Titulo,
    Tipo: "establecimiento",
    Id: hotel.Id,
    Lugar: "",
  };

  const handleClickHotel = () => {
    navigate(
      `/hotel/${hotel.Titulo.toLowerCase().replaceAll(" - ", "-").replaceAll(" ", "-")}/?id=${hotel.Id}&destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`
    );
  };

  return (
    <div
      className="group relative rounded-xl overflow-hidden cursor-pointer bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      onClick={handleClickHotel}
    >
      {/* Image */}
      <div className="relative h-[88px] w-full bg-white overflow-hidden">
        <img
          src={hotel.Foto}
          alt={hotel.Titulo}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-greenVE-700/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250">
          <span className="text-white text-[11px] font-semibold tracking-wide uppercase mb-0.5">
            Desde
          </span>
          <span className="text-white text-base font-bold leading-tight">
            ${hotel.Minimo}
          </span>
          <span className="mt-1.5 text-[10px] text-greenVE-200 border border-greenVE-400 rounded-full px-2 py-0.5">
            Ver ofertas
          </span>
        </div>
      </div>


    </div>
  );
};

export default ItemHotels;