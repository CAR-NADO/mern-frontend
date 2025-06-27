
import { API_ROUTES } from "./constants";
import { apiClient } from "./interceptor";

export const getUserProfileDetails = (data: object) => {
  return apiClient({
    method: API_ROUTES.GET_USER_PROFILE_DETAILS.METHOD,
    url: API_ROUTES.GET_USER_PROFILE_DETAILS.URL,
    data,
  });
};

