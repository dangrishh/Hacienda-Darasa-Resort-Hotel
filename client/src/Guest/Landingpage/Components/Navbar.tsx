import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/Logo.png";

const ResortName: React.CSSProperties = {
  fontFamily: "'Poppins', serif",
  fontWeight: "300",
  color: "#FFFFFF",
};

const Navbar: React.FC = () => {
  // const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  // const [visible, setVisible] = useState(true);
  // const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;

  //     // Show navbar if scrolling up OR at the top
  //     if (prevScrollPos > currentScrollPos || currentScrollPos < 10) {
  //       setVisible(true);
  //       if (hideTimeout) clearTimeout(hideTimeout); // Cancel hide timeout
  //     } else {
  //       setVisible(false); // Hide immediately when scrolling down
  //     }

  //     // Start hide timer when stopping
  //     if (hideTimeout) clearTimeout(hideTimeout);
  //     const timeout = setTimeout(() => setVisible(false), 2000); // Hide after 3s of stillness
  //     setHideTimeout(timeout);

  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     if (hideTimeout) clearTimeout(hideTimeout);
  //   };
  // }, [prevScrollPos]);

  return (
    <nav
      className={" top-0 left-0 pt-[10px] pb-[10px] w-full bg-[#000000] text-[#FFFFFF] py-4 shadow-md z-50 backdrop-blur-lg transition-transform duration-300"}
      //   visible ? "translate-y-0" : "-translate-y-full"
      // }`}
    >
      <div className="container mx-auto flex items-center ml-[50px]">
        <img src={Logo} alt="Logo" />
        <h1 style={ResortName} className="text-[#FFFFFF] text-[20px] ml-[12px]">
          Hacienda Darasa Garden <br /> Resort & Hotel
        </h1>

        <ul className="text-[#FFFFFF] flex gap-[100px] list-none text-[25px]">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `ml-[159px] no-underline text-[#FFFFFF] visited:text-[#FFFFFF] hover:text-[#D1D5DB] transition duration-200 ${
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
