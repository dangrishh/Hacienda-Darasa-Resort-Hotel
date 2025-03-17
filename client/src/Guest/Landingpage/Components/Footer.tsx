import React from "react";
import logoFooter from "../../../assets/images/logo-footer.png";

const Footer: React.FC = () => {

  return (
    <footer className="w-full bg-[#10182F] text-white py-12 px-8 md:px-16">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
  
      {/* Logo & Name */}
      <div className="flex flex-col items-center md:items-start">
        <img 
          src={logoFooter} 
          alt="Hacienda Darasa Logo" 
          width="128" 
          height="128" 
          className="object-contain mb-4"
        />
        <p className="text-xl text-center md:text-left">
          Hacienda Darasa Garden <br />
          Resort & Hotel
        </p>
      </div>
  
      {/* About Section */}
      <div>
        <h4 className="text-xl font-semibold">About</h4>
        <ul className="mt-4 space-y-2">
          {["Owner", "Caretaker", "Developer"].map((item) => (
            <li key={item}>
              <a href="#" className="text-gray-400 hover:text-white">{item}</a>
            </li>
          ))}
        </ul>
      </div>
  
      {/* Neighbor Resort */}
      <div>
        <h4 className="text-xl font-semibold">Neighbor Resort</h4>
        <ul className="mt-4 space-y-2">
          {["Series 1 Resort", "Golden Buddha Resort", "Robles Resort"].map((item) => (
            <li key={item}>
              <a href="#" className="text-gray-400 hover:text-white">{item}</a>
            </li>
          ))}
        </ul>
      </div>
  
      {/* Information Section */}
      <div>
        <h4 className="text-xl font-semibold">Information</h4>
        <ul className="mt-4 space-y-2">
          {["09566674853", "@jbcresort", "4027 Calamba Laguna"].map((item) => (
            <li key={item}>
              <a href="#" className="text-gray-400 hover:text-white">{item}</a>
            </li>
          ))}
        </ul>
      </div>
  
    </div>
  </footer>
  
  );
};

export default Footer;
