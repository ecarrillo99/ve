import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import { getBookHistory } from "../../controllers/reserva/reservaController";
import HistoryItem from "../../components/booking_history_components/HistoryItem";
import HistoryItemSkeleton from "../../components/booking_history_components/HistoryItemSkeleton";
import { sessionStatus } from "../../global/util";
import { Navigate } from "react-router-dom";

const BookHistory =({isAuth})=>{
    const [data, setData]=useState();
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
                        console.log(res);
                    }
                }
            })
           }catch(e){

           }
        }
        fetchData();
    }, []);
    return(
        sessionStatus()?(
            <div>
                <Navbar></Navbar>
                <div className="flex flex-col mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 gap-7">
                    <h1 className="font-semibold text-3xl">Historial de reservas</h1>
                    <div className="flex flex-col gap-5">
                    {data
                        ? data.map((item, index) => <HistoryItem key={index} reserva={item}></HistoryItem>)
                        : Array.from({ length: 5 }, (item, index) => <HistoryItemSkeleton key={index} ></HistoryItemSkeleton>)
                    }
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
        :(
            <Navigate to="/"/>
        )
    );
}

export default BookHistory;