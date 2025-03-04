export interface RoomRate {
    duration: string;
    price: number;
    maxPersons: number;
  }
  
  export interface HourExtension {
    firstHours: number;
    price: number;
  }
  
  export interface RoomDetails {
    _id: string;
    name: string;
    rates: RoomRate[];
    extraPersonCharge: number;
    extraHourCharge: HourExtension[];
    amenities: string[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Room {
    _id: string;
    name: string;
    details: RoomDetails; // Reference to RoomDetails
    booked: "free" | "occupied" | "reserved";
    bookedBy?: string | null;
    bookingStartTime?: string | null;
    bookingEndTime?: string | null;
    pictures?: string[] | null;
  }
  
  export interface RoomResponse {
    message: string;
    rooms: Room[];
  }
  