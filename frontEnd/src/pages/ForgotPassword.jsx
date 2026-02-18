import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { useLocation } from 'react-router-dom';

const ForgotPassword = () => {
    const { navigate, backendUrl } = useContext(ShopContext);
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(backendUrl + '/api/user/send-otp', { email });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(2);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(backendUrl + '/api/user/verify-otp', { email, otp });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(3);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(backendUrl + '/api/user/reset-password', { email, otp, newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-[70vh] flex items-center justify-center px-4'>
            <div className='w-full max-w-md'>
                <div className='text-3xl text-center mb-8'>
                    <Title text1={'FORGOT'} text2={' PASSWORD'} />
                </div>

                {step === 1 && (
                    <form onSubmit={handleSendOTP} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-600 text-sm'>Enter your email address to receive an OTP.</p>
                            <input
                                required
                                type="email"
                                placeholder="Email Address"
                                className='w-full border border-gray-400 px-4 py-2 outline-none focus:border-black'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading} className='bg-black text-white px-8 py-2 mt-4 hover:bg-gray-800 transition disabled:bg-gray-400'>
                            {loading ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-600 text-sm'>Enter the 6-digit OTP sent to {email}.</p>
                            <input
                                required
                                type="text"
                                placeholder="Enter OTP"
                                className='w-full border border-gray-400 px-4 py-2 outline-none focus:border-black'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading} className='bg-black text-white px-8 py-2 mt-4 hover:bg-gray-800 transition disabled:bg-gray-400'>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                        <button type="button" onClick={() => setStep(1)} className='text-sm text-gray-500 hover:text-black hover:underline cursor-pointer'>
                            Change Email
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleResetPassword} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-600 text-sm'>Create a new password.</p>
                            <input
                                required
                                type="password"
                                placeholder="New Password"
                                className='w-full border border-gray-400 px-4 py-2 outline-none focus:border-black'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <input
                                required
                                type="password"
                                placeholder="Confirm Password"
                                className='w-full border border-gray-400 px-4 py-2 outline-none focus:border-black'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading} className='bg-black text-white px-8 py-2 mt-4 hover:bg-gray-800 transition disabled:bg-gray-400'>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
