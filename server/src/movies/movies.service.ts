import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class MoviesService {
  async getMovieByName(name: string) {
    if (!name) {
      throw new HttpException('Name query is required', HttpStatus.BAD_REQUEST);
    }
    return JSON.stringify({ name: name, info: "This is a mock movie data." });
  }
}