import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import { getBookHistory } from "../../controllers/reserva/reservaController";
import HistoryItem from "../../components/booking_history_components/HistoryItem";
import HistoryItemSkeleton from "../../components/booking_history_components/HistoryItemSkeleton";
import { sessionStatus } from "../../global/util";
import { Navigate } from "react-router-dom";
import NavbarMobile from "../../components/global_components/navbar/NavbarMobile";

const BookHistory =({isAuth})=>{
    const [data, setData]=useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        async function fetchData() {
           try{
            getBookHistory().then((res)=>{
                if(res){
                    if(res===401){
                        localStorage.removeItem("datos")
                        window.location.reload();
                    }else{
                        setData(res);
                        setFilteredData(res);
                    }
                }
            })
           }catch(e){

           }
        }
        fetchData();
    }, []);


    useEffect(() => {
        if(data){
            const filtered = data.filter(item =>
                item.NombreHotel.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredData(filtered);
        }
    }, [searchTerm,data]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return(
        sessionStatus() ? (
            <div>
                {
                    isMobile
                    ?<NavbarMobile/>
                    :<Navbar/>
                }
                <div className="flex flex-col mx-5 md:mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 gap-7">
                    <h1 className="font-semibold text-3xl">Historial de reservas</h1>

                    <div className="relative mb-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-greenVE-500 focus:border-greenVE-500"
                            placeholder="Buscar por nombre de hotel..."
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        {data
                            ? (filteredData.length > 0
                                ? filteredData.map((item, index) => <HistoryItem key={index} reserva={item}></HistoryItem>)
                                : <p className="text-center text-gray-500 py-8">No se encontraron reservas con ese nombre de hotel</p>)
                            : Array.from({ length: 5 }, (item, index) => <HistoryItemSkeleton key={index}></HistoryItemSkeleton>)
                        }
                    </div>
                </div>
                <Footer></Footer>
            </div>
            )
            : (
                <Navigate to="/" />
            )
    );
}

export default BookHistory;
