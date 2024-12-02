'use server'
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { revalidateTag } from "next/cache";

export const getLMService = async () => {
  const headers = await reqHeader();
  try {
    const res = await fetch(`${authUrl}/model_provider/llm`, {
      method: "GET",
      headers,
      next: {
        tag: ["lm"],
      },
    });
    if (!res.ok) {
      console.error("Failed to get LM:", res.statusText);
      return null;
    }
    const response = await res?.json();
    return response
  } catch (e) {
    console.log("Error: ", e);
  }
};

export const getAllModelsService = async () => {
  const headers = await reqHeader();
  try {
    const res = await fetch(`${authUrl}/model_provider/all__models`, {
      method: "GET",
      headers,
      next: {
        tag: ["models"],
      },
    });
    if (!res.ok) {
      console.error("Failed to get all models", res.statusText);
      return null;
    }
    const response = await res?.json();
    console.log("response models: ", response)
    return response
  } catch (e) {
    console.log("Error: ", e);
  }
}

export const getAllProvidersService = async () => {
  const headers = await reqHeader();
  try {
    const res = await fetch(`${authUrl}/model_provider/all_providers`, {
      method: "GET",
      headers,
      next: {
        tag: ["providers"],
      },
    });
    console.log("res: ", res);
    if (!res.ok) {
      console.error("Failed to get all providers", res.statusText);
      return null;
    }
    const response = await res?.json();
    console.log("response providers: ", response)
    return response
  } catch (e) {
    console.log("Error: ", e);
  }
}


export const updateLMService = async (request) => {
  const headers = await reqHeader();
  console.log("Request payload: ", request); // Log request payload for debugging
  headers["Content-Type"] = "application/json"; 
  try {
    const res = await fetch(`${authUrl}/model_provider/update_llm`, {
      method: "PUT",
      headers,
      body: JSON.stringify(request),
      next: {
        tag: ["lm"], // Optional: Verify if this is supported
      },
    });

    // Log response status for debugging
    if (!res.ok) {
      const errorDetails = await res.text();
      console.error("Failed to update LM: ", res.status, errorDetails);
      return null;
    }

    const response = await res.json(); // Ensure the response is valid JSON
    console.log("API Response: ", response);
    return response;

  } catch (error) {
    console.error("Error in updateLMService: ", error.message);
    return null;
  }
};
