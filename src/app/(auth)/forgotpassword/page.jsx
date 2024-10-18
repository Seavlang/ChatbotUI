'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEnvelope } from "react-icons/fa";

export default function page() {
    const router = useRouter(); // To handle navigation

  const handleContinue = () => {
    router.push("/forgotpassword/verify"); // Redirect to the verification page
  };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white shadow-md rounded-lg px-10 py-8 w-full max-w-md text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-primary mb-4">
              Reset your password
            </h2>
    
            {/* Description */}
            <p className="text-gray-600 text-sm mb-6">
              Enter your Email address and we will send you instructions to reset
              your password.
            </p>
    
            {/* Email Input */}
            <div className="mb-6">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaEnvelope className="text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full outline-none focus:ring-0"
                />
              </div>
            </div>
    
            {/* Continue Button */}
            <div className="mb-6">
              <button
              onClick={handleContinue}
               className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
                Continue
              </button>
            </div>
    
            {/* Already have an account */}
            {/* <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <a href="#" className="text-primary font-bold">
                Sign in
              </a>
            </div> */}
          </div>
        </div>
      );
}
