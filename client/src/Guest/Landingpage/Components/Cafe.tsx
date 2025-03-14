import React from "react";
import background from "../../../assets/images/coffeeBG.jpg";
import cafelogo from "../../../assets/images/icon-Logo.png";

const Cafe: React.FC = () => {
  return (
    <section className="max-w-[100%] mx-auto mt-[200px]">
      {/* Title */}
      <div className="ml-[100px] mb-[15px]">
        <h1 className="text-[100px] font-bold">CAFE</h1>
      </div>

      {/* Background Image Container */}
      <div className="relative w-full h-[700px] flex justify-end items-center">
        <img
          src={background}
          alt="Cafe Background"
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Content Box - Stays on the Right */}
        <div className="relative z-[10] bg-white bg-opacity-[80%] p-[20px] rounded-lg flex flex-col items-center shadow-lg mr-[40px]">
          <img src={cafelogo} alt="Cafe Luntian Logo" className="w-[300px] mb-[20px] h-[550px]" />
        </div>
      </div>
    </section>
  );
};

export default Cafe;
