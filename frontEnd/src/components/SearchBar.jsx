import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
const SearchBar = () => {

const [visible, setVisible] = useState(false);
const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
const location = useLocation();

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    location.pathname.includes("/collections") && showSearch ? setVisible(true) : setVisible(false);
    // location.pathname === "/collections" ? setVisible(true) : setVisible(false);
},[location, showSearch]);

    return showSearch && visible ? (
    <div className="max-w-6xl mx-auto px-4">
        
    <div className="flex justify-center-safe items-center">

        <div className="grid grid-cols-[auto_20px_20px] gap-2">

        {/* Search Input */}
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
                type="text"
                placeholder="Search"
                className="
                  w-60 sm:w-80 md:w-100 h-10
                  rounded-full
                  border border-gray-300
                  bg-white
                  pl-12 pr-12
                  text-sm text-gray-700
                  placeholder-gray-400
                  focus:outline-none focus:border-black
                "
            />

              {/* Search Icon (Left) */}
          <img src={assets.search_icon} alt="" className='relative top-3 right-10 w-4 cursor-pointer'/>          
          
          {/* Close Icon (Right) */}
          <button
            onClick={() => setShowSearch(false)}
            type="button"
            className="relative right-5 text-gray-400 hover:text-black"
          >
            ✕
          </button>

          

        </div>
      </div>
    
    </div>
  ) : null;
}

export default SearchBar