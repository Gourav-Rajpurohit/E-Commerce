import React from 'react'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets';
import Title from '../components/Title'
const About = () => {
  return (
    <section className="w-full py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section Title */}
        <div className="flex justify-around text-2xl mb-8">
          <Title text1="ABOUT " text2=" US" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Image Placeholder */}
          <div className="w-full h-90 md:h-120 bg-gray-100">
            {/* Insert image here */}
            <img src={assets.about_img} className="w-full h-full object-cover" />
          </div>

          {/* Text Content */}
          <div className="space-y-6 text-sm text-gray-600 leading-relaxed">

            <p>
              RAVN was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with
              a simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>

            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>

            <h3 className="text-base font-semibold text-gray-800 pt-2">
              Our Mission
            </h3>

            <p>
              Our mission at RAVN is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>

          </div>

        </div>
      </div>
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-4">

          {/* Section Title */}
          <div className="text-xl mb-8">
            <Title text1="WHY " text2="CHOOSE US" />
          </div>

          {/* Cards Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">

            {/* Card 1 */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
              <h3 className="text-sm font-semibold mb-4">
                Quality Assurance:
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We meticulously select and vet each product to ensure it meets our
                stringent quality standards.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-200">
              <h3 className="text-sm font-semibold mb-4">
                Convenience:
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                With our user-friendly interface and hassle-free ordering process,
                shopping has never been easier.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-8">
              <h3 className="text-sm font-semibold mb-4">
                Exceptional Customer Service:
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our team of dedicated professionals is here to assist you the way,
                ensuring your satisfaction is our top priority.
              </p>
            </div>

          </div>
        </div>
      </section>
      <div>
        <NewsletterBox />
      </div>
    </section>
  )
}

export default About