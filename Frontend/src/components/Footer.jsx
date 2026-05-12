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
    <>
      <style>{`
        .footer-wrap {
          background: linear-gradient(175deg, #0d0842 0%, #080530 60%, #06031f 100%);
        }
        .footer-glow {
          background: radial-gradient(ellipse 600px 200px at 50% 0%, rgba(255,206,26,0.06) 0%, transparent 70%);
        }
        .footer-divider {
          background: linear-gradient(90deg, transparent, rgba(255,206,26,0.25), transparent);
          height: 1px;
        }
        .footer-link {
          position: relative;
          color: rgba(255,255,255,0.55);
          transition: color 0.3s ease;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #ffce1a;
          transition: width 0.3s ease;
        }
        .footer-link:hover {
          color: #ffce1a;
        }
        .footer-link:hover::after {
          width: 100%;
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5);
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          border-color: #ffce1a;
          color: #ffce1a;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(255,206,26,0.15);
        }
        .subscribe-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .subscribe-input:focus-within {
          border-color: rgba(255,206,26,0.35);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 20px rgba(255,206,26,0.06);
        }
        .subscribe-btn {
          background: #ffce1a;
          color: #0d0842;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .subscribe-btn:hover {
          background: #ffd84d;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255,206,26,0.3);
        }
        .subscribe-btn:active {
          transform: translateY(0);
        }
        .success-msg {
          animation: fadeSlideIn 0.4s ease;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .brand-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #ffce1a;
          border-radius: 50%;
          margin: 0 2px;
          vertical-align: middle;
        }
      `}</style>

      <footer className="footer-wrap relative text-white font-main overflow-hidden">
        {/* Subtle top glow */}
        <div className="footer-glow absolute inset-0 pointer-events-none" />

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
                <a href="#" aria-label="Instagram" className="social-icon">
                  <FaInstagram size={16} />
                </a>
                <a href="#" aria-label="Facebook" className="social-icon">
                  <FaFacebookF size={14} />
                </a>
                <a href="#" aria-label="X / Twitter" className="social-icon">
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
              <form onSubmit={handleSubscribe} className="subscribe-input flex items-center p-1.5 gap-2">
                <HiOutlineMail className="ml-3 text-white/30 flex-shrink-0" size={18} />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none py-2"
                  required
                />
                <button type="submit" className="subscribe-btn px-5 py-2 text-sm whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p className="success-msg text-xs text-primary/80 flex items-center gap-1.5">
                  <span>✓</span> You're on the list! Welcome aboard.
                </p>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider mt-12 mb-6" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>
              © {new Date().getFullYear()} Inkwell <span className="brand-dot" /> All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="#" className="footer-link">Privacy&nbsp;Policy</a>
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Refunds</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
