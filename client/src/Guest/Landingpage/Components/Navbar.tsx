import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/Logo.png";
import LoginIcon from "../../../assets/icons/login-icon.png"

const ResortName: React.CSSProperties = {
  fontFamily: "'Poppins', serif",
  fontWeight: "800",
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
      className={`fixed top-0 left-0 w-full bg-[#667085CC] text-[#FFFFFF] shadow-md z-50 backdrop-blur-lg transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center pl-[20px] pr-[20px] pt-[10px] pb-[10px]">
        {/* Logo & Resort Name */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" />
          <h1 style={ResortName} className="text-[#FFFFFF] text-[20px] ml-[12px]">
            Hacienda Darasa Garden <br /> Resort & Hotel
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-[60px] list-none text-[27px] ml-[80px] mr-auto">
          <NavLink
            to="/photos"
            className={({ isActive }) =>
              `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
                isActive ? "font-bold" : "font-normal"
              }`
            }
          >
            Photos
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
                isActive ? "font-bold" : "font-normal"
              }`
            }
          >
            Rooms
          </NavLink>
          <NavLink
            to="/swimrates"
            className={({ isActive }) =>
              `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
                isActive ? "font-bold" : "font-normal"
              }`
            }
          >
            Swim Rates
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
                isActive ? "font-bold" : "font-normal"
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/cafe"
            className={({ isActive }) =>
              `no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
                isActive ? "font-bold" : "font-normal"
              }`
            }
          >
            Cafe
          </NavLink>
        </div>

        {/* Login & Book Now Buttons */}
        <div className="flex items-center gap-[80px] ml-auto list-none text-[30px] mr-[50px]">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `flex items-center gap-2 no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
              isActive ? "font-bold" : "font-normal"
            }`
          }
        >
          <img src={LoginIcon} alt="Login" className="w-[30px] h-[30px] object-contain mr-[5px]" />
          <span className="flex items-center underline">Login</span>
        </NavLink>
          <NavLink
            to="/booknow"
            className="h-[50px] w-[150px] bg-[#28C669] text-[20px] text-[#FFFFFF]
                      rounded-lg hover:bg-[#50E685] border-0 outline-none focus:outline-none 
                      focus:ring-0 active:ring-0 flex items-center justify-center transition duration-300 no-underline"
          >
            BOOK NOW
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
