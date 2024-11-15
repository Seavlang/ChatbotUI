'use client'
import React, { Suspense, useEffect, useState } from 'react'
import DefaultFileComponent from '../../../components/DefaultFileComponent'
import { DefaultPlaceHolderComponent } from '@/app/components/DefaultPlaceHolderComponent';
import { getAllHistoryBySessionService } from '@/services/history/history.service';
import { getLM } from '@/actions/modelAction';
import { usePathname } from 'next/navigation';
import Loading from '../../loading';


export default function Page({ params }) {

    const [resolvedParams, setResolvedParams] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isLoading, setIsLoading] = useState()
    const pathname = usePathname()
    const id = pathname.split('/').pop();
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
        setIsLoading(true);
        const fetchParam = async () => {
            var result = await params;
            setResolvedParams(result);
        }

        const fetchSessionHistory = async () => {
            const result = await getAllHistoryBySessionService(resolvedParams);
            setMessages(result?.payload);
        }

        if (params == undefined) {
            result = {
                sessionId: id
            }
            setResolvedParams(result);
        }
        else {
            fetchParam();
        }

        fetchSessionHistory()
        setIsLoading(false)
    }, [params])

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
    const handleSubmit = (e) => {
        const humanPrompt = {
            role: "user",
            content: e
        }
        setMessages((prev) => [...prev, humanPrompt]);
    };


    return (
        <>
            {isLoading ? <Loading></Loading>
                :
                <div className='h-full'>
                    <Suspense fallback={<Loading />}>
                        <div className='h-4/5'>
                            {/* file upload and messsage rendering */}
                            <DefaultFileComponent session={resolvedParams} messages={messages} />
                        </div>
                        <div className="">
                            {/* user input */}
                            <DefaultPlaceHolderComponent
                                session={resolvedParams}
                                socket={socket}
                                onChange={handleSubmit} />
                        </div>
                    </Suspense>

                </div>}
        </>
    )
}
