import React from "react";

import sampleImage from "../../../assets/images/main-page.jpg"; // Import image

const Hero: React.FC = () => {
  return (
    <div className="h-[900px]">
      <div>
        <h1 className="absolute text-[white] text-[124px] mt-[278px] ml-[120px]">Hacienda Darasa</h1>
        <h1 className="absolute text-[white] text-[111px] mt-[411px] ml-[120px]">Resort & Hotel</h1>
        <h1 className="absolute text-[white] text-[30px] mt-[558px] ml-[120px]">Hacienda Darasa Garden Resort & Hotel is a premier destination<br/>
        offering a perfect blend of relaxation and adventure.</h1>
      </div>
      
      <img className="w-full h-[100%] object-cover" src={sampleImage} alt="Hacienda Darasa" />

    </div>
  );
};

export default Hero;