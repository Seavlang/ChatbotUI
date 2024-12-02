"use client";
import React, { useState } from "react";
import { CodeBlock, CopyBlock, github } from "react-code-blocks";
import Image from "next/image";

export default function Page() {
  const codeString = `
    import Chatbot from "@seavlang/hrdchatbotwidget/src/index";

    export default function Home() {
      return (
        <div>
          <Chatbot
            SessionId="<session_id>"
            projectId="<project_id>"
            apiKey="<API_KEY>" />
        </div>
      );
    }

`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-300">
          <h1 className="mx-10 mt-10 mb-5 text-4xl font-medium text-primary dark:text-white">
            Example
          </h1>
          <p className="ml-10 mr-20 mb-5 dark:text-gray-400">
            First up, let&apos;s learn how to use a language model by itself.
            LangChain supports many different language models that you can use
            interchangeably - select the one you want to use below!
          </p>

          <div className="mx-10 rounded-t-md bg-[#004655] dark:bg-gray-700 text-white border-b-[1px] border-white px-4 py-2 flex justify-between items-center">
            <span className="font-semibold">Code</span>

            {/* Custom Copy Button */}
            <button onClick={handleCopy} className="text-gray-400 hover:text-white">
              {copied ? (
                "Copied!"
              ) : (
                <Image
                  src={"/asset/images/copy1.png"}
                  width="24"
                  height="24"
                  alt="Copy Icon"
                />
              )}
            </button>
          </div>
          <div className="mx-10 border-b-2 border-x-2 mb-10 rounded-b-md bg-white dark:bg-gray-800 dark:border-gray-700">
            <CodeBlock
              text={codeString}
              language="html"
              showLineNumbers={false}
              wrapLines
              theme={{
                ...github,
                background: "transparent", // Make background adaptive
                color: "inherit", // Use text color from parent
              }}
            />
          </div>
        </div>
      </div>
    </div>

  );
}
