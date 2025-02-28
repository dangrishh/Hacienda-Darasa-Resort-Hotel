import React from "react";
import background from "/src/assets/img/background.jpg";
import cafelogo from "/src/assets/img/Cafelogo.jpg";
import leftIcon from "/src/assets/img/left-icon.png";
import rightIcon from "/src/assets/img/right-icon.png";

const Hero: React.FC = () => {
  return (
    <div 
      className="relative w-full h-[80vh] bg-cover bg-center flex justify-end items-center pr-5" 
      style={{ backgroundImage: `url(${background})` }} // ✅ Corrected
    >
      <div className="text-center bg-white bg-opacity-80 p-5 rounded-lg flex flex-col items-center">
        <img src={cafelogo} alt="Cafe Luntian Logo" className="w-30 mb-2" /> {/* ✅ Corrected */}
        <h1 className="text-2xl font-bold">CAFE LUNTIAN</h1>
        <a href="#" className="mt-2 px-4 py-2 bg-orange-500 text-white font-bold rounded-lg w-[150px] text-center">
          Go to page →
        </a>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-5 flex justify-center relative">
      <img src={leftIcon} alt="Left Icon" className="absolute bottom-2 left-2 w-12 h-12" /> {/* ✅ Corrected */}
      <div className="flex justify-between w-full max-w-5xl">
        <div className="flex-1 mx-2">
          <h3 className="mb-2">Social Media Links</h3>
          <p>Darasa Tanauan</p>
          <p><a href="#" className="text-orange-500">www.fbsample.com</a></p>
          <p><a href="#" className="text-orange-500">www.instagramsample.com</a></p>
        </div>
        <div className="flex-1 mx-2">
          <h3 className="mb-2">Contacts</h3>
          <p>📞 0912-5932-523</p>
          <p>📧 haciendarasa@gmail.com</p>
        </div>
        <div className="flex-1 mx-2">
          <h3 className="mb-2">About</h3>
          <p>📞 0912-5932-523</p>
          <p>📧 haciendarasa@gmail.com</p>
        </div>
      </div>
      <img src={rightIcon} alt="Right Icon" className="absolute bottom-2 right-2 w-12 h-12" /> {/* ✅ Corrected */}
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <Hero />
      <Footer />
    </div>
  );
};

export default App;
