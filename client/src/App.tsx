import React from "react";
import "./styles.css";

import Hero from '../src/Landingpage/Hero'
import Navbar from './Landingpage/Navbar'
import LoginComponent from './Landingpage/LoginComponent'
import Booknow from './Landingpage/Booknow'

const App: React.FC = () => {
  return (
    <div className="">
      <Booknow/>
    <LoginComponent/>
     <Navbar/>
     <Hero/>
    
    </div>
    
  );
};

export default App;
