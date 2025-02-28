import React from "react";
import "./styles.css";
import { Routes, Route } from 'react-router-dom';

import Guest from './Routes/Guest'
import Login from '../src/LoginComponent'
import Terms from '../src/Guest/Landingpage/Components/TermsCondition'
import Cafe from './Cafe'
const App: React.FC = () => {
  return (
    <div className="">

           
           <Routes>
   
             {/* Student and Advicer */}
             <Route path="/" element={<Guest/>} />
             <Route path="/Login" element={<Login/>} />
             <Route path="/Terms" element={<Terms/>} />
             <Route path="/Cafe" element={<Cafe/>} />

              
           </Routes>
      
    </div>
    
  );
};

export default App;
