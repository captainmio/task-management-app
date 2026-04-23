import api from "./axios";


export const login = async (data: {
  username: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export const register = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
}

export const refreshToken = async () => {

}