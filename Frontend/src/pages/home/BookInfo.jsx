import { IoLibraryOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToShelf } from "../../Redux/shelfSlice";

const BookInfo = ({ book }) => {
  const dispatch = useDispatch();

  const { title, coverImage, category, description, oldPrice, newPrice, _id } =
    book;

  const discount =
    oldPrice && newPrice
      ? Math.round(((oldPrice - newPrice) / oldPrice) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col w-full max-w-[260px] min-w-[200px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-[280px] sm:h-[300px] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
        <Link to={`/books/${_id}`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </Link>

        {/* Category Badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-secondary/80 backdrop-blur-sm text-white text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full">
            {category}
          </span>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Quick View Overlay */}
        <Link
          to={`/books/${_id}`}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <span className="bg-white/90 backdrop-blur-sm text-secondary text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <FiEye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-3 gap-2">
        {/* Title */}
        <Link to={`/books/${_id}`}>
          <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-primary transition-colors duration-200 min-h-[2.5rem]">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Price Row */}
        <div className="flex items-end gap-2 mt-auto pt-2">
          <span className="text-lg font-bold text-secondary">
            ${typeof newPrice === "number" ? newPrice.toFixed(2) : newPrice}
          </span>
          {oldPrice && (
            <span className="text-xs text-gray-400 line-through pb-0.5">
              ${typeof oldPrice === "number" ? oldPrice.toFixed(2) : oldPrice}
            </span>
          )}
        </div>

        {/* Add to Shelf Button */}
        <button
          onClick={() => dispatch(addItemToShelf(book))}
          className="mt-1 w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-secondary font-semibold text-xs py-2.5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <IoLibraryOutline className="w-4 h-4" />
          Add to Shelf
        </button>
      </div>
    </div>
  );
};

export default BookInfo;
