import React from "react";
import "../styles.css";
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../Landingpage/LandingPage'
const App: React.FC = () => {
  return (
    <div className="">
    
    <Routes>
                <Route path="/" element={<LandingPage/>} />
              </Routes>
    
    </div>
    
  );
};

export default App;
