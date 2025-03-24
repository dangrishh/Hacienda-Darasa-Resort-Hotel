import React from "react";
import slideImage from "../../../assets/images/main-page.jpg";
import cafetext from "../../../assets/images/cafe-text.png"


const Slide1: React.FC = () => {
  return (
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img className="w-full h-full object-cover" src={slideImage} alt="Slide 1" />

          {/* (Left) */}
          <div className="absolute top-[45%] left-[150px] transform -translate-y-1/2 w-[400px] h-[430px] bg-[#4D4C4C9C] rounded-[40px] flex flex-col justify-center items-center gap-[70px] p-[20px]">
            <h1 className="text-white text-[80px] mt-[-10%]">
              RESORT
            </h1>
            <p className="text-white font-bold text-[30px] opacity-100 text-left">
              Your "Barkada" <br/>
              Squad, Our Price. <br/>
              Perfect Moments <br/>
              Await!
            </p>
          </div>        
          <button className="absolute top-[72%] left-[200px] px-4 py-2 rounded-lg transition
          bg-gradient-to-r from-[#42FC2A] via-[#32BF20] to-[#289619] 
           hover:from-[#32BF20] hover:via-[#289619] hover:to-[#1E7014]
           w-[300px] h-[70px] text-[28px] font-bold text-white">
            BOOK NOW
          </button>
      </div>
  );
};

export default Slide1;
