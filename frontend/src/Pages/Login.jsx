import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [method, setMethod] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleGenerateOTP = () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    setGeneratedOTP(otp);
    setOtpSent(true);
    alert(`OTP sent to your email: ${otp}`); // In real use, send to email server
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (method === 'email') {
      if (email && password) {
        setLoginMessage('Logged in with Email/Password!');
      } else {
        alert('Please fill all fields');
      }
    } else {
      if (otpSent && enteredOTP === generatedOTP) {
        setLoginMessage('Logged in with Email + OTP!');
      } else {
        alert('Invalid or missing OTP');
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 min-h-[85vh]">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => {
              setMethod('email');
              setOtpSent(false);
              setLoginMessage('');
            }}
            className={`px-4 py-2 rounded-l-full ${method === 'email' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'}`}
          >
            Email Login
          </button>
          <button
            onClick={() => {
              setMethod('otp');
              setLoginMessage('');
            }}
            className={`px-4 py-2 rounded-r-full ${method === 'otp' ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-600'}`}
          >
            OTP Login
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {method === 'email' ? (
            <>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!otpSent ? (
                <button
                  type="button"
                  className="w-full bg-yellow-400 py-2 rounded-md font-semibold"
                  onClick={handleGenerateOTP}
                >
                  Send OTP
                </button>
              ) : (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 border rounded-md"
                  value={enteredOTP}
                  onChange={(e) => setEnteredOTP(e.target.value)}
                />
              )}
            </>
          )}

          <button type="submit" className="w-full bg-black text-white py-2 rounded-md font-semibold">
            Login
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
          <Link to="/register" className="hover:underline">Register Now</Link>
        </div>

        {loginMessage && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 text-center rounded">
            {loginMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
