'use server'
import { getAllSessionFilesService, uploadFilePlaygroundService } from "@/services/file/file.service";
import { revalidateTag } from "next/cache";

export const getAllDocumentAction = async (session) => {
    console.log("session in action: " , session)
    const res = await getAllSessionFilesService(session);
    return res;
}

export const createDocumentAction = async (sessionId, uploadFile) => {
    console.log("checking session id: " , sessionId)
    const res = await uploadFilePlaygroundService(sessionId, uploadFile);
    // revalidateTag("fileService");
    return res;
}