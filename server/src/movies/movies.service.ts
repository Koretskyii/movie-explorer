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

    const url = this.buildTMDBUrl(name, include_adult, language, page);
    const options = this.getTMDBRequestOptions();

    const response = await fetch(url, options);
    const text = await response.text();

    if (!text) return [];

    return this.filterUkrainianMovies(JSON.parse(text).results).slice(0, 5);
  }

  private buildTMDBUrl(
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

  private filterUkrainianMovies(movies: Record<string, any>[]) {
    return movies.filter((movie) => {
      return (
        franc(movie.title || '') === 'ukr' ||
        franc(movie.overview || '') === 'ukr'
      );
    });
  }
}
