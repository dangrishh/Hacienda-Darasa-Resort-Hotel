import React, { useState } from 'react';

const App: React.FC = () => {

  return (
<div className="flex items-center justify-center flex-col w-full mt-10">
  {/* Title on the left */}
  <div className="w-11/12 flex items-center mb-3">
    <h1 className="text-[100px] font-bold">Maps</h1>
  </div>



  {/* Google Maps Embed */}
  <div className="w-11/12 flex justify-center">
    <iframe
      width="90%"
      height="700"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src="https://maps.google.com/maps?width=100%25&amp;height=300px&amp;hl=en&amp;q=Hacienda%20Darasa%20Garden%20Resort%20&amp;%20Hotel,%203573+QV7,%20Tanauan,%204234%20Batangas+(Hacienda%20Darasa%20Garden%20Resort%20Hotel)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
    />
  </div>
</div>

  );
};


export default App;
