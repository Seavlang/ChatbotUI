'use server'
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";


export const getCurrentUserService = async () => {
    const headers = await reqHeader();
    try {
        const res = await fetch(`${authUrl}/auth/get_current_user`, {
            method: 'GET',
            headers: headers,
            next: {
                tags: ["user"],
            }
        });
        if (!res.ok) {
            console.error("Failed to get user detail", res.statusText);
            return null;
        }
        const response = await res?.json();
        console.log("response: ", response)
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
}

export const chatbotLandingService = async (inputMessage, sessionId) => {
    const apiUrl = "http://110.74.194.123:1234/hrd_chain/invoke";
  
    const requestBody = {
      input: {
        input: inputMessage,
        session_id: sessionId,
      },
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result; // Returns the chatbot's response
    } catch (error) {
      console.error("Error communicating with the chatbot API:", error);
      throw error;
    }
  };
  