import { GENRES, MOVIES_URL } from "@/constants/constants";
import { MovieApiParams, SearchMovieApiParams } from "@/types/types";
import { buildFetchOptions } from "@/utils/utils";

export const fetchApi = async (
  url: string,
  options: RequestInit,
  params: Record<string, any>
) => {
  const queryString = new URLSearchParams(params).toString();
  return fetch(`${url}?${queryString}`, buildFetchOptions(options)).then(
    (res) => {
      try {
        const data = res.json();
        return data;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        throw error;
      }
    }
  );
};

export async function getMovieByName(name: string, page: number) {
  const params: SearchMovieApiParams = {
    query: name,
    include_adult: false,
    language: "uk",
    page,
  };
  const options: RequestInit = { method: "GET" };

  return fetchApi(MOVIES_URL, options, params);
}

export async function getMovieByPopularity() {
  const params: MovieApiParams = {
    include_adult: false,
    language: "uk",
    page: 1,
  };
  const options: RequestInit = { method: "GET" };

  return fetchApi(`${MOVIES_URL}/popular`, options, params);
}

export async function getMoviesByAllGenres() {
  const params: MovieApiParams = {
    include_adult: false,
    language: "uk",
    page: 1,
    with_genres: Object.values(GENRES)
      .map((genre) => genre.id)
      .join(","),
  };
  const options: RequestInit = { method: "GET" };

  return fetchApi(`${MOVIES_URL}/all_genres`, options, params);
}

export async function getMoviesByGenreId(genreId: number) {
  const params: MovieApiParams = {
    include_adult: false,
    language: "uk",
    page: 1,
    genreId,
  };
  const options: RequestInit = { method: "GET" };

  return await fetchApi(`${MOVIES_URL}/genre`, options, params);
}
