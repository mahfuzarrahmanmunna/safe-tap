// components/EmailVerification.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaEnvelope, FaCheckCircle, FaTimesCircle, FaQrcode } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import axios from 'axios';

const EmailVerification = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const [qrCode, setQrCode] = useState('');

    useEffect(() => {
        const email = searchParams.get('email');
        const token = searchParams.get('token');

        if (!email || !token) {
            setStatus('error');
            setMessage('Invalid verification link. Missing email or token.');
            return;
        }

        const verifyEmail = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/auth/verify-email/', {
                    email,
                    token
                });

                // Store tokens in localStorage
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                setStatus('success');
                setMessage('Your email has been verified successfully!');
                setQrCode(response.data.qr_code || '');

                // Redirect to dashboard after 5 seconds
                setTimeout(() => {
                    router.push('/dashboard');
                }, 5000);
            } catch (error) {
                setStatus('error');
                setMessage(
                    error.response?.data?.error || 
                    'Failed to verify email. The link may have expired or is invalid.'
                );
            }
        };

        verifyEmail();
    }, [searchParams, router]);

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
            <div className={`max-w-md w-full rounded-2xl shadow-xl p-8 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="text-center">
                    {status === 'loading' && (
                        <>
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Verifying Your Email</h2>
                            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Please wait while we verify your email address...</p>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Email Verified!</h2>
                            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'} mb-4`}>{message}</p>
                            
                            {qrCode ? (
                                <div className="mt-4">
                                    <p className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Your Service QR Code:</p>
                                    <div className="bg-white p-3 rounded-lg inline-block">
                                        <img 
                                            src={`data:image/png;base64,${qrCode}`} 
                                            alt="Service QR Code" 
                                            className="w-32 h-32"
                                        />
                                    </div>
                                    <p className={`text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                                        Save this QR code for future service requests
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <FaQrcode className={`text-4xl mx-auto mb-2 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
                                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                                        Your QR code will be available in your profile
                                    </p>
                                </div>
                            )}
                            
                            <p className={`text-xs mt-4 ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                                You will be redirected to your dashboard in 5 seconds...
                            </p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-4" />
                            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>Verification Failed</h2>
                            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'} mb-4`}>{message}</p>
                            <button 
                                onClick={() => router.push('/login')}
                                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Back to Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;