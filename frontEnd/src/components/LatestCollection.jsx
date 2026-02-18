import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
function LatestCollection() {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
    // Assuming latest products are the first 10 in the list
  }, [products]);

  return (
    <div className='flex flex-col justify-center items-center mt-20 mb-10'>

      <Title text1="LATEST " text2="COLLECTIONS" />

      {/* rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-10 px-4 max-w-7xl w-full'>
        {latestProducts.map((product, index) => (
          <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} date={product.date} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection