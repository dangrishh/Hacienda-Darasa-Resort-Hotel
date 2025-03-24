import React from "react";
import bedCaro from "../../../assets/images/bedcaro.png"
import seasonsofLove from "../../../assets/images/love.png"
import bellIcon from "../../../assets/icons/bell_icon.png"

const Slide5: React.FC = () => {
  return (
      <div className="w-full h-full relative">
        {/* Background Image */}
        <img className="w-full h-full object-cover" src={bedCaro} alt="Slide 1" />

            {/*LEFT*/}
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

            {/*RIGHT*/}
            <div className="absolute top-[50%] top-1/2 right-[50px] transform -translate-y-1/2 w-[550px] 
            h-[450px] flex flex-col justify-center items-center">
            <img className="w-full h-full" src={seasonsofLove} alt="Seasons of Love"/>
            <button className="ml-[1%] absolute top-[70%] left-[150px] px-4 py-2 rounded-[15px] transition
                bg-[#E5C81E] hover:bg-[#C4A817] hover:scale-105 w-[280px] h-[60px] flex items-center gap-[5px] 
                border-2 border-black mt-[3%]">
                <img className="ml-[2%] w-[13%] h-[60%]" src={bellIcon} />
                <span className="text-[30px] font-bold text-white">RESERVATION</span>
            </button>

            <span className="ml-[5%] mt-[-10%] text-[20px]">Special promo for 2pax</span>
            </div>
            
      </div>
  );
};

export default Slide5;
