import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { franc } from 'franc-min';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMovieByName(name: string) {
    if (!name?.trim()) {
      throw new HttpException('Name query is required', HttpStatus.BAD_REQUEST);
    }
    return JSON.stringify({ name, info: 'This is a mock movie data.' });
  }

  async getTMDBMoviesByName(params: {
    query: string;
    include_adult: string;
    language: string;
    page: number;
  }) {
    const { query: name, include_adult, language, page } = params;
    if (!name?.trim()) {
      throw new HttpException('Name query is required', HttpStatus.BAD_REQUEST);
    }

    const url = this.buildTMDBSearchUrl(name, include_adult, language, page);
    const options = this.getTMDBRequestOptions();

    const response = await fetch(url, options);
    const text = await response.text();

    if (!text) return [];
    return this.filterUkrainianMovies(JSON.parse(text), true);
  }

  async getTMDBPopularMovies(params: {
    include_adult: string;
    language: string;
    page: number;
  }) {
    const { include_adult, language, page } = params;

    const url = this.buildTMDBPopularUrl(include_adult, language, page);
    const options = this.getTMDBRequestOptions();

    const response = await fetch(url, options);
    const text = await response.text();

    if (!text) return [];

    return this.filterUkrainianMovies(JSON.parse(text), false);
  }

  isGenreIdArray(genreId: number | number[]): genreId is number[] {
    if (Array.isArray(genreId)) {
      return true;
    }
    return false;
  }

  isGenreListIsString(genreList: string | null): genreList is string | null {
    if (typeof genreList === 'string') {
      return true;
    }
    return false;
  }

  async getTMDBMoviesByGenreId(
    with_genres: string,
    params: {
      include_adult: string;
      language: string;
      page: number;
    },
  ) {
    const { include_adult, language, page } = params;
    const options = this.getTMDBRequestOptions();
    let response: Response | Response[];

    const withSplittedGenres = with_genres.split(',');

    try {
      let response: Response | Response[];

      if (withSplittedGenres.length > 1) {
        const genreUrls = withSplittedGenres.map((genreId) => ({
          genreId,
          url: this.buildTMDBByGenreUrl(genreId, include_adult, language, page),
        }));

        const responses = await Promise.all(
          genreUrls.map(async ({ url, genreId }) => {
            const res = await fetch(url, options);
            if (!res.ok) {
              throw new Error('Failed to fetch movies by genre');
            }
            const data = await res.json();
            return {
              genre: genreId,
              movies: this.filterUkrainianMovies(data, false),
            };
          }),
        );

        return responses.map((item) => [item]); // Зберігаємо структуру відповіді
      } else {
        const genre = withSplittedGenres[0];
        const url = this.buildTMDBByGenreUrl(
          genre,
          include_adult,
          language,
          page,
        );

        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error('Failed to fetch movies by genre');
        }

        const data = await res.json();
        return [
          {
            genre: with_genres,
            movies: this.filterUkrainianMovies(data, false),
          },
        ];
      }
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movies by genre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private isResponseArray<T>(response: T | T[]): response is T[] {
    if (Array.isArray(response)) {
      return true;
    }
    return false;
  }

  private buildTMDBPopularUrl(
    include_adult: string,
    language: string,
    page: number,
  ): string {
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    const params = new URLSearchParams({
      include_adult,
      language,
      page: page.toString(),
    });
    return `${baseUrl}?${params.toString()}&sort_by=popularity.desc`;
  }
  private buildTMDBByGenreUrl(
    byGenre: string,
    include_adult: string,
    language: string,
    page: number,
  ): string {
    // TODO: Implement genre-based movie fetching URL construction
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    const params = new URLSearchParams({
      include_adult,
      language,
      page: page.toString(),
      with_genres: byGenre.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  }

  private buildTMDBSearchUrl(
    name: string,
    include_adult: string,
    language: string,
    page: number,
  ): string {
    const baseUrl = 'https://api.themoviedb.org/3/search/movie';
    const params = new URLSearchParams({
      query: name,
      include_adult,
      language,
      page: page.toString(),
    });
    return `${baseUrl}?${params.toString()}`;
  }

  private getTMDBRequestOptions() {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };
  }

  private filterUkrainianMovies(
    data: Record<string, any[]>,
    usePagination: boolean,
  ): Record<string, any[]> | Record<string, any>[] {
    const movies: Record<string, any>[] = data.results;
    const filteredMovies = movies.filter((movie) => {
      return (
        franc(movie.title || '') === 'ukr' ||
        franc(movie.overview || '') === 'ukr'
      );
    });
    return usePagination ? { ...data, results: filteredMovies } : filteredMovies;
  }
}
