import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartTotal,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits.
      currency: order.currency,
      name: "Order Payment", //your business name
      description: "Order Payment",
      // image: https://example.com/your_logo,
      order_id: order.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFromData((data) => ({ ...data, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      toast.error("Please fill the delivery form");
      return;
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartTotal() + delivery_fee,
      };

      switch (paymentMethod) {
        case "cod":
          {
            const response = await axios.post(
              backendUrl + "/api/orders/place",
              orderData,
              { headers: { token } },
            );
            if (response.data.success) {
              setCartItems({});
              navigate("/orders");
            } else {
              toast.error(response.data.message);
            }
          }
          break;
        case "stripe":
          {
            const responseStripe = await axios.post(
              backendUrl + "/api/orders/stripe",
              orderData,
              { headers: { token } },
            );
            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }
          }
          break;
        case "razorpay":
          {
            const responseRazorpay = await axios.post(
              backendUrl + "/api/orders/razorpay",
              orderData,
              { headers: { token } },
            );
            if (responseRazorpay.data.success) {
              initPay(responseRazorpay.data.order);
            } else {
              toast.error(responseRazorpay.data.message);
            }
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='max-w-full grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-45'>
        {/* ================= LEFT : DELIVERY INFO ================= */}
        <div className='lg:mr-10'>
          <div className='text-lg flex justify-center sm:justify-start items-center mb-6 md:border-none border-b border-gray-300'>
            <Title text1='DELIVERY' text2=' INFORMATION' />
          </div>

          <form
            id='deliveryForm'
            className='space-y-4'
            onSubmit={handleFormSubmit}>
            {/* Name */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input
                type='text'
                onChange={onChangeHandler}
                name='firstName'
                value={formData.firstName}
                placeholder='First name'
                className='input-field'
                required
              />
              <input
                type='text'
                onChange={onChangeHandler}
                name='lastName'
                value={formData.lastName}
                placeholder='Last name'
                className='input-field'
                required
              />
            </div>

            {/* Email */}
            <input
              type='email'
              onChange={onChangeHandler}
              name='email'
              value={formData.email}
              placeholder='Email address'
              className='input-field'
              required
            />

            {/* Address */}
            <input
              type='text'
              onChange={onChangeHandler}
              name='street'
              value={formData.street}
              placeholder='Street'
              className='input-field'
              required
            />

            {/* City / State */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input
                type='text'
                onChange={onChangeHandler}
                name='city'
                value={formData.city}
                placeholder='City'
                className='input-field'
                required
              />
              <input
                type='text'
                onChange={onChangeHandler}
                name='state'
                value={formData.state}
                placeholder='State'
                className='input-field'
                required
              />
            </div>

            {/* Zip / Country */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <input
                type='text'
                onChange={onChangeHandler}
                name='zipcode'
                value={formData.zipcode}
                placeholder='Zipcode'
                className='input-field'
                required
              />
              <input
                type='text'
                onChange={onChangeHandler}
                name='country'
                value={formData.country}
                placeholder='Country'
                className='input-field'
                required
              />
            </div>

            {/* Phone */}
            <input
              type='text'
              name='phone'
              value={formData.phone}
              placeholder='Phone'
              inputMode='numeric'
              maxLength={10}
              className='input-field'
              onChange={(e) => {
                const cleanedValue = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);
                setFromData((prev) => ({
                  ...prev,
                  phone: cleanedValue,
                }));
              }}
              required
            />
          </form>
        </div>

        {/* ================= RIGHT : CART TOTALS ================= */}
        <div className='w-full max-w-md '>
          {/* Cart Totals */}
          <div className='text-lg flex justify-center sm:justify-start items-center mb-6 md:border-none border-b border-gray-300'>
            <Title text1='CART ' text2=' TOTALS' />
          </div>

          <CartTotal />

          {/* Payment Method */}
          <div className='text-lg flex justify-start items-center my-5 '>
            <Title text1='PAYMENT ' text2=' METHODS' />
          </div>

          <div className='flex flex-col gap-4'>
            {/* Stripe */}
            <label className='flex items-center gap-3 border px-4 py-3 cursor-pointer'>
              <input
                type='radio'
                name='payment'
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
              />
              <img className='h-6' src={assets.stripe_logo} alt='' />
            </label>

            {/* Razorpay */}
            <label className='flex items-center gap-3 border px-4 py-3 cursor-pointer'>
              <input
                type='radio'
                name='payment'
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
              />
              <img className='h-6' src={assets.razorpay_logo} alt='' />
            </label>

            {/* COD */}
            <label className='flex items-center gap-3 border px-4 py-3 cursor-pointer'>
              <input
                type='radio'
                name='payment'
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span className='font-medium flex items-center gap-2'>
                CASH ON DELIVERY
              </span>
            </label>
          </div>

          {/* Place Order */}
          <button
            type='submit'
            form='deliveryForm'
            // onClick={() => navigate("/orders")}
            className='w-full bg-black text-white py-3 mt-10 active:bg-gray-700 transition'>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
