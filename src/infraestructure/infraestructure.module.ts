import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from '../entities/publisher.entity';
import { Author } from '../entities/author.entity';
import { Book } from '../entities/book.entity';
import { PublisherTypeOrmRepository } from '../repositories/typeOrm-repositories/publisher-typeorm.repository';
import { AuthorTypeOrmRepository } from '../repositories/typeOrm-repositories/author-typeorm.repository';
import { BookTypeOrmRepository } from '../repositories/typeOrm-repositories/book-typeorm.repository';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Publisher, Author, Book])],
    providers: [
      PublisherTypeOrmRepository,
      AuthorTypeOrmRepository,
      BookTypeOrmRepository,
    ],
    exports: [
      PublisherTypeOrmRepository,
      AuthorTypeOrmRepository,
      BookTypeOrmRepository,
    ],
  })
  export class InfrastructureModule {}