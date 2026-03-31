type Primitive = string | number | boolean | symbol;

export type QueryParams = Record<string, Primitive>;

export type MovieApiParams = {
  include_adult: boolean;
  language: string;
  page: number;
  [key: string]: PropertyKey | boolean;
};

export type SearchMovieApiParams = MovieApiParams & {
  query: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
  overview?: string;
  genre_ids?: number[];
  backdrop_path?: string | null;
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  popularity?: number;
  video?: boolean;
  vote_count?: number;
};

export type MovieDetails = {
  title?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  release_date?: string;
  overview?: string;
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  budget?: number;
  revenue?: number;
  status?: string;
  tagline?: string;
  [key: string]: unknown;
};

export type Genre = {
  id: number;
  name: string;
};

export type MoviesByGenre = {
  genre: string;
  movies: Movie[];
};
