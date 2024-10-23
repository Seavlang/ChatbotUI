"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileComponent({ onFileUpload }) { // Accept a callback prop
    const [files, setFiles] = useState([]);

    const handleFileUpload = (files) => {
      setFiles(files);
      console.log(files);
      onFileUpload(files); // Call the callback to pass the files to the parent component
    };

    return (
      <div className="w-full max-w-full  min-h-32 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload onChange={handleFileUpload} />
      </div>
    );
}
