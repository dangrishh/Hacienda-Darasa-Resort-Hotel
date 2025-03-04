import React, { useState } from "react";

interface RoomCardProps {
  name: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ name }) => {
  const [selectedDuration, setSelectedDuration] = useState("12hrs.");

  return (
    <div className="flex bg-white rounded-[20px] shadow-md overflow-hidden w-full h-[350px] hover:bg-[#F4F4F4] transition-colors duration-300 mb-[15.5px]">
      {/* Left Container (Holds Centered Image) */}
      <div className="w-[35%] flex items-center justify-center">
        <div className="w-[450px] h-[300px] bg-[#EEEEEE] border rounded-[20px]"></div>
      </div>

      {/* Right Container (For Text and Details) */}
      <div className="w-[75%] p-10 pt-[2%] pb-[2%] flex flex-row justify-center">
        {/* Inner Left Grouped Container */}
        <div className="w-[75%] flex flex-col space-y-4">
          <span>
            <h2 className="text-[40px] font-bold mb-[5px]">{name}</h2>
            <p className="text-[21px] mb-[5px]">Available - 0</p>
            <p className="text-[21px] mb-[5px]">Check-In: 2PM | Check-Out: 12NN</p>
            <a href="#" className="text-blue-600 hover:underline text-[21px] text-[#28C669]">View Details</a>
          </span>

          <span className="mt-[40px]">
            <p className="text-[25px] mb-[5px]">Amenities</p>
            <p className="text-[25px] text-[#BABABA]">Air-conditioned room with Cable TV, 
              Free Wi-Fi, Parking, Toiletries, Hot & Cold Shower, and Complimentary Breakfast for 2 persons. </p>
          </span>
        </div>

        {/* Inner Right Grouped Container */}
        <div className="w-[25%] flex flex-col space-y-4 pr-[20px] pr-[40px]">
          <span className="h-[40%] flex flex-col items-end">
            <div className="flex pt-[15px]">
              <button
                className={`text-[25px] w-[80px] border-0 bg-transparent ${selectedDuration === "12hrs." ? "text-[#001DB0] font-bold underline" : "text-[#555555]"}`}
                onClick={() => setSelectedDuration("12hrs.")}
              >
                12hrs
              </button>
              <button
                className={`text-[25px] w-[80px] border-0 bg-transparent ${selectedDuration === "22hrs." ? "text-[#001DB0] font-bold underline" : "text-[#555555]"}`}
                onClick={() => setSelectedDuration("22hrs.")}
              >
                22hrs
              </button>
            </div>
          </span>
          
          <span className="h-[60%] flex flex-col items-end">
            <h1 className="text-[30px] h-[50px] w-[150px] font-bold mt-[25px]">&#8369;2000.00</h1>
            <button className="h-[50px] w-[150px] px-4 py-2 bg-[#28C669] text-[18px] text-[#FFFFFF] mt-[15px]
            rounded-lg hover:bg-[#50E685] border-0 outline-none focus:outline-none focus:ring-0 active:ring-0">
                BOOK NOW
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
