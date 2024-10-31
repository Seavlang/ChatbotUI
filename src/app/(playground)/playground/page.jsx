"use client";
import React, { useState, useEffect, useRef } from "react";
import NavbarComponent from "../components/NavbarComponent";
import FileComponent from "@/app/components/FileComponent";
import { PlaceHolderComponent } from "@/app/components/PlaceHolderComponent";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Page() {

  const [activeChat, setActiveChat] = useState(0); // Track active chat index
  const [hasContent, setHasContent] = useState(false); // State to track if content is available
  const [onFileUpload, setOnFileUpload] = useState(); // State to track

  const chatItems = [
    { id: 0, title: "Tag Reearch" },
    { id: 1, title: "Tag Reearch" },
    { id: 2, title: "Tag Reearch" },
  ];

  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Navbar Section */}
      <div className="bg-white mx-40">
        <NavbarComponent />
      </div>
      <hr />
      <div
        className={cn(
          "flex flex-col md:flex-row w-full flex-1 overflow-hidden",
          "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">

            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex flex-col gap-2">
                {/* New Chat Button */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium text-black dark:text-white whitespace-pre"
                >
                  <div className="flex justify-between my-10">

                    <button className="flex items-center  px-5 py-2 text-primary bg-blue-100 rounded-md">
                      <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 4.5L9 13.5" stroke="#004B93" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                        <path d="M13.5 9L4.5 9" stroke="#004B93" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                      </svg>

                      <span className="text-lg ms-3 opacity-70 font-semibold">
                        New Chat
                      </span>
                    </button>

                    <div className="my-auto cursor-pointer" onClick={() => setOpen(!open)}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 9.5L7 12M7 12L9 14.5M7 12H12.5" stroke="#004B93" />
                        <path d="M3.5 18.5V5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5Z" stroke="#004B93" strokeLinecap="round" />
                        <path d="M15.5 3.5V20.5" stroke="#004B93" strokeLinecap="round" />
                      </svg>
                    </div>

                  </div>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium text-black dark:text-white whitespace-pre"
                >

                  {chatItems.map((chat, index) => (
                    <div
                      key={chat.id}
                      className={`flex justify-between items-center w-full px-3 py-2 rounded-md mb-2 cursor-pointer ${activeChat === index
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
                          className={`inline-block text-md ms-3 font-medium ${activeChat === index ? "text-primary" : ""
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
                </motion.span>
                {/* Chat Items (Active/Inactive) */}

              </div>
            </div>
          </SidebarBody>
        </Sidebar>


        <div className="flex flex-1">
          <div className="p-2 md:p-10 bg-white flex flex-col gap-2 flex-1 w-full h-full">

            <div className="flex">
              {
                open ? (
                  ''
                )
                  :
                  (<div className="my-auto cursor-pointer" onClick={() => setOpen(!open)}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 9.5L7 12M7 12L9 14.5M7 12H12.5" stroke="#004B93" />
                      <path d="M3.5 18.5V5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5Z" stroke="#004B93" strokeLinecap="round" />
                      <path d="M15.5 3.5V20.5" stroke="#004B93" strokeLinecap="round" />
                    </svg>
                  </div>)
              }


              <div className="ml-5 inline-flex items-center border border-gray-300 rounded-md px-3 py-2 text-lg">
                <span className="font-bold text-primary mr-2">Default</span>
                <span className="font-normal text-black">Llama3.1-8b</span>
              </div>
            </div>


            {/* FileComponent */}
            <div className="flex flex-col items-center justify-center h-screen">
              <FileComponent onFileUpload={onFileUpload}/>
            </div>
            {/* Placeholder Component */}

            <div className="flex flex-col items-center h-1/2">
              <div className="mt-auto w-full max-w-4xl mx-auto mb-20 ">
                <PlaceHolderComponent setOnFileUpload={setOnFileUpload}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>

  );
}
