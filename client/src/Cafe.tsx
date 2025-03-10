import React from 'react';
import background from "./assets/images/coffee-bg.png"
import iconLogo from "./assets/images/Icon-Logo.png"
import { Button } from 'antd';

const App: React.FC = () => {

 

  return (
    <div className="">
    
    <div className="">
      <img
        src={background}
        
      />
      <div className=" ml-[80%] absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-5 rounded-lg flex flex-col items-center z-10 shadow-lg">
        <img src={iconLogo} alt="Cafe Luntian Logo"/>
        <Button
          type="primary"
          shape="round"
       
          style={{ backgroundColor: '#FF8C00' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E07B00')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF8C00')}
        >
          Go to page →
        </Button>
      </div>

    </div>
    </div>
  );
};

export default App;
