import React from "react";
import slideImage from "../../../assets/images/main-page.jpg"
import haciendaLogo from "../../../assets/icons/SignInLogo.png"
import bellIcon from "../../../assets/icons/bell_icon.png"


const Slide2: React.FC = () => {
  return (
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img className="w-full h-full object-cover" src={slideImage} alt="Slide 1" />

          {/* (Left) */}
          <div className="absolute top-[45%] left-[150px] transform -translate-y-1/2 w-[370px] h-[370px] bg-[#E6E6E69C]
          rounded-[30px] flex flex-col justify-center items-center">
            <img className="w-[30%] h-[30%] mb-[10%]" src={haciendaLogo} />
            <h1 className=" text-[80px] mt-[-10%]">
              RESORT
            </h1>
            <p className="font-bold text-[20px] opacity-100 text-left">
              Your "Barkada" Squad, Our <br/>
              Price. Perfect Moments <br/>
              Await!
            </p>
          </div>        
          <button className="absolute top-[68%] left-[150px] px-4 py-2 rounded-lg transition
          bg-gradient-to-r from-[#0500FF] to-[#030099] 
           hover:from-[#32BF20] hover:via-[#289619] hover:to-[#1E7014]
           w-[370px] h-[70px] flex items-center gap-[20px]">
            <img className="ml-[2%] w-[15%] h-[70%]" src={bellIcon}/>
            <span className="text-[35px] font-bold text-white">RESERVATION</span>
          </button>
      </div>
  );
};

export default Slide2;
