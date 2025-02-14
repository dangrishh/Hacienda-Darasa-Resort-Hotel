import React from "react";
import "./styles.css";

import Hero from '../src/Landingpage/Hero'
import Navbar from './Landingpage/Navbar'
import Login from './Landingpage/Login'
import Booknow from './Landingpage/Booknow'

const App: React.FC = () => {
  return (
    <div className="">
      <Booknow/>
    <Login/>
     <Navbar/>
     <Hero/>
    
    </div>
    
  );
};

export default App;
