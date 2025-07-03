import { apiClient } from "@/api/interceptor";
import { API_ROUTES } from "./constants";

export const userSignup = (data: object) => {
  return apiClient({
    method: API_ROUTES.SIGNNUP_USER.METHOD,
    url: API_ROUTES.SIGNNUP_USER.URL,
    data,
  });
};
