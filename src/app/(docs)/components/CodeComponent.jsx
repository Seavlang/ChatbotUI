import React from 'react'

function CodeComponent({projectId}) {
    const code = `
import  Chatbot  from "@kshrd/chatbotwidget/src/index";

export default function Chat() {
  return 
    (
        <div>
            <Chatbot 
                SessionId="SESSION_ID" 
                projectId=${projectId}
                apiKey="API_KEY"
            />
     </div>;
    )
}`
    return (
        <div>
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    )
}

export default CodeComponent