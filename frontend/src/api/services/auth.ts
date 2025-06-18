import axiosClient from "../clients/axios";

export const loginRequest = async (username: string) => {
  const res = await axiosClient.post("/auth/login", { username });
  const token = res.data.token;
  return token;
};
