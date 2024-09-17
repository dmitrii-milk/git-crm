import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly searchService: GithubService) {}

  @Get('search-repository')
  searchRepository(@Query('name') name: string) {
    return this.searchService.searchRepository(name);
  }
}
