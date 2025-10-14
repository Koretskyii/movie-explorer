import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class MoviesService {
  async getMovieByName(name: string) {
    if (!name) {
      throw new HttpException('Name query is required', HttpStatus.BAD_REQUEST);
    }
    return JSON.stringify({ name: name, info: 'This is a mock movie data.' });
  }

  async getTMDBMoviesByName(name: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${name}&include_adult=false&language=uk-UA&page=1`;
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

    const json = JSON.parse(text);
    return json;
  }
}
