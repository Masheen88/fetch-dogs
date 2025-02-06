import { api } from "./api";

export const login = async (name: string, email: string) => {
  try {
    const response = await api.post("/auth/login", { name, email });
    return response;
  } catch (error) {
    console.log("Login failed", error);
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  await api.post("/auth/logout");
  try {
    const response = await api.post("/auth/logout");
    return response;
  } catch (error) {
    console.log("Logout failed", error);
    throw new Error("Logout failed");
  }
};
