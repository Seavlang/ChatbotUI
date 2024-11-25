'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import DefaultFileComponent from '../../../components/DefaultFileComponent'
import { DefaultPlaceHolderComponent } from '@/app/components/DefaultPlaceHolderComponent';
import { getAllHistoryBySessionService } from '@/services/history/history.service';
import { getLM } from '@/actions/modelAction';
import { usePathname } from 'next/navigation';
import Loading from '../../loading';
import { getAllDocumentAction } from '@/actions/fileAction';


export default function Page({ params }) {
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [page, setPage] = useState(1); // Pagination page number

    const [resolvedParams, setResolvedParams] = useState(null);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [isResponding, setIsResponding] = useState(false)
    const [isFileUploading, setIsFileUploading] = useState(false)
    const pathname = usePathname()
    const id = pathname.split('/').pop();
    const [files, setFiles] = useState([{
        id: 0,
        collection_name: "Sample Document",
        created_at: null,
        session_id: null,
        file_name: "All Documents"
    }]);
    const [selectedDocument, setSelectedDocument] = useState(null);


    // Response from web socket
    useEffect(() => {
        const fetchLM = async () => {
            await getLM();
        }
        fetchLM();
        const ws = new WebSocket("ws://110.74.194.123:1234/ws/playground_generate-response");

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                setIsResponding(true);
                setMessages((prevMessages) => {
                    // Update the latest bot response with new token content
                    const lastMessage = prevMessages[prevMessages.length - 1];

                    if (lastMessage && lastMessage.role === "ai") {
                        return [
                            ...prevMessages.slice(0, -1),
                            { ...lastMessage, content: lastMessage.content + message.content }
                        ];
                    } else {
                        // Start a new ai response
                        return [
                            ...prevMessages,
                            { role: "ai", content: message.content }
                        ];
                    }
                });
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            } finally {
                setIsResponding(false);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        const resolveParams = async () => {
            if (!params) {
                setResolvedParams({ sessionId: id });

            } else {
                const result = await params;
                setResolvedParams(result);
            }
        };

        resolveParams();
    }, []); // Run this effect when `params` or `id` changes
    const pageRef = useRef(2);
    const fetchMessages = async () => {
        if (isLoadingMore || !hasMoreMessages) return;

        setIsLoadingMore(true);

        try {
            const currentPage = pageRef.current;
            console.log("Fetching messages for page:", currentPage);

            // Simulate API call
            const response = await getAllHistoryBySessionService(resolvedParams, currentPage);

            if (response?.payload?.length > 0) {
                setMessages((prev) => [...response.payload, ...prev]); // Prepend new messages
                pageRef.current += 1; // Increment page manually using ref
                console.log("Page updated to:", pageRef.current);
            } else {
                setHasMoreMessages(false); // No more messages to fetch
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // 2nd useEffect: Fetches documents and history when `resolvedParams` is ready
    useEffect(() => {
        if (!resolvedParams) return; // Wait until `resolvedParams` is set

        const fetchData = async () => {
            // setIsLoading(true);

            try {
                const documentResult = await getAllDocumentAction(resolvedParams);
                console.log("documentResult", documentResult);
                setFiles((prev) => [...prev, ...(documentResult?.payload || [])]);

                // Fetch session history
                const historyResult = await getAllHistoryBySessionService(resolvedParams);
                setMessages(historyResult?.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
                // setIsLoading(false);
            } finally {
                setIsLoading(false); // End loading after all fetches complete
            }
        };

        fetchData();
    }, [resolvedParams]);

    const handleSubmit = (e) => {
        const humanPrompt = {
            role: "user",
            content: e
        }
        setMessages((prev) => [...prev, humanPrompt]);
    };

    const handleSelectDocument = (id) => {
        // handle file selection and upload
        console.log("handleSelectDocument", id)
        setSelectedDocument(id)
    }

    console.log("files: ", files)
    return (
        <>
            {
                isLoading ? <div className='h-full w-full flex justify-center'><Loading /></div>
                    :
                    <div className='h-full w-full '>
                        <div className='h-4/5'>
                            {/* file upload and messsage rendering */}
                            <DefaultFileComponent
                                session={resolvedParams}
                                messages={messages}
                                files={files}
                                handleSelectDocument={handleSelectDocument}
                                fetchOlderMessages={() => fetchMessages()}
                                isLoadingMore={isLoadingMore}
                                hasMoreMessages={hasMoreMessages}
                                isResponding={isResponding}
                                isFileUploading={isFileUploading}
                                setFiles={setFiles}
                            />
                        </div>
                        <div className="">
                            {/* user input */}
                            <DefaultPlaceHolderComponent
                                session={resolvedParams}
                                socket={socket}
                                onChange={handleSubmit}
                                selectedDocument={selectedDocument}
                                setIsFileUploading={setIsFileUploading}
                                setFiles={setFiles}
                            />
                        </div>
                    </div>}
        </>
    )
}
