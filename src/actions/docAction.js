import { createProjectService, deleteProjectService, getAllProjectService } from "@/services/doc.service";

export const getAllProjectAction = async () => {
    const res = await getAllProjectService();
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