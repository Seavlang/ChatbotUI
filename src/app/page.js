'use client';

import { ChatbotAction } from '../action/chatbotAction';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import closeIcon from '../../public/cross.png';
import catIcon from '../../public/cat.png';
import sent from '../../public/sent.png';

export default function Chat({ apiKey, SessionId, projectId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm here to lend a helping hand whenever you need it. What can I do for you?" },
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

    setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
    try {
      const response = await ChatbotAction(input, SessionId , projectId , apiKey);
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: response.output }]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: 'Sorry, there was an error processing your request.' }]);
      console.error('Error:', error);
    }
    setInput('');
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
        bottom: '10px',
        right: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        width: isExpanded ? '450px' : '80px',
        height: isExpanded ? '550px' : '80px',
        borderRadius: isExpanded ? '20px' : '50%',
        overflow: 'hidden',
        backgroundColor: isExpanded ? 'white' : 'transparent'
      }}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      {isExpanded ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid white', borderRadius: '24px', boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'white', color: '#004B93', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
            <span style={{ fontWeight: 'bold' }}>AI Assistant</span>
            <button onClick={() => setIsExpanded(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Image src={closeIcon} width={30} height={30} alt="close" />
            </button>
          </div>
          <ul ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#ebf4ff', margin: 0, listStyle: 'none' }}>
            {messages.map((message, index) => (
             <ul key={index} style={{width: "100%", display: "flex",marginBottom: '8px', justifyContent: message.type === "user" ? "end" : "start"}}>
              {message.type === 'user' ? <li
                
                style={{
                  padding: '12px',
                  fontSize: '14px',
                  backgroundColor: '#004B93',
                  color: 'white',
                  borderRadius: '16px 16px 0px 16px',
                  // float: message.type === 'user' ? 'right' : 'left', // User messages float right, bot messages float left
                  maxWidth: '80%',
                  marginBottom: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  textAlign: 'right', // Align text based on message type
                  wordBreak: 'break-word' ,
                  overflowWrap: 'break-word'
                  
                }}
              >
                {message.text}
              </li> : <li
                style={{
                  padding: '12px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  color: '#4a4a4a',
                  borderRadius: '16px 16px 16px 0px',
                  // float: message.type === 'user' ? 'right' : 'left', // User messages float right, bot messages float left
                  maxWidth: '80%',
                  marginBottom: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  textAlign: 'left' ,// Align text based on message type
                  wordBreak: 'break-word' ,
                  overflowWrap: 'break-word'
                }}
              >
                {message.text}
              </li>}
               
             </ul>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px', borderTop: '1px solid #cbd5e0', backgroundColor: 'white', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
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
                marginRight: '8px'
              }}
            />
            {/* <button onClick={handleSend} style={{ fontSize: '16px', color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
              ➤
            </button> */}
            <Image onClick={handleSend} src={sent} width={30} height={30} alt="close" style={{ cursor: 'pointer' }}/>
          </div>
        </div>
      ) : (
        <Image src={catIcon} width={100} height={100} alt="chatbot" />
      )}
    </div>
  );
}
