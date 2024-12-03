'use server'
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";
import { revalidateTag } from 'next/cache'

export const getAllSessionService = async () => {
    const headers = await reqHeader();
    try {
        const res = await fetch(`${authUrl}/session/all_sessions`, {
            method: "GET",
            headers
        });
        console.log("getallsessionservice",res);
        if (!res.ok) {
            console.error("Failed to get all sessions", res.statusText);
            return null;
        }
        const response = await res?.json();
        console.log("response: session ", response)
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
        console.log("responsecreatesession",res);
        if(res.ok === true){
            revalidateTag('sessions');
        }
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
};

export const deleteSessionService = async (id) => {
    console.log("delID",id);
    const headers = await reqHeader();
    console.log("id in server to delete: ",id)
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
        console.log("Session deleted: ", response);

        // Revalidate the sessions tag
        // if(res.ok === true){
        //     revalidateTag('sessions');
        // }
        
        return response;
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
            next: {
                tags: ["chatHistory"],
            },
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

export const getSessionDetailService = async (session) => {
    const headers = await reqHeader();
    console.log("session : ",session?.sessionId)
    try {
        const res = await fetch(`${authUrl}/session/get_session_detail?session=${session.sessionId}`, {
            method: "GET",
            headers,
            next: {
                tags: ["sessionDetail"],
            },
        });
        if (!res.ok) {
            console.error("Failed to get session detail", res.statusText);
            return null;
        }
        const response = await res?.json();
        console.log("response: ", response)
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
}