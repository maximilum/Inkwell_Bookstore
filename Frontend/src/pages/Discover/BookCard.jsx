import { CiHeart } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../Redux/cartSlice";

import { useDispatch } from "react-redux";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { title, coverImage, category, description, oldPrice, newPrice, _id } =
    book;

  return (
    <div
      className="w-full max-w-[400px] h-[520px] flex flex-col overflow-hidden border border-[#dcd9d9] rounded-lg hover:border-gray-300 shadow-lg
        transition-all
        hover:shadow-xs
        hover:scale-99
        "
    >
      {/* Image */}
      <div className="h-[320px] flex-shrink-0 relative overflow-hidden bg-gray-100">
        <Link to={`/books/${_id}`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-contain"
          />
        </Link>
        <div className="absolute top-2.5 left-2.5 bg-black/55 text-white text-[10px] tracking-widest px-2 py-0.5 uppercase">
          {category}
        </div>
        <button className="absolute top-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center">
          <CiHeart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col px-4 py-3.5 overflow-hidden">
        <Link to={`/books/${_id}`}>
          <h3 className="flex-shrink-0 text-[15px] text-[#2d5a27] font-medium leading-snug hover:text-yellow-500 transition-all">
            {title}
          </h3>
        </Link>
        {/* Description */}
        <p className="flex-1 mt-1.5 text-xs text-gray-500 leading-relaxed  overflow-y-auto">
          {description}
        </p>
        {/* Footer */}
        <div className="flex-shrink-0 mt-auto pt-3 border-t border-[#dcd9d9] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
            <span className="text-xl font-bold text-yellow-500">
              ${newPrice.toFixed(2)}
            </span>
          </div>
          <button
            className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 text-xs font-medium rounded transition-colors"
            onClick={() => dispatch(addItemToCart(book))}
          >
            <FaShoppingBag className="w-3.5 h-3.5" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
