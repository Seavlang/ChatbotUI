import React from 'react';

function CodeComponent({ projectId, apiKey, sessionId }) {
    const formattedSessionId = sessionId === undefined ? "Processing..." : sessionId;
    const code = `
import Chatbot from "@kshrd/chatbotwidget";

export default function Chat() {
  return (
    <div>
      <Chatbot 
        sessionId="${formattedSessionId}" 
        projectId="${projectId}" 
        apiKey="${apiKey}" 
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
