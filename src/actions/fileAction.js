import { getAllSessionFilesService, uploadFilePlaygroundService } from "@/services/file/file.service";

export const getAllDocumentAction = async (session) => {
    console.log("session in action: " , session)
    const res = await getAllSessionFilesService(session);
    return res;
}

export const createDocumentAction = async (sessionId, uploadFile) => {
    const res = await uploadFilePlaygroundService(sessionId, uploadFile);
    return res;
}