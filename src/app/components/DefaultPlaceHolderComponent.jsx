"use client";

import { createDocumentAction } from "@/actions/fileAction";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

export function DefaultPlaceHolderComponent({ session, onChange, socket, selectedDocument }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState();

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleFileChange = async (newFiles) => {
    console.log("first", newFiles)
    const file = newFiles[0];
    // if (!file) return;
    try {
      console.log("session in pages: ", session)
      await createDocumentAction(session?.sessionId, file)
    } catch (e) {
      setError("File upload error: " + e.message);
    } finally {
    }
  };
  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    (
      <>
        <div className="">
          <div className="flex justify-center items-end">
            <div className="mr-5">
              <input
                ref={fileInputRef}
                id="file-upload-handle"
                type="file"
                accept=".txt,.pdf" // Accepts only .txt and .pdf files
                onClick={(e) => handleFileChange(Array.from(e.target.files || []))}
                className="hidden"
              />
              <div className=" bg-white flex justify-center items-center w-16 dark:bg-zinc-800 h-14 rounded-2xl overflow-hidden shadow-[0px_10px_25px_rgba(0,0,0,0.2)] transition duration-200 cursor-pointer" onClick={handleClick}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M11 7V15C11 16.1046 11.8954 17 13 17V17C14.1046 17 15 16.1046 15 15V7C15 4.79086 13.2091 3 11 3V3C8.79086 3 7 4.79086 7 7V15C7 18.3137 9.68629 21 13 21V21C16.3137 21 19 18.3137 19 15V10" stroke="#004B93" strokeWidth="2" strokeLinecap="round" />

                </svg>
              </div>
            </div>

            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={onChange}
              socket={socket}
              selectedDocument={selectedDocument}
            />
          </div>
        </div>
      </>
    )
  );
}
