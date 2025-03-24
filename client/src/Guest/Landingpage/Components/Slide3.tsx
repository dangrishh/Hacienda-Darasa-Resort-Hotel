import React from "react";
import slideImage from "../../../assets/images/main-page.jpg";
import cafetext from "../../../assets/images/cafe-text.png"
import haciendaLogo from "../../../assets/icons/SignInLogo.png"
import bellIcon from "../../../assets/icons/bell_icon.png"
import poolCaro from "../../../assets/images/poolcaro.png"
import sunIcon from "../../../assets/icons/sun.png"
import umbrellaIcon from "../../../assets/icons/umbrella.png"

const Slide3: React.FC = () => {
  return (
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img className="w-full h-full object-cover" src={poolCaro} alt="Slide 1" />

          <div className="absolute top-[45%] top-1/2 right-[150px] transform -translate-y-1/2 w-[400px] 
          h-[300px] bg-[#4D4C4C82] rounded-[40px] flex flex-col justify-center items-center gap-[5%]
           border-1 border-black">
            <h1 className="text-yellow-300 text-[55px] mt-[3%]">
              Day Swimming
            </h1>
            <p className="font-bold text-[35px] opacity-100 text-white text-center leading-[35px]">
              Enjoy The <br/>
              Summer Heat <br/>
            </p>
            <div className="flex flex-row gap-[20px]">
                <img className="w-[40px] h-[40px]" src={umbrellaIcon}/>
                <img className="w-[40px] h-[40px]" src={sunIcon}/>
            </div>
          </div>
      </div>
  );
};

export default Slide3;
