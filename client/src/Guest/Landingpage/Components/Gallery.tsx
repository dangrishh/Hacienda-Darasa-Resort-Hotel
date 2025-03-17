import React from "react";
import mainPageImage from "../../../assets/images/main-page.jpg";
import cottageImage from "../../../assets/images/resort.jpg";
import poolImage from "../../../assets/images/main-page.jpg";


const FamilyResortSection: React.FC = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row items-start justify-start bg-white max-w-[95%] ml-auto ">
        {/* Text Section */}
        <div className="lg">
          <div className="text-left mb-8 lg:mb-0 ml-[1200px] mt-[200px] text-[35px]">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">

              Best Place for <span className="text-black">your Family</span>
            </h2>
            <p className="text-gray-700 text-lg">
              The combination of stunning surroundings, <br/>
              comfortable accommodations, excellent <br/>
              service, and enjoyable amenities made our <br/>
              stay truly memorable. I look forward to <br/>
              visiting again in the future. <br/>
            </p>
          </div>
        </div>
      </section>

      <section className="px-8 py-12 bg-white max-w-[95%] ml-auto mt-[200px]">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <div className="grid grid-cols-2 gap-6">
            <img 
              src={mainPageImage} 
              alt="Resort Pool" 
              className="w-[864px] h-486 shadow-lg col-span-2 object-cover"
              style={{ borderRadius: "24px", marginBottom: "30px" }} 
            />
            
            <img 
              src={cottageImage} 
              alt="Cottage" 
              className="w-[417px] h-258 shadow-lg object-cover"
              style={{ borderRadius: "20px", marginRight: "16px" }} 
            />
            
            <img 
              src={poolImage} 
              alt="Small Pool" 
              className="w-[518px] h-322 shadow-lg object-cover ml-[-80px]"
              style={{ borderRadius: "20px", marginLeft: "-460px" }} 
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FamilyResortSection;
