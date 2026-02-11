import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token])

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-3xl inline-flex items-center gap-2 mb-4">
            <p className='prata-regular text-gray-500'>Sign<span className="prata-regular text-gray-700 font-medium"> Up</span></p>
            <p className='bg-gray-700 w-8 sm:w-12 h-[2px]'></p>
          </div>
        </div>

        {/* Form */}
        <form id='signUp' onSubmit={formSubmitHandler} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Name"
            className="w-full border border-gray-400 px-4 py-2 outline-none focus:border-black"
            onChange={(e) => setName(e.target.value)} value={name}
          />

          <input
            required
            type="email"
            placeholder="Email"
            className="w-full border border-gray-400 px-4 py-2 outline-none focus:border-black"
            onChange={(e) => setEmail(e.target.value)} value={email}
          />

          <input
            required
            type="password"
            placeholder="Password"
            className="w-full border border-gray-400 px-4 py-2 outline-none focus:border-black"
            onChange={(e) => setPassword(e.target.value)} value={password}
          />

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-700">
            <button onClick={() => navigate("/login")} type="button" className="cursor-pointer hover:underline">
              Sign in
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-6 bg-black text-white px-10 py-2 text-sm hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
