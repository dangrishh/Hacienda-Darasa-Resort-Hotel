import React from "react";


import Hero from './Components/Hero'
import BookNowButton from './Components/Booknow'
import Navbar from './Components/Navbar'
// import Lowericons from './Components/Lowericons'
import Gallery from './Components/Gallery'
import FeaturesSection from "./Components/Lowericons";




const App: React.FC = () => {
  return (
    <div className="">

           <Navbar/>
           <BookNowButton/>
           <Hero/>
           <FeaturesSection/>
           <Gallery/>
         
    </div>
    
  );
};

export default App;
