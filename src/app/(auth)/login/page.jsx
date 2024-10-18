import React from 'react';
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-10 py-8 w-full max-w-md">
  

        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Hey, there!
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="text-right mt-1">
            <a href="/forgotpassword" className="text-sm text-gray-500">
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Login Button */}
        <div className="mb-6">
          <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
            <a href="/docs/allApps">Login</a>
          </button>
        </div>

        {/* Sign up Section */}
        <div className="text-center mb-4">
          <span className="text-gray-600">Create New Account? </span>
          <a href="/register" className="text-blue-500 font-bold">
            Sign up
          </a>
        </div>

        {/* Or Divider */}
        <div className="flex items-center mb-6">
          <div className="border-t flex-grow border-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="border-t flex-grow border-gray-300"></div>
        </div>

        {/* Google Login */}
        <div className="mb-4">
          <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center">
            <FaGoogle className="mr-2" />
            Google
          </button>
        </div>

        {/* GitHub Login */}
        <div>
          <button className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center">
            <FaGithub className="mr-2" />
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
