import React from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, description, date }) => {

  const isNew = date
    ? (Date.now() - new Date(date).getTime()) < 7 * 24 * 60 * 60 * 1000
    : false;

  const { currency } = React.useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="cursor-pointer no-underline block w-full max-w-sm border-2 border-black rounded-xl bg-slate-50">

      {/* Image Container */}
      <div className="bg-gray-100 rounded-xl overflow-hidden relative">

        {/* NEW Badge — only for products added in the last 7 days */}
        {isNew && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
            NEW
          </span>
        )}

        {/* Product Image */}
        <img
          src={image[0]}
          alt={name}
          loading="lazy"
          className="w-full h-120% object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Content */}
      <div className="mt-3 p-2">
        <h3 className="text-md font-semibold uppercase tracking-wide">
          {name}
        </h3>

        {/* <p className="text-sm text-gray-600 mt-1 leading-snug line-clamp-2">
          {description}
        </p> */}

        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-semibold">
            {currency}{price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {currency}{price + 31}
          </span>
        </div>
      </div>

    </Link>
  );
};

export default ProductItem;
