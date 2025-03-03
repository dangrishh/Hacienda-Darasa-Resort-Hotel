import React from "react";
import background from "./assets/images/coffee-bg.png"
import iconLogo from "./assets/images/Icon-Logo.png"

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-200 min-h-screen">
      {/* Hero Section */}
      <div
      >
        <img src={background} className="relative h-auto max-w-full bg-cover bg-center flex justify-end items-center pr-5" ></img>
        <div className="text-center bg-white bg-opacity-80 p-5 rounded-lg flex flex-col items-center">
          <img src={iconLogo} alt="Cafe Luntian Logo" className="w-[120px] mb-2" />
          <a href="#" className="mt-2 px-5 py-2 bg-orange-500 text-white rounded-md font-bold w-[150px] flex justify-center">
            Go to page →
          </a>
        </div>
      </div>
      

      {/* Footer Section
      <footer className="w-full bg-gray-800 text-white py-5 px-12 flex justify-center relative">
        <img src="left-icon.png" alt="Left Icon" className="absolute bottom-2 left-2 w-[50px] h-[50px]" />
        
        <div className="w-full max-w-[1200px] flex justify-between">
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

        <img src="right-icon.png" alt="Right Icon" className="absolute bottom-2 right-2 w-[50px] h-[50px]" />
      </footer> */}
    </div>
  );
};

export default App;
