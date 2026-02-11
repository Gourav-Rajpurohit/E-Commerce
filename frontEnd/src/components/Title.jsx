import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-2 mb-4 text-2xl md:text-3xl">
      <p className='text-gray-500'>{text1}<span className="text-black font-medium">{text2}</span></p>
      <p className='bg-black w-8 sm:w-12 h-px sm:h-0.5'></p>

    </div>
  )
}

export default Title