import api from "./axios";

export const getTasksByProjectId = async (projectId: number) => {
    const res = await api.get(`/tasks/${projectId}/tasks`);

    return res.data;
}; 