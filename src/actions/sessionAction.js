"use server"
import { createSessionService, deleteSessionService, getAllSessionService, getSessionDetailService } from "@/services/session/session.service";
import { revalidateTag } from "next/cache";

export const getAllSessionsAction = async () => {
    const res = await getAllSessionService();
    // revalidateTag("sessions")
    return res;
}

export const createSessionAction = async () => {
    const res = await createSessionService();
    // revalidateTag("sessions")
    return res;
}

export const deleteSessionAction = async (id) => {
    const res = await deleteSessionService(id);
    // revalidateTag("sessions")
    return res;
}

export const getSessionDetailAction = async (session) => {
    const res = await getSessionDetailService(session);
    // revalidateTag("session")
    return res;
}