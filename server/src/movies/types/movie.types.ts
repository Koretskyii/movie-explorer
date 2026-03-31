export interface TMDBMovie {
  title?: string;
  overview?: string;
  [key: string]: unknown;
}

export interface TMDBResponse {
  results: TMDBMovie[];
  total_pages?: number;
  [key: string]: unknown;
}
