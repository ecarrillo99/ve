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
            className="-mr-3  absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg h-8 w-8 flex items-center justify-center pl-1"
            onClick={props.onClick}
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
            <span className="icon-[material-symbols--arrow-forward-ios]"></span>
          </div>
        );
      };
    
      const CustomPrevArrow = (props) => {
        return (
          <div
            className="-ml-3 z-40  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg pr-1 h-8 w-8 flex items-center justify-center"
            onClick={props.onClick}
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
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
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    rows: 1,
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
                        data.map((item, index) => (
                            <div key={index} className="w-1/2">
                                <NewsItem noticia={item}></NewsItem>
                            </div>
                        ))
                    ):(
                        Array(8).fill(null).map((item, index)=>(
                            <div key={index} className="w-1/2">
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