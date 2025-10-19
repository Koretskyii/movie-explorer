import { useFetch } from "@/hooks/hooks";
import { MOVIES_URL } from "@/constants/constants";
export function getMovieByName(name: string) {
  return useFetch(
    `${MOVIES_URL}`,
    { method: "GET" },
    { query: name, include_adult: false, language: "uk", page: 1 }
  );
}
