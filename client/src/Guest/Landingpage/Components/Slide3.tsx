import React from "react";
import slideImage from "../../../assets/images/main-page.jpg";
import cafetext from "../../../assets/images/cafe-text.png"
import haciendaLogo from "../../../assets/icons/SignInLogo.png"
import bellIcon from "../../../assets/icons/bell_icon.png"
import poolCaro from "../../../assets/images/poolcaro.png"


const Slide1: React.FC = () => {
  return (
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img className="w-full h-full object-cover" src={poolCaro} alt="Slide 1" />

          <div className="absolute top-[45%] top-1/2 right-[150px] transform -translate-y-1/2 w-[370px] 
          h-[270px] bg-[#4D4C4C82] rounded-[30px] flex flex-col justify-center items-center gap-[2%]
           border-1 border-black">
            <h1 className="text-yellow-300 text-[52px] mt-[-8%]">
              Day Swimming
            </h1>
            <p className="font-bold text-[35px] opacity-100 text-white text-center">
              Enjoy The <br/>
            Summer Heat <br/>
            </p>
          </div>
      </div>
  );
};

export default Slide1;
