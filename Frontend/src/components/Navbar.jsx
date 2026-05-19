import Button from "./Button.jsx";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { GiMagnifyingGlass } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { MdReceiptLong } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { TbHeartStar } from "react-icons/tb";
import { MdOutlineShoppingBag } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut, FiShoppingCart, FiCompass, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../auth/AuthContext";
import { useLocation } from "react-router-dom";

const DropDownList = ({ onClose }) => {
  const { handleSignOut } = useAuth();
  const isAdmin = !!localStorage.getItem("token");

  const navItems = [
    {
      name: "Discover",
      link: "/discover",
      icon: FiCompass,
    },
    {
      name: "Orders",
      link: "/orders",
      icon: MdReceiptLong,
    },
    {
      name: "My Shelf",
      link: "/shelf",
      icon: IoLibraryOutline,
    },
    {
      name: "Check Out",
      link: "/checkout",
      icon: FiShoppingCart,
    },
  ];

  return (
    <div className="absolute right-0 top-full mt-3 w-56 origin-top-right rounded-xl bg-white shadow-2xl ring-1 ring-black/5 font-main animate-in fade-in z-50">
      {/* Admin Section */}

      <div className="p-1.5">
        <Link
          to="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-secondary bg-amber-50 hover:bg-primary/20 transition-colors group"
        >
          <RxDashboard className="size-4 text-primary group-hover:scale-110 transition-transform" />
          <span>Dashboard</span>
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-gray-100" />

      {/* Navigation Links */}
      <div className="p-1.5">
        {navItems.map((item) => (
          <Link
            to={item.link}
            key={item.name}
            onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-secondary transition-colors group"
          >
            <item.icon className="size-4 text-gray-400 group-hover:text-primary transition-colors" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-3 border-t border-gray-100" />

      {/* Sign Out */}
      <div className="p-1.5">
        <button
          onClick={() => {
            onClose();
            handleSignOut();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer group"
        >
          <FiLogOut className="size-4 text-gray-400 group-hover:text-red-500 transition-colors" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user } = useAuth();
  // States
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropDownOpen(false);
      }
    };
    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropDownOpen]);

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const shelfItems = useSelector((state) => state.shelf?.shelfItems ?? []);
  const shelfCount = shelfItems.length;

  return (
    <header className="fixed top-0 w-full bg-white shadow-lg z-50">
      <nav className="flex justify-between mx-auto max-w-screen-2xl h-15 sm:h-17 items-center px-2 sm:px-4">
        {/* Left Side */}
        <div className="flex-shrink-0">
          <h1 className="text-sm sm:text-3xl md:text-4xl text-black ">
            INK<span className="text-amber-500">WELL</span>
          </h1>
        </div>

        {/* Center */}
        <div className="flex mx-0 sm:mx-4 h-full overflow-hidden">
          <div
            className={` transition-colors h-full flex items-center justify-center w-10 sm:w-20 px-1 sm:px-4 ${path === "" ? "border-b-2 border-amber-400 bg-amber-400/30 " : ""}`}
          >
            <Link to="/" className="flex flex-col items-center ">
              <AiOutlineHome className="my-auto size-4 sm:size-6" />
              <p className="hidden sm:block text-xs sm:text-base">Home</p>
            </Link>
          </div>
          <div
            className={`transition-colors h-full flex items-center justify-center w-10 sm:w-20 px-1 sm:px-4 ${path === "discover" ? "border-b-2 border-amber-400 bg-amber-400/30 " : ""}`}
          >
            <Link
              to="/discover"
              className="text-md text-black flex flex-col items-center "
            >
              <GiMagnifyingGlass className="my-auto size-4 sm:size-6" />
              <p className="hidden sm:block text-xs sm:text-base">Discover</p>
            </Link>
          </div>
          <div
            className={` transition-colors h-full flex items-center justify-center w-10 sm:w-20 px-1 sm:px-4 ${path === "orders" ? "border-b-2 border-amber-400 bg-amber-400/30 " : ""}`}
          >
            <Link
              to="/orders"
              className="text-md text-black flex flex-col items-center"
            >
              <MdReceiptLong className="my-auto size-4 sm:size-6" />
              <p className="hidden sm:block text-xs sm:text-base">Orders</p>
            </Link>
          </div>
          <div
            className={` transition-colors h-full flex items-center justify-center w-10 sm:w-20 px-1 sm:px-4 ${path === "shelf" ? "border-b-2 border-amber-400 bg-amber-400/30 " : ""}`}
          >
            <Link
              to="/shelf"
              className="text-md text-black flex flex-col items-center "
            >
              <IoLibraryOutline className="my-auto size-4 sm:size-6" />
              <p className="hidden sm:block text-xs sm:text-base">Shelf</p>
            </Link>
          </div>
          {/* <div
            className={` transition-colors h-full flex items-center justify-center w-10 sm:w-20 px-1 sm:px-4 ${path === "wishlist" ? "border-b-2 border-amber-400 bg-amber-400/30 " : ""}`}
          >
            <Link
              to="/wishlist"
              className="text-md text-black flex flex-col items-center "
            >
              <TbHeartStar className="my-auto size-4 sm:size-6 font-bold" />
              <p className="hidden sm:block text-xs sm:text-base">Wishlist</p>
            </Link>
          </div> */}
        </div>
        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
          {/* Shelf Button */}
          <Link to="/shelf" className="relative group">
            <div className="flex items-center gap-1 sm:gap-2 rounded-full bg-gray-100 px-2 sm:px-4 py-1.5 sm:py-2 hover:bg-primary/10 transition-colors">
              <IoLibraryOutline className="size-4 sm:size-5 text-gray-700 group-hover:text-primary transition-colors" />
              <span className="hidden sm:block text-sm font-medium font-main text-gray-700 group-hover:text-secondary transition-colors">
                Shelf
              </span>
            </div>
            {/* Badge */}
            {shelfCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center size-5 rounded-full bg-primary text-[10px] font-bold text-secondary shadow-sm">
                {shelfCount}
              </span>
            )}
          </Link>

          {/* User / Auth */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                className="flex items-center justify-center size-9 sm:size-10 rounded-full ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer overflow-hidden"
              >
                <img
                  src={avatar}
                  alt="User avatar"
                  className="size-full object-cover"
                />
              </button>
              {isDropDownOpen && (
                <DropDownList onClose={() => setIsDropDownOpen(false)} />
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 sm:px-4 py-1.5 sm:py-2 text-sm font-medium font-main text-white hover:bg-secondary/90 transition-colors"
            >
              <FiUser className="size-4" />
              <span className="hidden sm:block">Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
