import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'green',
};

const App: React.FC = () => (
  <Carousel autoplay>
    <div>
      <img 
        src="https://img.freepik.com/free-photo/swimming-pool_74190-2104.jpg" 
        alt="Slide 1" 
        style={ contentStyle }
      />
    </div>
    <div>
      <img 
        src="https://via.placeholder.com/800x400" 
        alt="Slide 2" 
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />
    </div>
    <div>
      <img 
        src="https://via.placeholder.com/800x400" 
        alt="Slide 3" 
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />
    </div>
    <div>
      <img 
        src="https://via.placeholder.com/800x400" 
        alt="Slide 4" 
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />
    </div>
  </Carousel>
);

export default App;