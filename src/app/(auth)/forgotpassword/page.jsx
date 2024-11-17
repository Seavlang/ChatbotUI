'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import { resendVerificationCodeAction } from "@/actions/authAction"; // Import resend action

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setError("Please enter your email address.");
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      setIsLoading(true);

      try {
        // Call resend verification code action
        const res = await resendVerificationCodeAction({ email });
        
        if (res?.success) {
          // toast.success("Verification code sent successfully!");
          router.push(`/forgotpassword/verify`);
        } else {
          toast.error("Invalid Email. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-10 py-8 w-full max-w-md text-center">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-primary dark:text-blue-400 mb-4">
        Reset your password
      </h2>
  
      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Enter your Email address and we will send you instructions to reset
        your password.
      </p>
  
      {/* Email Input */}
      <div className="mb-6">
        <div className="flex items-center border rounded-lg px-3 py-2 border-gray-300 dark:border-gray-600">
          <FaEnvelope className="text-gray-500 dark:text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full outline-none focus:ring-0 bg-transparent text-gray-900 dark:text-white dark:placeholder-gray-400"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
  
      {/* Continue Button */}
      <div className="mb-6">
        <button
          onClick={handleContinue}
          className="w-full bg-primary dark:bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  </div>
  
  );
}
