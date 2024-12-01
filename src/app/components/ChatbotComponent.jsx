"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import askMe from "../../../public/asset/images/ask-me-arrow.svg";
import leftArrow from "../../../public/asset/images/scribble 1.svg";
import { chatbotLandingService } from "@/services/auth/user.service";
import { v4 } from "uuid";

export default function ChatbotComponent() {
  const [userInput, setUserInput] = useState("");
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create a session ID when the tab opens
    const sessionId = v4();
    sessionStorage.setItem("sessionIDLanding", sessionId);
    console.log("Session created:", sessionId);

    // Remove session ID when leaving the tab
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("sessionIDLanding");
      console.log("Session removed");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sessionStorage.removeItem("sessionIDLanding");
    };
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [submittedQuestions]); // Scroll to the bottom when new messages are added

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    const currentQuestion = userInput;
    setSubmittedQuestions((prev) => [
      ...prev,
      { question: currentQuestion, answer: "Processing..." },
    ]);
    setUserInput("");
    setLoading(true);

    try {
      const sessionId = sessionStorage.getItem("sessionIDLanding");
      const chatbotResponse = await chatbotLandingService(
        currentQuestion,
        sessionId
      );
      const responseText =
        chatbotResponse?.output || "Sorry, no response from the chatbot.";
      console.log("chatbot response: ", chatbotResponse, responseText);
      setSubmittedQuestions((prev) => {
        const updatedQuestions = [...prev];
        updatedQuestions[updatedQuestions.length - 1].answer = responseText;
        return updatedQuestions;
      });
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setSubmittedQuestions((prev) => {
        const updatedQuestions = [...prev];
        updatedQuestions[updatedQuestions.length - 1].answer =
          "Error fetching chatbot response.";
        return updatedQuestions;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative ">
      <div className="h-screen flex justify-end items-center text-justify">
        <form className="bg-white rounded-2xl text-black w-2/3 h-2/3 flex flex-col z-10 shadow-2xl shadow-purple-100">
          <div className="p-10 bg-gradient-to-r from-white to-[#C3EAFF] rounded-t-2xl">
            <p className="text-[#004B93] font-bold text-2xl tracking-wider mb-3">
              Good Morning!
            </p>
            <p>How can I help you today?</p>
          </div>

          <div
            className="flex-grow overflow-y-auto mb-4 no-scrollbar p-6"
            id="chat-container"
          >
            {submittedQuestions.map((qa, index) => (
              <div key={index}>
                <div className="flex justify-end">
                 <div className="bg-gray-100 inline-block  ml-auto p-3 rounded-xl">
                  <p>{qa?.question}</p>
                </div>  
                </div>
               

               
                <div className="flex items-start py-4 gap-3">
                  <span className="p-3 rounded-xl bg-blue-100">
                    {loading && index === submittedQuestions.length - 1
                      ? "Processing..."
                      : qa?.answer}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto sticky bottom-0 p-6">
            <div className="relative w-4/5 mx-auto">
              <input
                type="text"
                id="user-input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none"
                placeholder="Enter question here"
                required
                value={userInput}
                onChange={handleInputChange}
              />

              <button
                className="p-1.5 rounded-full absolute top-0.5 right-0"
                onClick={handleSubmit}
                disabled={loading}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.51002 4.22989L18.07 8.50989C21.91 10.4299 21.91 13.5699 18.07 15.4899L9.51002 19.7699C3.75002 22.6499 1.40002 20.2899 4.28002 14.5399L5.15002 12.8099C5.37002 12.3699 5.37002 11.6399 5.15002 11.1999L4.28002 9.45989C1.40002 3.70989 3.76002 1.34989 9.51002 4.22989Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.43994 12H10.8399"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <div className="absolute -left-[90px] bottom-32">
          <Image src={askMe} alt="ask me with arrow" width={500} height={500} />
        </div>

        <div className="absolute left-[150px] bottom-[154px] z-20">
          <Image
            src={leftArrow}
            alt="ask me with arrow"
            width={184}
            height={184}
          />
        </div>
      </div>
    </div>
  );
}
