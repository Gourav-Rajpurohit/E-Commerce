import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
function BestSeller() {

  const { products } = useContext(ShopContext);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    const latest = products.filter((Product) => Product.bestseller); // Assuming latest products are the first 10 in the list
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBestSellerProducts(latest.slice(0, 4));
  }, [products]);

  return (
    <div className='flex flex-col justify-center items-center mt-20 mb-10'>

      <Title text1="BEST " text2="SELLERS" />

      {/* rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-10 px-4 max-w-7xl w-full'>
        {bestSellerProducts.map((product, index) => (
          <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} date={product.date} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller