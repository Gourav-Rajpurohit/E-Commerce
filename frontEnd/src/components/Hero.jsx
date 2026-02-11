import React from 'react'
import { assets } from '../assets/assets';
function Hero() {
    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* Hero section left half*/}
            <div className='w-full sm:1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
                        <p className='text-sm md:text-base font-medium'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='libre-bodoni text-3xl sm:py-3 lg:text-5xl leading-relaxed '>Latest Aarrivals</h1>
                    <div className="flex items-center gap-2">
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
                    </div>
                </div>
            </div>
            {/* Hero section right half*/}
            <div className='w-full sm:1/2'>
                <img src={assets.hero_img} fetchPriority="high" alt="Hero" className='w-full h-full ' />
            </div>

        </div>
    )
}

export default Hero