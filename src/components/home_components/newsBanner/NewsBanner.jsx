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
                            if(result==401){
                                localStorage.removeItem('datos');
                                window.location.reload();
                            }else{
                                setData(result)
                            }
                        }
                    })
                    .catch((error) => { })

            } catch (error) {
                console.error("Error:", error);
            }
        }
        fetchData();
    }, []);

    const CustomNextArrow = (props) => {
        return (
          <div
            className="-mr-3 z-40 absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer rounded-full bg-white shadow-lg text-gray-800 text-lg h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-forward-ios]"></span>
          </div>
        );
      };
    
      const CustomPrevArrow = (props) => {
        return (
          <div
            className="-ml-3 z-40 absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-white shadow-lg text-gray-800 text-lg h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-back-ios-new]"></span>
          </div>
        );
      };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 7000,
        speed: 1000,
        slidesToShow: 2,
        rows: 2,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    rows: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    rows: 1,
                },
            },
        ]
    };

    return (
        <div className=" md:mx-0 mx-5">
            <h1 className="font-bold text-2xl mb-3">Noticias</h1>
            
            <div className="">
                <Slider {...settings}>
                    {
                        data ?(
                            data.map((item, index) => (
                                <div key={index}>
                                    <NewsItem noticia={item}></NewsItem>
                                </div>
                            ))
                        ):(
                            Array(8).fill(null).map((item, index)=>(
                                <div key={index}>
                                    <NewsItemSkeleton></NewsItemSkeleton>
                                </div>
                            ))
                        )
                    }
                </Slider>
            </div>
        </div>
    );
}
export default NewsBanner;