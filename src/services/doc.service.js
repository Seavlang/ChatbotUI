"use server";
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { revalidateTag } from "next/cache";

//  get All Project
export const getAllProjectService = async () => {
  const headers = await reqHeader();
  try {
    const res = await fetch(
      `${authUrl}/api_generation/project/get_all_projects`,
      {
        method: "GET",
        headers,
        next: {
          tag: ["project-data"],
        },
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};
//  get Project By Id
export const getProjectByIdService = async (projectId) => {
  const headers = await reqHeader();
  try {
    const res = await fetch(
      `${authUrl}/api_generation/project/get_project/${projectId}`,
      {
        method: "GET",
        headers,
        next: {
          tag: ["project-data"],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return null;
  }
};
// create Project
export const createProjectService = async (projectName) => {
  const headers = await reqHeader();
  try {
    const res = await fetch(
      `${authUrl}/api_generation/project/create_project?project_name=${projectName}`,
      {
        method: "POST",
        headers,
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    revalidateTag("project-data");
    return data;
  } catch (error) {
    console.error("Error creating projects:", error);
    return null;
  }
};
//  delete Project
export const deleteProjectService = async (projectId) => {
  const headers = await reqHeader();
  try {
    const response = await fetch(
      `${authUrl}/api_generation/project/delete/${projectId}`,
      {
        method: "DELETE",
        headers,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Return a success message or status if needed
    revalidateTag("project-data"); // Comment out for testing if needed
    return { success: true, message: "Project deleted successfully" };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, message: "Failed to delete project" };
  }
};
//  update Descriptin
export const updateDescriptionService = async (projectId, description) => {
  const headers = await reqHeader();

  try {
    const response = await fetch(
      `${authUrl}/api_generation/project/description/${projectId}`,
      {
        method: "PATCH",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating project description:", error);
    return null;
  }
};
//   upload external file
export const uploadExternalFileService = async (projectId, file) => {
  console.log("file upload service", file, projectId);
  const headers = await reqHeader();

  // Remove Content-Type as FormData will automatically set it
  delete headers["Content-Type"];

  const formData = new FormData();
  formData.append("file", file?.file); // Ensure `file` is an actual File object

  // Log FormData content for debugging
  console.log("FormData file:", formData);

  try {
    const response = await fetch(
      `${authUrl}/files/api_generation/upload?project_id=${projectId}`,
      {
        method: "POST",
        headers: {
          ...headers,
          Authorization: `${headers.Authorization}`, // Authorization header
          Accept: "application/json",
        },
        body: formData,
      }
    );
    console.log("upload response:", response);
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error details from server:", errorDetails);
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${JSON.stringify(
          errorDetails
        )}`
      );
    }

    const data = await response.json();
    revalidateTag("files");
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error for handling outside this function
  }
};
//   get all file by project ID
export const getAllFilesService = async (projectId) => {
  const headers = await reqHeader();
  try {
    const response = await fetch(
      `${authUrl}/files/api_generation/get_all_files/${projectId}`,
      {
        method: "GET",
        headers,
        next: {
          tag: ["files"],
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};
// create Session
export const createProjectSessionService = async (apiKey) => {
  console.log("createssesionapi",apiKey);
  try {
    const res = await fetch(
      `${authUrl}/api_generation/session/create_session`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "REST-API-KEY": apiKey, 
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating projects:", error);
    return null;
  }
};
// test chat
export const chatbotService = async (input, externalSessionId, projectId, apiKey) => {
  console.log("service", input, externalSessionId);
  const response = await fetch('https://api-texbot.kshrd.app/external_chain/invoke', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'REST-API-KEY': apiKey, // Use the dynamic API key
    },
    body: JSON.stringify({
      input: {
        input,
        external_session_id: externalSessionId,
        project_id: projectId
      }
    })
  });

  console.log('Response Status:', response.status); // Log the status for debugging

  if (!response.ok) {
    throw new Error(`Failed to invoke external chain: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("output", data.output);
  return data;
};
// get session in project
export const getAllSessionService = async (apiKey) => {
  try {
    const response = await fetch(
      `${authUrl}/api_generation/session/get_all_sessions`,
      {
        method: "GET",
        headers: {
          "accept": "application/json",
          "REST-API-KEY": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the sessions data
  } catch (error) {
    console.error("Error fetching sessions:", error.message);
    return null;
  }
};

