import React, { useState, useEffect } from "react";


const Maps: React.FC = () => {
    return (
      <section className="max-w-[90%] mx-auto mt-[20px] text-center">
        {/* Title */}
        <div className="w-11/12 flex items-center mb-3">
          <h1 className="text-[100px] font-bold">MAPS</h1>
        </div>

        {/* Map Container */}
        <div className="w-full max-w-10xl mx-auto flex justify-center">
          <iframe
            width="100%"
            height="700"
            className="rounded-lg shadow-lg"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?width=100%25&amp;height=300px&amp;hl=en&amp;q=Hacienda%20Darasa%20Garden%20Resort%20&amp;%20Hotel,%203573+QV7,%20Tanauan,%204234%20Batangas+(Hacienda%20Darasa%20Garden%20Resort%20Hotel)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          />
        </div>
        <br />
      </section>
    );
  };
  
  export default Maps;
  
