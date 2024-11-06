"use client";
import FileComponent from "@/app/components/FileComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";

export default function Page({ params: initialParams }) {
  const [params, setParams] = useState(null);

  useEffect(() => {
    (async () => {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    })();
  }, [initialParams]);

  const project = params?.projectId ? params.projectId : "No Project Name";
  
  const apiEndpoint = [
    {
      id: 1,
      Controller: "Sessions",
      Endpoints: [
        { method: "POST", path: "/api/v1/sessions", description: "Create a new session" },
        { method: "GET", path: "/api/v1/sessions", description: "Get all sessions" },
        { method: "DELETE", path: "/api/v1/sessions", description: "Delete a session" },
      ],
    },
    {
      id: 2,
      Controller: "Chat",
      Endpoints: [
        { method: "POST", path: "/api/v1/chat", description: "Chat API endpoint" },
        { method: "GET", path: "/api/v1/chat", description: "Get chat history by session id" },
      ],
    },
  ];

  const [apiKey] = useState("sdfghjklasdfasdfsdafasdfasdfasdfasdfwerwet");
  const [copySuccess, setCopySuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, project_id: 3, file_name: "Gen11th-advanced-course-preface.pdf", created_at: "2024-11-04T15:14:07.897565" },
    { id: 2, project_id: 3, file_name: "TAG-Research.pdf", created_at: "2024-11-04T15:14:07.897565" },
  ]);

  const handleFileUpload = (files) => setUploadedFiles((prev) => [...prev, ...files]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const SchemaItem = ({
    name,
    extraInfo,
    status,
    children,
    level = 0,
    isTable = false,
    onTableSelect,
    activeTable,
    className,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = React.Children.count(children) > 0;

    const handleClick = (e) => {
      e.stopPropagation();
      if (hasChildren) setIsOpen(!isOpen);
      if (isTable && onTableSelect) onTableSelect(name);
    };

    const isActive = isTable && activeTable === name;

    return (
      <div className={cn("h-auto", level === 0 ? "ml-0" : "ml-6")}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="h-auto">
          <CollapsibleTrigger
            className={cn(
              "flex items-center w-full text-left transition-colors",
              isActive ? "bg-primary1 text-primary-foreground" : "hover:bg-gray-200",
              className
            )}
            onClick={handleClick}
          >
            <div className="w-full flex justify-between">
              <span className="ml-2">{name}</span>
              {hasChildren && (
                <ChevronDown className={`my-auto h-6 w-6 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
              )}
              {extraInfo && <div className="w-auto text-base font-normal my-auto text-[#878787] ml-10">{extraInfo}</div>}
              {status && (
                <div
                  className={`text-xs my-auto rounded-md font-semibold w-14 h-5 text-white ml-10 flex justify-center items-center ${
                    status === "POST" ? "bg-[#49CC90]" : status === "GET" ? "bg-[#61AFFE]" : "bg-[#C9002B]"
                  }`}
                >
                  {status}
                </div>
              )}
            </div>
          </CollapsibleTrigger>
          {hasChildren && <CollapsibleContent>{children}</CollapsibleContent>}
        </Collapsible>
      </div>
    );
  };

  const [activeTable, setActiveTable] = useState(null);
  const handleTableSelect = (tableName) => setActiveTable(tableName);

  return (
    <div>
      <div className="breadcrumbs mx-10 mt-10 mb-5 text-sm">
        <ul>
          <li>
            <Link href="/docs/allApps">App</Link>
          </li>
          <li>
            <Link href={`/docs/allApps/${project}`}>{project}</Link>
          </li>
        </ul>
      </div>
      <h1 className="mx-10 text-4xl mb-10 font-medium text-primary">{project}</h1>

      <div className="w-[80%] ml-10 mr-20 mt-5 p-4 border border-primary rounded-lg">
        <div className="mb-4">
          <h2 className="ml-5 text-primary text-xl font-bold">
            Description
            <Image src={"/asset/images/pen.png"} alt="edit" width={16} height={16} className="inline ml-3 mb-2" />
          </h2>
          <textarea
            className="ml-5 mt-2 w-[95%] h-24 font-normal placeholder-medium placeholder-black focus:outline-none"
            placeholder="Notification Service Provider"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-10 w-[80%]">
        <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700">
          <span className="text-primary text-xl font-bold">API Key</span>
        </label>
        <div className="relative w-full">
          <input
            type="text"
            value={apiKey}
            readOnly
            className="w-full px-8 py-3 pr-12 border font-normal border-primary rounded-lg text-sm text-gray-800"
          />
          <button
            onClick={copyToClipboard}
            className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {copySuccess ? "✔️" : <Image alt="copy" src={"/asset/images/copy.png"} width={24} height={24} />}
          </button>
        </div>

        <FileComponent uploadedFiles={uploadedFiles} onFileUpload={handleFileUpload} />

        {apiEndpoint.map((endpoint, idx) => (
          <SchemaItem
            key={idx}
            className="p-1 pl-2 text-2xl border-b-[0.8px] h-12 border-primary font-bold text-primary hover:bg-none"
            name={endpoint.Controller}
            onTableSelect={handleTableSelect}
            activeTable={activeTable}
          >
            {endpoint.Endpoints.map((endpoint, idx) => (
              <SchemaItem
                key={idx}
                name={endpoint.path}
                extraInfo={endpoint.description}
                status={endpoint.method}
                className="pl-2 w-1/2 py-2 text-xl font-semibold"
              />
            ))}
          </SchemaItem>
        ))}
      </div>
    </div>
  );
}
