import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/icons/Logo.png";

// import LoginButton from '../../../assets/icons/Logo.png'
const ResortName: React.CSSProperties = {
  fontFamily: "'Poppins', serif",
  fontWeight: "300",
  color: "white",
};

const Navbar: React.FC = () => {
  return (
    <nav className="absolute mt-[57px] bg-transparent text-white py-4 shadow-md">
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
                `ml-[159px] no-underline transition duration-200 ${
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
                `no-underline transition duration-200 ${
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
                `no-underline transition duration-200 ${
                  isActive ? "font-bold" : "font-normal"  
                }`
              }
            >
              About Us
            </NavLink>
          </li>

          <li>
            {/* <LoginButton/> */}
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
