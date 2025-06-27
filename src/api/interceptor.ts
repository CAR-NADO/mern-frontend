
import axios, { InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";
import { getAccessToken } from "../helpers/functions";
// import { logoutUserEvent } from "@/helpers/events";
// import { toaster } from "@/components/custom/Toaster/toaster";

// Define the shape of the error response
// interface ErrorResponse {
//   data: {
//     data: { msg: string }[];
//   };
// }

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.headers["Authorization"]) {
      const { state } = JSON.parse(getAccessToken() as string) || {};
      if (state?.token) {
        config.headers["Authorization"] = `Bearer ${state?.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      // document.dispatchEvent(logoutUserEvent);
      console.log("status 401 now user should be logout.")
    }
    console.log("APIs error", error?.response?.data?.data?.[0]?.msg)
    // toaster.error(error?.response?.data?.data?.[0]?.msg ?? "Something went wrong", {
    //   autoClose: 5000,
    //   position: "top-left",
    // });

    return Promise.reject(error);
  }
);
