import * as React from "react";
import "./styles.css";
import { Routes, Route } from 'react-router-dom';

import Guest from './Routes/Guest'
import Login from '../src/LoginComponent'
import Terms from '../src/Guest/Landingpage/Components/TermsCondition'
// import Cafe from './Cafe'
import Maps from './Maps'
import Cafe from "../src/Guest/Landingpage/Components/Cafe";
import Footer from "../src/Guest/Landingpage/Components/Footer"
const App: React.FC = () => {
  return (
    <div className="h-[8000px]">

           <Routes>
             {/* Student and Advicer */}
             <Route path="/" element={<Guest/>} />
             <Route path="/Login" element={<Login/>} />
             <Route path="/Terms" element={<Terms/>} />
             <Route path="/Cafe" element={<Cafe/>} />
             <Route path="/Maps" element={<Maps/>} />
<<<<<<< Updated upstream
=======
             <Route path="/Footer" element={<Footer/>} />
>>>>>>> Stashed changes
           </Routes>
    </div>
  );
};

export default App;
