export type MovieApiParams = {
  include_adult: boolean;
  language: string;
  page: number;
  [key: string]: PropertyKey | boolean;
};

export type SearchMovieApiParams = MovieApiParams & {
  query: string;
};