import React from "react";
import "../styles.css";

import Hero from './Components/Hero'
import BookNowButton from './Components/Booknow'
import Navbar from './Components/Navbar'
import Lowericons from './Components/Lowericons'
import Gallery from './Components/Gallery'



const App: React.FC = () => {
  return (
    <div className="">

           <Navbar/>
           <BookNowButton/>
           <Hero/>
           <Lowericons/>
           <Gallery/>
         
    </div>
    
  );
};

export default App;
