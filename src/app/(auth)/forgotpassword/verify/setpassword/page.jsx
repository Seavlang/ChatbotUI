import React from 'react';
import { FaLock } from "react-icons/fa";

export default function page() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          <div className="bg-white shadow-md rounded-lg px-10 py-8 w-full max-w-md text-center">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-primary mb-4">Set a password</h2>
    
            {/* Description */}
            <p className="text-gray-600 mb-6 text-sm">
              Your previous password has been reset. Please set a new password for your account.
            </p>
    
            {/* Password Input */}
            <div className="mb-4">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Create Password"
                  className="w-full outline-none focus:ring-0"
                />
              </div>
            </div>
    
            {/* Confirm Password Input */}
            <div className="mb-6">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <FaLock className="text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  className="w-full outline-none focus:ring-0"
                />
              </div>
            </div>
    
            {/* Back to Login */}
            <div className="mb-4">
              <a href="/login" className="text-red-500 text-sm font-bold">
                Back to Login
              </a>
            </div>
    
            {/* Set Password Button */}
            <div>
              <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
              <a href="/login">
                Set Password
              </a>
              </button>
            </div>
          </div>
        </div>
      );
}
