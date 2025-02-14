import React, { lazy, Suspense } from 'react';

//import OffersBanner from "../../components/home_components/offersBanner/OffersBanner";
//import Footer from "../../components/global_components/footer/Footer";
//import Navbar from "../../components/global_components/navbar/Navbar";
//import HotelsBanner from "../../components/home_components/hotelsBanner/HotelsBanner";
//import MainBanner from "../../components/home_components/mainBanner/MainBanner";
//import SearchBar from "../../components/global_components/searchBar/searchBar";
//import VideosBanner from "../../components/home_components/videosBanner/VideosBanner";
//import RewardsBanner from "../../components/home_components/rewardsBanner/RewardsBanner";
//import NewsBanner from "../../components/home_components/newsBanner/NewsBanner";
//import ActivityBanner from "../../components/home_components/activityBanner/ActivityBanner";
//import DestinoBanner from "../../components/home_components/destinoBanner/DestinoBanner";
import { useEffect, useState } from "react";
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';
import { useLocation, useParams } from 'react-router-dom';
import { BannerSkeleton, NavbarSkeleton, SearchBarSkeleton, ContentSkeleton, OffersBannerSkeleton } from '../../components/global_components/Skeleton/Loadingkeleton'

const Navbar = lazy(() => import("../../components/global_components/navbar/Navbar"));
const OffersBanner = lazy(() => import('../../components/home_components/offersBanner/OffersBanner'));
const Footer = lazy(() => import("../../components/global_components/footer/Footer"));
const HotelsBanner = lazy(() => import("../../components/home_components/hotelsBanner/HotelsBanner"));
const MainBanner = lazy(() => import("../../components/home_components/mainBanner/MainBanner"));
const SearchBar = lazy(() => import("../../components/global_components/searchBar/searchBar"));
const VideosBanner = lazy(() => import("../../components/home_components/videosBanner/VideosBanner"));
const RewardsBanner = lazy(() => import("../../components/home_components/rewardsBanner/RewardsBanner"));
const NewsBanner = lazy(() => import("../../components/home_components/newsBanner/NewsBanner"));
const ActivityBanner = lazy(() => import("../../components/home_components/activityBanner/ActivityBanner"));
const DestinoBanner = lazy(() => import("../../components/home_components/destinoBanner/DestinoBanner"));


const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil
  const {codigo} = useParams();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);


    if(codigo) {
      localStorage.setItem('codigo', codigo);
    } else {
      localStorage.removeItem('codigo');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [codigo]);


  return (
      <main>
        {isMobile ? (
            <Suspense fallback={<NavbarSkeleton />}>
              <NavbarMobile activo={1}/>
            </Suspense>
        ) : (
            <Suspense fallback={<NavbarSkeleton />}>
              <Navbar activo={1}/>
            </Suspense>
        )}

        <Suspense fallback={<BannerSkeleton />}>
          <MainBanner/>
        </Suspense>

        <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 -m-12">
          {isMobile ? (
              <div className="pt-4">
                <Suspense fallback={<SearchBarSkeleton />}>
                  <SearchBar type={3}/>
                </Suspense>
              </div>
          ) : (
              <Suspense fallback={<SearchBarSkeleton />}>
                <SearchBar type={0}/>
              </Suspense>
          )}

          <Suspense fallback={<OffersBannerSkeleton />}>
            <OffersBanner/>
          </Suspense>

          <Suspense fallback={<ContentSkeleton />}>
            <VideosBanner/>
          </Suspense>

          <Suspense fallback={<ContentSkeleton />}>
            <HotelsBanner/>
          </Suspense>

          <Suspense fallback={<ContentSkeleton />}>
            <DestinoBanner/>
          </Suspense>

          <div className="flex mt-10 gap-6 md:flex-row flex-col md:mx-0 mx-5">
            <div className="md:w-2/3">
              <Suspense fallback={<ContentSkeleton />}>
                <NewsBanner/>
              </Suspense>
            </div>
            <div className="md:w-1/3 md:border-l-2 md:pl-4">
              <Suspense fallback={<ContentSkeleton />}>
                <ActivityBanner/>
              </Suspense>
            </div>
          </div>

          <Suspense fallback={<ContentSkeleton />}>
            <RewardsBanner/>
          </Suspense>
        </div>

        {!codigo && (
            <Suspense fallback={<ContentSkeleton />}>
              <Footer/>
            </Suspense>
        )}
      </main>
  );
};

export default Home;
