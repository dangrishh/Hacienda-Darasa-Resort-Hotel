import React, { useState, useEffect } from "react";
import RoomCard from "./HotelRoomCard"; // Import the RoomCard component

const HotelRates: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(0);
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    // Fetch room details from API
    fetch("http://localhost:3000/api/room/room-details")
      .then((res) => res.json())
      .then((data) => {
        if (data.rooms) {
          setRoomCount(data.rooms.length); // Count total rooms
          setRooms(data.rooms.map((room: any) => room.name)); // Extract room names
        }
      })
      .catch((err) => console.error("Error fetching room details:", err));
  }, []);

  return (
    <section className="max-w-[90%] mx-auto mt-[200px]">
      {/* Title */}
      <div className="ml-20 mb-[15px]">
        <h1 className="text-[100px] font-bold">HOTEL RATES</h1>
      </div>

      {/* Scrollable Container */}
      <div className="h-[700px] w-full mx-auto overflow-y-auto p-4">
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
