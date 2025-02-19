import React from "react";
import "../styles.css";
import { Routes, Route } from 'react-router-dom';


import Hero from './Components/Hero'
import BookNowButton from './Components/Booknow'
import Navbar from './Components/Navbar'
import Login from './Components/LoginComponent'
const App: React.FC = () => {
  return (
    <div className="">
           <Navbar/>
           <BookNowButton/>
           <Hero/>
          
      
    </div>
    
  );
};

export default App;
