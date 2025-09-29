import { useState } from "react";
import { logo } from "../assets/images";
import { navLinks } from "../constants/index";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  // Smooth scroll handler
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActive(navLinks.find((nav) => nav.id === id)?.title);
      setToggle(false); // Close mobile menu
    }
  };

  return (
    <nav className="w-full py-6 px-4 sm:px-8 flex justify-between items-center bg-gray-900 fixed top-0 z-50">
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-[124px] h-[32px]" />

      {/* Desktop Menu */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal text-[16px] cursor-pointer transition-colors duration-300 ${
              active === nav.title
                ? "text-white"
                : "text-gray-400 hover:text-white"
            } ${index !== navLinks.length - 1 ? "mr-10" : "mr-0"}`}
            onClick={() => handleScroll(nav.id)}
          >
            {nav.title}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <HiMenu
          className="w-6 h-6 text-white cursor-pointer"
          onClick={() => setToggle(true)}
        />

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col justify-center items-center z-50 transform transition-transform duration-300 ${
            toggle ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <HiX
            className="w-8 h-8 text-white absolute top-6 right-6 cursor-pointer"
            onClick={() => setToggle(false)}
          />
          <ul className="list-none flex flex-col justify-center items-center gap-8">
            {navLinks.map((nav) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium text-[20px] cursor-pointer transition-colors duration-300 ${
                  active === nav.title
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => handleScroll(nav.id)}
              >
                {nav.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
