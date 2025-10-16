import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { franc } from 'franc-min';

@Injectable()
export class MoviesService {
  async getMovieByName(name: string) {
    if (!name) {
      throw new HttpException('Name query is required', HttpStatus.BAD_REQUEST);
    }
    return JSON.stringify({ name: name, info: 'This is a mock movie data.' });
  }

  async getTMDBMoviesByName(name: string, include_adult: string, language: string, page: number) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=${include_adult}&language=${language}&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const response = await fetch(url, options);

    const text = await response.text();
    if (!text) return {};

    const json = JSON.parse(text).results.filter((movie: Record<string, any>) => {
      return franc(movie.title) === 'ukr' || franc(movie.overview) === 'ukr';
    }).slice(0, 5);
    return json;
  }
}
