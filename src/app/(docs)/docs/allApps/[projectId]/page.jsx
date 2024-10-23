"use client";
import FileComponent from "@/app/components/FileComponent";
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
  const [uploadedFiles, setUploadedFiles] = useState([]); // Store uploaded files

  // Callback to handle uploaded files
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

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
      <div className="w-[80%] ml-10 mr-20 mt-5 p-4 border border-primary rounded-lg">
        <div className="mb-4">
          <h2 className="text-primary text-xl font-semibold">Description
            <Image src={"/asset/images/pen.png"} width={16} height={16} className="inline ml-3 mb-2"/>
          </h2>
          <textarea
            className="w-full h-24 p-2 font-medium  placeholder-medium placeholder-black  focus:outline-none "
            placeholder="Notification Service Provider"
          />
        </div>
      </div>
      {/* api key */}
      <div className="flex flex-col gap-2  mx-10 w-[80%] ">
        <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700">
          <Image src={"/asset/images/key.png"}  width={28} height={28} className="font-bold"/>
          <span className="text-primary text-xl font-semibold">API Key</span>
        </label>
        <div className="relative w-full">
          <input
            type="text"
            value={apiKey}
            readOnly
            className="w-full px-3 py-3 pr-12 border font-medium border-primary rounded-lg text-sm text-gray-800"
          />
          <button
            onClick={copyToClipboard}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {copySuccess ? (
              "✔️"
            ) : (
              <Image src={"/asset/images/copy.png"} width={24} height={24} />
            )}
          </button>
        </div>
        <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700">
          <Image src={"/asset/images/img.png"} width={20} height={20} className="mr-1" />
          <span className="text-primary text-xl font-semibold">
            Upload Document
          </span>
        </label>
        {/* Display Uploaded Files */}
        <div>
          {uploadedFiles.length === 0 ? (
            <div className="inline-flex items-center border border-gray-300 rounded-md px-3 py-1 mb-5 text-md">
              <span className="font-bold text-primary mr-2">No document</span>
            </div>
          ) : (
            <ul>
              {uploadedFiles.map((file, index) => (
                <div  className="inline-flex mr-2 items-center border border-gray-300 rounded-md mb-5 px-3 py-1 text-md">
                  {" "}
                  <li key={index} className="font-bold text-primary mr-2">
                    {file.name}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
        <FileComponent onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
}
