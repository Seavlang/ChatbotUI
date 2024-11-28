'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Sidebar, SidebarBody } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
import { deleteSessionAction, getAllSessionsAction } from '@/actions/sessionAction';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '../playground/loading';



export default function PlaygroundSidebarComponent({ children, sessionID, params }) {
    const [activeChat, setActiveChat] = useState(0); // Track active chat index
    const [chatToDelete, setChatToDelete] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(null);
    const [open, setOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDelLoading, setIsDelLoading] = useState(false);

    const [messages, setMessages] = useState([]);
    // const [resolvedParams, setResolvedParams] = useState(null);
    const messagesEndRef = useRef(null);
    const [resolvedParams, setResolvedParams] = useState(null);
    const [allSessions, setAllSessions] = useState([])
    const pathname = usePathname()
    const router = useRouter()
    const id = pathname.split('/').pop();
    // useEffect(() => {
    //     // Resolve the params Promise
    //     const fetchParams = async () => {
    //       const result = await params;
    //       setResolvedParams(result);
    //     };

    //     fetchParams();
    //   }, [params]);
    //   console.log("sidebar param", params);
    console.log("is loading in sidebar: ", id);
    console.log("ses loading in sidebar: ", sessionID);

    useEffect(() => {
        const fetchAllSessions = async () => {
            try {
                const response = await getAllSessionsAction();

                setAllSessions(response?.payload);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllSessions();
    }, [id]);
    useEffect(() => {
        const fetchAllSessions = async () => {
            setIsLoading(true);
            try {
                const response = await getAllSessionsAction();
                setAllSessions(response?.payload);
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchAllSessions();

    }, [sessionID, id]);


    const handleDeleteChat = (sessionId) => {
        console.log("id to delete: ", sessionId);
        setChatToDelete(sessionId);
        setIsDeleteDialogOpen(true);
    };

    const confirmDeleteChat = async () => {
        try {
            setIsDelLoading(true);
            const response = await deleteSessionAction(chatToDelete);
            if (response?.success == true) {
                setIsDelLoading(false);
                router.push(`/playground`)
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            setIsDelLoading(false);
        }
        if (activeChat && activeChat.id === chatToDelete) {
            setActiveChat(null);
        }

        setIsDeleteDialogOpen(false);
    };

    const handleSetOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <div>
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

                                    >
                                        <div className="flex justify-between my-10">
                                            <Link href={`${allSessions?.length >= 3 ? '#' : '/playground'}`}>
                                                <button className={`flex items-center px-5 py-2  rounded-md ${allSessions?.length >= 3 ? 'disabled bg-gray-300 ' : ' bg-blue-100'}`}>
                                                    {
                                                        allSessions?.length >= 3 ?
                                                            <div className='flex items-center point'>
                                                                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 4.5L9 13.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                                                                    <path d="M13.5 9L4.5 9" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                                                                </svg>
                                                                <span
                                                                    className="text-lg ms-3 font-semibold text-white"
                                                                >
                                                                    New Chat
                                                                </span>
                                                            </div>

                                                            :
                                                            <div className='flex items-center'>
                                                                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 4.5L9 13.5" stroke="#004B93" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                                                                    <path d="M13.5 9L4.5 9" stroke="#004B93" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                                                                </svg>
                                                                <span
                                                                    className="text-lg ms-3 font-semibold text-primary"
                                                                >
                                                                    New Chat
                                                                </span>
                                                            </div>

                                                    }

                                                </button>
                                            </Link>
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
                                        {
                                            isLoading ? <div className='flex justify-center'><Loading /></div>
                                                :
                                                allSessions?.map((session) => (
                                                    <div
                                                        key={session?.session}
                                                        className={`flex justify-between items-center w-full px-3 py-2  rounded-md mb-2 cursor-pointer ${session?.session === id
                                                            ? "bg-blue-100 text-primary"
                                                            : "text-gray-500 hover:bg-gray-100"
                                                            }`} // Set active chat when clicked
                                                    >
                                                        <Link href={`/playground/chat/${session?.session}`}>
                                                            <div className="flex items-center">
                                                                {/* Use different icons based on active/inactive state */}


                                                                <Image
                                                                    src={
                                                                        activeChat === session?.session
                                                                            ? "/asset/images/tag.png"
                                                                            : "/asset/images/tagnotactive.png"
                                                                    }
                                                                    width={24}
                                                                    height={24}
                                                                    alt="Tag Icon"
                                                                />
                                                                <span
                                                                    className={`text-md ms-3 overflow-hidden w-full max-w-48 font-medium ${activeChat === session?.session ? "text-primary" : ""
                                                                        }`}
                                                                >

                                                                    {session?.session_name}
                                                                </span>

                                                            </div>
                                                        </Link>
                                                        {/* Only show dots for the active chat */}
                                                        {/* {activeChat === session?.id && ( */}
                                                        <div className={`text-primary ${id === session?.session ? '' : 'hidden'}`}>
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
                                                                        onClick={() => handleDeleteChat(session?.id)}
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
                                                ))
                                        }


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
                                    <div className={`${isDelLoading ? 'disabled' : ''}`}>Cancel</div>
                                </Button>
                                <Button variant="delete" onClick={confirmDeleteChat} >
                                    {
                                        isDelLoading ? <div className="disabled">
                                            <span className="loading loading-spinner loading-md text-primary"></span>
                                        </div> : <div>DELETE</div>
                                    }

                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <div className="w-full">
                        <div className="p-2 md:p-10 h-screen flex flex-row gap-2 flex-1 ">
                            <div className="">
                                <div className='flex '>
                                    {
                                        open ? (
                                            ''
                                        )
                                            :
                                            (<div className="my-auto cursor-pointer" onClick={handleSetOpen}>
                                                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 9.5L7 12M7 12L9 14.5M7 12H12.5" stroke="#004B93" />
                                                    <path d="M3.5 18.5V5.5C3.5 4.39543 4.39543 3.5 5.5 3.5H18.5C19.6046 3.5 20.5 4.39543 20.5 5.5V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5Z" stroke="#004B93" strokeLinecap="round" />
                                                    <path d="M15.5 3.5V20.5" stroke="#004B93" strokeLinecap="round" />
                                                </svg>
                                            </div>)
                                    }
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}
