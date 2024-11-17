'use client'
import FileComponentPlayground from '@/app/components/FileComponentPlayground';
import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export default function DefaultFileComponent({ session, messages, files }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever `messages` changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 100); // Delay to ensure DOM is updated

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [messages]);

  return (
    <div className="">
      <div className="flex">
        <div className="ml-5 inline-flex items-center border border-gray-300 rounded-md px-3 py-2 text-md">
          <span className="font-bold text-primary mr-2">Default</span>
          <span className="font-normal text-black">Llama3.1</span>
        </div>
        <div>
          {files?.length > 0 ? (
            <div>
              {files.map((file) => (
                <div key={file?.id} className="ml-5 inline-flex items-center border border-gray-300 rounded-md px-3 py-2 text-md">
                  <li key={file?.id} className="font-medium text-primary mr-2">
                    {file?.file_name}
                  </li>
                </div>
              ))}
            </div>
          ) : (
            <div className="inline-flex items-center border border-gray-300 rounded-md px-3 py-2 text-md">
              <span className="font-medium text-primary mr-2">No document</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex mx-auto w-2/3">
        <div className="flex-grow overflow-y-auto mb-4 space-y-6 p-8 max-h-[550px]">
          {messages?.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message?.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`py-3 rounded-2xl break-words ${message?.role === "user" ? 
                    "bg-[#90A1FE] px-5 max-w-xl text-white" : 
                    ""
                  }`}
                >
                  {message?.content}
                </motion.div>
              </div>
            ))
          ) : (
            <div className="flex flex-row items-center justify-center mt-20">
              <FileComponentPlayground session={session} />
            </div>
          )}
          {/* This div is used as the reference to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}
