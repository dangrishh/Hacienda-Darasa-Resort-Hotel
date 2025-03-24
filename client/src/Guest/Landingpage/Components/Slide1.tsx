import React from "react";
import slideImage from "../../../assets/images/cafeImage1.png"; // Replace with your actual image path
import cafelogo from "../../../assets/icons/Cafelogo.jpg";
import cafetext from "../../../assets/images/cafe-text.png"


const Slide1: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* Background Image */}
      <img className="w-full h-full object-cover" src={slideImage} alt="Slide 1" />

        {/* (Left) */}
        <div className="absolute top-1/2 left-[150px] transform -translate-y-1/2 w-[300px] h-[500px] bg-gray-000 opacity-100 flex flex-col justify-center items-center gap-[20px]">
            <img src={cafelogo} alt="Cafe Luntian Logo" className="w-[70%] h-[70%]" />
            <button className="mt-[15%] px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition w-[85%] h-[12%] text-[25px]">
                GO TO PAGE
            </button>
        </div>


        {/* (Right) */}
        <div className="absolute top-[45%] right-[150px] transform -translate-y-1/2 w-[500px] h-[450px] bg-[#4D4C4C9C] rounded-[40px] flex flex-col justify-center items-center gap-[50px] p-[20px]">
            <img src={cafetext} alt="Cafe Luntian Text" className="w-[100%] h-[50%] opacity-100 mt-[-10%]"  />
            <p className="text-white font-bold text-[30px] opacity-100 text-center">Where every sip feels like a huge cup</p>
        </div>

    </div>
  );
};

export default Slide1;
