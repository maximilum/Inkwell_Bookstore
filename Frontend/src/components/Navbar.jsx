import { TbAlignLeft } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import Button from "./Button.jsx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import avatar from "../assets/avatar.png"; //

const Navbar = () => {
  // State to handle dropdown
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Presentational components
  const SearchBar = () => {
    return (
      <div className="flex items-center justify-around gap-2 bg-[#eaeaea] rounded py-1 px-2 pr-4 w-full text-sm">
        <FaMagnifyingGlass className="size-4" />
        <input
          type="text"
          className="focus:outline-none w-full     placeholder:text-xs"
          placeholder="What are you looking for?"
        />
      </div>
    );
  };
  const DropDownList = () => {
    const list = [
      {
        name: "Dashboard",
        link: "/",
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
      <ul className="absolute  rounded-2xl text-xs    top-7 -left-3 shadow-xl border-1 w-40 overflow-hidden">
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
            onClick={() => setIsLoggedIn(false)}
          >
            Log Out
          </button>
        </li>
      </ul>
    );
  };
  const LoggedOut = ({ handleLogin }) => {
    return (
      <button onClick={() => handleLogin(true)}>
        <CiUser className="size-6" />
      </button>
    );
  };
  const LoggedIn = ({ handleLogin }) => {
    return (
      <button
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
        className="relative"
      >
        <img src={avatar} alt="" className="size-6" />
        {isDropDownOpen && <DropDownList />}
      </button>
    );
  };
  const User = ({ handleLogin }) => {
    return isLoggedIn ? (
      <LoggedIn handleLogin={handleLogin} />
    ) : (
      <LoggedOut handleLogin={handleLogin} />
    );
  };

  return (
    <nav className="flex justify-between mx-auto max-w-screen-2xl p-4  items-center">
      {/* Left side */}
      <div className="flex mx-4 gap-16">
        <Link to="/">
          <TbAlignLeft className="my-auto size-6" />
        </Link>
        <SearchBar></SearchBar>
      </div>

      {/* Right side */}
      <div className="flex mx-4 gap-3">
        <div className="flex gap-2 items-center">
          <User handleLogin={setIsLoggedIn}></User>
          <Link to="/wishlist">
            <CiHeart className="my-auto size-6" />
          </Link>
        </div>
        <Link to="/cart">
          <Button>
            <AiOutlineShoppingCart className="my-auto size-6 " />
            <span className=" my-auto leading-0">Basket</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
