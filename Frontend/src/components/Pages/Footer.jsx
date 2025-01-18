import React from 'react';
import Logo from '../../assets/LogoPlaceHolder.webp';

function Footer() {
  return (
    <footer className="flex flex-col items-center min-w-[160%] md:min-w-[100%] font-archivo gap-8 mt-20 mb-10 px-4">
      <img
        src={Logo}
        alt="Logo"
        className="w-12 cursor-pointer sm:w-8"
      />

      <nav>
        <ul className="list-none flex flex-wrap gap-6 justify-center text-base md:text-lg">
          <li className="cursor-pointer hover:underline">Privacy Policy</li>
          <li className="cursor-pointer hover:underline">Terms of Service</li>
          <li className="cursor-pointer hover:underline">Sitemap</li>
          <li className="cursor-pointer hover:underline">Newsletter</li>
        </ul>
      </nav>

      <p className="border-t border-white pt-8 px-6 text-center text-sm md:text-base">
        © 2024 HCLERALD LTD. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;