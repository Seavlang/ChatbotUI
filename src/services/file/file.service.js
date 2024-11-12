'use server'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export const uploadFilePlaygroundService = async (sessionId, uploadedFiles) => {
  const headers = await reqHeader(); // Assuming reqHeader() adds necessary headers
  const formData = new FormData();
  const session = await getServerSession(authOptions);

  if (!session) {
    // Handle case when there's no session
    return null;
  }

  const accessToken = session.access_token;
  formData.append('file', uploadedFiles); // Append the file to the form data

  try {
    console.log("session id in service: ", sessionId)
    const response = await fetch(
      `${authUrl}/files/upload?session=${sessionId}`,
      {
        method: 'POST',
        headers: { ...headers },
        body: formData, // Send form data as the request body
      }
    );

    if (!response.ok) {
      console.error('Failed to upload file:', response.statusText);
      return null;
    }

    const data = await response?.json();
    console.log('File uploaded successfully:', data);
    revalidateTag("fileService");
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