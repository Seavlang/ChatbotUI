"use client";
import React from "react";
import { FileUploadPlayground } from "@/components/ui/file-upload-playground";

export default function FileComponentPlayground({ uploadedFiles, onFileUpload }) {
  return (
    <div className="w-full max-w-full min-h-32 flex justify-center bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUploadPlayground uploadedFiles={uploadedFiles} onChange={onFileUpload} />
    </div>
  );
}