This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## How to Use

```javascript
import  Chatbot  from "@seavlang/chatbotwidget/src/index";

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



You can test the package with this: 
  session id =  "12", 
  project id =  "5", 
  api key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJzZWF2bGFuZyIsImVtYWlsIjoic2lldmxhbmd2ZXlAZ21haWwuY29tIn0.BYKAF4dQl34kppfrH_SS29ef4se5Qpr3cQ-1iNaolX0"