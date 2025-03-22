import React from "react";


import Hero from './Components/Hero'
import BookNowButton from './Components/Booknow'
import Navbar from './Components/Navbar'
import Gallery from './Components/Gallery'
import Lowericons from "./Components/Lowericons"
import HotelRates from "./Components/HotelBooking"
import ResortRates from "./Components/ResortBooking";
import Photos from "./Components/Photos";
import Cafe from "./Components/Cafe";
import Maps from "./Components/Maps";
import Footer from "./Components/Footer"




const App: React.FC = () => {
  return (
    <div className="">

           <Navbar/>
           <BookNowButton/>
           <Hero/>
           <Lowericons/>
           <Gallery/>
           <HotelRates/>
           <ResortRates/>
           <Photos/>
           <Maps/>
           <Footer/>
         
    </div>
    
  );
};

export default App;
