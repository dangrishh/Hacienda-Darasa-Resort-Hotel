import React from "react";
import "./styles.css";
import { Routes, Route } from 'react-router-dom';

import Guest from './Routes/Guest'
import Login from '../src/LoginComponent'
import Terms from '../src/Landingpage/Components/Termscondition'
const App: React.FC = () => {
  return (
    <div className="">

           
           <Routes>
   
             {/* Student and Advicer */}
             <Route path="/" element={<Guest/>} />
             <Route path="/Login" element={<Login/>} />
             <Route path="/Terms" element={<Terms/>} />
              
           </Routes>
      
    </div>
    
  );
};

export default App;
