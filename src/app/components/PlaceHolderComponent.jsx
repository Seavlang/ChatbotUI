"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

export function PlaceHolderComponent({ setOnFileUpload, handleSendMessage, setNewMessage }) {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleFileUpload = (files) => {
    setFiles(files);
    console.log("file uploaded: ", files);
    setOnFileUpload(files); // Call the callback to pass the files to the parent component
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("submitted");
  // };

  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(""); // Track error state for invalid files

  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    handleFileUpload && handleFileUpload([...files, ...newFiles]);
    setError(""); // Clear error when a valid file is added
  };

  const handleRemoveFile = (index, e) => {
    e.stopPropagation(); // Prevents the event from triggering the upload action
    const updatedFiles = files.filter((_, idx) => idx !== index);
    setFiles(updatedFiles);
    handleFileUpload && handleFileUpload(updatedFiles); // Notify parent component about file removal
  };

  const handleClick = () => {
    fileInputRef?.current?.click();
  };



  return (
    (<div className="flex flex-nowrap">
      <div className="flex items-end">
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept=".txt,.pdf" // Accepts only .txt and .pdf files
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className=" bg-white flex justify-center items-center w-16 dark:bg-zinc-800 h-14 rounded-2xl overflow-hidden shadow-[0px_10px_25px_rgba(0,0,0,0.2)] transition duration-200 cursor-pointer" onClick={handleClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M11 7V15C11 16.1046 11.8954 17 13 17V17C14.1046 17 15 16.1046 15 15V7C15 4.79086 13.2091 3 11 3V3C8.79086 3 7 4.79086 7 7V15C7 18.3137 9.68629 21 13 21V21C16.3137 21 19 18.3137 19 15V10" stroke="#004B93" strokeWidth="2" strokeLinecap="round" />

          </svg>
        </div>
      </div>

      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={handleSendMessage} setNewMessage={setNewMessage} />
    </div>)
  );
}
