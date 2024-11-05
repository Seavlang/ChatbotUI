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
  return <div>Hello,
    <Chatbot SessionId="1" projectId="2"  apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJzZWF2bGFuZ2JvdCIsImVtYWlsIjoic2lldmxhbmd2ZXlAZ21haWwuY29tIn0.IxAj9clfjkghE0o8cmIhn9LfGuzrASHfyQ1BQjXfVm0"/>
  </div>;
}



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.