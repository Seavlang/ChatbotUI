"use client";
import React, { useEffect, useState } from "react";
import { FileUploadPlayground } from "@/components/ui/file-upload-playground";

export default function FileComponent({ onFileUpload }) { // Accept a callback prop
    const [files, setFiles] = useState([]);

    useEffect(()=>{
      setFiles(onFileUpload)
    },[onFileUpload])

    console.log(" onFileUpload: " , onFileUpload)
    const handleFileUpload = (files) => {
      setFiles(files);
    };

    return (
      <div className="w-full max-w-full  min-h-32 flex justify-center bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUploadPlayground file={files} onChange={handleFileUpload} />
      </div>
    );
}
