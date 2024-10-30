"use client";
import React, { useState, useEffect, useRef } from "react";
import NavbarComponent from "../components/NavbarComponent";
import FileComponent from "@/app/components/FileComponent";
import { PlaceHolderComponent } from "@/app/components/PlaceHolderComponent";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Page() {
  const [activeChat, setActiveChat] = useState(0); // Track active chat index
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store uploaded files
  const modalRef = useRef(null); // Ref for modal

  const chatItems = [
    { id: 0, title: "Tag Research" },
    { id: 1, title: "SakanaAI" },
    { id: 2, title: "Text2SQL" },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Automatically focus on modal when it opens
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  // Callback to handle uploaded files
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  return (
    <div className="h-[100vh] overflow-hidden">
      {/* Navbar Section */}
      <div className="bg-white mx-40">
        <NavbarComponent />
      </div>
      <hr />

      {/* Main Section */}
      <div className="grid grid-cols-10 min-h-screen">
        {/* Sidebar Section */}
        <div className="col-span-2 border-r-2 p-10">
          <div className="h-screen ">
            <div className="h-[58%]">
              <div className="flex justify-between">
                <div>
                  {/* New Chat Button */}
                  <button className="flex items-center mb-10 px-5 py-2 text-primary bg-blue-100 rounded-md">
                    <Image
                      src={"/asset/images/add.png"}
                      width={24}
                      height={24}
                    />

                    <span onClick={()=> signOut({callbackUrl : "/login"})} className="text-lg ms-3 opacity-70 font-semibold">
                      New Chat
                    </span>
                  </button>
                </div>
                <div>
                  {/* Leave Icon */}
                  <Image
                    src={"/asset/images/leave.png"}
                    width={45}
                    height={45}
                  />
                </div>
                
              </div>

              {/* Chat Items (Active/Inactive) */}
              {chatItems.map((chat, index) => (
                <div
                  key={chat.id}
                  className={`flex justify-between items-center w-full px-3 py-2 rounded-md mb-2 cursor-pointer ${
                    activeChat === index
                      ? "bg-blue-100 text-primary"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveChat(index)} // Set active chat when clicked
                >
                  <div className="flex items-center">
                    {/* Use different icons based on active/inactive state */}
                    <Image
                      src={
                        activeChat === index
                          ? "/asset/images/tag.png"
                          : "/asset/images/tagnotactive.png"
                      }
                      width={24}
                      height={24}
                      alt="Tag Icon"
                    />
                    <span
                      className={`text-md ms-3 font-medium ${
                        activeChat === index ? "text-primary" : ""
                      }`}
                    >
                      {chat.title}
                    </span>
                  </div>
                  {/* Only show dots for the active chat */}
                  {activeChat === index && (
                    <div className="text-primary">
                      <Image
                        src={"/asset/images/opt.png"}
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Discover Block with Modal Trigger */}
            <div className=" h-[25%]">
              <div
                className="px-10 py-5 border border-gray-300 rounded-lg mt-auto cursor-pointer"
                onClick={toggleModal}
              >
                {/* Placeholder Image */}
                <h2 className="text-lg font-bold text-primary">Discover</h2>
                <Image
                  src="/asset/images/discover.png"
                  width={150}
                  height={150}
                  alt="Discover Placeholder"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="col-span-8 m-5">
          {/* Default Header */}
          <div className="inline-flex items-center border border-gray-300 rounded-md px-3 py-1 text-sm">
            <span className="font-bold text-primary mr-2">Default</span>
            <span className="text-black">Llama3.1-8b</span>
          </div>
          {/* Display Uploaded Files */}
          <div className="mt-10">
            <h3 className="text-lg font-bold">Uploaded Files:</h3>
            {uploadedFiles.length === 0 ? (
              <p>No files uploaded yet.</p>
            ) : (
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-blue-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* FileComponent */}
          <div className="mt-32">
            <FileComponent onFileUpload={handleFileUpload} />{" "}
            {/* Pass the callback */}
          </div>
        </div>
      </div>

      {/* Placeholder Component */}
      <div className="-mt-[550px] ms-[300px]">
        <PlaceHolderComponent />
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          onClick={toggleModal} // Close modal on clicking outside the modal
        >
          <div
            className="bg-white p-6 rounded-lg max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
            ref={modalRef}
            tabIndex="-1" // Make modal focusable
          >
            {/* Close Button (X) in the top-right corner */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {/* Header with Discover Label */}
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <h2 className="px-10 py-1 ms-5 text-center bg-primary inline text-white rounded-md text-md font-semibold">
                  Discover
                </h2>
                <div className="mt-44">
                  <Image
                    src="/asset/images/discover.png"
                    width={180}
                    height={180}
                    alt="Discover Placeholder"
                    className="bg-primary bg-opacity-20  rounded-lg"
                  />
                </div>
              </div>
              <div className="mt-10 mb-5 col-span-2 font-medium">
                <p>
                  Our platform allows you to gain valuable insights from your
                  documents with the help of advanced AI.
                </p>
                <p className="text-primary font-bold my-3 text-lg">
                  How It Works
                </p>
                <p>
                  1. Start by uploading your files in formats such as PDF or
                  TXT. Our system supports a variety of document types to ensure
                  that you can ask questions about any content you provide.
                </p>
                <p>
                  2. You can create up to 3 chat sessions simultaneously. Each
                  session is designed to give you a dedicated space for asking
                  questions and receiving answers related to your documents.
                </p>
                <p>
                  3. Ask Questions About Your Documents: Once your documents are
                  uploaded, simply ask questions, and our AI-powered chatbot
                  will retrieve and deliver accurate, relevant answers from the
                  content of your files.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
