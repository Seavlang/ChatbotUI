'use client';
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
import { getLM } from "@/actions/modelAction";
import { getLMService } from "@/services/model/model.service";
import { createSessionService, deleteSessionService, getAllSessionService, getChatHistoryBySessionIdService } from "@/services/session/session.service";
import { getAllFilesService } from "@/services/file/file.service";
import FileComponent from "../components/FileComponent";


export default function Page() {

  const [activeChat, setActiveChat] = useState(0); // Track active chat index
  const [chatToDelete, setChatToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(null);
  const [open, setOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [messages, setMessages] = useState([]);
  const [LM, setLM] = useState()
  const messagesEndRef = useRef(null);
  const [allSessions, setAllSessions] = useState([])
  const [activeSession, setActiveSession] = useState()

  useEffect(() => {
    setActiveChat(0);
    setOpen(false);
    setIsLoading(true); // Set to true while loading

    async function fetchData() {
      try {
        const result = await getLMService();
        setLM(result?.payload?.provider_info?.model_name);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    const getSessionData = async () => {
      try {
        setIsLoading(true)
        const result = await getAllSessionService();
        const initialSession = result?.payload[0];

        setAllSessions(result?.payload);
        setActiveChat(initialSession?.id);
        setMessages(initialSession?.history)
        setActiveSession(result?.payload[activeChat])

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getSessionData();
    fetchData();
  }, []);

  const handleChangeActiveChat = (sessionId) => {
    const selectedSession = allSessions.find((session) => session.id === sessionId);
    if (selectedSession) {
      setActiveChat(sessionId);
      setMessages(selectedSession.history); // Set messages based on the selected session's history
    }
  };

  console.log("message in page: ", messages)

  const generateAIResponse = async (userInput) => {
    // Simulate AI processing time
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);

    // Generate a simple response based on the user's input
    const response = `Thank you for your input: "${userInput}". As an AI assistant, I'm here to help you with any questions or tasks related to data analysis and visualization. How can I assist you further?`;

    return {
      id: messages?.length + 2,
      role: "ai",
      content: response,
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = () => {
    if (allSessions.length >= 3) {
      return;
    }
    const newChat = { id: Date.now(), session: "New Chat", history: [] };
    setAllSessions([...allSessions, newChat]);
    setActiveChat(newChat?.id);
    setActiveSession(newChat)
    setMessages(activeSession?.history)
  }


  const handleDeleteChat = (chat) => {
    setChatToDelete(chat);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteChat = async () => {
    try {
      setIsLoading(true);
      if (chatToDelete?.session == 'New Chat' && chatToDelete?.history.length == 0) {
        setAllSessions(allSessions.filter(session => session.id !== chatToDelete?.id))
        setIsDeleteDialogOpen(false);
        setIsLoading(false);
        return;
      }
      const response = await deleteSessionService(chatToDelete?.id);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    if (activeChat && activeChat.id === chatToDelete) {
      setActiveChat(null);
    }
    setIsLoading(false);
    setIsDeleteDialogOpen(false);
  };

  const handleSetOpen = () => {
    setOpen(!open);
  }

  return (
    <>
      {/* Navbar Section */}
      <div className="bg-white mx-40">
        <NavbarComponent />
      </div>
      <hr />
      <div
        className={cn(
          "flex  w-full overflow-hidden",
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
                  {/* map all session in side bar */}
                  {allSessions?.map((session) => (
                    <div
                      key={session?.id}
                      className={`flex justify-between items-center w-full px-3 py-2  rounded-md mb-2 cursor-pointer ${activeChat === session?.id
                        ? "bg-blue-100 text-primary"
                        : "text-gray-500 hover:bg-gray-100"
                        }`}
                      onClick={() => handleChangeActiveChat(session?.id)} // Set active chat when clicked
                    >
                      <div className="flex items-center">
                        {/* Use different icons based on active/inactive state */}
                        <Image
                          src={
                            activeChat === session?.id
                              ? "/asset/images/tag.png"
                              : "/asset/images/tagnotactive.png"
                          }
                          width={24}
                          height={24}
                          alt="Tag Icon"
                        />
                        <span
                          className={`text-md ms-3 overflow-hidden w-full max-w-48 font-medium ${activeChat === session?.id ? "text-primary" : ""
                            }`}
                        >

                          {session?.session}
                        </span>
                      </div>
                      {/* Only show dots for the active chat */}
                      {/* {activeChat === session?.id && ( */}
                      <div className={`text-primary ${activeChat === session?.id ? '' : 'hidden'}`}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-2 h-6 w-6 flex-shrink-0 "
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem
                              onClick={() => handleDeleteChat(session)}
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      {/* )} */}
                    </div>
                  ))}
                </motion.span>
                {/* Chat Items (Active/Inactive) */}

              </div>
            </div>
          </SidebarBody>
        </Sidebar>

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
                <div className={`${isLoading ? 'disabled' : ''}`}>DELETE</div>
              </Button>
              <Button variant="delete" onClick={confirmDeleteChat} >
                {
                  isLoading ? <div className="disabled">Loading...</div> : <div>DELETE</div>
                }

              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Suspense fallback={<div>Loading...</div>}>
          <FileComponent open={open} handleSetOpen={handleSetOpen} lm={LM} sessionId={activeChat} messages={messages} activeSession={activeSession} />
        </Suspense>

      </div>
    </>

  );
}
