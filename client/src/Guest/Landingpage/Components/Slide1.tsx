import React from "react";
import slideImage from "../../../assets/images/cafeImage1.png"; // Replace with your actual image path
import cafelogo from "../../../assets/icons/Cafelogo.jpg";
import cafetext from "../../../assets/images/cafe-text.png"
import cafecaro from "../../../assets/images/cafecaro.png"
import coffeeicon from "../../../assets/icons/cafe_icon.png"


const Slide1: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* Background Image */}
      <img className="w-full h-full object-cover" src={cafecaro} alt="Slide 1" />

        {/* (Left) */}
        <div className="absolute top-1/2 right-[150px] transform -translate-y-1/2 w-[300px] h-[500px] bg-gray-000 opacity-100 flex flex-col justify-center 
        items-center gap-[5%]">
            <img src={cafelogo} alt="Cafe Luntian Logo" className="w-[70%] h-[70%] border-2 border-black" />
            <button className=" px-4 py-2 bg-[#289619] rounded-lg hover:bg-yellow-500 transition w-[90%] h-[12%] flex gap-[15px]">
                <img className="" src={coffeeicon} alt="coffe-icon" />
                <span className="text-[30px] text-white font-bold">GO TO PAGE</span>
            </button>
            <div className="transform w-[90%] h-[450px] bg-[#E6E6E6D9] rounded-[20px] flex flex-col justify-center items-center gap-[50px] p-[20px]">
                <p className="ml-[10px] font-bold text-[25px] opacity-100 text-left">Where every sip feels like a hug in a cup</p>
            </div>
        </div>


        {/* (Right) */}
        

    </div>
  );
};

export default Slide1;
