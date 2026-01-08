import img1 from "../../assets/books/book-1.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import getImgURL from "../../utils/ImgURLcreator";
import styles from "./carouselCard.module.css";

const BookInfo = ({ book, path }) => {
  const title = book.title;
  const shownTitle = title.length < 20 ? title : `${title.slice(0, 20)}...`;
  const info = book.description;
  const shownInfo = info.length < 60 ? info : `${info.slice(0, 60)}...`;
  const price = book.newPrice;
  const price2 = book.oldPrice;
  return (
    // img
    <div className={`flex gap-12 ${styles.card}`}>
      <div className="w-45 h-62.5">
        <Link to={`/books/${book._id}`}>
          <img
            src={`${getImgURL(path, book.coverImage)}`}
            alt=""
            className="h-full w-full bg-cover cursor-pointer hover:scale-105 transition-all duration-200"
          />
        </Link>
      </div>
      {/* text */}
      <div className="w-60 flex flex-col justify-end gap-3">
        <Link to={`/books/${book._id}`}>
          <h2 className="text-xl">{shownTitle}</h2>
        </Link>
        <p className="text-gray-500 leading-4 text-md font-secondary">
          {shownInfo}
        </p>
        <div className="flex gap-12 text-lg mb-4 tracking-wide">
          <span className="">{price}</span>
          <span className="text-gray-500 line-through">{price2}</span>
        </div>
        <Button className="">
          <AiOutlineShoppingCart className="h-8 w-8" />
          <span className="text-lg font-semibold">Add to cart</span>
        </Button>
      </div>
    </div>
  );
};

export default BookInfo;
