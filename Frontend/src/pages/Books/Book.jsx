import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "../../Redux/booksApiSlice";
import { useDispatch } from "react-redux";
import { addItemToShelf } from "../../Redux/shelfSlice";
import { IoLibraryOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { HiArrowLeft } from "react-icons/hi2";
import { OrbitProgress } from "react-loading-indicators";

const Book = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);
  const book = data?.data || {};
  const dispatch = useDispatch();
  const [addedToShelf, setAddedToShelf] = useState(false);

  const handleAddToShelf = () => {
    dispatch(addItemToShelf(book));
    setAddedToShelf(true);
    setTimeout(() => setAddedToShelf(false), 2000);
  };

  const discount =
    book.oldPrice && book.newPrice
      ? Math.round(((book.oldPrice - book.newPrice) / book.oldPrice) * 100)
      : 0;

  if (isLoading)
    return (
      <>
        <div className="h-[60px] sm:h-[67px] w-full"></div>
        <div className="flex justify-center items-center h-screen bg-blackBG">
          <OrbitProgress color="#ffce1a" size="large" text="" textColor="" />
        </div>
      </>
    );

  return (
    <>
      {/* Navbar spacer */}
      <div className="h-[60px] sm:h-[67px] w-full"></div>

      <div className="min-h-[calc(100vh-67px)] bg-blackBG">
        {/* Breadcrumb bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6 pb-2 animate-fade-in-up">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors font-main group"
          >
            <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Discover
          </Link>
        </div>

        {/* Main content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
            {/* ─── Left: Image ─── */}
            <div className="lg:w-[42%] flex-shrink-0 opacity-0 animate-scale-in">
              <div className="relative group">
                {/* Ambient glow behind the cover */}
                <div className="absolute inset-0 rounded-2xl blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-35 bg-gradient-to-br from-primary to-amber-500" />

                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8">
                  {/* Discount badge */}
                  {discount > 0 && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{discount}%
                      </div>
                    </div>
                  )}

                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full max-h-[480px] object-contain rounded-lg transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>

            {/* ─── Right: Details ─── */}
            <div className="lg:w-[58%] flex flex-col justify-center py-2">
              {/* Category pill */}
              <div className="animate-fade-in-up opacity-0 [animation-delay:0.2s]">
                <span className="inline-block bg-secondary/10 text-secondary text-[11px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full font-main">
                  {book.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight font-main animate-fade-in-up opacity-0 [animation-delay:0.3s]">
                {book.title}
              </h1>

              {/* Divider */}
              <div className="mt-6 mb-5 w-16 h-1 rounded-full bg-primary animate-fade-in-up opacity-0 [animation-delay:0.3s]"></div>

              {/* Description */}
              <p className="text-gray-500 text-[15px] sm:text-base leading-relaxed font-secondary animate-fade-in-up opacity-0 [animation-delay:0.4s]">
                {book.description}
              </p>

              {/* Pricing card */}
              <div className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-6 w-max animate-fade-in-up opacity-0 [animation-delay:0.5s]">
                {book.oldPrice && (
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] uppercase tracking-wider text-gray-400 font-main">
                      Was
                    </span>
                    <span className="text-lg text-gray-400 line-through font-secondary mt-0.5">
                      ${Number(book.oldPrice).toFixed(2)}
                    </span>
                  </div>
                )}
                {book.oldPrice && (
                  <div className="w-px h-10 bg-gray-200"></div>
                )}
                <div className="flex flex-col items-center">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-main">
                    Price
                  </span>
                  <span className="text-3xl font-bold text-primary font-main mt-0.5">
                    ${Number(book.newPrice).toFixed(2)}
                  </span>
                </div>
                {discount > 0 && (
                  <>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 font-main">
                        You save
                      </span>
                      <span className="text-lg font-bold text-green-600 font-secondary mt-0.5">
                        ${(book.oldPrice - book.newPrice).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Add to Shelf button */}
              <div className="mt-8 animate-fade-in-up opacity-0 [animation-delay:0.6s]">
                <button
                  onClick={handleAddToShelf}
                  className={`cursor-pointer inline-flex items-center gap-3 text-secondary font-bold text-base px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 font-main bg-[linear-gradient(110deg,#ffce1a_0%,#ffe066_40%,#ffce1a_60%,#ffce1a_100%)] bg-[length:200%_100%] hover:animate-shimmer ${
                    addedToShelf ? "!bg-green-500 !text-white" : ""
                  }`}
                >
                  {addedToShelf ? (
                    <>
                      <IoCheckmarkCircle className="w-6 h-6" />
                      Added to Shelf!
                    </>
                  ) : (
                    <>
                      <IoLibraryOutline className="w-6 h-6" />
                      Add to Shelf
                    </>
                  )}
                </button>
              </div>

              {/* Extra info row */}
              <div className="mt-10 flex gap-8 animate-fade-in-up opacity-0 [animation-delay:0.6s]">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-main">
                    Format
                  </span>
                  <span className="text-sm font-medium text-gray-700 mt-1 font-secondary">
                    Paperback
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-main">
                    Availability
                  </span>
                  <span className="text-sm font-medium text-green-600 mt-1 font-secondary">
                    In Stock
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 font-main">
                    Shipping
                  </span>
                  <span className="text-sm font-medium text-gray-700 mt-1 font-secondary">
                    Free Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
