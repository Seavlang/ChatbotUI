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

#Testing Project 
In this example I have uploaded the file that contains the final project of 11th Gen Student, which includes groups (LMS, EasyCart,FinTrack,TradeWise,AutoPilot,e-certify,DataVue)

You can test the package with this: 
  session id =  "14", 
  project id =  "8", 
  api key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X25hbWUiOiJzZWF2bGFuZyIsImVtYWlsIjoic2lldmxhbmd2ZXlAZ21haWwuY29tIn0.BYKAF4dQl34kppfrH_SS29ef4se5Qpr3cQ-1iNaolX0"

#Suggest Questions: 
-What problem does the AutoPilot platform aim to solve for developers?
-How does LMS support multiple languages for leave management?
-What is the primary purpose of the easycart mobile application?
-How does FinTrack assist bank clients with transaction notifications?
-What technology does e-Certify use to ensure certificate authenticity and security?
-What key feature does TradeWise offer to connect buyers and sellers?
-What types of notifications can FinTrack send to its users?
-How does DataVue provide financial information to users?
-In what ways does the AutoPilot platform support CI/CD for developers?
-How does LMS streamline the leave request process for employees?