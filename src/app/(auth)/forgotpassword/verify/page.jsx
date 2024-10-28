'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaLock } from "react-icons/fa";

export default function page() {
    const router = useRouter(); // To handle navigation

    const handleVerify = () => {
      router.push("/forgotpassword/verify/setpassword"); // Redirect to the Set Password page
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white shadow-md rounded-lg px-10 py-8 w-full max-w-md text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Code Verification
            </h2>
    
            {/* Description */}
            <p className="text-gray-600 mb-6">
              An authentication code has been sent to your email.
            </p>
    
            {/* Code Input */}
            <div className="mb-4">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Code"
                  className="w-full outline-none focus:ring-0"
                />
              </div>
            </div>
    
            {/* Back to Login */}
            <div className="mb-4 text-sm">
              <a href="/login" className="text-primary font-bold">
                Back to Login
              </a>
            </div>
    
            {/* Verify Button */}
            <div className="mb-4">
              <button
            onClick={handleVerify}
              className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
                Verify
              </button>
            </div>
    
            {/* Resend Code */}
            <div>
              <p className="text-gray-600 text-sm">
                Didn’t receive a code?{" "}
                <a href="#" className="text-blue-500 font-bold">
                  Resend
                </a>
              </p>
            </div>
          </div>
        </div>
      );
}
