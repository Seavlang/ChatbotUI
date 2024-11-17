"use client";
import React, { useState } from "react";
import { CodeBlock, CopyBlock, github } from "react-code-blocks";
import Image from "next/image";

export default function Page() {
  const codeString = `
    <ul role="list" className="divide-y divide-gray-100">
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" 
       src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib
       =rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
       <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
      </div>
   </li>
   <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" 
        src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib
       =rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <div className="min-w-0 flex-auto">
         <p className="text-sm font-semibold leading-6 text-gray-900">Michael Foster</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">michael.foster@example.com</p>
       </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">Co-Founder / CTO</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time datetime="2023-01-23T13:23Z">3h ago</time></p>
     </div>
   </li>
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src="https://images.unsplash.com/photo-1506794778202-cad84cf45
          f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">Dries Vincent</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">dries.vincent@example.com</p>
        </div>
     </div>
    </li>
  </ul>`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
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
  );
}
