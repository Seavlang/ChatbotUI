import React from 'react'

function CodeComponent() {
    const code = `
import  Chatbot  from "@kshrd/chatbotwidget/src/index";

export default function Chat() {
  return 
  <div>
    <Chatbot 
        SessionId="Your_session_id" 
        projectId="Your_project_id"  
        apiKey="Your_api_key"
    />
  </div>;
}
`
    return (
        <div>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    )
}

export default CodeComponent