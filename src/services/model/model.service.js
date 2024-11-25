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

export const getAllModels = async () => {
  const headers = await reqHeader();
  try {
    const res = await fetch(`${authUrl}/model_provider/all__models`, {
      method: "GET",
      headers,
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

export const getAllProviders = async () => {
  const headers = await reqHeader();
  try {
    const res = await fetch(`${authUrl}/model_provider/all__providers`, {
      method: "GET",
      headers,
    });
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