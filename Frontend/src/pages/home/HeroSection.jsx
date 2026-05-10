import React from "react";
import BannerImage from "../../assets/Banner.png";
import { Link } from "react-router-dom";
import { PiArrowBendDownRightThin } from "react-icons/pi";
import texture from "../../assets/texture.jpg";

const HeroSection = () => {
  return (
    <>
      <div className="h-[60px] sm:h-[67px]  w-full"></div>
      <div
        style={{ backgroundImage: `url(${texture})` }}
        className="h-[calc(100vh-60px)] w-full flex justify-center items-center bg-repeat bg-cover"
      >
        <div className="m-12 max-w-screen-2xl h-full flex flex-col-reverse gap-24  sm:flex-row items-center justify-around ">
          {/* Left Container */}
          <div className="flex flex-col h-full gap-48 justify-center ">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl md:text-8xl font-extrabold sansation-bold text-[#001325]">
                INKWELL
              </h1>
              <p className="text-lg max-w-md leading-6 font-light text-white sansation-light ">
                where Great Books Begin Again
              </p>
            </div>
            <Link to={"/discover"}>
              <div className="flex gap-4 cursor-pointer hover:gap-6 transition-all">
                <PiArrowBendDownRightThin size={36} className="text-white" />
                <span className=" flex justify-center items-center sansation-bold">
                  Browse Books
                </span>
              </div>
            </Link>
          </div>
          {/* Right Container */}
          <div className=" h-full flex justify-end items-center object-cover hidden sm:block">
            <img src={BannerImage} alt="" className="w-90 h-125 object-cover" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
