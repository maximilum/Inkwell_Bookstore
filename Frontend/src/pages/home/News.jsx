import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

// Swiper Imports
import Swiper from "swiper";
import { Pagination, Navigation } from "swiper/modules";

// import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const News = () => {
  // Define states
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetching side Effect
  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  // Swiper
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    // Optional parameters
    // direction: "horizental",
    loop: true,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
    },

    slidesPerView: 2,

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //   Returned elements
  if (isLoading) return <div>Loading</div>;

  return (
    <div className="mx-16 my-16">
      <h1 className="text-2xl font-semibold">News</h1>
      <div>
        {/* <!-- Slider main container --> */}
        <div className="swiper ">
          {/* <!-- Additional required wrapper --> */}
          <div className="swiper-wrapper hover:shadow-2xl">
            {/* <!-- Slides --> */}
            {news.map((newsItem, index) => (
              <div key={index} className="swiper-slide ">
                <NewsCard newsItem={newsItem} className=""></NewsCard>
              </div>
            ))}
          </div>
          {/* <!-- If we need pagination --> */}
          <div class="swiper-pagination"></div>
          {/* <!-- If we need navigation buttons --> */}
          <div className="swiper-button-prev h-6 w-6 bg-primary"></div>
          <div className="swiper-button-next h-6 w-6 bg-primary"></div>
          {/* <!-- If we need scrollbar --> */}
          <div className="swiper-scrollbar"></div>
        </div>
      </div>
    </div>
  );
};

export default News;
