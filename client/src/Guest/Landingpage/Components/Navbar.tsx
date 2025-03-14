import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/Logo.png";

const ResortName: React.CSSProperties = {
  fontFamily: "'Poppins', serif",
  fontWeight: "300",
  color: "#FFFFFF",
};

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true); // Show navbar when scrolling

      // Reset hide timer
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        if (window.scrollY > 10) {
          setVisible(false); // Hide only if not at the very top
        }
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-[#000000] text-[#FFFFFF] shadow-md z-50 backdrop-blur-lg transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center pl-[20px] pr-[20px] pt-[10px] pb-[10px]">
        <img src={Logo} alt="Logo" />
        <h1 style={ResortName} className="text-[#FFFFFF] text-[20px] ml-[12px]">
          Hacienda Darasa Garden <br /> Resort & Hotel
        </h1>

        <ul className="text-[#FFFFFF] flex gap-[100px] list-none text-[25px] ml-auto mr-[50px]">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
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
                `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
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
                `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
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
