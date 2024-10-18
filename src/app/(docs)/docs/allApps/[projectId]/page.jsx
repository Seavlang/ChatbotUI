"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Page({ params }) {
  // Ensure params is an object
  params = params || {};
  console.log("params", params); // Debugging to inspect the params object

  // Example of accessing a specific property
  const project = params.projectId ? params.projectId : "No Project Name";

  const [apiKey] = useState("sdfghjklasdfasdfsdafasdfasdfasdfasdfwerwet");
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset the success message after 2 seconds
  };
  return (
    <div>
      <div>
        <div className="breadcrumbs mx-10  mt-10 mb-5 text-sm">
          <ul>
            <li>
              <Link href="/docs/allApps">App</Link>
            </li>
            <li>
              <Link href={`/docs/allApps/${project}`}>{project}</Link>
            </li>
          </ul>
        </div>
      </div>
      <h1 className="mx-10 text-4xl font-medium text-primary">My Apps</h1>
      {/* textarea */}
      <div className="w-[80%] ml-10 mr-20 mt-10 p-4 border border-blue-500 rounded-lg">
        <div className="mb-4">
          <h2 className="text-blue-700 font-semibold">Description</h2>
          <textarea
            className="w-full h-24 p-2    focus:outline-none "
            placeholder="Notification Service Provider"
          />
        </div>
      </div>
      {/* api key */}
      <div className="flex flex-col gap-2  mx-10 w-[80%] mt-10 mb-5">
      <label className="flex items-center gap-2 text-gray-700">
        <span role="img" aria-label="key">
          🔑
        </span>
        <span>API Key</span>
      </label>
      <div className="relative w-full">
        <input
          type="text"
          value={apiKey}
          readOnly
          className="w-full px-3 py-3 pr-12 border border-blue-500 rounded-lg text-sm text-gray-800"
        />
        <button
          onClick={copyToClipboard}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {copySuccess ? '✔️' : <Image src={'/asset/images/copy.png'} width={24} height={24}/>}
        </button>
      </div>
    </div>
    </div>
  );
}
