import OffersBanner from "../../components/home_components/offersBanner/OffersBanner";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import "./home.css";
import HotelsBanner from "../../components/home_components/hotelsBanner/HotelsBanner";
import MainBanner from "../../components/home_components/mainBanner/MainBanner";
import AboutBanner from "../../components/home_components/aboutBanner/AboutBanner";
import AppBanner from "../../components/home_components/appBanner/AppBanner";
import SearchBar from "../../components/global_components/searchBar/searchBar";
import VideosBanner from "../../components/home_components/videosBanner/VideosBanner";
import RewardsBanner from "../../components/home_components/rewardsBanner/RewardsBanner";
import NewsBanner from "../../components/home_components/newsBanner/NewsBanner";
import ActivityBanner from "../../components/home_components/activityBanner/ActivityBanner";
import DestinoBanner from "../../components/home_components/destinoBanner/DestinoBanner";

const Home = () => {
  return (
    <main>
      <Navbar/>
      <MainBanner/>
      <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 -m-12">
        <SearchBar/>
        <OffersBanner/>
        <VideosBanner/>
        <HotelsBanner/>
        <DestinoBanner/>
        <div className="flex mt-10 gap-6">
          <div className="w-2/3">
          <NewsBanner/>
          </div>
          <div className="w-1/3 border-l-2 pl-4">
          <ActivityBanner/>
          </div>
        </div>
        <RewardsBanner/>
      </div>
      <Footer/>
    </main>
  )
};

export default Home;
