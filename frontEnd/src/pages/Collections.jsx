import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import angleDown from "../assets/angle-down.svg";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collections = () => {
  const { products, showSearch, search } = useContext(ShopContext); // keep if you plan to use later
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  // const [showSearch, search] = useState([]);
  const [sortOption, setSortOption] = useState("Relevant");

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value) // remove
        : [...prev, value] // add
    );
  };

  const handleSubCategoryChange = (e) => {
    const value = e.target.value;

    setSelectedSubCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = React.useMemo(() => {
    let result = [...products];

    // CATEGORY FILTER
    if (showSearch && search) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    };

    // CATEGORY FILTER
    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // SUBCATEGORY FILTER
    if (selectedSubCategories.length > 0) {
      result = result.filter(product =>
        selectedSubCategories.includes(product.subCategory)
      );
    }

    // SORTING
    if (sortOption === "LowToHigh") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "HighToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategories, selectedSubCategories, showSearch, search, sortOption]);






  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] md:grid-cols-[1fr_3fr] gap-2" >
      {/* Filter Section */}
      <div className="relative top-2 flex flex-col items-start w-50 md:h-100 ">


        {/* Filter Header */}
        <div onClick={() => setShowFilter(!showFilter)}
          className="cursor-pointer w-25" >
          {/* Heading */}
          <div className="flex items-center gap-1 m-1">
            <h2 className="text-md md:text-lg font-semibold border-b-2 ">FILTERS</h2>
            {/* Toggle button (mobile only) */}
            <img
              className={`sm:hidden w-6 h-6 transition-transform duration-300 cursor-pointer ${showFilter ? "rotate-180" : ""
                }`}
              src={angleDown}
              alt=""
            />
          </div>
        </div>
        {/* Filter Body */}
        <div className={`${showFilter ? "block" : "hidden"} sm:block  mb-4`}>
          {/* Categories */}
          <div className="border border-gray-300 w-50 p-4 mb-6">
            <h3 className="text-sm font-semibold mb-4">CATEGORIES</h3>

            <div className="space-y-3 text-sm text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="Men" className="accent-black" onChange={handleCategoryChange} />
                Men
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="Women" className="accent-black" onChange={handleCategoryChange} />
                Women
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value="Kids" className="accent-black" onChange={handleCategoryChange} />
                Kids
              </label>
            </div>
          </div>

          {/* Type */}
          <div className="border border-gray-300 w-50 p-4">
            <h3 className="text-sm font-semibold mb-4">TYPE</h3>

            <div className="space-y-3 text-sm text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value={"Topwear"} className="accent-black" onChange={handleSubCategoryChange} />
                Topwear
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value={"Bottomwear"} className="accent-black" onChange={handleSubCategoryChange} />
                Bottomwear
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" value={"Winterwear"} className="accent-black" onChange={handleSubCategoryChange} />
                Winterwear
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* Product Section */}
      <div>
        <div className="flex justify-between items-center text-md md:text-lg sm:my-3 sm:text-xl">
          <Title text1={"ALL "} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select onChange={(e) => setSortOption(e.target.value)} className="border border-gray-300  px-2 h-1/5 text-sm sm:text-base">
            <option value="Relevant">Relevant</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>
        </div>
        {/* Products Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-10 px-4 max-w-7xl w-full'>
          {filteredProducts.map((product, index) => (
            <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} date={product.date} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Collections;
