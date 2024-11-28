"use client";
import FileComponent from "@/app/components/FileComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { ChevronDown } from "lucide-react";
import APIEndpointModal from "@/app/(docs)/components/APIEndpointModal";
import WidgetComponent from "@/app/(docs)/components/WidgetComponent";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
  getProjectByIdAction,
  updateDescriptionAction,
  uploadExternalFileAction,
} from "@/actions/docAction";
import { getAllFilesService } from "@/services/doc.service";
import toast from "react-hot-toast";
import { dotWave } from "ldrs";
dotWave.register();

export default function Page({ params }) {
  const [activeCollapse, setActiveCollapse] = useState(null);
  const handleClick = (e, idx) => {
    e.stopPropagation();

    setActiveCollapse((prev) => (prev === idx ? null : idx)); // Toggle the specific collapsible by index
  };

  const apiEndpoint = [
    {
      id: 1,
      Controller: "Sessions",
      Endpoints: [
        {
          id: 1,
          method: "POST",
          path: "/api/v1/sessions",
          description: "Create a new session",
        },
        {
          id: 2,
          method: "GET",
          path: "/api/v1/sessions",
          description: "Get all sessions",
        },
        {
          id: 3,
          method: "DELETE",
          path: "/api/v1/sessions",
          description: "Delete a session",
        },
      ],
    },
    {
      id: 2,
      Controller: "Chat",
      Endpoints: [
        {
          id: 4,
          method: "POST",
          path: "/api/v1/chat",
          description: "Chat API endpoint",
        },
        {
          id: 5,
          method: "GET",
          path: "/api/v1/chat",
          description: "Get chat history by session id",
        },
      ],
    },
  ];
  const [resolvedParams, setResolvedParams] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [description, setDescription] = useState(
    projectData?.project_id?.description || ""
  );
  const [uploadedFiles, setUploadedFiles] = useState([]);
  console.log("uploaded files fetch", uploadedFiles);

  useEffect(() => {
    // Resolve the params Promise
    const fetchParams = async () => {
      const result = await params;
      setResolvedParams(result);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    // Fetch the project by ID when resolvedParams is available
    const fetchProjectById = async () => {
      setIsLoading(true);
      if (resolvedParams?.projectId) {
        try {
          const data = await getProjectByIdAction(resolvedParams.projectId);
          setProjectData(data);
        } catch (error) {
          console.error("Error fetching project data:", error);
        } finally {
          setIsLoading(false); // Stop loading
        }
      }
    };

    const fetchAllFiles = async () => {
      if (!resolvedParams?.projectId) return;
      // setIsLoading(true);
      try {
        const files = await getAllFilesService(resolvedParams.projectId);
        console.log("id  files", files);
        setUploadedFiles(files?.payload); // Ensure files is an array

        console.log("uploaded files fetch", files);
      } catch (error) {
        console.error("Error fetching files:", error);
        setUploadedFiles([]); // Set an empty array if there's an error
      }
    };

    fetchProjectById();
    fetchAllFiles();
  }, [resolvedParams]);

  const project = resolvedParams?.projectId
    ? resolvedParams.projectId
    : "No Project";

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDescriptionSave = async () => {
    if (resolvedParams?.projectId) {
      try {
        const res = await updateDescriptionAction(
          resolvedParams.projectId,
          description
        );
      } catch (error) {
        console.error("Error updating description:", error);
      }
    }
  };

  // Callback to handle uploaded files
  const handleFileUpload = async (event) => {
    const file = event[0];
    console.log("file in file handle", file);
    if (!file || !resolvedParams?.projectId) return;

    setIsUploading(true);
    try {
      const response = await uploadExternalFileAction(file, project);
      toast.success("Uploaded File Successfully!");
      console.log("response uploaded:", response);
      // Assuming response includes the file metadata, like `file_name`
      setUploadedFiles((prevFiles) => [...prevFiles, response]);
      // Clear files in FileUpload component after successful upload
      clearFiles();
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setIsUploading(false); // Stop loading
    }
  };
  const clearFiles = () => setUploadedFiles([]);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(projectData?.project_id?.api_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied status after 2 seconds
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-96 h-full">
          <l-dot-wave size="47" speed="1" color="#090854"></l-dot-wave>
        </div>
      ) : (
        <div>
          <div>
            <div className="breadcrumbs mx-10 mt-10 mb-5 text-sm dark:text-gray-400">
              <ul>
                <li>
                  <Link href="/docs/allApps">App</Link>
                </li>
                <li>
                  <Link href={`/docs/allApps/${project}`}>
                    {projectData?.project_id?.project_name}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <h1 className="mx-10 text-4xl font-medium text-primary dark:text-white">
            {projectData?.project_id?.project_name}
          </h1>
          {/* textarea */}
          <div className="w-[80%] ml-10 mr-20 mt-5 p-4 border border-primary dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <div className="mb-4">
              <h2 className="ml-5 text-primary text-xl font-bold dark:text-white">
                Description
                <Image
                  src={"/asset/images/pen.png"}
                  width={16}
                  height={16}
                  className="inline ml-3 mb-2"
                  alt="pen img"
                />
              </h2>
              {/* <textarea
              className="ml-5 mt-2 w-[95%] h-24 font-normal  placeholder-medium placeholder-black  focus:outline-none "
              placeholder={`${projectData?.project_id?.description ? projectData?.project_id.description : "No description"}`}
            /> */}
              <textarea
                className="ml-5 mt-2 w-[95%] h-24 font-normal placeholder-medium dark:placeholder-gray-500 placeholder-black focus:outline-none resize-none overflow-hidden  dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-600  rounded"
                value={description}
                onChange={handleDescriptionChange}
                onBlur={handleDescriptionSave} // Trigger save on blur
                rows={4}
                placeholder={`${
                  projectData?.project_id?.description
                    ? projectData?.project_id.description
                    : "No description"
                }`}
              />
            </div>
          </div>
          {/* api key */}
          <div className="flex flex-col gap-2 mx-10 w-[80%] dark:text-gray-300">
            <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700">
              <svg
                width="28"
                height="28"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.49984"
                  cy="11.6668"
                  rx="3.33333"
                  ry="3.33333"
                  stroke="#004B93"
                />
                <path
                  d="M10 9.16667L12.9167 6.25M14.1667 5L12.9167 6.25M12.9167 6.25L15 8.33333"
                  stroke="#004B93"
                  strokeLinecap="round"
                />
              </svg>

              <span className="text-primary text-xl font-bold  dark:text-gray-200">
                API Key
              </span>
            </label>
            <div className="relative w-full">
              <input
                type="text"
                value={projectData?.project_id?.api_key ?? ""}
                readOnly
                className="w-full pl-8 pr-20 py-3 border font-medium border-primary dark:border-gray-700 rounded-lg text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
              />
              <button
                onClick={handleCopy}
                className="absolute top-1/2 right-5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {copied ? (
                  "Copied!"
                ) : (
                  <Image
                    src={"/asset/images/copy.png"}
                    width="24"
                    height="24"
                    alt="Chat Image"
                  />
                )}
              </button>
            </div>

            <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700 dark:text-gray-200">
              <svg
                width="24"
                height="24"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="18" height="18" fill="transparent" />
                <path
                  d="M16.125 1.875V1.375H16.625V1.875H16.125ZM12.7286 5.97855C12.5333 6.17382 12.2167 6.17382 12.0214 5.97855C11.8262 5.78329 11.8262 5.46671 12.0214 5.27145L12.7286 5.97855ZM15.625 5.25V1.875H16.625V5.25H15.625ZM16.125 2.375H12.75V1.375H16.125V2.375ZM16.4786 2.22855L12.7286 5.97855L12.0214 5.27145L15.7714 1.52145L16.4786 2.22855Z"
                  fill="#004B93"
                />
                <path
                  d="M3 9.75L3.9305 8.8195C4.81283 7.93717 6.2788 8.06935 6.98908 9.09526L7.76644 10.2181C8.43112 11.1781 9.77349 11.367 10.6773 10.6276L11.7241 9.77105C12.5194 9.1204 13.6783 9.17822 14.4048 9.9048L15 10.5"
                  stroke="#004B93"
                  strokeLinecap="round"
                />
                <path
                  d="M8.625 1.875H5.875C3.66586 1.875 1.875 3.66586 1.875 5.875V8.625M16.125 9.375V12.125C16.125 14.3341 14.3341 16.125 12.125 16.125H5.875C3.66586 16.125 1.875 14.3341 1.875 12.125V11.625"
                  stroke="#004B93"
                  strokeLinecap="round"
                />
              </svg>

              <span className="text-primary text-xl font-bold dark:text-gray-200">
                Upload Document
              </span>
            </label>

            {/* Display Uploaded Files */}
            <div>
              {uploadedFiles?.length === 0 ? (
                <div className="inline-flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-3 py-1 mb-5 text-md">
                  <span className="font-medium text-primary dark:text-gray-200 mr-2">
                    No document
                  </span>
                </div>
              ) : (
                <div className="mb-5">
                  <div className="relative w-1/3">
                    <select
                      id="uploadedFilesDropdown"
                      className="appearance-none w-full border border-primary dark:border-gray-700 rounded-lg px-4 py-2 pr-10 text-md focus:outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    >
                      {uploadedFiles.map((file) => (
                        <option key={file.id} value={file.id}>
                          {file.file_name}
                        </option>
                      ))}
                    </select>
                    {/* Custom dropdown icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-primary dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <FileComponent
              uploadedFiles={uploadedFiles}
              onFileUpload={handleFileUpload}
              projectId={project}
              clearFiles={clearFiles}
              isLoading={isUploading}
            />
            <label className="flex items-center mt-5 mb-3 gap-2 text-gray-700 dark:text-gray-200">
              <svg
                width="28"
                height="28"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.45314 5.52303C9.10864 3.88886 9.43639 3.07178 10 3.07178C10.5636 3.07178 10.8914 3.88886 11.5469 5.52303L11.5774 5.59912C11.9477 6.52235 12.1329 6.98396 12.5102 7.26453C12.8876 7.5451 13.383 7.58947 14.3738 7.6782L14.5529 7.69424C16.1744 7.83946 16.9851 7.91207 17.1586 8.42789C17.3321 8.94371 16.73 9.4915 15.5258 10.5871L15.1239 10.9527C14.5143 11.5073 14.2095 11.7846 14.0675 12.1481C14.041 12.2158 14.0189 12.2853 14.0015 12.356C13.9081 12.7349 13.9974 13.1371 14.1759 13.9417L14.2315 14.1921C14.5595 15.6707 14.7236 16.4101 14.4372 16.7289C14.3301 16.8481 14.191 16.9339 14.0365 16.9761C13.623 17.0889 13.036 16.6105 11.8618 15.6538C11.0909 15.0255 10.7054 14.7114 10.2628 14.6408C10.0887 14.613 9.9113 14.613 9.73721 14.6408C9.29462 14.7114 8.90914 15.0255 8.13816 15.6538C6.96403 16.6105 6.37697 17.0889 5.96347 16.9761C5.80895 16.9339 5.66986 16.8481 5.56284 16.7289C5.27644 16.4101 5.44047 15.6707 5.76853 14.1921L5.8241 13.9417C6.00261 13.1371 6.09186 12.7349 5.99848 12.356C5.98106 12.2853 5.95903 12.2158 5.93253 12.1481C5.79047 11.7846 5.48567 11.5073 4.87609 10.9527L4.47419 10.5871C3.26998 9.4915 2.66788 8.94371 2.84136 8.42789C3.01484 7.91207 3.8256 7.83946 5.44711 7.69424L5.62623 7.6782C6.61699 7.58947 7.11237 7.5451 7.48975 7.26453C7.86712 6.98396 8.05229 6.52235 8.42261 5.59912L8.45314 5.52303Z"
                  stroke="#004B93"
                />
              </svg>

              <span className="text-primary text-xl font-bold dark:text-gray-200">
                API Service
              </span>
            </label>

            {uploadedFiles ? (
              <div>
                {apiEndpoint?.map((endpoint, idx) => (
                  <div key={idx}>
                    <Collapsible.Root className="w-full cursor-pointer ml-5">
                      <div className="rounded p-2.5 ">
                        <Collapsible.Trigger
                          asChild
                          onClick={(e) => handleClick(e, idx)}
                        >
                          <div
                            className={cn(
                              "flex justify-between items-center pr-3 text-left transition-colors text-primary dark:text-gray-200 pl-2 pb-3 text-2xl border-b-[0.8px] border-primary dark:border-gray-700 font-bold"
                            )}
                          >
                            <span>{endpoint.Controller}</span>
                            <ChevronDown
                              className={`my-auto h-6 w-6 transition-transform ${
                                activeCollapse === idx
                                  ? "transform rotate-180"
                                  : "rotate-0"
                              }`}
                            />
                          </div>
                        </Collapsible.Trigger>
                      </div>

                      {/* Conditionally render Collapsible.Content based on activeCollapse */}
                      {endpoint?.Endpoints.map((endpoint, id) => (
                        <Collapsible.Content
                          key={id}
                          open={activeCollapse === idx}
                          className="w-4/5"
                        >
                          <div
                            className="my-2.5 rounded grid grid-cols-7 p-2.5 cursor-pointer"
                            onClick={() =>
                              document
                                .getElementById(`my_modal_${endpoint?.id}`)
                                .showModal()
                            }
                          >
                            <span className="col-span-2 pl-2 w-full py-2 text-xl font-semibold dark:text-gray-200">
                              {endpoint.path}
                            </span>
                            <div className="col-span-5">
                              <div className="flex justify-start items-center h-full">
                                <span
                                  className={`text-xs rounded-md px-8 font-semibold w-12 h-5 text-white ml-10 flex justify-center items-center ${
                                    endpoint.method === "POST"
                                      ? "bg-[#49CC90]"
                                      : endpoint.method === "GET"
                                      ? "bg-[#61AFFE]"
                                      : "bg-[#C9002B]"
                                  }`}
                                >
                                  {endpoint.method}
                                </span>
                                <span className="w-auto text-base font-normal text-[#878787] dark:text-gray-400 ml-10">
                                  {endpoint.description}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Modal for each endpoint */}
                          <APIEndpointModal idx={endpoint?.id} />
                        </Collapsible.Content>
                      ))}
                    </Collapsible.Root>
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}

            {/* widget */}
            <div className="flex items-center mb-6 gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3.3335"
                  y="4.23584"
                  width="5"
                  height="5.83333"
                  rx="1"
                  stroke="#004B93"
                  strokeLinejoin="round"
                />
                <rect
                  x="3.3335"
                  y="13.4023"
                  width="5"
                  height="4.16667"
                  rx="1"
                  stroke="#004B93"
                  strokeLinejoin="round"
                />
                <rect
                  x="11.6665"
                  y="4.23584"
                  width="5"
                  height="4.16667"
                  rx="1"
                  stroke="#004B93"
                  strokeLinejoin="round"
                />
                <rect
                  x="11.6665"
                  y="11.7358"
                  width="5"
                  height="5.83333"
                  rx="1"
                  stroke="#004B93"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-primary text-xl font-bold dark:text-gray-200">
                Widget
              </span>
            </div>

            <div className="mb-20">
              <WidgetComponent projectId={project} apiKey = {projectData?.project_id?.api_key}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
