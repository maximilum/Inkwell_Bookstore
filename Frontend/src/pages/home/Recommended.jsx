import React from "react";
import BookInfo from "./BookInfo";
import { useGetAllBooksQuery } from "../../Redux/booksApiSlice";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Recommended = () => {
  const { data, isLoading } = useGetAllBooksQuery();
  const books = data?.data || [];

  // Take a different slice of books for recommendations
  const recommendedBooks = books.slice(8, 18);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (recommendedBooks.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">
          Picked for You
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary">
          Recommended
        </h2>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="pb-14"
      >
        {recommendedBooks.map((book) => (
          <SwiperSlide key={book._id} className="flex justify-center py-2">
            <BookInfo book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Recommended;
