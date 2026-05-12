import React from "react";
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "../../Redux/booksApiSlice";
import getImgURL from "../../utils/ImgURLcreator";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/cartSlice";
import Button from "../../components/Button";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { OrbitProgress } from "react-loading-indicators";

const Book = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetBookQuery(id);
  const book = data?.data || {};
  const dispatch = useDispatch();

  console.log(book, id);

  if (isLoading)
    return (
      <>
        <div className="h-[60px] sm:h-[67px]  w-full"></div>
        <div className="flex justify-center items-center h-screen">
          <OrbitProgress color="#ffd700" size="large" text="" textColor="" />
        </div>
      </>
    );
  return (
    <>
      <div className="h-[60px] sm:h-[67px]  w-full"></div>
      <div className="my-4 mx-auto flex p-8 flex-col justify-center items-baseline gap-3 w-[800px] shadow-2xl">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-64 mb-4 bg-cover cursor-pointer hover:scale-105 transition-all duration-200"
        />
        <h1 className="text-2xl font-bold ">{book.title}</h1>

        <p>
          <span className="text-gray-500">Category : </span>
          {book.category}
        </p>
        <p>
          <span className="mr-4 text-yellow-500 font-bold">
            <span className="text-gray-500 font-normal">New Price : </span> $
            {book.newPrice}
          </span>
          <span>
            <span className="text-gray-500">Old Price : </span> ${book.oldPrice}
          </span>
        </p>
        <h2 className="text-sm">{book.description}</h2>
        <div className="w-full" onClick={() => dispatch(addItemToCart(book))}>
          <Button isFull={true}>
            <AiOutlineShoppingCart className="h-8 w-8 font-bold" />
            <span className=" font-bold">Add to Cart</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Book;
