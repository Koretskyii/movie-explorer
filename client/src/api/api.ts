import { useFetch } from "@/hooks/hooks";
import { GENRES, MOVIES_URL } from "@/constants/constants";
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

export async function getMoviesByAllGenres() {
  const params: MovieApiParams = {
    include_adult: false,
    language: "uk",
    page: 1,
    with_genres: Object.values(GENRES).map((genre) => genre.id).join(","),
  };
  const options: RequestInit = { method: "GET" };

  return await useFetch(`${MOVIES_URL}/genre`, options, params);
}

export function getTopMoviesByGenreId(genreId: number) {
  const params: MovieApiParams = {
    include_adult: false,
    language: "uk",
    page: 1,
  };
  const options: RequestInit = { method: "GET" };

  return useFetch(`${MOVIES_URL}/genre/${genreId}`, options, params);
}