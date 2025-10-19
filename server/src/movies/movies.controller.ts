import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getMovieByName(
    @Query('query') query: string,
    @Query('include_adult') include_adult: string,
    @Query('language') language: string,
    @Query('page') page: number,
  ) {
    const params = { query, include_adult, language, page };
    return this.moviesService.getTMDBMoviesByName(params);
  }
}
