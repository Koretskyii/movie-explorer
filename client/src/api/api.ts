import { useFetch } from "@/hooks/hooks";
import { MOVIES_URL } from "@/constants/constants";
import { MovieApiParams, SearchMovieApiParams } from "@/types/types";

export function getMovieByName(name: string) {
  const params: SearchMovieApiParams = {
    query: name,
    include_adult: false,
    language: "uk",
    page: 1,
  };
  const options: RequestInit = { method: "GET" };

  return useFetch(MOVIES_URL, options, params);
}

export function getMovieByPopularity() {
  const params: MovieApiParams = {
    include_adult: false,
    language: "uk",
    page: 1,
  };
  const options: RequestInit = { method: "GET" };

  return useFetch(`${MOVIES_URL}/popular`, options, params);
}
