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