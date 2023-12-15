import { useEffect, useState } from "react";
import { getNews } from "../../../controllers/info/infoController";
import NewsItem from "./NewsItem";
import Slider from 'react-slick';
import NewsItemSkeleton from "./NewsItemSkeleton";

const NewsBanner = () => {
    const [data, setData] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                getNews()
                    .then((result) => {
                        if (result) {
                            setData(result)
                        }
                    })
                    .catch((error) => { console.log(error) })

            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, []);

    const CustomNextArrow = (props) => {
        return (
            <div
                className="-mr-3 z-50 absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer"
                onClick={props.onClick}
                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
                <svg className="h-7 w-7" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <circle style={{ fill: '#eaeaea' }} cx="256" cy="256" r="256"></circle>
                        <path style={{ fill: '#eaeaea' }} d="M321.188,503.613c75.616-19.852,137.561-73.419,168.814-143.665L386.055,256.002L270.295,361.66 l-40.482,50.579L321.188,503.613z"></path>
                        <polygon style={{ fill: '#96c121' }} points="229.812,412.238 201.775,384.202 329.98,256.002 201.776,127.798 229.814,99.762 386.053,256.002 "></polygon>
                        <polygon style={{ fill: '#96c121' }} points="386.053,256.002 229.812,412.238 201.775,384.202 329.98,256.002 "></polygon>
                    </g>
                </svg>
            </div>
        );
    };

    const CustomPrevArrow = (props) => {
        return (
            <div
                className="-ml-3 z-50  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer"
                onClick={props.onClick}
                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
                <svg className="h-7 w-7" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000" transform="rotate(180)" >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <circle style={{ fill: '#eaeaea' }} cx="256" cy="256" r="256"></circle>
                        <path style={{ fill: '#eaeaea' }} d="M321.188,503.613c75.616-19.852,137.561-73.419,168.814-143.665L386.055,256.002L270.295,361.66 l-40.482,50.579L321.188,503.613z"></path>
                        <polygon style={{ fill: '#96c121' }} points="229.812,412.238 201.775,384.202 329.98,256.002 201.776,127.798 229.814,99.762 386.053,256.002 "></polygon>
                        <polygon style={{ fill: '#96c121' }} points="386.053,256.002 229.812,412.238 201.775,384.202 329.98,256.002 "></polygon>
                    </g>
                </svg>
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 2,
        rows: 2,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                },
            },]
    };

    return (
        <div>
            <h1 className="font-bold text-xl">Noticias</h1>

            <Slider {...settings} spaceBetween={10}>
                {
                    data ?(
                        data.map((item) => (
                            <div className="w-1/2">
                                <NewsItem noticia={item}></NewsItem>
                            </div>
                        ))
                    ):(
                        Array(8).fill(null).map((item)=>(
                            <div className="w-1/2">
                                <NewsItemSkeleton></NewsItemSkeleton>
                            </div>
                        ))
                    )
                }
            </Slider>

        </div>
    );
}
export default NewsBanner;