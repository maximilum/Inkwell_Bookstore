import React, { useState, useMemo, useEffect } from "react";
import BookInfo from "./BookInfo";
import { useGetAllBooksQuery } from "../../Redux/booksApiSlice";
import axios from "axios";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TopSellers = () => {
  const { data, isLoading } = useGetAllBooksQuery();
  const books = data?.data || [];
  const [activeFilter, setActiveFilter] = useState("All Genres");
  const [categories, setCategories] = useState();
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCateories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await axios.get("http://localhost:3000/api/categories");
        let fetchedCategories = res.data.data;
        fetchedCategories.unshift("All Genres");
        setCategories(fetchedCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCateories();
  }, []);

  const filteredBooks = useMemo(() => {
    if (activeFilter === "All Genres") return books;
    return books.filter((book) => book.category === activeFilter);
  }, [activeFilter, books]);

  if (isLoading || isLoadingCategories) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">
            Trending Now
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary whitespace-nowrap">
            Top Sellers
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none]">
          {categories?.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 capitalize cursor-pointer ${
                activeFilter === cat
                  ? "bg-secondary text-white border-secondary"
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No books found in this genre.</p>
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="pb-14"
        >
          {filteredBooks.map((book) => (
            <SwiperSlide key={book._id} className="flex justify-center py-2">
              <BookInfo book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default TopSellers;
