import React, { useState } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#0d0842] via-[#080530] to-[#06031f] text-white font-main overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_600px_200px_at_50%_0%,rgba(255,206,26,0.06)_0%,transparent_70%)]" />

      <div className="relative max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pt-14 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 lg:gap-14">

          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <IoBookOutline className="text-primary text-2xl" />
              <h2 className="text-2xl tracking-wide font-semibold">
                INK<span className="text-primary">WELL</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Your curated destination for the stories that move&nbsp;you. 
              Discover, collect, and fall in love with reading all over&nbsp;again.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-1">
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full border border-white/12 text-white/50 transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,206,26,0.15)]"
              >
                <FaInstagram size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full border border-white/12 text-white/50 transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,206,26,0.15)]"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                aria-label="X / Twitter"
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full border border-white/12 text-white/50 transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(255,206,26,0.15)]"
              >
                <FaXTwitter size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold">
              Explore
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link to="/" className="footer-link w-fit">Home</Link>
              <Link to="/discover" className="footer-link w-fit">Discover</Link>
              <Link to="/shelf" className="footer-link w-fit">My Shelf</Link>
              <Link to="/orders" className="footer-link w-fit">Orders</Link>
            </nav>
          </div>

          {/* Company Links */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold">
              Company
            </h3>
            <nav className="flex flex-col gap-2.5 text-sm">
              <a href="#" className="footer-link w-fit">About&nbsp;Us</a>
              <a href="#" className="footer-link w-fit">Careers</a>
              <a href="#" className="footer-link w-fit">Press</a>
              <a href="#" className="footer-link w-fit">Contact</a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/30 font-semibold">
              Stay in the loop
            </h3>
            <p className="text-sm text-white/45 leading-relaxed">
              Get weekly picks, new arrivals, and exclusive offers delivered to your inbox.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center p-1.5 gap-2 bg-white/6 border border-white/10 rounded-[10px] transition-all duration-300 focus-within:border-[rgba(255,206,26,0.35)] focus-within:bg-white/8 focus-within:shadow-[0_0_20px_rgba(255,206,26,0.06)]"
            >
              <HiOutlineMail className="ml-3 text-white/30 flex-shrink-0" size={18} />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none py-2"
                required
              />
              <button
                type="submit"
                className="bg-primary text-secondary font-semibold rounded-lg px-5 py-2 text-sm whitespace-nowrap transition-all duration-300 hover:bg-[#ffd84d] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(255,206,26,0.3)] active:translate-y-0"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="animate-fade-slide-in text-xs text-primary/80 flex items-center gap-1.5">
                <span>✓</span> You're on the list! Welcome aboard.
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 mb-6 h-px bg-gradient-to-r from-transparent via-[rgba(255,206,26,0.25)] to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>
            © {new Date().getFullYear()} Inkwell{" "}
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mx-0.5 align-middle" />{" "}
            All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a href="#" className="footer-link">Privacy&nbsp;Policy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
