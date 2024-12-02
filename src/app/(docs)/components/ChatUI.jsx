'use client'
import React, { useState } from "react";

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: "assistant", text: "How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return; // Avoid empty submissions

    // Add user's message to the chat
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: input,
    };
    setMessages([...messages, userMessage]);

    // Simulate AI response (this could be replaced by an actual AI call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);

    setInput(""); // Clear the input field
  };

  // Simulate AI response logic (for now, just basic responses)
  const generateAIResponse = (inputText) => {
    if (inputText.toLowerCase().includes("javascript")) {
      return {
        id: messages.length + 2,
        type: "assistant",
        text: "You can add JavaScript to HTML in two ways:",
        code: `
          // Inline JavaScript
          <script>
            console.log("Hello World");
          </script>
          
          // External JavaScript
          <script src="script.js"></script>
        `,
      };
    } else {
      return {
        id: messages.length + 2,
        type: "assistant",
        text: `Sorry, I don't know how to respond to "${inputText}".`,
      };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md space-y-4">
        {/* Display Messages */}
        <div className="bg-white p-4 rounded-lg shadow-md h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${
                message.type === "user" ? "justify-end" : ""
              }`}
            >
              <div
                className={`${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                } p-3 rounded-lg max-w-xs`}
              >
                <p>{message.text}</p>
                {/* Render code snippet if available */}
                {message.code && (
                  <pre className="mt-2 bg-gray-900 text-white p-2 rounded">
                    {message.code}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
