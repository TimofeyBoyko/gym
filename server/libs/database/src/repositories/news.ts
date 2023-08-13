import { NewsEntity } from '@app/entities';
import { appDataSource } from '../typeorm.config';
import { Injectable } from '@nestjs/common';

export const newsRepository = appDataSource.getRepository(NewsEntity);

@Injectable()
export class NewsRepository {
  constructor() {}

  async get(id: number): Promise<NewsEntity> {
    const News: NewsEntity = await newsRepository.findOneBy({
      id,
    });

    return News;
  }

  async getByAuthorId(authorId: number): Promise<NewsEntity[]> {
    const News: NewsEntity[] = await newsRepository.findBy({
      authorId,
    });

    return News;
  }

  async getAll(): Promise<NewsEntity[]> {
    const news: NewsEntity[] = await newsRepository.find();

    return news;
  }

  create(): NewsEntity {
    return newsRepository.create();
  }

  async save(news: NewsEntity): Promise<NewsEntity> {
    const newNews = await newsRepository.save(news);

    return newNews;
  }

  async update(news: NewsEntity): Promise<void> {
    await newsRepository.update({ id: news.id }, news);
  }

  async delete(id: number): Promise<void> {
    await newsRepository.delete({ id });
  }

  async deleteByAuthorId(authorId: number): Promise<void> {
    await newsRepository.delete({ authorId });
  }
}
