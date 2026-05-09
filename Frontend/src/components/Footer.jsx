import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { PiRedditLogoBold } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 p-8 md:p-12 text-white bg-secondary font-main">
      {/* Item 1 */}
      <div className="flex flex-col gap-8 h-full justify-between">
        <div className="w-20 h-20">
          <img
            src="/footer-logo.png"
            alt="Footer Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <ul className="flex flex-wrap gap-6 md:gap-16 font-medium">
          <li className="cursor-pointer hover:text-primary transition-colors">
            Home
          </li>
          <li className="cursor-pointer hover:text-primary transition-colors">
            Services
          </li>
          <li className="cursor-pointer hover:text-primary transition-colors">
            Contact
          </li>
          <li className="cursor-pointer hover:text-primary transition-colors">
            About us
          </li>
        </ul>
      </div>

      {/* Item 2 */}
      <div className="flex flex-col gap-6 h-full justify-between">
        <div className="flex items-center">
          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex w-full overflow-hidden rounded-lg">
          <input
            type="email"
            placeholder="Enter your E-mail address"
            className="w-2/3 sm:w-3/4 p-3 pl-4 bg-white text-black outline-none placeholder-gray-500 placeholder:text-sm"
          />
          <button className="w-1/3 sm:w-1/4 bg-primary text-white font-medium text-sm sm:text-base p-3 hover:opacity-90 transition-opacity whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>

      {/* Item 3 */}
      <div className="flex items-end mt-4 md:mt-0">
        <ul className="flex flex-wrap gap-4 md:gap-6 text-sm text-gray-400">
          <li className="cursor-pointer hover:text-white transition-colors">
            Privacy Policy
          </li>
          <li className="cursor-pointer hover:text-white transition-colors">
            Terms of use
          </li>
          <li className="cursor-pointer hover:text-white transition-colors">
            Sales and refunds
          </li>
          <li className="cursor-pointer hover:text-white transition-colors">
            Legal
          </li>
        </ul>
      </div>

      {/* Item 4 */}
      <div className="flex items-end mt-2 md:mt-0 md:justify-end">
        <div className="flex gap-6 md:gap-8 text-2xl">
          <FaGoogle className="cursor-pointer hover:text-primary transition-colors" />
          <FaFacebook className="cursor-pointer hover:text-primary transition-colors" />
          <FaXTwitter className="cursor-pointer hover:text-primary transition-colors" />
          <PiRedditLogoBold className="cursor-pointer hover:text-primary transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
