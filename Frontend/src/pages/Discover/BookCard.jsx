import { CiHeart } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../Redux/cartSlice";

import { useDispatch } from "react-redux";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { title, coverImage, _id } = book;
  return (
    <div className="block  overflow-hidden border border-[#dcd9d9] shadow-lg hover:shadow-sm hover:scale-99 transition-all">
      {/* Image Container with 18:25 Aspect Ratio */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "18/25" }}
      >
        {/* image */}
        <Link to={`/books/${book._id}`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full absolute inset-0"
          />
        </Link>
        {/* Category Tag */}
        <div className="absolute top-4 left-4 bg-black/60 text-white text-[12px] tracking-widest px-3 py-1 uppercase font-sans">
          {book.category}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
          <CiHeart className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl text-[#2d5a27] font-medium leading-tight">
            {book.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed font-sans">
            {book.description}
          </p>
        </div>

        <div className="pt-4 border-t border-[#dcd9d9] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through font-sans">
              ${book.oldPrice.toFixed(2)}
            </span>
            <span className="text-2xl font-bold text-yellow-500">
              ${book.newPrice.toFixed(2)}
            </span>
          </div>

          <button
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 text-white px-6 py-3 text-sm font-medium transition-all font-sans"
            onClick={() => dispatch(addItemToCart(book))}
          >
            <FaShoppingBag className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
