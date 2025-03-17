import * as React from "react";
import { Routes, Route } from 'react-router-dom';

import LandingPage from '../Guest/Landingpage/LandingPage'
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
