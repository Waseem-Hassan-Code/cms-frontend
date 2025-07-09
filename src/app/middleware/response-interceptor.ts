import type { AxiosInstance } from "axios";
import type { ResponseError } from "../../models/response-error";
import { toast } from "sonner";

export const attachResponseInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const requestUrl = error.config?.url;
      const responseError: ResponseError = {
        message:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "An error occurred",
        status: error.response?.status || 500,
        isSuccess: false,
      };
      if (responseError.status === 500 && requestUrl !== "/users/userinfo") {
        toast.error(responseError.message);
      } else {
        console.log("Error:", responseError.message);
      }
      return Promise.reject(responseError);
    }
  );

  return api;
};
