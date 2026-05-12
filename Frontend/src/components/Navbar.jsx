import Button from "./Button.jsx";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GiMagnifyingGlass } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { MdReceiptLong } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { TbHeartStar } from "react-icons/tb";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/AuthContext";
import { useLocation } from "react-router-dom";

const DropDownList = () => {
  const [currentLocation, setCurrentLocation] = useState("");
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
      name: "My Shelf",
      link: "/shelf",
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

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const shelfItems = useSelector((state) => state.shelf?.shelfItems ?? []);
  const shelfCount = shelfItems.length;

  return (
    <header className="fixed top-0 w-full bg-white shadow-lg z-50">
      <nav className=" flex justify-around mx-auto max-w-screen-2xl h-15 sm:h-17 items-center">
        {/* Left Side */}
        <div className="px-2 sm:px-4">
          <h1 className="text-xs sm:text-3xl md:text-4xl text-black ">
            INK<span className="text-amber-500">WELL</span>
          </h1>
        </div>

        {/* Center */}
        <div className="flex mx-1 sm:mx-4 h-full">
          <div
            className={`hover:bg-gray-200 transition-colors h-full flex items-center justify-center w-12 sm:w-20 px-4 ${path === "" ? "border-b-2" : ""}`}
          >
            <Link to="/" className="flex flex-col items-center ">
              <AiOutlineHome className="my-auto size-4 sm:size-6" />
              <p className="text-xs sm:text-base">Home</p>
            </Link>
          </div>
          <div
            className={`hover:bg-gray-200 transition-colors h-full flex items-center justify-center w-12 sm:w-20 px-4 ${path === "discover" ? "border-b-2" : ""}`}
          >
            <Link
              to="/discover"
              className="text-md text-black flex flex-col items-center "
            >
              <GiMagnifyingGlass className="my-auto size-4 sm:size-6" />
              <p className="text-xs sm:text-base">Discover</p>
            </Link>
          </div>
          <div
            className={`hover:bg-gray-200 transition-colors h-full flex items-center justify-center w-12 sm:w-20 px-4 ${path === "orders" ? "border-b-2" : ""}`}
          >
            <Link
              to="/orders"
              className="text-md text-black flex flex-col items-center "
            >
              <MdReceiptLong className="my-auto size-4 sm:size-6" />
              <p className="text-xs sm:text-base">Orders</p>
            </Link>
          </div>
          <div
            className={`hover:bg-gray-200 transition-colors h-full flex items-center justify-center w-12 sm:w-20 px-4 ${path === "shelf" ? "border-b-2" : ""}`}
          >
            <Link
              to="/shelf"
              className="text-md text-black flex flex-col items-center "
            >
              <IoLibraryOutline className="my-auto size-4 sm:size-6" />
              <p className="text-xs sm:text-base">Shelf</p>
            </Link>
          </div>
          <div
            className={`hover:bg-gray-200 transition-colors h-full flex items-center justify-center w-12 sm:w-20 px-4 ${path === "wishlist" ? "border-b-2" : ""}`}
          >
            <Link
              to="/wishlist"
              className="text-md text-black flex flex-col items-center "
            >
              <TbHeartStar className="my-auto size-4 sm:size-6 font-bold" />
              <p className="text-xs sm:text-base">Wishlist</p>
            </Link>
          </div>
        </div>
        {/* Right side */}
        <div className="flex mx-2 sm:mx-4 gap-1 sm:gap-3">
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
          </div>
          <Link to="/shelf">
            <Button>
              <IoLibraryOutline className="my-auto size-4 sm:size-6 " />
              <span>{shelfCount}</span>
              <span className=" my-auto leading-0  sm:block hidden">Shelf</span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
