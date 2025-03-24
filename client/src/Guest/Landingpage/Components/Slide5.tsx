import React from "react";
import slideImage from "../../../assets/images/main-page.jpg";
import cafetext from "../../../assets/images/cafe-text.png"
import haciendaLogo from "../../../assets/icons/SignInLogo.png"
import bellIcon from "../../../assets/icons/bell_icon.png"
import bedCaro from "../../../assets/images/bedcaro.png"
import sunIcon from "../../../assets/icons/sun.png"
import umbrellaIcon from "../../../assets/icons/umbrella.png"

const Slide5: React.FC = () => {
  return (
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img className="w-full h-full object-cover" src={bedCaro} alt="Slide 1" />

          <div className="absolute top-[50%] top-1/2 left-[50px] transform -translate-y-1/2 w-[500px] 
          h-[400px] bg-[#4D4C4C82] rounded-[40px] flex flex-col justify-center items-center gap-[5%]
           border-1 border-black">
            <p className="font-semibold text-[38px] opacity-100 text-white text-center leading-[40px]
            mt-[10%]">
              "Celebrate love this <br/>
              February 14th with our <br/>
              exclusive couples' <br/>
              getaway - a romantic <br/>
              retreat for two, designed <br/>
              for unforgettable <br/>
              moments."
            </p>
          </div>
      </div>
  );
};

export default Slide5;
