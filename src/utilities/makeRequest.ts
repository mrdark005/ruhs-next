import { botProperties } from "../Store";

import Axios, { AxiosRequestConfig } from "axios";

export type HTTPMethod = "GET" | "DELETE" | "PUT" | "POST" | "PATCH";

export const makeRequest = (async (method: HTTPMethod, path: string, data?: unknown): Promise<any> => {
  const axiosConfig: AxiosRequestConfig = ({
    "method": method,
    "url": `https://discord.com/api/v${botProperties.options.apiVersion}${path}`
  });

  if (data) {
    axiosConfig.data = data;
  }

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await Axios(axiosConfig);

        resolve(response.data);
      } catch (error) {
        if (error.response.data.retry_time) {
          setTimeout(async () => {
            makeRequest(method, path, data);
          }, error.response.data.retry_time);
        } else {
          reject(error);
        }
      }
    })();
  });
});