import React from "react";

import sampleImage from "../assets/img/bg.jpg"; // Import image

const App: React.FC = () => {
  return (
    <div className="h-[2000px]">
      <div>
        <h1 className="absolute text-[white] text-[124px] mt-[278px] ml-[120px]">Hacienda Darasa</h1>
        <h1 className="absolute text-[white] text-[111px] mt-[411px] ml-[120px]">Resort & Hotel</h1>
        <h1 className="absolute text-[white] text-[30px] mt-[558px] ml-[120px]">Hacienda Darasa Garden Resort & Hotel is a premier destination<br/>
        offering a perfect blend of relaxation and adventure.</h1>
      </div>
      
      <img className="" src={sampleImage} />

    </div>
  );
};

export default App;