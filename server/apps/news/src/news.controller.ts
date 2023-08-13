import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getHello(): string {
    return this.newsService.getHello();
  }
}
