import { type AxiosInstance, AxiosHeaders } from "axios";
import LocalStorageHelpers from "../../utilities/local-storage-helpers";

export const attachRequestInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(async (config) => {
    const token = LocalStorageHelpers.getAccessToken();
    if (token && config.url !== "account/authenticate") {
      if (config.headers) {
        (config.headers as AxiosHeaders).set(
          "Authorization",
          `Bearer ${token}`
        );
      }
    }
    return config;
  });

  return api;
};
