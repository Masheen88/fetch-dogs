import { api } from "./api";

export const login = async (name: string, email: string) => {
  await api.post("/auth/login", { name, email });
};

export const logout = async () => {
  await api.post("/auth/logout");
};
