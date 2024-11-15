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
    const [newMessage, setNewMessage] = useState('');
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState()
    const pathname = usePathname()
    const id = pathname.split('/').pop();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchLM = async () => {
            await getLM();
        }
        fetchLM();
        const ws = new WebSocket("ws://110.74.194.123:8085/ws/playground_generate-response");

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];

                if (lastMessage && message.type === 'paragraph' && lastMessage.type === 'paragraph') {
                    return [
                        ...prevMessages.slice(0, -1),
                        { ...lastMessage, content: lastMessage.content + " " + message.content }
                    ];
                } else {
                    return [...prevMessages, message];
                }
            });
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

    // 2nd useEffect: Fetches documents and history when `resolvedParams` is ready
    useEffect(() => {
        if (!resolvedParams) return; // Wait until `resolvedParams` is set

        const fetchData = async () => {
            setIsLoading(true);

            try {
                // Fetch all documents
                const documentResult = await getAllDocumentAction(resolvedParams);
                console.log("documentResult", documentResult);
                setFiles(documentResult?.payload);

                // Fetch session history
                const historyResult = await getAllHistoryBySessionService(resolvedParams);
                console.log("historyResult", historyResult);
                setMessages(historyResult?.payload);
            } catch (error) {
                console.error("Error fetching data:", error);
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

    return (
        <>
            {isLoading ? <div>Loading</div>
                :
                <div className='h-full'>
                    <div className='h-4/5'>
                        {/* file upload and messsage rendering */}
                        <DefaultFileComponent session={resolvedParams} messages={messages} files={files} />
                    </div>
                    <div className="">
                        {/* user input */}
                        <DefaultPlaceHolderComponent
                            session={resolvedParams}
                            socket={socket}
                            onChange={handleSubmit} />
                    </div>
                </div>}
        </>
    )
}
