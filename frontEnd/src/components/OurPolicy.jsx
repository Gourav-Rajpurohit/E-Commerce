import React from 'react';  
import { assets } from '../assets/assets';
const OurPolicy = () => {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* Policy 1 */}
          <div className="flex flex-col items-center gap-4">
            {/* Icon placeholder */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={assets.exchange_icon} alt="" />
            </div>

            <h3 className="text-base font-semibold text-gray-900">
              Easy Exchange Policy
            </h3>

            <p className="text-sm text-gray-500">
              We offer hassle free exchange policy
            </p>
          </div>

          {/* Policy 2 */}
          <div className="flex flex-col items-center gap-4">
            {/* Icon placeholder */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={assets.quality_icon} alt="" />
            </div>

            <h3 className="text-base font-semibold text-gray-900">
              7 Days Return Policy
            </h3>

            <p className="text-sm text-gray-500">
              We provide 7 days free return policy
            </p>
          </div>

          {/* Policy 3 */}
          <div className="flex flex-col items-center gap-4">
            {/* Icon placeholder */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img src={assets.support_img} alt="" />
            </div>

            <h3 className="text-base font-semibold text-gray-900">
              Best customer support
            </h3>

            <p className="text-sm text-gray-500">
              We provide 24/7 customer support
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
