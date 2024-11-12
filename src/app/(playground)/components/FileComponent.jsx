'use client'
import FileComponentPlayground from '@/app/components/FileComponentPlayground';
import { getAllFilesService } from '@/services/file/file.service';
import React, { Suspense, useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { PlaceHolderComponent } from '@/app/components/PlaceHolderComponent';

export default function FileComponent({ open, handleSetOpen, lm, sessionId, messages, activeSession }) {
    const [files, setFiles] = useState()
    const [content, setContent] = useState(messages);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [onFileUpload, setOnFileUpload] = useState();

    console.log("session id: ", sessionId)

    useEffect(() => {
        const getFileFromService = async () => {
            try {
                console.log("session id in filecomponent: ", sessionId)
                const response = await getAllFilesService(sessionId);
                setFiles(response?.payload);
            } catch (err) {
            }
        }
        getFileFromService();
    }, [sessionId])

    useEffect(() => {
        setContent(messages)
    }, [messages])

    const handleFileUpload = async (files) => {
        setUploadedFiles(files);
        // setUploadedFiles((prev) => [...prev, ...files]);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setContent((prev) => [
                ...prev,
                {
                    id: messages?.length + 1,
                    role: "user",
                    content: newMessage.trim()
                },
            ]);
            setNewMessage(""); // Clear input

            // Generate and add AI response
            const aiResponse = await generateAIResponse(newMessage.trim());
            setContent((prev) => [...prev, aiResponse]);

            setTimeout(scrollToBottom, 100);
        }
    };


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
    return (
        <>
            <div className="w-full">
                <div className="p-2 md:p-10 h-screen flex flex-col gap-2 flex-1 w-full">

                    <div className="flex flex-col">
                        <div className='flex'>
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


                            <div className="ml-5 inline-flex items-center border border-gray-300 rounded-md px-3 py-2 text-md">
                                <span className="font-bold text-primary mr-2">Default</span>
                                <span className="font-normal text-black">{lm}</span>
                            </div>
                            <div>
                                {
                                    files?.length > 0 ?
                                        (<div>
                                            {files.map(file => (
                                                <div key={file?.id} className="ml-5 inline-flex items-center border border-gray-300 rounded-md  px-3 py-2 text-md">
                                                    <li key={file?.id} className="font-medium text-primary mr-2">
                                                        {file?.file_name}
                                                    </li>
                                                </div>
                                            ))}
                                        </div>)
                                        :
                                        (<div className="inline-flex items-center border border-gray-300 rounded-md px-3 py-2 text-md">
                                            <span className="font-medium text-primary mr-2">No document</span>
                                        </div>)
                                }
                            </div>

                        </div>


                    </div>

                    <div className="flex mx-auto w-2/3 h-full">
                        <div className="flex-grow overflow-y-auto mb-4 space-y-6 p-8">
                            {
                                files?.length !== 0 && sessionId == 'undefined' ?
                                    content?.map((message, index) => (

                                        <div
                                            key={index}
                                            className={`flex ${message?.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={`py-3 rounded-2xl  break-words 
                                          ${message?.role === "user"
                                                        ? "bg-[#90A1FE] px-5 max-w-xl text-white"
                                                        // : "bg-gray-100 text-black"
                                                        : ""
                                                    }
                                      `}
                                            >
                                                {message?.content}
                                            </motion.div>

                                        </div>
                                    ))
                                    :
                                    (
                                        <div className="flex flex-row items-center justify-center mt-20">
                                            <FileComponentPlayground
                                                uploadedFiles={uploadedFiles}
                                                onFileUpload={handleFileUpload} />
                                        </div>
                                    )
                            }
                        </div>
                    </div>
                    <div className="relative bottom-5 h-screen">
                        <div className="flex flex-col items-center h-full">
                            <div className="mt-auto w-full max-w-4xl mx-auto mb-20 ">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PlaceHolderComponent
                                        setOnFileUpload={setOnFileUpload}
                                        handleSendMessage={handleSendMessage}
                                        setNewMessage={setNewMessage}
                                        sessionId={sessionId}
                                        activeSession={activeSession}
                                    />
                                </Suspense>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
