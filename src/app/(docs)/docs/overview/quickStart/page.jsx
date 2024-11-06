"use client";
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
    <div className="grid grid-cols-12">
      <div className="col-span-9">
        <div className=" flex justify-center">
        <div className="w-4/5">
          <h1 className="mx-10  mt-10 mb-5 text-4xl font-medium text-primary">
            Quick Start
          </h1>
          <hr className="w-[80%] mb-5 ml-10" />
          <p className="ml-10 mr-20">
            Welcome to our API service! This guide will help you get started and
            integrate our API into your application quickly and efficiently. You
            can interact with our API through HTTP requests from any programming
            language or environment.
          </p>
          <h1 className="ml-10 my-5 text-lg font-medium">Get Your API Key</h1>
          <div class=" ml-10 mr-20 ">
            <p class="text-gray-700 mb-4">
              To authenticate and interact with the API, you will need an API key.
              Follow these steps to get started:
            </p>

            <ol class="list-decimal pl-6 space-y-4 text-gray-700">
              <li>
                <h2 class="font-semibold mb-2">Generate Your API Key:</h2>
                <ul class="list-disc pl-6 space-y-2">
                  <li>You can create an API key at the user account level.</li>
                  <li>
                    Navigate to{" "}
                    <span class="font-medium">
                      Profile &gt; Settings &gt; API Keys
                    </span>{" "}
                    to create and manage your API keys.
                  </li>
                  <li>
                    Each API key is tied to a specific project. To interact with
                    multiple apps, you’ll need separate API keys for each.
                  </li>
                </ul>
              </li>

              <li>
                <h2 class="font-semibold mb-2">Keep Your Key Secure:</h2>
                <ul class="list-disc pl-6 space-y-2">
                  <li>
                    Your API key is confidential. Do not share it with others or
                    expose it in public repositories.
                  </li>
                  <li>
                    If you suspect that your key has been compromised, regenerate
                    the key immediately from your account settings.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
          <h1 className="ml-10 my-5 text-lg font-medium">
            Making Your First Request
          </h1>
          <p className="ml-10 mr-20">
            To interact with our API, send an HTTP request to one of the available
            endpoints. Here is an example of how to use a GET request:
          </p>
          <div className="mt-5 ml-10 mr-10">
            <div className="bg-[#004655] rounded-lg overflow-hidden">
              {/* Title Section */}
              <div className="bg-[#004655] text-white border-b-[1px] border-white px-4 py-2 flex justify-between items-center">
                <span className="font-semibold">REQUEST</span>
                {/* Copy Button (optional for style, not functional here) */}
                <button className="text-gray-400 hover:text-white">📋</button>
              </div>

              <div className="mx-4 pt-3">
                {/* Code Block */}
                <CopyBlock
                  text={codeString}
                  language="bash"
                  showLineNumbers={false}
                  theme={{
                    ...ocean,
                    backgroundColor: "#004655", // Adjusted background color
                    color: "#d1e8ff",
                  }}
                />
              </div>

            </div>
          </div>
          <p className="ml-10 mt-5 mr-20">
            This request will return a JSON response from the server. Make sure to
            replace <span className="font-bold">YOUR_API_KEY</span> with the
            actual key from your account.
          </p>

          <h1 className="ml-10 my-5 text-lg font-medium">API Documentation</h1>
          <div className="ml-10 my-5 mr-20">
            <p class="text-gray-700 mb-4">
              Refer to our{" "}
              <Link
                href="/docs/overview/quickStart"
                className="text-blue-600 underline"
              >
                API Overview
              </Link>{" "}
              and{" "}
              <Link href="/docs/example" className="text-blue-600 underline">
                Examples
              </Link>{" "}
              sections for more detailed instructions on how to use various
              endpoints, including how to:
            </p>
            <ul class="list-disc pl-6 text-gray-700">
              <li>Create a session</li>
              <li>Upload documents</li>
            </ul>
          </div>
        </div>
        </div>
      

      </div>
      <div className="col-span-3 border-l ">
        <h1 className="ml-5 mt-5 text-md font-bold">Contents</h1>
        <div className="ml-8 mb-5 leading-7 font-semibold text-[#878787]">
          {" "}
          <Link href={"#"}>
            {" "}
            <p>Get Your API Key</p>{" "}
          </Link>
          <Link href={"#"}>
            {" "}
            <p> Making Your First Request</p>
          </Link>
          <Link href={"#"}>
            {" "}
            <p>API Documentation</p>{" "}
          </Link>
          <Link href={"#"}>
            {" "}
            <p>Troubleshooting</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
