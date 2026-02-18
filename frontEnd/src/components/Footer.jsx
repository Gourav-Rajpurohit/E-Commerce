import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      {/* Top Footer */}
      <div className="max-w-full mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] xl:px-[12vw] 2xl:px-[14vw] py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-flow-col md:gap-auto">

          {/* Brand / Description */}
          <div className="w-auto md:w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1"><img src={assets.logo_ravn} alt="logo" className="w-12 block" /></div>
              <h2 className="monoton text-2xl font-semibold tracking-wide text-white">
                RAVN
              </h2>
            </div>

            <p className="mt-4 mx-4 text-md text-gray-400 leading-relaxed max-w-sm">
              Built for those who seek quality, craft, and distinction. Curated with precision. Designed to stand apart.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-flow-col gap-8">
            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-white mb-4">
                COMPANY
              </h3>

              <ul className="space-y-2 text-sm text-gray-400">
                <Link to='/' className="block cursor-pointer hover:text-white">Home</Link>
                <Link to='/about' className="block cursor-pointer hover:text-white">About us</Link>
                <Link to='/privacy-policy' className="block cursor-pointer hover:text-white">Delivery</Link>
                <Link to='/privacy-policy' className="block cursor-pointer hover:text-white">Privacy policy</Link>
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h3 className="text-sm font-semibold tracking-widest text-white mb-4">
                GET IN TOUCH
              </h3>

              <ul className="space-y-2 text-sm text-gray-400">
                <li>+91 9876543210</li>
                <li>customer.support@ravn.org</li>
                <li className="cursor-pointer hover:text-white">Instagram</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Bottom Footer */}
      <div className="py-6 text-center">
        <p className="text-sm text-gray-400">
          Copyright 2024 © Ravn.com - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
