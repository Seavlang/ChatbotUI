import NavbarComponent from "@/app/(playground)/components/NavbarComponent";
import { PlaceHolderComponent } from "@/app/components/PlaceHolderComponent";
import React from "react";
import ChatUI from "../components/ChatUI";
import Chatbot from "@seavlang/chatbottesting1/dist/app/components/Chatbot";
// import Chatbot from '@seavlang/chatbottesting'
export default function page() {
  return (
    <div>
      <div className="bg-white mx-40">
        <NavbarComponent />
      </div>
      <hr />
      <div className="grid grid-cols-10 min-h-screen">
        <div className="col-span-2 border-r-2">sdf</div>
        <div className="col-span-8 -mt-20">
          {/* <ChatUI/> */}
          <Chatbot/>
        </div>
      </div>
    </div>
  );
}
