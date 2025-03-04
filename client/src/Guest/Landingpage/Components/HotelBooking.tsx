import React from "react";
import RoomCard from "./HotelRoomCard"; // Import the RoomCard component

const HotelRates: React.FC = () => {
  const rooms = Array.from({ length: 3 }, (_, i) => `Room ${i + 1}`);

  return (
    <section className="max-w-[90%] mx-auto mt-[200px]">
      {/* Title */}
      <div className="ml-20 mb-[15px]">
        <h1 className="text-[100px] font-bold">HOTEL RATES</h1>
      </div>

      {/* Scrollable Container */}
      <div className="h-[650px] w-full mx-auto overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-6">
        {rooms.map((room, index) => (
          <div key={index} className="mb-6">
            <RoomCard name={room} />
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default HotelRates;
