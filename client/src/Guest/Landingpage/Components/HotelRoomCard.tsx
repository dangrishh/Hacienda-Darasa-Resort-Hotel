import React from "react";

interface RoomCardProps {
  name: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ name }) => {
    return (
      <div className="flex bg-white rounded-xl shadow-md overflow-hidden w-full h-[350px] hover:bg-[#F4F4F4] transition-colors duration-300 mb-[15.5px]">

        {/* Left Container (Holds Centered Image) */}
        <div className="w-[40%] flex items-center justify-center">
          <div className="w-[450px] h-[250px] bg-[#EEEEEE] border"></div>
        </div>
  
       {/* Right Container (For Text and Details) */}
       <div className="w-[60%] p-10 flex flex-col justify-center">

          {/* Inner Grouped Container */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-600 text-[25px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="h-[50px] w-[150px] px-4 py-2 bg-[#28C669] text-[#FFFFFF] rounded-lg hover:bg-[#50E685] self-start border-0 outline-none focus:outline-none focus:ring-0 active:ring-0">
              View Details
            </button>


          </div>

        </div>

      </div>
    );
  };
  

export default RoomCard;
