import { useAuthStore } from "../store/auth.store";
import api from "./axios";

export const getProjects = async () => {
    const user = useAuthStore.getState().user;
    const res = await api.get(`/projects/${user?.id}`);
    return res.data;
}