import { api } from "./api";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface SearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

interface Match {
  match: string;
}

//API - GET Retries all breeds
export const getBreeds = async (): Promise<string[]> => {
  const { data } = await api.get<string[]>("/dogs/breeds");
  return data;
};

interface SearchFilters {
  sort: string;
  size: number;
  from: number;
  breeds?: string[];
}

export const searchDogs = async (
  filters: SearchFilters
): Promise<SearchResponse> => {
  const params = new URLSearchParams(
    Object.entries(filters).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.join(","); // Convert array to a comma-separated string
      } else {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const { data } = await api.get<SearchResponse>(`/dogs/search?${params}`);
  return data;
};

//API - POST Returns dogs based on ids passed in
export const getDogsByIds = async (dogIds: string[]): Promise<Dog[]> => {
  const { data } = await api.post<Dog[]>("/dogs", dogIds);
  return data;
};

//API - POST Returns a match based on the dog ids passed in
export const getMatch = async (dogIds: string[]): Promise<string> => {
  const { data } = await api.post<Match>("/dogs/match", dogIds);
  return data.match;
};
