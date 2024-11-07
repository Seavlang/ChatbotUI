'use server'
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { revalidateTag } from "next/cache";

//  get All Project
export const getAllProjectService = async () => {
    const headers = await reqHeader();
    try {
        const res = await fetch(`${authUrl}/api_generation/project/get_all_projects`, {
        method: "GET",
        headers,
        next: {
            tag: ["project-data"],
          },
      });
  
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
        const res = await fetch(`${authUrl}/api_generation/project/get_project/${projectId}`, {
        method: "GET",
        headers,
        next: {
            tag: ["project-data"],
          },
      });
  
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
        console.log("authenticated1",authUrl);
        const res = await fetch(`http://110.74.194.123:8085/api/v1/api_generation/project/create_project?project_name=${projectName}`, {
        method: "POST",
        headers,
      });
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
    console.log("Attempting to delete project with ID:", projectId);
    console.log("Headers:", headers);
  
    try {
      const response = await fetch(
        `${authUrl}/api_generation/project/delete/${projectId}`,
        {
          method: "DELETE",
          headers,
        }
      );
  
      console.log("Response status:", response.status);
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
export const uploadExternalFileService = async (file, projectId) => {
    const headers = await reqHeader();
    
    // We need to remove the Content-Type header as fetch will set it automatically when sending FormData
    delete headers["Content-Type"];
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch(
        `${authUrl}/files/api_generation/upload?project_id=${projectId}`,
        {
          method: "POST",
          headers: {
            ...headers,
            "Authorization": `Bearer ${headers.Authorization}`,  // Authorization header
            "Accept": "application/json",
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Re-throw the error for handling outside this function
    }
  };