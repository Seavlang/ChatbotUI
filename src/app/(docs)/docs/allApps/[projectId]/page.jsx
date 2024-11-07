"use client";
import FileComponent from "@/app/components/FileComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import APIEndpointModal from "@/app/(docs)/components/APIEndpointModal";

export default function Page({ params }) {


  const apiEndpoint = [
    {
      "id": 1,
      "Controller": "Sessions",
      "Endpoints": [
        {
          "method": "POST",
          "path": "/api/v1/sessions",
          "description": "Create a new session"
        },
        {
          "method": "GET",
          "path": "/api/v1/sessions",
          "description": "Get all sessions"
        },
        {
          "method": "DELETE",
          "path": "/api/v1/sessions",
          "description": "Delete a session"
        },
      ]
    },
    {
      "id": 2,
      "Controller": "Chat",
      "Endpoints": [
        {
          "method": "POST",
          "path": "/api/v1/chat",
          "description": "Chat API endpoint"
        },
        {
          "method": "GET",
          "path": "/api/v1/chat",
          "description": "Get chat history by session id"
        }
      ]
    },
  ]

  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    // Resolve the params Promise
    const fetchParams = async () => {
      const result = await params;
      setResolvedParams(result);
    };

    fetchParams();
  }, [params]);


  // Example of accessing a specific property
  const project = resolvedParams?.projectId ? resolvedParams.projectId : "No Project Name";

  const [apiKey] = useState("sdfghjklasdfasdfsdafasdfasdfasdfasdfwerwet");
  const [copySuccess, setCopySuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([

    {
      "id": 1,
      "project_id": 3,
      "file_name": "Gen11th-advanced-course-preface.pdf",
      "created_at": "2024-11-04T15:14:07.897565"
    },
    {
      "id": 2,
      "project_id": 3,
      "file_name": "TAG-Research.pdf",
      "created_at": "2024-11-04T15:14:07.897565"
    }

  ])

  // Callback to handle uploaded files
  const handleFileUpload = (files) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const openModal = (id) => {
    console.log("id: ", id)
    document.getElementById("my_modal_1").showModal()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset the success message after 2 seconds
  };

  const SchemaItem = ({
    name,
    extraInfo,
    status,   // Another prop for extra information
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
      if (hasChildren) {
        setIsOpen(!isOpen);
      }

      if (isTable && onTableSelect) {
        onTableSelect(name);
      }
    };

    const isActive = isTable && activeTable === name;

    return (
      <div className={cn(" w-full h-auto", level === 0 ? "ml-0" : "ml-6")} >
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
          <CollapsibleTrigger
            className={cn(
              "flex items-center w-full text-left transition-colors",
              isActive
                ? "bg-primary1 text-primary-foreground"
                : "hover:bg-gray-200 ",
              className
            )}
            onClick={handleClick}
          >
            <div className=" w-1/2 flex justify-between">
              <span className="ml-2 ">{name}</span>
              {hasChildren && (
                <ChevronDown
                  className={`my-auto h-6 w-6 transition-transform ${isOpen ? "transform rotate-180" : ""
                    }`}
                />
              )}
              {extraInfo && (
                <div className="w-auto text-base font-normal my-auto text-[#878787] ml-10">{extraInfo}</div>
              )}
              {status && (
                <div className={`text-xs my-auto rounded-md font-semibold w-14 h-5  text-white ml-10 flex justify-center items-center 
                  ${status == 'POST' ? 'bg-[#49CC90]' : status == 'GET' ? 'bg-[#61AFFE]' : 'bg-[#C9002B]'}
                  `}>{status}</div>
              )}
            </div>

          </CollapsibleTrigger>
          {hasChildren && (
            <CollapsibleContent className="w-full pl-6 py-2">
              <div>
                <span className="w-full border-l border-gray-200 pl-4">
                  <span className="w-full flex flex-col space-y-2">
                    {children}
                  </span>
                </span>

              </div>

            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    );
  };

  const [activeTable, setActiveTable] = useState(null);

  const handleTableSelect = (tableName) => {
    setActiveTable(tableName);
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
      <h1 className="mx-10 text-4xl mb-10 font-medium text-primary">{project}</h1>
      {/* textarea */}
      <div className="w-[80%] ml-10 mr-20 mt-5 p-4 border border-primary rounded-lg">
        <div className="mb-4">
          <h2 className="ml-5 text-primary text-xl font-bold">Description
            <Image src={"/asset/images/pen.png"} width={16} height={16} className="inline ml-3 mb-2" alt="pen img" />
          </h2>
          <textarea
            className="ml-5 mt-2 w-[95%] h-24 font-normal  placeholder-medium placeholder-black  focus:outline-none "
            placeholder="Notification Service Provider"
          />
        </div>
      </div>
      {/* api key */}
      <div className="flex flex-col gap-2  mx-10 w-[80%] ">
        <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700">
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="7.49984" cy="11.6668" rx="3.33333" ry="3.33333" stroke="#004B93" />
            <path d="M10 9.16667L12.9167 6.25M14.1667 5L12.9167 6.25M12.9167 6.25L15 8.33333" stroke="#004B93" strokeLinecap="round" />
          </svg>

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
            {copySuccess ? (
              "✔️"
            ) : (
              <Image src={"/asset/images/copy.png"} width={24} height={24} alt="copy img" />
            )}
          </button>
        </div>
        <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700">
          <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="18" fill="white" />
            <path d="M16.125 1.875V1.375H16.625V1.875H16.125ZM12.7286 5.97855C12.5333 6.17382 12.2167 6.17382 12.0214 5.97855C11.8262 5.78329 11.8262 5.46671 12.0214 5.27145L12.7286 5.97855ZM15.625 5.25V1.875H16.625V5.25H15.625ZM16.125 2.375H12.75V1.375H16.125V2.375ZM16.4786 2.22855L12.7286 5.97855L12.0214 5.27145L15.7714 1.52145L16.4786 2.22855Z" fill="#004B93" />
            <path d="M3 9.75L3.9305 8.8195C4.81283 7.93717 6.2788 8.06935 6.98908 9.09526L7.76644 10.2181C8.43112 11.1781 9.77349 11.367 10.6773 10.6276L11.7241 9.77105C12.5194 9.1204 13.6783 9.17822 14.4048 9.9048L15 10.5" stroke="#004B93" strokeLinecap="round" />
            <path d="M8.625 1.875H5.875C3.66586 1.875 1.875 3.66586 1.875 5.875V8.625M16.125 9.375V12.125C16.125 14.3341 14.3341 16.125 12.125 16.125H5.875C3.66586 16.125 1.875 14.3341 1.875 12.125V11.625" stroke="#004B93" strokeLinecap="round" />
          </svg>

          <span className="text-primary text-xl font-bold">
            Upload Document
          </span>
        </label>
        {/* Display Uploaded Files */}
        <div>
          {uploadedFiles?.length == 0 ? (
            <div className="inline-flex items-center border border-gray-300 rounded-md px-3 py-1 mb-5 text-md">
              <span className="font-medium text-primary mr-2">No document</span>
            </div>
          ) : (
            <ul>
              {uploadedFiles?.map((file, index) => (
                <div className="inline-flex mr-2 items-center border border-gray-300 rounded-md mb-5 px-3 py-1 text-md">
                  {" "}
                  <li key={index} className="font-medium text-primary mr-2">
                    {file?.file_name}
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
        <FileComponent uploadedFiles={uploadedFiles} onFileUpload={handleFileUpload} />
        <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700">
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.45314 5.52303C9.10864 3.88886 9.43639 3.07178 10 3.07178C10.5636 3.07178 10.8914 3.88886 11.5469 5.52303L11.5774 5.59912C11.9477 6.52235 12.1329 6.98396 12.5102 7.26453C12.8876 7.5451 13.383 7.58947 14.3738 7.6782L14.5529 7.69424C16.1744 7.83946 16.9851 7.91207 17.1586 8.42789C17.3321 8.94371 16.73 9.4915 15.5258 10.5871L15.1239 10.9527C14.5143 11.5073 14.2095 11.7846 14.0675 12.1481C14.041 12.2158 14.0189 12.2853 14.0015 12.356C13.9081 12.7349 13.9974 13.1371 14.1759 13.9417L14.2315 14.1921C14.5595 15.6707 14.7236 16.4101 14.4372 16.7289C14.3301 16.8481 14.191 16.9339 14.0365 16.9761C13.623 17.0889 13.036 16.6105 11.8618 15.6538C11.0909 15.0255 10.7054 14.7114 10.2628 14.6408C10.0887 14.613 9.9113 14.613 9.73721 14.6408C9.29462 14.7114 8.90914 15.0255 8.13816 15.6538C6.96403 16.6105 6.37697 17.0889 5.96347 16.9761C5.80895 16.9339 5.66986 16.8481 5.56284 16.7289C5.27644 16.4101 5.44047 15.6707 5.76853 14.1921L5.8241 13.9417C6.00261 13.1371 6.09186 12.7349 5.99848 12.356C5.98106 12.2853 5.95903 12.2158 5.93253 12.1481C5.79047 11.7846 5.48567 11.5073 4.87609 10.9527L4.47419 10.5871C3.26998 9.4915 2.66788 8.94371 2.84136 8.42789C3.01484 7.91207 3.8256 7.83946 5.44711 7.69424L5.62623 7.6782C6.61699 7.58947 7.11237 7.5451 7.48975 7.26453C7.86712 6.98396 8.05229 6.52235 8.42261 5.59912L8.45314 5.52303Z" stroke="#004B93" />
          </svg>

          <span className="text-primary text-xl font-bold">
            API Service
          </span>
        </label>

        {
          uploadedFiles ?
            (<div>
              {
                apiEndpoint?.map((endpoint, idx) => (
                  <SchemaItem
                    key={idx}
                    className="mb-5 p-1 pl-2 text-2xl border-b-[0.8px] h-12 border-primary font-bold text-primary hover:bg-none"
                    name={endpoint.Controller}
                    onTableSelect={handleTableSelect}
                    activeTable={activeTable}
                  >
                    <div className="flex flex-col w-full ">
                      {
                        endpoint?.Endpoints.map((endpoint, idx) => (
                          <div key={idx} >
                            <SchemaItem
                              key={idx}
                              name={endpoint.path}
                              extraInfo={endpoint.description}
                              status={endpoint.method}
                              className="pl-2 w-full py-2 text-xl font-semibold "

                            />

                            <button onClick={() => document.getElementById("my_modal_1").showModal()}>ffffffff</button>
                          </div>

                        ))
                      }
                    </div>
                  </SchemaItem>
                ))
              }
            </div>)
            :
            (<div></div>)
        }
        <APIEndpointModal />
      </div>
    </div>
  );
}