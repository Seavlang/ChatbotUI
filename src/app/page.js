'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import closeIcon from '../../public/cross.png';
import catIcon from '../../public/cat.png';
import sent from '../../public/sent.png';

export default function Chat({ defaultText, apiKey, sessionId, projectId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: defaultText ? defaultText : "Hello, How can I help you?" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);
  const wsRef = useRef(null); // WebSocket reference

  useEffect(() => {
    if (isExpanded) {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isExpanded]);

  // Establish WebSocket connection
  useEffect(() => {
    wsRef.current = new WebSocket('ws://110.74.194.123:8085/ws/generate-response');

    wsRef.current.onopen = () => {
      console.log('WebSocket connection established.');
    };
    wsRef.current.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    
      try {
        const data = JSON.parse(event.data);
    
        if (data.type === 'error') {
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'bot', text: `Error: ${data.content}` }, // Show error message
          ]);
        } else if (data.type === 'paragraph' && data.content?.trim()) {
          // Only append if content is non-empty
          setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage && lastMessage.type === 'bot') {
              return [
                ...prevMessages.slice(0, -1), // Keep all messages except the last
                { type: 'bot', text: lastMessage.text + data.content }, // Append new content
              ];
            }
            return [
              ...prevMessages,
              { type: 'bot', text: data.content }, // Add a new bot message if no existing bot message
            ];
          });
        } else {
          // Handle unexpected formats or empty content
          console.warn('Unexpected or empty content received:', data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'bot', text: 'Error parsing server response.' },
        ]);
      }
      setIsLoading(false); // Stop loading after processing the response
    };
    
    

    wsRef.current.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
    setInput(''); // Clear input after sending
    setIsLoading(true); // Start loading

    // Send user message to the WebSocket server
    const payload = {
      input: {
        input: input, // User's input message
        external_session_id: "14", // Session ID
        project_id: "8",         // Project ID
      },
    };

    wsRef.current?.send(JSON.stringify(payload));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        transition: 'transform 0.3s ease',
        width: isExpanded ? '450px' : '80px',
        height: isExpanded ? '550px' : '80px',
        borderRadius: isExpanded ? '20px' : '50%',
        overflow: 'hidden',
        backgroundColor: isExpanded ? 'transparent' : 'white',
        padding: '10px',
        boxShadow: isExpanded
          ? 'none' // shadow for expanded state
          : '0 4px 10px rgba(0, 0, 0, 0.25)',
      }}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {isExpanded ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            border: '1px solid white',
            borderRadius: '24px',
            boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: 'white',
              color: '#004B93',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              borderBottom: '1px solid #004B93',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>AI Assistant</span>
            <button
              onClick={() => setIsExpanded(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <Image src={closeIcon} width={30} height={30} alt="close" />
            </button>
          </div>
          <ul
            ref={chatRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: '#ebf4ff',
              margin: 0,
              listStyle: 'none',
            }}
          >
            {messages.map((message, index) => (
              <ul
                key={index}
                style={{
                  width: '100%',
                  display: 'flex',
                  marginBottom: '8px',
                  justifyContent: message.type === 'user' ? 'end' : 'start',
                }}
              >
                <li
                  style={{
                    padding: '12px',
                    fontSize: '14px',
                    backgroundColor: message.type === 'user' ? '#004B93' : 'white',
                    color: message.type === 'user' ? 'white' : '#4a4a4a',
                    borderRadius: message.type === 'user' ? '16px 16px 0px 16px' : '16px 16px 16px 0px',
                    maxWidth: '80%',
                    textAlign: 'left',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {message.text}
                </li>
              </ul>
            ))}
            {isLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  padding: '12px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#4a4a4a',
                  borderRadius: '16px 16px 16px 0px',
                  maxWidth: '80%',
                  marginBottom: '8px',
                }}
              >
                Typing...
              </div>
            )}
          </ul>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              borderTop: '1px solid #004B93',
              backgroundColor: 'white',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message"
              style={{
                flex: 1,
                padding: '8px',
                border: 'none',
                outline: 'none',
                borderRadius: '12px',
                marginRight: '8px',
              }}
              disabled={isLoading} // Disable input while loading
            />
            <Image
              onClick={handleSend}
              src={sent}
              width={30}
              height={30}
              alt="send"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      ) : (
        <Image src={catIcon} width={100} height={100} alt="chatbot" />
      )}
    </div>
  );
}
