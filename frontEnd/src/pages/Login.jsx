import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {

  const { navigate, token, setToken, backendUrl } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const formSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/login', { email, password });
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
    // Handle Google OAuth redirect
    const queryParams = new URLSearchParams(window.location.search);
    const oauthToken = queryParams.get('token');
    if (oauthToken) {
      setToken(oauthToken);
      localStorage.setItem('token', oauthToken);
      navigate('/', { replace: true });
    }
  }, [navigate, setToken]);

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate])

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">

        {/* Heading */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-3xl inline-flex items-center gap-2 mb-4">
            <p className='prata-regular text-gray-500'>Sign <span className="prata-regular text-gray-700 font-medium">in</span></p>
            <p className='bg-gray-700 w-8 sm:w-12 h-[2px]'></p>
          </div>
        </div>

        {/* Form */}
        <form id="signIn" className="space-y-4" onSubmit={formSubmitHandler}>
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
            <button type="button" className="cursor-pointer hover:underline">
              Forgot your password?
            </button>
            <button onClick={() => navigate("/signup")} type="button" className="hover:underline cursor-pointer">
              Create account
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-6 bg-black text-white px-10 py-2 text-sm hover:bg-gray-900 transition w-full"
          >
            Sign In
          </button>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <button
            type="button"
            onClick={() => window.location.href = backendUrl + '/api/user/auth/google'}
            className="w-full flex items-center justify-center gap-2 border border-gray-800 text-gray-800 font-medium rounded-md py-2 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
