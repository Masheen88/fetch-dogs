import { api } from "./api";

//API - POST request for logging the user into the system
export const login = async (name: string, email: string) => {
  try {
    const response = await api.post("/auth/login", { name, email });
    //can log here if needed
    return response;
  } catch (error) {
    console.log("Login failed", error);
    throw new Error("Login failed");
  }
};

//API - POST request for logging the user out of the system
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
