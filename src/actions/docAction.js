import { chatbotService, createProjectService, createProjectSessionService, deleteProjectService, getAllFilesService, getAllProjectService, getAllSessionService, getProjectByIdService, updateDescriptionService, uploadExternalFileService } from "@/services/doc.service";

export const getAllProjectAction = async () => {
    const res = await getAllProjectService();
    return res;
}

export const getProjectByIdAction = async (projectId) => {
    const res = await getProjectByIdService(projectId);
    return res;
}

export const createProjectAction = async (project_name) => {
    const res = await createProjectService(project_name);
    return res;
}

export const deleteProjectAction = async (projectId) => {
    const res = await deleteProjectService(projectId);
    return res;
}

export const updateDescriptionAction = async (projectid,description) => {
    const res = await updateDescriptionService(projectid,description);
    return res;
}

export const uploadExternalFileAction = async (file, id) => {
    const res = await uploadExternalFileService(id, file);
    return res;
}

export const getAllFilesAction = async (id) => {
    const res = await getAllFilesService(id);
    return res;
}

export const createProjectSessionAction  = async (apiKey) => {
    const res = await createProjectSessionService(apiKey);
    return res;
}

export const chatbotAction = async (input, externalSessionId, projectId, apiKey) => {
    const res = await chatbotService(input, externalSessionId, projectId, apiKey);
    return res;
}

export const getAllSessionAction = async (apiKey) => {
    const res = await getAllSessionService(apiKey);
    return res;
}