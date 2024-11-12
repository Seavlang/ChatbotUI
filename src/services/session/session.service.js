'use server'
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { revalidateTag } from 'next/cache'

export const getAllSessionService = async () => {
    const headers = await reqHeader();
    try {
        const res = await fetch(`${authUrl}/session/all_session_histories`, {
            method: "GET",
            headers,
            next: {
                tags: ["sessions"],
            },
        });
        if (!res.ok) {
            console.error("Failed to get all sessions", res.statusText);
            return null;
        }
        const response = await res?.json();
        console.log("response: ", response)
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
};

export const createSessionService = async () => {
    const headers = await reqHeader();
    try {
        const res = await fetch(`${authUrl}/session/create_session`, {
            method: "POST",
            headers,
        });
        if (!res.ok) {
            console.error("Failed to create session", res.statusText);
            return null;
        }
        const response = await res?.json();
        console.log("response: ", response)
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
};

export const deleteSessionService = async (id) => {
    const headers = await reqHeader();
    try {
        const res = await fetch(`${authUrl}/session/delete/${id}`, {
            method: "DELETE",
            headers,
        });
        if (!res.ok) {
            console.error("Failed to delete session", res.statusText);
            return null;
        }
        const response = await res?.json();
        revalidateTag('sessions')
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
};



export const getChatHistoryBySessionIdService = async (session_id) => {
    const headers = await reqHeader();
    console.log("session_id", session_id);
    try {
        const res = await fetch(`${authUrl}/session/history/9?limit=10&page=1`, {
            method: "GET",
            headers,
        });
        if (!res.ok) {
            console.error("Failed to get chat history with session id", res.statusText);
            return null;
        }
        const response = await res?.json();
        console.log("response: ", response)
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
};
