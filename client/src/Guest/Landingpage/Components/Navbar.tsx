import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/Logo.png";

const ResortName: React.CSSProperties = {
  fontFamily: "'Poppins', serif",
  fontWeight: "300",
  color: "white",
};

const Navbar: React.FC = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed top-0 left-0 pt-[10px] pb-[10px] w-full bg-[#0000004D] text-white py-4 shadow-md z-50 backdrop-blur-md transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center ml-[50px]">
        <img src={Logo} alt="Logo" />
        <h1 style={ResortName} className="text-white text-[20px] ml-[12px]">
          Hacienda Darasa Garden <br /> Resort & Hotel
        </h1>

        <ul className="text-white flex gap-[100px] list-none text-[25px]">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `ml-[159px] no-underline text-white hover:text-gray-300 transition duration-200 ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              Photos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `no-underline text-white hover:text-gray-300 transition duration-200 ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `no-underline text-white hover:text-gray-300 transition duration-200 ${
                  isActive ? "font-bold" : "font-normal"
                }`
              }
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
