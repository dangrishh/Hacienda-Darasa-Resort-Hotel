import React from "react";

interface RoomCardProps {
  name: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ name }) => {
    return (
      <div className="flex bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden w-full h-[350px]">
        {/* Left Container (Holds Centered Image) */}
        <div className="w-[40%] flex items-center justify-center">
          <div className="w-[450px] h-[250px] bg-gray-400 border border-gray-600"></div>
        </div>
  
        {/* Right Container (For Text and Details) */}
        <div className="w-[60%] p-10 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          <p className="text-gray-600 text-[25px] mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <button className="h-[50px] w-[150px] mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 self-start">
            View Details
          </button>
        </div>
      </div>
    );
  };
  

export default RoomCard;
