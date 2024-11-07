import { createProjectService, deleteProjectService, getAllProjectService, getProjectByIdService, updateDescriptionService, uploadExternalFileService } from "@/services/doc.service";

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
    console.log("project Id: " , projectId);
    const res = await deleteProjectService(projectId);
    console.log("res delete action",res);
    return res;
}

export const updateDescriptionAction = async (projectid,description) => {
    const res = await updateDescriptionService(projectid,description);
    return res;
}

export const uploadExternalFileAction = async (project, file) => {
    const res = await uploadExternalFileService(project, file);
    return res;
}