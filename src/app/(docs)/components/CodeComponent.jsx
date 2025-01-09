import React from 'react';

function CodeComponent({ projectId, apiKey, sessionId }) {
  const formattedSessionId = sessionId === undefined ? "Processing..." : sessionId;
  const code = `
import  Chatbot  from "@kshrd/chatbotwidget";

export default function Chat() {
  return (
    <div>
      <Chatbot 
        defaultText="Your_welcome_text"
        sessionId="${formattedSessionId}" 
        projectId="${projectId}"
      />
    </div>
  );
}`;

  return (
    <div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeComponent;
