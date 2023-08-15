import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { NewsEntity } from '@app/entities';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
  ) {}

  async get(id: string): Promise<NewsEntity> {
    const News: NewsEntity = await this.newsRepository.findOneBy({
      id,
    });

    return News;
  }

  async getByAuthorId(authorId: string): Promise<NewsEntity[]> {
    const News: NewsEntity[] = await this.newsRepository.findBy({
      authorId,
    });

    return News;
  }

  async getAll(): Promise<NewsEntity[]> {
    const news: NewsEntity[] = await this.newsRepository.find();

    return news;
  }

  create(): NewsEntity {
    return this.newsRepository.create();
  }

  async save(news: NewsEntity): Promise<NewsEntity> {
    const newNews = await this.newsRepository.save(news);

    return newNews;
  }

  async update(news: NewsEntity): Promise<void> {
    await this.newsRepository.update({ id: news.id }, news);
  }

  async delete(id: string): Promise<void> {
    await this.newsRepository.delete({ id });
  }

  async deleteByAuthorId(authorId: string): Promise<void> {
    await this.newsRepository.delete({ authorId });
  }
}
