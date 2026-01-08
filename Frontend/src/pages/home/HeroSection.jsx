import React from "react";
import Button from "../../components/Button";
import BannerImage from "../../assets/Banner.png";
const HeroSection = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="w-screen h-16 "></div>
      <div className="grow flex items-center justify-center">
        <div className="m-12 grow max-w-screen-2xl flex flex-col-reverse gap-32 sm:gap-0 sm:flex-row items-center justify-between ">
          {/* Left Container */}
          <div className="flex flex-col gap-10 ">
            <h1 className="text-2xl md:text-5xl font-medium">
              New Releases This Week
            </h1>
            <p className="text-lg max-w-md leading-6">
              It's time to update your reading list with some of the latest and
              greatest releases in the literary world. From heart-pumping
              thrillers to captivating memoirs, this week's new releases offer
              something for everyone
            </p>
            <Button>
              <span className="h-6 w-24 flex justify-center items-center ">
                Discover
              </span>
            </Button>
          </div>
          {/* Right Container */}
          <div className="w-1/2 flex justify-end items-center">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
