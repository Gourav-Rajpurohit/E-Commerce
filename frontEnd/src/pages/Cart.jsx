import React from 'react';
import Title from '../components/Title.jsx';
import { ShopContext } from '../context/ShopContext.jsx';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal.jsx';
import { toast } from 'react-toastify';
const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, token } = React.useContext(ShopContext);
  const [cartData, setCartData] = React.useState([]);

  React.useEffect(() => {
    if (products.length > 0) {

      const data = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            data.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(data);
    }
  }, [cartItems, products]);

  const checkToken = () => {
    if (!token) {
      toast.error("You Must Login First")
    } else {
      Object.keys(cartData).length === 0 ? toast.error("Your Cart Is Empty ") : navigate('/place-order')
    }

  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">

        {/* LEFT: Cart Section */}
        <div>
          {/* Heading */}
          <div className="text-lg md:text-xl mb-8">
            <Title text1="YOUR " text2="CART" />
          </div>

          {/* Cart items will come here */}
          <div className="min-h-75">
            <div>
              {cartData.map((item, index) => {
                const product = products.find((prod) => prod._id === item._id);
                return (
                  <div key={index} className="border-b border-t py-6 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] item-center gap-5">
                    <div className='flex gap-6 items-center'>
                      <img src={product.image[0]} alt="" loading="lazy" className="w-16 sm:w-20 object-cover rounded-sm" />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className='flex item-center gap-5 mt-2'>
                          <p className="text-sm text-gray-700 m-1">Price:<span className="font-medium"> {currency}{product.price} </span></p>
                          <p className="text-sm text-gray-500 m-1">Size: {item.size}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <input
                        className="border border-gray-300 max-w-15 max-h-5 px-2 py-1 focus:outline-none items-end"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => e.target.value === null || e.target.value === "" || e.target.value === undefined || e.target.value === "0" ? null : updateQuantity(item._id, item.size, parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <img src={assets.bin_icon} alt="" className="w-4 sm:w-5 h-5 cursor-pointer" onClick={() => updateQuantity(item._id, item.size, 0)} />
                    </div>
                  </div>
                );
              })
              }
            </div>
          </div>
        </div>

        {/* RIGHT: Cart Totals */}
        <div className="w-full max-w-sm ml-auto">
          <div className="text-lg lg:text-xl mb-8">
            <Title text1="CART " text2="TOTALS" />
          </div>
          {/* Totals Box */}
          <CartTotal />
          {/* Button */}
          <button onClick={() => checkToken()} className="mt-10 w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-900 transition">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};



export default Cart;