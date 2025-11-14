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
    const { page } = params;

    const ITEMS_PER_PAGE = 20;

    const response: any[] = await this.fetchMoviesUntilLimit(params, ITEMS_PER_PAGE);
    const total_pages = Math.ceil(response.length / ITEMS_PER_PAGE);
    console.log(response.length)
    console.log(total_pages);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filmsForCurrentPage = response.slice(startIndex, endIndex);

    return {
      page,
      total_pages,
      results: filmsForCurrentPage,
    };
  }

  async fetchMoviesUntilLimit(params, itemsNeeded) {
    let response: any[] = [];
      const ITEMS_NEEDED = itemsNeeded;
      let movieCount = 0;
      let nextPage = 1;
      let total_pages: number = 0;
      while (movieCount < ITEMS_NEEDED) {
        const movies: Record<string, any> | null =
          await this.fetchMoviesIteration({
            ...params,
            page: nextPage,
          });
        if (!movies?.results?.length) break;

        response.push(...movies.results);
        movieCount += movies.results.length;
        nextPage++;

        if (total_pages === 0) total_pages = movies.total_pages;

        if (nextPage > total_pages) break;
      }
      return response;
  }

  async fetchMoviesIteration(params: {
    query?: string;
    include_adult: string;
    language: string;
    page: number;
    genreId?: number;
  }) {
    const { query: name, include_adult, language, page, genreId } = params;

    try {
      const url =
        genreId !== undefined
          ? this.buildTMDBByGenreUrl(genreId, include_adult, language, page)
          : this.buildTMDBSearchUrl(name || '', include_adult, language, page);

      const options = this.getTMDBRequestOptions();

      const response = await fetch(url, options);

      const textResponse = await response.text();

      if (!textResponse) return null;

      return this.filterUkrainianMovies(JSON.parse(textResponse), true);
    } catch (err) {
      throw new HttpException(
        'Failed to fetch movies by genre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    const textResponse = await response.text();

    if (!textResponse) return [];

    return this.filterUkrainianMovies(JSON.parse(textResponse), false);
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

  async getMoviesByAllGenres(
    with_genres: string,
    params: {
      include_adult: string;
      language: string;
      page: number;
    },
  ) {
    const { include_adult, language, page } = params;
    const options = this.getTMDBRequestOptions();

    const withSplittedGenres = with_genres.split(',');

    try {
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
      }
    } catch (err) {
      throw new HttpException(
        'Failed to fetch movies by genre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTMDBMoviesByGenreId(params: {
    include_adult: string;
    language: string;
    page: number;
    genreId: number;
  }) {
    const { genreId } = params;

    try {
      const ITEMS_NEEDED = 100;
      const response = await this.fetchMoviesUntilLimit(params, ITEMS_NEEDED);

      return [
        {
          genre: genreId,
          movies: response,
        },
      ];
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movies by genre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    byGenre: string | number,
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
    return usePagination
      ? { ...data, results: filteredMovies }
      : filteredMovies;
  }
}
