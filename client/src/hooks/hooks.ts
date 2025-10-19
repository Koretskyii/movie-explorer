import { buildFetchOptions } from "@/utils/utils";

export const useFetch = (
  url: string,
  options: RequestInit,
  params: Record<string, any>
) => {
  const queryString = new URLSearchParams(params).toString();
  return fetch(`${url}?${queryString}`, buildFetchOptions(options)).then((res) => {
    try {
      const data = res.json();
      return data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw error;
    }
  });
};