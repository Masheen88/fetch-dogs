import { api } from "./api";

export const getBreeds = async () => {
  const { data } = await api.get<string[]>("/dogs/breeds");
  return data;
};

export const searchDogs = async (filters: Record<string, any>) => {
  const params = new URLSearchParams(filters).toString();
  const { data } = await api.get(`/dogs/search?${params}`);
  return data;
};

export const getDogsByIds = async (dogIds: string[]) => {
  const { data } = await api.post("/dogs", dogIds);
  return data;
};

export const getMatch = async (dogIds: string[]) => {
  const { data } = await api.post("/dogs/match", dogIds);
  return data.match;
};
