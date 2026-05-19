import React from "react";
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
          <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12 xl:gap-20">
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

            {/* ─── Right: Abstract Typographic Composition ─── */}
            <div className="relative md:block hidden flex h-full min-h-[300px] w-full items-center justify-center lg:justify-end select-none pointer-events-none overflow-visible">
              {/* Subtle ambient glows */}
              <div className="absolute h-72 w-72 rounded-full bg-amber-400/5 blur-3xl sm:h-96 sm:w-96 lg:h-[28rem] lg:w-[28rem]" />
              <div className="absolute h-64 w-64 rounded-full border border-white/5 sm:h-80 sm:w-80 lg:h-96 lg:w-96 mix-blend-overlay" />

              {/* Giant Decorative Element */}
              <div className="absolute -top-12 right-0 z-0 opacity-10 sm:-top-20 sm:right-10">
                <span className="font-serif text-[15rem] leading-none text-white sm:text-[20rem] lg:text-[26rem]">
                  &amp;
                </span>
              </div>

              {/* Layered Editorial Text */}
              <div className="relative z-10 flex flex-col items-end text-right opacity-90">
                <span
                  className="sansation-bold text-transparent opacity-60 mix-blend-plus-lighter"
                  style={{ WebkitTextStroke: "2px rgba(251, 191, 36, 0.7)" }}
                >
                  <span className="block text-7xl tracking-tighter sm:text-8xl lg:text-[8rem] xl:text-[10rem] leading-[0.85]">
                    READ
                  </span>
                </span>

                <span className="sansation-bold text-white/[0.12]">
                  <span className="block text-8xl tracking-tighter sm:text-9xl lg:text-[10rem] xl:text-[12rem] leading-[0.85] -mt-4 sm:-mt-6">
                    MORE
                  </span>
                </span>

                <span
                  className="sansation-bold text-transparent opacity-40 mix-blend-plus-lighter"
                  style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)" }}
                >
                  <span className="block text-6xl tracking-widest sm:text-7xl lg:text-[7rem] xl:text-[9rem] leading-[0.85] -mt-3 sm:-mt-5">
                    BOOKS
                  </span>
                </span>
              </div>
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
