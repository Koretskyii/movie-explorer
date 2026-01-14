import { AUTH_URL, GENRES, MOVIES_URL } from "@/constants/constants";
import { useAuthStore } from "@/store/store";
import { MovieApiParams, SearchMovieApiParams } from "@/types/types";
import { buildFetchOptions } from "@/utils/utils";

export const fetchApi = async (
  url: string,
  options: RequestInit,
  params: Record<string, any>,
) => {
  const access_token : string | null = useAuthStore.getState().access_token;
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${queryString}`, buildFetchOptions(options, access_token));

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    
    if (refreshed) {
      const access_token = useAuthStore.getState().access_token;
      const retryResponse = await fetch(`${url}?${queryString}`, buildFetchOptions(options, access_token || ''));
      return handleRefreshResponse(retryResponse);
    } else {
      throw new Error('Session expired. Please login again.');
    }
  }

  return handleRefreshResponse(response);
};

const handleRefreshResponse = async (response: Response) => {
  try {
    const data = response.json();
    return data;
  } catch (error) {
    throw error;
  }
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

export async function getMovieDetails(id: string) {
  const params: MovieApiParams = {
    include_adult: false,
    language: "uk",
    page: 1,
  }
  const options: RequestInit = { method: "GET" };
  return await fetchApi(`${MOVIES_URL}/details/${id}`, options, params);
}

export async function RegisterRequest({ email, password }: {email: string, password: string}) {
  const requestBody = {
    email,
    password,
  };

  const options: RequestInit = { method: "POST", body: JSON.stringify(requestBody) };

  return await fetchApi(`${AUTH_URL}/register`, options, {});
}

export async function LoginRequest({ email, password }: {email: string, password: string}) {
  const requestBody = {
    email,
    password
  };

  const options: RequestInit = { 
    method: "POST", 
    body: JSON.stringify(requestBody),
  };

  return await fetchApi(`${AUTH_URL}/login`, options, {});
}

const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const options: RequestInit = {
      method: 'POST',
    };

    const response = await fetch(`${AUTH_URL}/refresh_token`, buildFetchOptions(options));

    if (response.ok) {
      const data = await response.json();

      if (data.access_token) {
        const setAccess_Token = useAuthStore.getState().setAccess_Token;
        setAccess_Token(data.access_token);
      }

      return true;
    }

    console.warn('Token refresh failed with status:', response.status);
    
    return false;
  } catch (error) {
    console.error('Token refresh error:', error);
    return false;
  }
};