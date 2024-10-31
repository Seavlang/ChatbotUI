"use client";
import { questionAnswerPair } from "../data/conversation";
import Image from "next/image";
import { useEffect, useState } from "react";
import askMe from "../../../public/asset/images/ask-me-arrow.svg";
import leftArrow from "../../../public/asset/images/scribble 1.svg";

export default function ChatbotComponent() {
  const quesAnsPair = questionAnswerPair;

  const [userInput, setUserInput] = useState("");
  const [submittedQuestions, setSubmittedQuestions] = useState([]); // Stores all question-answer pairs
  const [loading, setLoading] = useState(false);

  // Function to get value from input
  const  handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  // Handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") return;

    const matchedQA = quesAnsPair.find(
      (qa) =>
        userInput.toLocaleLowerCase() === qa?.question?.toLocaleLowerCase()
    );

    // Append new question-answer pair to the conversation
    setSubmittedQuestions((prev) => [
      ...prev,
      {
        question: userInput,
        answer: matchedQA
          ? matchedQA.answer
          : "Sorry, I don't have an answer for that.",
      },
    ]);

    setUserInput(""); // Clear input
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  return (
    <div className="relative ">
      <div className="h-screen flex justify-end items-center text-justify  ">
        {/* Chat conversation content */}
        <form className=" bg-white rounded-2xl text-black w-2/3 h-2/3 flex flex-col z-10 shadow-2xl shadow-purple-100">
          {/* gradient header */}
          <div className="p-10 bg-gradient-to-r from-white to-[#C3EAFF] rounded-t-2xl">
            <p className="text-[#004B93] font-bold text-2xl">Good Morning!</p>
            <p>How can I help you today?</p>
          </div>

          {/* Chat messages container */}
          <div className="flex-grow overflow-auto mb-4 no-scrollbar p-6">
            {submittedQuestions.map((qa, index) => (
              <div key={index}>
                {/* User's question */}
                <div className="bg-gray-100 w-3/4 ml-auto p-3 rounded-xl">
                  <p>{qa?.question}</p>
                </div>

                {/* AI response */}
                <div className="flex items-start py-4 gap-3">
                  <Image
                    src={
                      "https://i.pinimg.com/736x/16/ad/53/16ad53d782ae7f59b7ea4c605c34def4.jpg"
                    }
                    alt="ai agent logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="p-3 rounded-xl bg-blue-100">
                    {loading && index === submittedQuestions.length - 1
                      ? "is processing ..."
                      : qa?.answer}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* User input question */}
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

              {/* Icon send */}
              <button
                className="p-1.5 rounded-full absolute top-0.5 right-0"
                onClick={handleSubmit}
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

        {/* arrow image */}
        <div className="absolute -left-[90px] bottom-32">
          <Image src={askMe} alt="ask me with arrow" width={500} height={500} />
        </div>

        {/* left arrow */}
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