import React from 'react'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Contact = () => {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Title */}
        <div className="flex items-center justify-center text-xl tracking-wide gap-4 mb-14">
          <Title text1="CONTACT " text2="US" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image Placeholder */}
          <div className="w-full h-80 md:h-105 bg-gray-100">
            {/* Add image here */}
            <img src={assets.contact_img} className="w-full h-full object-cover" />
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Our Store
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Tel: (415) 555-0132 <br />
              Email: admin@ravn.com
            </p>

            <h3 className="text-lg font-semibold mb-2">
              Careers at RAVN
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Learn more about our teams and job openings.
            </p>

            <button className="px-6 py-3 border border-black text-sm font-medium hover:bg-black hover:text-white transition">
              Explore Jobs
            </button>
          </div>

        </div>
      </div>
      <div className="py-6 mt-4">
        <NewsletterBox />
      </div>
    </section>
  );
};



export default Contact