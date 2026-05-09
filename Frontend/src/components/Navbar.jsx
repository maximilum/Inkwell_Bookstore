import Button from "./Button.jsx";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GiMagnifyingGlass } from "react-icons/gi";
import { IoLibraryOutline } from "react-icons/io5";
import { MdReceiptLong } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import avatar from "../assets/avatar.png"; //
// import store from "../Redux/store.js";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/AuthContext";

const DropDownList = () => {
  const { handleSignOut } = useAuth();
  const list = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Discover",
      link: "/discover",
    },
    {
      name: "Orders",
      link: "/orders",
    },
    {
      name: "Cart Page",
      link: "/cart",
    },
    {
      name: "Check Out",
      link: "/checkout",
    },
  ];
  return (
    <ul className="fixed rounded-2xl text-xs top-15 right-3 shadow-xl w-40 overflow-hidden bg-white">
      {list.map((item) => (
        <li
          className="block px-2 py-2 w-full text-left font-main hover:text-primary  hover:bg-gray-200 transition-all"
          key={item.name}
        >
          <Link to={item.link}>{item.name}</Link>
        </li>
      ))}
      <li className="m-1 text-left font-main  " key="log out">
        <button
          className="cursor-pointer hover:text-red-600 transition-all w-full mb-2 text-left ml-1"
          onClick={() => handleSignOut()}
        >
          Log Out
        </button>
      </li>
    </ul>
  );
};

const Navbar = () => {
  const { user } = useAuth();
  // States
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart?.cartItems ?? []);
  const cartCount = cartItems.length;

  return (
    <div className=" sticky top-0 w-full bg-white shadow-lg z-50">
      <nav className=" flex justify-between mx-auto max-w-screen-2xl h-20 items-center">
        {/* Left side */}
        <div className="flex mx-4 h-full">
          <div className="hover:bg-gray-200 transition-all h-full flex items-center px-4">
            <Link to="/" className="flex flex-col items-center ">
              <IoLibraryOutline className="my-auto size-6" />
              <p>Home</p>
            </Link>
          </div>
          <div className="hover:bg-gray-200 transition-all h-full flex items-center px-4">
            <Link
              to="/discover"
              className="text-md text-black flex flex-col items-center "
            >
              <GiMagnifyingGlass className="my-auto size-6" />
              <p>Discover</p>
            </Link>
          </div>
          <div className="hover:bg-gray-200 transition-all h-full flex items-center px-4">
            <Link
              to="/orders"
              className="text-md text-black flex flex-col items-center "
            >
              <MdReceiptLong className="my-auto size-6" />
              <p>Orders</p>
            </Link>
          </div>
          <div className="hover:bg-gray-200 transition-all h-full flex items-center px-4">
            <Link
              to="/cart"
              className="text-md text-black flex flex-col items-center "
            >
              <AiOutlineShoppingCart className="my-auto size-6" />
              <p>Cart</p>
            </Link>
          </div>

          {/* <div>
            <Link to="/wishlist" className="text-md text-black">
              Wishlist
            </Link>
          </div> */}
          {/* Search bar
          <div className="flex items-center justify-around gap-2 bg-[#eaeaea] rounded py-1 px-2 pr-4 w-full text-sm">
            <FaMagnifyingGlass className="size-4" />
            <input
              type="text"
              className="focus:outline-none w-full     placeholder:text-xs"
              placeholder="What are you looking for?"
            />
          </div> */}
        </div>
        {/* Right side */}
        <div className="flex mx-4 gap-3">
          {/* User Icon */}
          <div className="flex gap-2 items-center">
            {user ? (
              <button
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                className="relative size-6"
              >
                <img src={avatar} alt="" className="size-6" />
                {isDropDownOpen && <DropDownList />}
              </button>
            ) : (
              <Link to="/login">
                <button>
                  <CiUser className="size-6" />
                </button>
              </Link>
            )}
            <Link to="/wishlist" className="hidden sm:block">
              <CiHeart className="my-auto size-6" />
            </Link>
          </div>
          <Link to="/cart">
            <Button>
              <AiOutlineShoppingCart className="my-auto size-6 " />
              <span>{cartCount}</span>
              <span className=" my-auto leading-0">Basket</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
