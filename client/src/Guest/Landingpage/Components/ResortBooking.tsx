import React, { useState, useEffect } from "react";
import ResortCard from "./ResortCard";

interface Room {
  name: string;
  rates12hrs: { price: number } | null;
  rates22hrs: { price: number } | null;
}

const ResortRates: React.FC = () => {
  const [roomCount, setRoomCount] = useState<number>(0);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/room/room-details")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch room details.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.rooms) {
          setRoomCount(data.rooms.length);

          const extractedRooms: Room[] = data.rooms.map((room: any) => ({
            name: room.name,
            rates12hrs: room.rates.find((rate: any) => rate.duration === "12hrs") || null,
            rates22hrs: room.rates.find((rate: any) => rate.duration === "22hrs") || null,
          }));

          setRooms(extractedRooms);
        }
        setError(null); // Reset error on success
      })
      .catch((err) => {
        console.error("Error fetching room details:", err);
        setError("Failed to load rooms. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-[90%] mx-auto mt-[200px]">
      {/* Title */}
      <div className="ml-20 mb-[15px]">
        <h1 className="text-[100px] font-bold">RESORT RATES</h1>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-xl">Loading rooms...</p>}

      {/* Error State */}
      {error && !loading && <p className="text-center text-red-500">{error}</p>}

      {/* Room List */}
      {!loading && !error && rooms.length > 0 ? (
        <div className="h-[700px] w-full mx-auto overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-6">
            {rooms.map((room, index) => (
              <div key={index} className="mb-6">
                <ResortCard
                  name={room.name} 
                  rate12hrs={room.rates12hrs?.price || null} 
                  rate22hrs={room.rates22hrs?.price || null} 
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && !error && <p className="text-center text-gray-500">No rooms available.</p>
      )}
    </section>
  );
};

export default ResortRates;
