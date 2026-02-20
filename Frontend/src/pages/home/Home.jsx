import React from "react";
import Button from "../../components/Button";
import BannerImage from "../../assets/Banner.png";
import BookInfo from "./BookInfo";
import TopSellers from "./TopSellers";
import Recommended from "./Recommended";
import HeroSection from "./HeroSection";
import News from "./News";
export const Home = () => {
  return (
    <>
      <HeroSection></HeroSection>
      <TopSellers></TopSellers>
      <Recommended></Recommended>
      <News></News>
    </>
  );
};

export default Home;
