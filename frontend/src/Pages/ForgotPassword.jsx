import React, { useState } from 'react';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    alert(`Your OTP is: ${otp}`); // simulate sending via email
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (formData.otp === generatedOtp) {
      setStep(2);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Submit new password logic here
    console.log("New password set for:", formData.email);
    alert("Password updated successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-yellow-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h2>

        {step === 1 ? (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              disabled={otpSent}
            />
            {otpSent && (
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                maxLength={6}
                className="w-full px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            )}
            {!otpSent ? (
              <button
                type="button"
                onClick={generateOtp}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Verify OTP
              </button>
            )}
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-1.5 sm:py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
