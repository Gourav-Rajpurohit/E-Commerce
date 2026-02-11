import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartTotal } = useContext(ShopContext);

  return (
    <div>

        {/* Totals Box */}
        <div className="space-y-4 text-sm">
            
            <div className="flex justify-between border-b pb-3">
                <p>Subtotal</p>
                <p className='font-semibold'>{currency}{getCartTotal()}.00</p>
            </div>

            <div className="flex justify-between border-b pb-3">
                <p>Shipping Fee</p>
                <p className='font-semibold'>{currency}{delivery_fee}.00</p>
            </div>

            <div className="flex justify-between font-semibold pt-2">
                <p>Total</p>
                <p>{currency}{ getCartTotal() == 0 ? 0 : getCartTotal() + delivery_fee}.00</p>
            </div>
        </div>

    </div>
  )
}

export default CartTotal