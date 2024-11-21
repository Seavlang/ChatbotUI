"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CopyBlock, ocean } from "react-code-blocks";

export default function Page() {
  const codeString = `curl -X 'POST' 
    'http://localhost:8001/api/v1/chatbot/get_all_chat_session' 
    -H 'accept: application/json' 
    -H 'Authorization: Bearer REST_API_KEY’
    `;

  return (
    <div className="grid grid-cols-12 bg-white dark:bg-gray-900 dark:text-gray-300 min-h-screen">
      {/* Main Content */}
      <div className="col-span-9">
        <h1 className="mx-10 mt-10 mb-5 text-4xl font-medium text-primary dark:text-white">
          REST API Overview
        </h1>
        <hr className="w-[80%] mb-5 ml-10 border-gray-300 dark:border-gray-700" />
        <p className="ml-10 mr-20">
          Our API is built on RAG Architecture (Retrieval-Augmented Generation).
          This powerful framework combines the capabilities of Generative AI
          with Natural Language Processing (NLP) and retrieval systems to
          enhance the accuracy and relevance of generated responses.
        </p>
        <h1 className="ml-10 my-5 text-lg font-medium dark:text-white">
          What is RAG?
        </h1>
        <div className="ml-10 mr-20">
          <p className="mb-5 dark:text-gray-400">
            Retrieval-Augmented Generation (RAG) is a state-of-the-art technique
            in AI. It works by:
          </p>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-400">
            <li>
              <h2 className="font-medium mb-2 dark:text-gray-300">
                Retrieving relevant information from databases or other sources.
              </h2>
            </li>
            <li>
              <h2 className="font-medium mb-2 dark:text-gray-300">
                Generating human-like responses using Large Language Models
                (LLMs) based on the retrieved data.
              </h2>
            </li>
          </ol>
        </div>
        <p className="ml-10 mr-20 dark:text-gray-400">
          This hybrid approach ensures that the API provides precise,
          context-aware responses, whether you&apos;re retrieving documents or
          interacting with the chatbot.
        </p>

        <Image
          src={"/asset/images/rag.png"}
          className="ml-10 mt-10"
          width={1000}
          height={500}
          alt="rag"
        />

        <p className="ml-10 mt-5 mr-20 dark:text-gray-400">
          (Image showing user interacting with RAG Assistant, which retrieves
          information from documents and generates responses using an LLM)
        </p>

        <h1 className="ml-10 my-5 text-lg font-medium dark:text-white">
          Session Endpoints
        </h1>
        <ul className="list-disc ml-20 mb-5 mr-20 text-gray-700 dark:text-gray-400">
          <li>
            <span className="font-bold dark:text-white"> POST Session: </span>
            Create a session where all interactions between the chatbot and the
            user will occur.
          </li>
          <li>
            <span className="font-bold dark:text-white"> GET Session: </span>
            Retrieve active session data for ongoing interactions.
          </li>
          <li>
            <span className="font-bold dark:text-white"> DELETE Session: </span>
            Close and remove a session once interactions are complete.
          </li>
        </ul>
      </div>

      {/* Sidebar Content */}
      <div className="col-span-3 border-l border-gray-300 dark:border-gray-700">
        <h1 className="ml-10 mt-5 text-lg font-bold dark:text-white">
          Contents
        </h1>
        <div className="ml-16 mb-5 leading-7 font-semibold text-[#878787] dark:text-gray-400">
          <Link href={"#"}>
            <p>What is RAG?</p>
          </Link>
          <Link href={"#"}>
            <p>Session Endpoint</p>
          </Link>
          <Link href={"#"}>
            <p>Document Endpoint</p>
          </Link>
          <Link href={"#"}>
            <p>Chat Endpoint</p>
          </Link>
        </div>
      </div>
    </div>
  );
}