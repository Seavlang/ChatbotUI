'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export const uploadFilePlaygroundService = async (sessionId, uploadedFiles) => {
  const headers = await reqHeader(); // Assuming reqHeader() adds necessary headers
  const formData = new FormData();
  formData.append('file', uploadedFiles); // Append the file to the form data

  try {
    const response = await fetch(
      `${authUrl}/files/upload?session=${sessionId}`,
      {
        method: 'POST',
        headers: { ...headers },
        body: formData, // Send form data as the request body
        // next: {
        //   tag: ["fileService"],
        // },
      }
    );
    const data = await response?.json();
    console.log('UPLOADPLAYGROUND',response);
    if(response.ok === true){
      revalidateTag('fileService')
      revalidateTag('sessions');
    }
    console.log("data: ",response)
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};


export const getAllFilesService = async (sessionId) => {
  const headers = await reqHeader();
  try {
    const response = await fetch(
      `${authUrl}/files/get_all_files/${sessionId}`,
      {
        method: 'GET',
        headers: { ...headers },
        next: {
          tag: ["fileService"],
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to upload file:', response.statusText);
      return null;
    }

    const data = await response?.json();
    console.log('Retrieve Files successfully:', data);
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}
export const getAllSessionFilesService = async (session) => {
  const headers = await reqHeader();
  try {
    const sessionData = session
    const response = await fetch(
      `${authUrl}/files/get_all_files_by_session?session=${sessionData?.sessionId}`,
      {
        method: 'GET',
        headers: { ...headers },
        next: {
          tag: ["fileService"],
        },
      }
    );
    const data = await response.json();
    console.log('Retrieve Files successfully:', data);
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}