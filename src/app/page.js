'use client';

import { ChatbotAction } from '../action/chatbotAction';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import closeIcon from '../../public/cross.png';
import catIcon from '../../public/cat.png';

export default function Chat({ apiKey,SessionId, projectId}) { // Accept apiKey as a prop
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
    try {
      // Call the chatbot service and get the response with the provided API key
      const response = await ChatbotAction(input, SessionId, projectId, apiKey);
      console.log("response", response);
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: response.output }]); // Adjust according to response format
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: 'Sorry, there was an error processing your request.' }]);
      console.error('Error:', error);
    }

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
      className={`fixed bottom-10 right-10 shadow-lg transition-transform ${
        isExpanded ? 'w-[450px] h-[550px] rounded-[40px]' : 'w-20 h-20 rounded-3xl'
      } `}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {isExpanded ? (
        <div className="flex flex-col h-full border border-white rounded-2xl" style={{ boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex justify-between items-center p-5 bg-white text-[#004B93] rounded-t-lg">
            <span className="font-bold">AI Assistant</span>
            <button onClick={() => setIsExpanded(false)} className="text-gray-600">
              <Image src={closeIcon} width={30} height={30} alt='close'/>
            </button>
          </div>
          <ul ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-blue-50">
            {messages.map((message, index) => (
              <li
                key={index}
                className={`p-3 text-sm ${
                  message.type === 'user'
                    ? 'bg-[#004B93] text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl float-right inline-block'
                    : 'bg-white text-gray-700 rounded-tl-xl rounded-tr-xl rounded-br-xl self-start inline-block'
                } shadow-md`}
              >
                {message.text}
              </li>
            ))}
          </ul>
          <div className="flex items-center p-3 border-t border-blue-300 bg-white rounded-b-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message"
              className="flex-1 p-2 focus:outline-none focus:ring-none rounded-xl"
            />
            <button
              onClick={handleSend}
              className="mx-4 text-gray-500 text-lg rounded-md"
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <Image src={catIcon} width={100} height={100} alt='chatbot'/>
      )}
    </div>
  );
}
