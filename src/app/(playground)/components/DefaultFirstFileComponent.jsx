"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useRef, useState } from "react";
import { createSessionAction } from "@/actions/sessionAction";
import { createDocumentAction } from "@/actions/fileAction";
import { useRouter } from "next/navigation";
import { DefaultPlaceHolderComponent } from "@/app/components/DefaultPlaceHolderComponent";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};
export default function DefaultFirstFileComponent() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(""); // Track error state for invalid files
  const router = useRouter();
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const dismissError = () => {
    setError(""); // Remove the error when clicking the dismiss button
  };

  const handleFileChange = async (newFiles) => {
    const file = newFiles[0];
    if (!file) return;

    try {
      const sessionResult = await createSessionAction();
      const sessionId = sessionResult?.session_id;
      const response = await createDocumentAction(sessionId, file);

      router.push(`/playground/chat/${sessionId}`);
    } catch (e) {
      setError("File upload error: " + e.message);
    } finally {
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    }, // Restrict to PDF and TXT files
    multiple: false,
    onDrop: handleFileChange,
    onDropRejected: (fileRejections) => {
      setError("Invalid file type. Please upload a .pdf or .txt file.");
    },
  });

  return (
    <>
         <div className="flex">
                <div className="ml-5 inline-flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-md">
                    <span className="font-bold text-primary dark:text-gray-200 mr-2">Default</span>
                    <span className="font-normal text-black dark:text-gray-200">Llama3.1</span>
                </div>
            </div>

      <div className="flex mx-auto w-2/3 h-full">
        <div className="flex-grow overflow-y-auto mb-4 space-y-6 p-8">
          <div className="flex flex-row items-center justify-center mt-20">
            <div className="w-full max-w-full min-h-32 flex justify-center bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              <div>
                {/* display uploaded file  */}

                <div className="w-full " {...getRootProps()}>
                  <motion.div
                    onClick={handleClick}
                    whileHover="animate"
                    className="p-10 group/file border-none block rounded-lg cursor-pointer relative overflow-hidden"
                    style={{ height: "220px" }}
                  >
                    <input
                      ref={fileInputRef}
                      id="file-upload-handle"
                      type="file"
                      onClick={(e) =>
                        handleFileChange(Array.from(e.target.files || []))
                      }
                      className="hidden"
                      {...getInputProps()}
                    />
                    {/* <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div> */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-full mb-5 max-w-xl mx-auto">
                        {/* Display error as a dismissible alert */}
                        {error && (
                          <div className="flex items-center w-[80%] justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4  max-w-xl mx-auto">
                            <p className="text-sm">{error}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Stop event propagation to prevent triggering the upload action
                                dismissError();
                              }}
                              className="ml-4 text-red-600"
                            >
                              <IconX size={20} />
                            </button>
                          </div>
                        )}

                        {!files?.length && (
                          <motion.div
                            layoutId="file-upload"
                            variants={mainVariant}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className={cn(
                              "relative  z-40  dark:bg-neutral-900 flex items-center justify-center h-16  w-full max-w-[4rem] mx-auto rounded-md"
                            )}
                          >
                            {isDragActive ? (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-neutral-600 flex flex-col items-center"
                              >
                                Drop it
                              </motion.p>
                            ) : (
                              <Image
                                src={"/asset/images/file.png"} // Default file image
                                width={80}
                                height={80}
                                alt="Default file icon"
                              />
                            )}
                          </motion.div>
                        )}
                        {!files?.length && (
                          <motion.div
                            variants={secondaryVariant}
                            className="absolute opacity-0 inset-0 z-30 bg-transparent flex items-center justify-center h-16 w-full max-w-[4rem] mx-auto rounded-md"
                          ></motion.div>
                        )}
                      </div>
                      <p className="relative z-20 font-sans font-bold text-primary dark:text-neutral-300 text-xl">
                        Drop TXT or PDF file
                      </p>
                      <p className="relative z-20 font-sans font-normal text-primary dark:text-neutral-400 text-md mt-2">
                        Add any file here to add to conversation
                      </p>
                    </div>
                  </motion.div>
                </div>
                {files?.length > 0 &&
                  files?.map((file, idx) => (
                    <motion.div
                      key={"file-upload-" + idx}
                      layoutId={
                        idx === 0 ? "file-upload" : "file-upload-" + idx
                      }
                      className={cn(
                        "relative overflow-hidden z-40 border-2 flex items-center justify-between p-3 mt-4 mx-auto rounded-lg",
                        "shadow-sm"
                      )}
                      style={{
                        borderRadius: "12px",
                        padding: "2px",
                        width: "80%",
                      }}
                    >
                      <div className="flex w-full items-center gap-4">
                        {/* Dynamic Icon based on file extension */}
                        <div className="p-2">
                          {file?.file_name?.endsWith(".pdf") ? (
                            <Image
                              src={"/asset/images/pdf.png"}
                              alt="pdf file"
                              width={40}
                              height={40}
                            />
                          ) : file?.file_name?.endsWith(".txt") ? (
                            <Image
                              src={"/asset/images/txt.png"}
                              alt="txt file"
                              width={40}
                              height={40}
                            />
                          ) : (
                            <Image
                              src={"/asset/images/file.png"}
                              alt="file"
                              width={50}
                              height={50}
                            />
                          )}
                        </div>

                        {/* File Name */}
                        <div className="flex justify-between items-center w-full gap-4">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="text-base font-medium text-gray-900 truncate max-w-40"
                          >
                            {file?.file_name}
                          </motion.p>

                          {/* Remove Icon */}
                          <button
                            type="button"
                            onClick={(e) => handleRemoveFile(idx, e)} // Pass the event to stop propagation
                            className="p-2 text-red-600 hover:text-red-800"
                          >
                            <IconX size={20} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bottom-5 h-screen">
        <div className="flex flex-col items-center h-full">
          <div className="mt-auto w-full max-w-4xl mx-auto mb-20 bg-red-400">
            <DefaultPlaceHolderComponent />
          </div>
        </div>
      </div>
    </>
  );
}