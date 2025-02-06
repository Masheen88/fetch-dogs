import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
