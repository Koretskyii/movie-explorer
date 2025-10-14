import { useFetch } from "@/hooks/hooks";

export function getMovieByName(name: string) {
  const baseUrl = process.env.NEXT_PUBLIC_NEST_URL;
  console.log("Base URL:", baseUrl); // Debug log to check the base URL
  return useFetch(
    `${baseUrl}/movies`,
    { method: "GET" },
    { query: name, include_adult: false, language: "uk", page: 1 }
  );
}
