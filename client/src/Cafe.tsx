import React, { useState } from 'react';
import background from "./assets/images/coffee-bg.png"
import iconLogo from "./assets/images/Icon-Logo.png"
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio } from 'antd';

import type { ConfigProviderProps } from 'antd';


type SizeType = ConfigProviderProps['componentSize'];

const App: React.FC = () => {

  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'

  return (

    
 <div className="relative w-full h-full">

  <img
    src={background}
    className="h-full w-full object-cover"
    alt="Background"
  />
  <div className=" ml-[80%] absolute right-5 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-5 rounded-lg flex flex-col items-center z-10 shadow-lg">
    <img src={iconLogo} alt="Cafe Luntian Logo" className=" mt-[-230px]" />
    <Button
      type="primary"
      shape="round"
      size={size}
      style={{ backgroundColor: '#FF8C00' }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E07B00')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF8C00')}
    >
      Go to page →
    </Button>
  </div>
      

      {/* Footer Section
      <footer className="w-full bg-gray-800 text-white py-5 px-12 flex justify-center relative">
        <img src="left-icon.png" alt="Left Icon" className="absolute bottom-2 left-2 w-[50px] h-[50px]" />
        
        <div className="w-full max-w-[1200px] flex justify-between">
          <div className="flex-1 mx-2">
            <h3 className="mb-2">Social Media Links</h3>
            <p>Darasa Tanauan</p>
            <p><a href="#" className="text-orange-500">www.fbsample.com</a></p>
            <p><a href="#" className="text-orange-500">www.instagramsample.com</a></p>
          </div>
          
          <div className="flex-1 mx-2">
            <h3 className="mb-2">Contacts</h3>
            <p>📞 0912-5932-523</p>
            <p>📧 haciendarasa@gmail.com</p>
          </div>
          
          <div className="flex-1 mx-2">
            <h3 className="mb-2">About</h3>
            <p>📞 0912-5932-523</p>
            <p>📧 haciendarasa@gmail.com</p>
          </div>
        </div>

        <img src="right-icon.png" alt="Right Icon" className="absolute bottom-2 right-2 w-[50px] h-[50px]" />
      </footer> */}
    </div>
  );
};

export default App;
