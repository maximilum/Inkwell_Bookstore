import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
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
        // console.log(data);
        setNews(data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  //   Returned elements
  if (isLoading) return <div>Loading</div>;

  return (
    <div className=" my-16">
      <Link>
        <h1 className="text-2xl font-semibold  mx-8 mb-4">News</h1>
      </Link>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        modules={[Navigation, Pagination]}
        breakpoints={{
          1024: { slidesPerView: 2, spaceBetween: 20 },
        }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
      >
        {news.map((newsItem, index) => (
          <SwiperSlide key={newsItem._id ?? index}>
            <NewsCard newsItem={newsItem} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
