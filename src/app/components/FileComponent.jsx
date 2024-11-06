"use client";
import React, { useEffect, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";

export default function FileComponent({ uploadedFiles, onFileUpload }) { // Accept a callback prop
  return (
    <div className="w-full max-w-full  min-h-32 flex justify-center bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <FileUpload uploadedFiles={uploadedFiles} onChange={onFileUpload} />
    </div>
  );
}
