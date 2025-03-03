import React from "react";
import RoomCard from "./HotelRoomCard"; // Import the RoomCard component

const HotelRates: React.FC = () => {
  const rooms = Array.from({ length: 20 }, (_, i) => `Room ${i + 1}`);

  return (
    <section className="max-w-[90%] mx-auto mt-[200px]">
      {/* Title */}
      <div className="ml-20">
        <h1 className="text-[100px] font-bold text-gray-900">HOTEL RATES</h1>
      </div>

      {/* Scrollable Container */}
      <div className="h-[650px] w-full mx-auto overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-lg border border-gray-300">
        <div className="grid grid-cols-1 gap-6">
          {rooms.map((room, index) => (
            <RoomCard key={index} name={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelRates;
