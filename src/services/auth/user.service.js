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
