'use server'
import { authUrl } from "@/app/utils/constants";
import { reqHeader } from "@/config/header.config";

export const getAllHistoryBySessionService = async (session) => {
    const headers = await reqHeader();
    try {
        console.log("check history process", session)
        const res = await fetch(`${authUrl}/session/history?session=${session.sessionId}&limit=10&page=1`, {
            method: "GET",
            headers,
            next: {
                tags: ["histories"],
            },
        });
        if (!res.ok) {
            console.error("Failed to get all histories", res.statusText);
            return null;
        }
        const response = await res?.json();
        console.log("response: ", response)
        return response
    } catch (e) {
        console.log("Error: ", e);
    }
};