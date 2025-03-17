import React, { useState, useEffect } from "react";

const Photos: React.FC = () => {
    return (
      <section className="max-w-[90%] mx-auto mt-[200px]">
        {/* Title */}
        <div className="ml-20 mb-[15px]">
          <h1 className="text-[100px] font-bold">PHOTOS</h1>
        </div>
  
        {/* Room List */}
        <div className="h-[700px] w-full mx-auto overflow-y-auto border-[2px] border-black border-solid"></div>
      </section>
    );
  };
  
  export default Photos;
  
