import React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PiRedditLogoBold } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2  p-12 text-white bg-secondary font-main">
      {/* Item 1   */}
      <div className="h-36 flex flex-col gap-8 justify-between">
        <div className="w-20 h-20">
          <img src="/footer-logo.png" alt="" />
        </div>
        <ul className="flex gap-16">
          <li>Home</li>
          <li>Services</li>
          <li>Contact</li>
          <li>About us</li>
        </ul>
      </div>
      {/* Item 2 */}
      <div className="h-36">
        <div className="flex items-center mb-8 h-20">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex gap-0 overflow-hidden rounded-lg">
          <input
            type="text"
            placeholder="Enter your E-mail address"
            className=" w-3/4 p-2 pl-8 bg-white text-blacks outline-0 placeholder-black placeholder:text-xs text-black"
          />
          <button className="w-1/4 bg-primary text-white text-lg p-1">
            subscribe
          </button>
        </div>
      </div>

      {/* item 3 */}
      <div className="h-36">
        <ul className="flex w-full h-full gap-6 space-between items-end">
          <li>Privacy Policy</li>
          <li>Terms of use</li>
          <li>Sales and refunds</li>
          <li>Legal</li>
        </ul>
      </div>
      {/* item 4 */}
      <div className="h-36">
        <div className="flex gap-8 w-full h-full justify-end items-end pr-16 text-2xl">
          <FaGoogle />
          <FaFacebook />
          <FaXTwitter />
          <PiRedditLogoBold />
        </div>
      </div>
    </div>
  );
};

export default Footer;
