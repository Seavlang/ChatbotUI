"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { PlaceHolderComponent } from "@/app/components/PlaceHolderComponent";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import Typewriter from "../components/Typewriter";
import FileComponentPlayground from "@/app/components/FileComponentPlayground";

export default function Page() {

  const [activeChat, setActiveChat] = useState(0); // Track active chat index
  const [hasContent, setHasContent] = useState(false); // State to track if content is available
  const [onFileUpload, setOnFileUpload] = useState(); // State to track
  const [chatToDelete, setChatToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Previous Chat 1" },
    { id: 2, title: "Previous Chat 2" },
    { id: 3, title: "Previous Chat 3" },
  ]);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const generateAIResponse = async (userInput) => {
    // Simulate AI processing time
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    // Generate a simple response based on the user's input
    const response = `Thank you for your input: "${userInput}". As an AI assistant, I'm here to help you with any questions or tasks related to data analysis and visualization. How can I assist you further?`;

    return {
      id: messages.length + 2,
      role: "ai",
      content: response,
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 1,
          role: "user",
          content: newMessage.trim()
        },
      ]);
      setNewMessage(""); // Clear input

      // Generate and add AI response
      const aiResponse = await generateAIResponse(newMessage.trim());
      setMessages((prev) => [...prev, aiResponse]);

      setTimeout(scrollToBottom, 100);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = () => {
    if (chatHistory.length >= 3) {
      return;
    }
    const newChat = { id: Date.now(), title: "New Chat" };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChat(newChat);

  };


  const handleDeleteChat = (chatId) => {
    setChatToDelete(chatId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteChat = () => {
    setChatHistory(chatHistory.filter((chat) => chat.id !== chatToDelete));
    if (activeChat && activeChat.id === chatToDelete) {
      setActiveChat(null);
    }
    setIsDeleteDialogOpen(false);
  };


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
                  onClick={startNewChat}
                >
                  <div className="flex justify-between my-10">

                    <button className="flex items-center  px-5 py-2 text-primary bg-blue-100 rounded-md">
                      <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 4.5L9 13.5" stroke="#004B93" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                        <path d="M13.5 9L4.5 9" stroke="#004B93" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                      </svg>

                      <span className="text-primary text-lg ms-3 font-semibold ">
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

                  {chatHistory.map((chat, index) => (
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
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-2 h-6 w-6 flex-shrink-0 "
                              >
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only bg-white">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white">
                              <DropdownMenuItem
                                onClick={() => handleDeleteChat(chat.id)}
                                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
          <div className="p-2 md:p-10 h-screen bg-white flex flex-col gap-2 flex-1 w-full">

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
            {
              messages.length !== 0 ?
                ('')
                :
                (
                  <div className="flex flex-row items-center justify-center h-screen">
                    <FileComponentPlayground onFileUpload={onFileUpload} />
                  </div>
                )
            }
            <div className="flex justify-center max-h-[75%]">
              <div className="flex flex-col w-1/2 h-full">
                {/* Chat messages */}
                <div className="flex-grow overflow-y-auto mb-4 space-y-6 p-8">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`py-3 rounded-2xl  break-words 
                            ${message.role === "user"
                            ? "bg-[#90A1FE] px-5 max-w-xl text-white"
                            // : "bg-gray-100 text-black"
                            : ""
                          }
                        `}
                      >
                      {
                        message?.role == "ai" ?
                        <Typewriter text1={message?.content}/>:message?.content
                      }
                        {/* {message?.content} */}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholder Component */}
            <div className="relative bottom-5 h-screen">
              <div className="flex flex-col items-center h-full">
                <div className="mt-auto w-full max-w-4xl mx-auto mb-20 ">
                  <PlaceHolderComponent setOnFileUpload={setOnFileUpload}
                    handleSendMessage={handleSendMessage}
                    setNewMessage={setNewMessage} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this chat session?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="cancel"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                CANCEL
              </Button>
              <Button variant="delete" onClick={confirmDeleteChat} >
                DELETE
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>

  );
}
