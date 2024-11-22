'use client'
import React, { Suspense, useEffect, useState } from 'react'
import DefaultFileComponent from '../../../components/DefaultFileComponent'
import { DefaultPlaceHolderComponent } from '@/app/components/DefaultPlaceHolderComponent';
import { getAllHistoryBySessionService } from '@/services/history/history.service';
import { getLM } from '@/actions/modelAction';
import { usePathname } from 'next/navigation';
import Loading from '../../loading';
import { getAllDocumentAction } from '@/actions/fileAction';


export default function Page({ params }) {

    const [resolvedParams, setResolvedParams] = useState(null);
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    // const [isResponding, setIsResponding] = useState(false)
    const pathname = usePathname()
    const id = pathname.split('/').pop();
    const [files, setFiles] = useState([{
        id: 0,
        collection_name: "Sample Document",
        created_at: null,
        session_id: null,
        file_name: "Default"
    }]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        const fetchLM = async () => {
            await getLM();
        }
        fetchLM();
        const ws = new WebSocket("ws://110.74.194.123:1234/ws/playground_generate-response");

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

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
            }
        };
        // setIsResponding(false)

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

    console.log(" message in pages: " ,messages)
    // 2nd useEffect: Fetches documents and history when `resolvedParams` is ready
    useEffect(() => {
        if (!resolvedParams) return; // Wait until `resolvedParams` is set

        const fetchData = async () => {
            // setIsLoading(true);

            try {
                // Fetch all documents
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

    const handleSelectDocument = (id) =>{
        // handle file selection and upload
        console.log("handleSelectDocument", id)
        setSelectedDocument(id)
    }

    console.log("files: ",files)
    return (
        <>
            {isLoading ? <Loading></Loading>
                :
                <div className='h-full w-full'>
                    <div className='h-4/5'>
                        {/* file upload and messsage rendering */}
                        <DefaultFileComponent
                            session={resolvedParams}
                            messages={messages}
                            files={files}
                            handleSelectDocument={handleSelectDocument}
                        />
                    </div>
                    <div className="">
                        {/* user input */}
                        <DefaultPlaceHolderComponent
                            session={resolvedParams}
                            socket={socket}
                            onChange={handleSubmit}
                            selectedDocument={selectedDocument}
                        />
                    </div>
                </div>}
        </>
    )
}
