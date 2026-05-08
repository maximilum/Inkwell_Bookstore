import React from "react";
import getImgURL from "../../utils/ImgURLcreator";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, deleteItem } from "../../Redux/cartSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCart = () => {
  const { cartItems: books } = useSelector((store) => store.cart);
  const dispatcher = useDispatch();
  const handleItemDelete = (book) => dispatcher(deleteItem(book));
  const handleClearCart = () => {
    Swal.fire({
      title: "Do you want to clear the cart?",
      showDenyButton: true,
      confirmButtonText: "Cancel",
      denyButtonText: `Clear`,
    }).then((result) => {
      if (result.isDenied) {
        dispatcher(clearCart());
      }
    });
  };

  if (books.length === 0) {
    return (
      <Link to="/">
        <div className="flex flex-col justify-center items-center gap-8 w-full h-full mb-8 mt-8">
          <div>
            <img className="w-64 sm:w-96" src="/EmptyCart.png" alt="" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-emptyCart text-[#72c4e7]">
            Cart is empty
          </h1>
        </div>
      </Link>
    );
  }

  return (
    // Container
    <div className="mx-4 my-8 sm:mx-16 sm:my-16">
      {/* Layer 1 */}
      <div className="flex justify-between">
        <h2 className="text-lg">Shopping Cart</h2>
        <button
          onClick={() => handleClearCart()}
          className="text-sm sm:text-md bg-red-500 hover:bg-red-600 text-white px-4 sm:px-8 rounded"
        >
          Clear Cart
        </button>
      </div>

      {/* Layer 2 */}
      {/* Container */}
      <div className="mt-8 sm:mt-16 flex flex-col gap-8 sm:gap-12 ">
        {books.map((book) => (
          <div key={book._id} className="shadow ">
            <div className="flex">
              {/* Book Cover Image */}
              <div className="image-cover">
                <img className="h-32 w-30" src={book.coverImage} alt="" />
              </div>
              {/* Book Info */}
              <div className="ml-2 py-4 px-6 sm:ml-4 flex flex-col justify-between w-full">
                <div className="h-min w-full  flex flex-wrap justify-between  gap-2">
                  <div>
                    <p className="text-sm sm:text-lg">{book.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {book.category}
                    </p>
                  </div>
                  <p className=" text-md sm:text-lg font-bold ">
                    ${book.newPrice}
                  </p>
                </div>
                <div className="flex justify-between gap-2">
                  <p className="text-xs sm:text-sm  ">
                    {book.description.length > 100
                      ? `${book.description.slice(0, 100)}...`
                      : book.description}
                  </p>
                  <button
                    onClick={() => handleItemDelete(book)}
                    className="text-red-600 hover:text-red-700 font-semi-bold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Divider
      <div className="h-[0.5px] w-full bg-gray-300 my-8"></div> */}

      {/* Layer 3 */}
      <div className="flex justify-between mt-8">
        <p className="ml-4 sm:text-lg">Total</p>
        <p className="font-bold">{`$${books.reduce((total, book) => total + parseFloat(book.newPrice), 0).toFixed(2)}`}</p>
      </div>
      <p className="text-gray-500 text-center text-sm">
        {" "}
        Shipping and taxes calculated at checkout.
      </p>

      {/* Layer 4 */}
      <Link to="/checkout">
        <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded">
          Checkout
        </button>
      </Link>
      <p className="text-xs text-center mt-4">
        Or{"  "}
        <span className="text-blue-600 hover:text-blue-800 ">
          <Link to="/">Continue shopping</Link>
        </span>
      </p>
    </div>
  );
};

export default MyCart;
