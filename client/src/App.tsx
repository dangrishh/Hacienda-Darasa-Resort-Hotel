import React from "react";
import "./styles.css";
import { Routes, Route } from 'react-router-dom';

import Guest from './Routes/Guest'
import Login from '../src/LoginComponent'
const App: React.FC = () => {
  return (
    <div className="">

           
           <Routes>
   
             {/* Student and Advicer */}
             <Route path="/" element={<Guest/>} />
             <Route path="/Login" element={<Login/>} />
   
           </Routes>
      
    </div>
    
  );
};

export default App;
