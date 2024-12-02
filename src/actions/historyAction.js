'use server'
import { getAllHistoryBySessionService } from "@/services/history/history.service";
import { revalidateTag } from "next/cache";

export const getHistoriesBySessionAction = async (session) => {
    const res = await getAllHistoryBySessionService(session);
    revalidateTag('histories')
    return res;
}