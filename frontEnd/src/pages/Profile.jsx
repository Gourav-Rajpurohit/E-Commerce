import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';

const Profile = () => {

  const { token, setToken, navigate, userData } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  }

  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center py-10 bg-gray-50/30'>
      <div className='w-full max-w-2xl px-4'>
        <div className='text-3xl mb-8 text-center tracking-wide'>
          <Title text1={'MY'} text2={' PROFILE'} />
        </div>

        <div className='bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden'>
          <div className='p-8 sm:p-12 flex flex-col items-center gap-6'>

            {/* Profile Icon with premium look */}
            <div className='relative group'>
              <div className='w-32 h-32 rounded-full border-4 border-gray-900 overflow-hidden shadow-md p-1'>
                <div className='w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden'>
                  <img src={assets.profile_icon2} className='w-full h-full object-cover' alt="Profile" />
                </div>
              </div>
            </div>

            <div className='text-center space-y-2'>
              <h2 className='text-3xl font-semibold text-gray-900 uppercase tracking-wide'>
                {userData ? userData.name : 'Loading...'}
              </h2>
              <p className='text-gray-500 font-medium text-lg'>
                {userData ? userData.email : 'user@example.com'}
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full mt-8 max-w-lg'>
              <button
                onClick={() => navigate('/orders')}
                className='flex-1 py-3.5 px-6 border bg-white border-gray-300 text-gray-800 text-sm font-semibold rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md tracking-wider uppercase'
              >
                My Orders
              </button>

              <button
                onClick={logout}
                className='flex-1 py-3.5 px-6 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl tracking-wider uppercase'
              >
                Logout
              </button>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 w-full mt-4 max-w-lg'>
              <button
                onClick={() => navigate('/forgot-password', { state: { email: userData.email } })}
                className='flex-1 py-3.5 px-6 border bg-white border-gray-300 text-gray-800 text-sm font-semibold rounded-lg hover:border-black hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md tracking-wider uppercase'
              >
                Reset Password
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile