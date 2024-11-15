import React, { useEffect, useState } from "react";
import axios from "axios";
// Components
import EntertainmentCardSlider from "../components/Entertainment/EntertainmentCard.Component";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel.Component";
import PosterSlider from "../components/PosterSlider/PosterSlider.Component";
// Layout HOC
// import DefaultLayoutHoc from "../layout/Default.layout";
import Navbarr from "../components/Navbar/Navbar.Component";
import Footer from "../components/Footer/Footer.Component";

const HomePage = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [premierMovies, setPremierMovies] = useState([]);
  const [onlineStreamEvents, setOnlineStreamEvents] = useState([]);

  // useEffect hook for recommendedMovies
  useEffect(() => {
    const requestPopularMovies = async () => {
      const getPopularMovies = await axios.get("/movie/popular");
      setRecommendedMovies(getPopularMovies.data[0].results);
    };

    console.log("====================================");
    console.log(recommendedMovies);
    console.log("====================================");
    requestPopularMovies();
  }, []); // recommendedMovies is not needed in this dependency array as it is set in the hook itself

  // useEffect hook for premierMovies
  useEffect(() => {
    const requestTopRatedMovies = async () => {
      const getTopRatedMovies = await axios.get("/movie/top_rated");
      setPremierMovies(getTopRatedMovies.data[0].results);
    };

    requestTopRatedMovies();
  }, []); // Empty dependency array to run only once

  // useEffect hook for onlineStreamEvents
  useEffect(() => {
    const requestUpcomingMovies = async () => {
      const getUpcomingMovies = await axios.get("/movie/upcoming");
      setOnlineStreamEvents(getUpcomingMovies.data[0].results);
    };

    requestUpcomingMovies();
  }, []); // Empty dependency array to run only once

  return (
    <>
      <Navbarr />
      <HeroCarousel />

      <div className="mx-auto my-8 px-4 md:px-12 container">
        <PosterSlider
          title="Recommended Movies"
          subtitle="List of recommended movies"
          posters={recommendedMovies}
          isDark={false}
        />
      </div>

      <div className="mx-auto my-8 px-4 md:px-12 container">
        <h1 className="my-3 ml-0 sm:ml-3 font-bold text-2xl text-gray-800">
          The best of Entertainment
        </h1>
        <EntertainmentCardSlider />
      </div>

      <div className="bg-premier-800 py-12">
        <div className="flex flex-col gap-3 mx-auto my-8 px-4 md:px-12 container">
          <div className="md:flex hidden">
            <img
              src="https://in.bmscdn.com/discovery-catalog/collections/tr:w-1440,h-120/premiere-rupay-banner-web-collection-202104230555.png"
              alt="Rupay"
              className="w-full h-full"
            />
          </div>
          <PosterSlider
            title="Premiers"
            subtitle="Brand new releases every Friday"
            posters={premierMovies}
            isDark={true}
          />
        </div>
      </div>

      <div className="mx-auto my-8 px-4 md:px-12 container">
        <PosterSlider
          title="Online Streaming Event"
          subtitle=""
          posters={onlineStreamEvents}
          isDark={false}
        />
      </div>

      <Footer />
    </>
  );
};

export default HomePage;
