"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CodeBlock, CopyBlock, ocean } from "react-code-blocks";

export default function Page() {
  const codeString = `curl -X 'POST' 
    'http://localhost:8001/api/v1/chatbot/get_all_chat_session' 
    -H 'accept: application/json' 
    -H 'Authorization: Bearer REST_API_KEY’
    `;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <div className="grid grid-cols-12 bg-white dark:bg-gray-900 dark:text-gray-300 min-h-screen">
      {/* Main Content */}
      <div className="col-span-9">
        <div className="flex justify-center">
          <div className="w-4/5">
            <h1 className="mx-10 mt-10 mb-5 text-4xl font-medium text-primary dark:text-white">
              Quick Start
            </h1>
            <hr className="w-[80%] mb-5 ml-10 border-gray-300 dark:border-gray-700" />
            <p className="ml-10 mr-20">
              Welcome to our API service! This guide will help you get started
              and integrate our API into your application quickly and
              efficiently. You can interact with our API through HTTP requests
              from any programming language or environment.
            </p>
            <section id="apiKey">
              <h1 className="ml-10 my-5 text-lg font-medium dark:text-white">
                Get Your API Key
              </h1>
              <div className="ml-10 mr-20">
                <p className="text-gray-700 dark:text-gray-400 mb-4">
                  To authenticate and interact with the API, you will need an API
                  key. Follow these steps to get started:
                </p>

                <ol className="list-decimal pl-6 space-y-4 text-gray-700 dark:text-gray-400">
                  <li>
                    <h2 className="font-semibold mb-2 dark:text-white">
                      Generate Your API Key:
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        You can create an API key at the user account level.
                      </li>
                      <li>
                        Navigate to{" "}
                        <span className="font-medium">
                          Profile &gt; Settings &gt; API Keys
                        </span>{" "}
                        to create and manage your API keys.
                      </li>
                      <li>
                        Each API key is tied to a specific project. To interact
                        with multiple apps, you’ll need separate API keys for
                        each.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h2 className="font-semibold mb-2 dark:text-white">
                      Keep Your Key Secure:
                    </h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Your API key is confidential. Do not share it with others
                        or expose it in public repositories.
                      </li>
                      <li>
                        If you suspect that your key has been compromised,
                        regenerate the key immediately from your account settings.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </section>

            <section id="firstRequest">
              <h1 className="ml-10 my-5 text-lg font-medium dark:text-white">
                Making Your First Request
              </h1>
              <p className="ml-10 mr-20">
                To interact with our API, send an HTTP request to one of the
                available endpoints. Here is an example of how to use a GET
                request:
              </p>
              <div className="mt-5 ml-10 mr-10">
                <div className="bg-[#004655] dark:bg-gray-800 rounded-lg overflow-hidden">
                  {/* Title Section */}
                  <div className="bg-[#004655] dark:bg-gray-700 text-white border-b-[1px] border-white px-4 py-2 flex justify-between items-center">
                    <span className="font-semibold">REQUEST</span>

                    {/* Custom Copy Button */}
                    <button
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-white"
                    >
                      {copied ? (
                        "Copied!"
                      ) : (
                        <Image
                          src={"/asset/images/copy1.png"}
                          width="24"
                          height="24"
                          alt="Chat Image"
                        />
                      )}
                    </button>
                  </div>

                  <div className="mx-4 pt-3 font-mono">
                    {/* Code Block */}
                    <CodeBlock
                      text={codeString}
                      language="bash"
                      showLineNumbers={false}
                      theme={{
                        ...ocean,
                        backgroundColor: "#004655",
                        color: "#d1e8ff",
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="ml-10 mt-5 mr-20">
                This request will return a JSON response from the server. Make
                sure to replace <span className="font-bold">YOUR_API_KEY</span>{" "}
                with the actual key from your account.
              </p>
            </section>


            <section id="document">
              <h1 className="ml-10 my-5 text-lg font-medium dark:text-white">
                API Documentation
              </h1>
              <div className="ml-10 my-5 mr-20">
                <p className="text-gray-700 dark:text-gray-400 mb-4">
                  Refer to our{" "}
                  <Link
                    href="/docs/overview/quickStart"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    API Overview
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/docs/example"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    Examples
                  </Link>{" "}
                  sections for more detailed instructions on how to use various
                  endpoints, including how to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-400">
                  <li>Create a session</li>
                  <li>Upload documents</li>
                  <li>Document-based information question and answering</li>
                  <li>Retrieve session histories</li>
                </ul>
              </div>
            </section>

            <section>
              <h1 className="ml-10 my-5 text-lg font-medium dark:text-white">
                Troubleshooting
              </h1>
              <div className="ml-10 my-5 mr-20">
                <p className="text-gray-700 dark:text-gray-400 mb-4">
                  If something goes wrong, our API returns standard HTTP response codes. For example:
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-400">
                  <li><span className="font-semibold text-black">200 OK:</span> Successful request</li>
                  <li><span className="font-semibold text-black">401 Unauthorized:</span> Invalid or missing API key</li>
                  <li><span className="font-semibold text-black">400 Bad Request:</span> The request was invalid or malformed</li>
                  <li><span className="font-semibold text-black">500 Internal Server Error:</span> Something went wrong on our side</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="col-span-3 border-l border-gray-300 dark:border-gray-700">
        <h1 className="ml-5 mt-5 text-md mb-3 font-semibold dark:text-white">
          Contents
        </h1>
        <div className="ml-8 mb-5 leading-7 text-base text-[#878787] dark:text-gray-400">
          <Link href={"#apiKey"}>
            <p>Get Your API Key</p>
          </Link>
          <Link href={"#firstRequest"}>
            <p>Making Your First Request</p>
          </Link>
          <Link href={"#document"}>
            <p>API Documentation</p>
          </Link>
          {/* <Link href={"#troubleshooting"}>
            <p>Troubleshooting</p>
          </Link> */}
        </div>
      </div>
    </div >
  );
}
