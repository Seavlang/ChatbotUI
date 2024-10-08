"use client";
import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import FileComponent from "@/app/components/FileComponent";
import { PlaceHolderComponent } from "@/app/components/PlaceHolderComponent";
import Image from "next/image";

export default function Page() {
  const [activeChat, setActiveChat] = useState(0); // Track active chat index
  const [hasContent, setHasContent] = useState(false); // State to track if content is available

  const chatItems = [
    { id: 0, title: "Tag Reearch" },
    { id: 1, title: "Tag Reearch" },
    { id: 2, title: "Tag Reearch" },
  ];

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
              {/* Leave Icon */}
              <Image src={"/asset/images/leave.png"} width={30} height={30} />

              {/* New Chat Button */}
              <button className="flex items-center my-10 px-5 py-2 text-primary bg-blue-100 rounded-md">
                <Image src={"/asset/images/add.png"} width={24} height={24} />
                <span className="text-lg ms-3 opacity-70 font-semibold">
                  New Chat
                </span>
              </button>

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
            <div className=" h-[25%]">
              {hasContent ? (
                <div className="  px-10 py-5 border border-gray-300 rounded-lg">
                  <h2 className="text-lg font-bold text-primary mt-4">
                    Discover
                  </h2>
                  <p>Content</p>
                </div>
              ) : (
                <div className="  px-10 py-5 border border-gray-300 rounded-lg mt-auto">
                  {/* Placeholder Image */}
                  <h2 className="text-lg font-bold text-primary mt-4">
                    Discover
                  </h2>
                  <Image
                    src="/asset/images/discover.png"
                    width={150}
                    height={150}
                    alt="Discover Placeholder"
                  />
                </div>
              )}
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

          {/* FileComponent */}
          <div className="mt-32">
            <FileComponent />
          </div>
        </div>
      </div>

      {/* Placeholder Component */}
      <div className="-mt-[550px] ms-[300px]">
        <PlaceHolderComponent />
      </div>
    </div>
  );
}
