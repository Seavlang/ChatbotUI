import React from 'react';
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg px-10 py-8 w-full max-w-md">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-primary mb-6">
          Create an account
        </h2>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Create Account Button */}
        <div className="mb-6">
          <button className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-700">
            Create account
          </button>
        </div>

        {/* Already have an account */}
        <div className="text-center mb-6">
          <span className="text-gray-600">Already have an account? </span>
          <a href="/login" className="text-primary font-bold">
            Sign in
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
