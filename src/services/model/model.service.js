'use server'
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { revalidateTag } from "next/cache";

export const getLMService = async () => {
    const headers = await reqHeader();
    try {
      const res = await fetch(`http://110.74.194.123:8085/api/v1/model_provider/llm`, {
        method: "GET",
        headers,
      });
      console.log("header: ",headers)
      console.log("res ",res)
      if (!res.ok) {
        console.error("Failed to get LM:", res.statusText);
        return null;
      }
      const response = await res?.json();
      console.log("response: ",response)
      return response
    } catch (e) {
      console.log("Error: ", e);
    }
  };