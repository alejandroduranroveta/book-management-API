import { Inject, Injectable } from '@nestjs/common';
import { AuthorRepository } from '../repositories/interfaces/author.repository';
import { AuthorTypeOrmRepository } from '../repositories/typeOrm-repositories/author-typeorm.repository';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorService {
    constructor(
        @Inject(AuthorTypeOrmRepository)
        private readonly authorRepository: AuthorRepository,
      ) {}

    async createAuthor(authorData: Author): Promise<any> {
        return this.authorRepository.create(authorData);
    }
}

