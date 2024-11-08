import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

function ChatWidget() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hello! I'm here to lend a helping hand whenever you need it. What can I do for you?" },
        { type: 'user', text: 'What does your website about?' },
        { type: 'bot', text: 'Our website is an API service chatbot provider which allows you to chat with your documents effortlessly.' }
    ]);
    const [input, setInput] = useState('');
    const chatRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isExpanded]);

    const handleSend = async () => {
        if (input.trim() === '') return;

        // Add the user's message to the conversation
        setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
        console.log("input: " + input);
        // try {
        //     // Call the chatbot service and get the response
        //     const response = await ChatbotAction(input, "1", "2");
        //     // Call the chatbot service and get the response with the provided API key
        //     const response = await ChatbotAction(input, "1", "2", "apiKey");
        //     console.log("response", response);
        // setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: response.output }]); // Adjust according to response format
        // } catch (error) {
        // setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: 'Sorry, there was an error processing your request.' }]);
        //     console.error('Error:', error);
        // }

        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default action (e.g., form submission)
            handleSend();
        }
    };
    return (
        <div
            className={`rounded-2xl bg-white shadow-lg transition-transform ${isExpanded ? 'flex w-[420px] max-h-[500px] h-auto' : 'fixed bottom-1 w-20 h-20 rounded-3xl'
                } `}
            onClick={() => !isExpanded && setIsExpanded(true)}
        >
            {isExpanded ? (
                <div className="flex flex-col h-[full]">
                    {/*  */}
                    <div className="flex justify-between items-center h-14 p-4 bg-white text-[#004B93] rounded-t-2xl">
                        <div className='flex items-center w-[30%] justify-between'>
                            <Image
                                src="/asset/images/logo2.png"
                                alt="chatbot"
                                width={28}
                                height={28}
                            />
                            <span className="font-semibold text-sm">AI Assistant</span>
                        </div>

                        {/* close button */}
                        <button onClick={() => setIsExpanded(false)} className="text-gray-600">
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5 4.68799L4.5 13.688" stroke="#004B93" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.5 4.68799L13.5 13.688" stroke="#004B93" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>
                    </div>
                    <div className='h-[360px]'>
                        <ul ref={chatRef} className="flex-1 h-full overflow-y-auto p-5 space-y-4 bg-blue-50">
                            {messages.map((message, index) => (
                                <li
                                    key={index}
                                    className={`p-3 text-sm ${message.type === 'user'
                                        ? 'bg-[#004B93] text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl float-right inline-block text-xs font-normal'
                                        : 'bg-white text-xs text-gray-700 rounded-tl-xl rounded-tr-xl rounded-br-xl font-normal self-start inline-block'
                                        } shadow-md`}
                                >
                                    {message.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="py-4">
                        <div className='h-full flex items-center mx-5'>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Send a message"
                                className="flex-1 focus:outline-none text-sm font-normal focus:ring-none "
                            />
                            <button
                                onClick={handleSend}
                                className=" text-gray-500 text-lg"
                            >
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.99811 11.149L7.43298 11.9101C7.70983 12.3945 7.84825 12.6368 7.84825 12.9023C7.84825 13.1679 7.70983 13.4101 7.43299 13.8946L7.43298 13.8946L6.99811 14.6556C5.75981 16.8227 5.14066 17.9062 5.62348 18.4435C6.1063 18.9808 7.24961 18.4806 9.53623 17.4802L15.8119 14.7347C17.6074 13.9491 18.5051 13.5564 18.5051 12.9023C18.5051 12.2483 17.6074 11.8556 15.8119 11.07L9.53624 8.32445C7.24962 7.32405 6.1063 6.82385 5.62348 7.36117C5.14066 7.89849 5.75981 8.98201 6.99811 11.149Z" stroke="#878787" />
                                </svg>

                            </button>
                        </div>

                    </div>
                </div>
            ) : (

                <div className='flex justify-center items-center h-full'>
                    <Image
                        src="/asset/images/logo2.png"
                        alt="chatbot"
                        width={50}
                        height={50}
                    />
                </div>
            )}
        </div>
    )
}

export default ChatWidget