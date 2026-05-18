import React from "react";
import BannerImage from "../../assets/Banner.png";
import { Link } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";
import texture from "../../assets/texture.jpg";

const HeroSection = () => {
  return (
    <>
      {/* Navbar spacer */}
      <div className="h-15 sm:h-17 w-full" />

      {/* Hero Container */}
      <section className="relative min-h-[calc(100vh-3.75rem)] sm:min-h-[calc(100vh-4.25rem)] w-full overflow-hidden ">
        {/* Texture Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url(${texture})` }}
        />

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628]/90 via-[#0f1f38]/70 to-[#1a0e2e]/80 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent opacity-100" />

        {/* Decorative ink splatter accents */}
        {/* <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-72 w-72 rounded-full bg-[#c0392b]/5 blur-3xl" /> */}

        {/* Content Grid */}
        <div className="relative z-10 mx-auto flex h-full min-h-[calc(100vh-3.75rem)] sm:min-h-[calc(100vh-4.25rem)] max-w-screen-2xl items-center px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-20">
            {/* ─── Left: Typography & CTA ─── */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* Main Title */}
              <h1 className="sansation-bold leading-none tracking-tight">
                <span className="block text-6xl text-white/90 sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem]">
                  INK
                </span>
                <span className="block text-6xl text-amber-400 sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem]">
                  WELL
                </span>
              </h1>

              {/* Decorative divider */}
              <div className="my-5 flex items-center gap-3 sm:my-7">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400/60 sm:w-12" />
                <div className="h-1.5 w-1.5 rotate-45 bg-amber-400/60" />
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400/60 sm:w-12" />
              </div>

              {/* Slogan */}
              <p className="sansation-light max-w-sm text-base leading-relaxed tracking-wide text-white/50 sm:max-w-md sm:text-lg md:text-xl">
                where Great Books{" "}
                <span className="font-normal text-white/80">Begin Again</span>
              </p>

              {/* CTA */}
              <Link
                to="/discover"
                className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium tracking-widest text-white/90 backdrop-blur-sm transition-all duration-500  hover:text-amber-300 sm:mt-10 sm:px-9 sm:py-4 sm:text-base sansation-regular"
              >
                <HiArrowLongRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-2 text-amber-400" />
                DISCOVER
              </Link>
            </div>

            {/* ─── Right: Inkwell Illustration ─── */}
            <div className="relative flex items-center justify-center lg:justify-end">
              {/* Glow ring behind the image */}
              <div className="absolute h-72 w-72 rounded-full bg-amber-500/8 blur-2xl sm:h-96 sm:w-96 lg:h-[28rem] lg:w-[28rem]" />
              <div className="absolute h-56 w-56 rounded-full border border-white/5 sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
              {/* {/* <div className="absolute h-64 w-64 rounded-full border border-white/[0.03] sm:h-88 sm:w-88 lg:h-[26rem] lg:w-[26rem]" /> */}
              {/* The inkwell image */}
              <img
                src={BannerImage}
                alt="Inkwell — Where Great Books Begin Again"
                className="relative z-10 w-56 max-w-md drop-shadow-2xl sm:w-72 md:w-80 lg:w-96 xl:w-[26rem]"
              />
            </div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-8">
          <span className="text-[10px] tracking-[0.3em] text-white/25 sansation-light sm:text-xs">
            SCROLL
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-white/25 to-transparent sm:h-10" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
