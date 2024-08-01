import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AuthorRepository } from '../interfaces/author.repository';
import { Author } from '../../entities/author.entity';


@Injectable()
export class AuthorTypeOrmRepository implements AuthorRepository {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) {}

  findById(id: string): Promise<Author | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(author: Author): Promise<Author> {
    author.id = undefined;

    const existingAuthor = await this.repository.findOne({ where: { name: author.name } });
    if (existingAuthor) {
      throw new ConflictException('Author with this name already exists');
    }

    return this.repository.save(author);
  }
}