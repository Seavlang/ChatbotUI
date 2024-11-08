import React from 'react'

function CodeComponent() {
    const code = `
import  Chatbot  from "@seavlang/hrdchatbotwidget/src/index";

export default function Chat() {
  return 
    (
        <div>
            <Chatbot 
                SessionId="SESSION_ID" 
                projectId="PROJECT_ID"  
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