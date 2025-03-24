import React from "react";
import slideImage from "../../../assets/images/main-page.jpg";
import cafetext from "../../../assets/images/cafe-text.png"
import haciendaLogo from "../../../assets/icons/SignInLogo.png"
import bellIcon from "../../../assets/icons/bell_icon.png"
import hotelCaro from "../../../assets/images/hotelcaro.png"


const Slide4: React.FC = () => {
  return (
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img className="w-full h-full object-cover" src={hotelCaro} alt="Slide 1" />

          {/* (Left) */}
          <div className="absolute top-[45%] right-[150px] transform -translate-y-1/2 w-[350px] h-[400px] bg-[#E6E6E6E0]
          rounded-[25px] flex flex-col justify-center items-center border-2 border-black">
            <img className="w-[30%] h-[25%] mb-[15%]" src={haciendaLogo} />
            <h1 className="font-bold text-[65px] mt-[-15%]">
              HOTEL
            </h1>
            <p className="font-bold text-[20px] opacity-100 text-left leading-[25px] mt-[8%]">
              "Whether you're here for <br/>
              business, leisure, or a little of <br/>
              both, our hotel offers a <br/>
              welcoming escape for every <br/>
              traveler."
            </p>
          </div>        
          <button className="absolute top-[70%] right-[150px] px-4 py-2 rounded-lg transition
          bg-gradient-to-r from-[#0500FF] to-[#030099] 
           hover:from-[#32BF20] hover:via-[#289619] hover:to-[#1E7014]
           w-[350px] h-[70px] flex items-center gap-[20px]">
            <img className="ml-[2%] w-[15%] h-[70%]" src={bellIcon}/>
            <span className="text-[35px] font-bold text-white">RESERVATION</span>
          </button>
      </div>
  );
};

export default Slide4;
