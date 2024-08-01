import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { BookTypeOrmRepository } from '../repositories/typeOrm-repositories/book-typeorm.repository';
import { Book } from '../entities/book.entity';

describe('BookTypeOrmRepository', () => {
  let repository: BookTypeOrmRepository;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookTypeOrmRepository,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<BookTypeOrmRepository>(BookTypeOrmRepository);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  describe('create', () => {
    it('should create a book successfully', async () => {
      const book: Book = {
        id: '1',
        title: 'Varios autores',
        isbn: '978-3-16-148410-0212ss3',
        year: 1997,
        pages: 223,
        publisher: {
          id: 'e0af5fca-c1ca-441b-9b5e-3712176e876c',
          name: '',
          books: []
        },
        authors: [
          {
            id: 'f2ac10d7-5a92-4c73-aadd-bc251798d357',
            name: '',
            books: []
          },
          {
            id: '8260a27b-b85c-48ce-b276-9d8d4c9a99dd',
            name: '',
            books: []
          }
        ]
      };
      jest.spyOn(bookRepository, 'save').mockResolvedValue(book);

      const result = await repository.create(book);
      expect(result).toEqual(book);
    });

    it('should throw a ConflictException if a duplicate key error occurs', async () => {
      const book: Book = {
        id: '1',
        title: 'Varios autores',
        isbn: '978-3-16-148410-0212ss3',
        year: 1997,
        pages: 223,
        publisher: {
          id: 'e0af5fca-c1ca-441b-9b5e-3712176e876c',
          name: '',
          books: []
        },
        authors: [
          {
            id: 'f2ac10d7-5a92-4c73-aadd-bc251798d357',
            name: '',
            books: []
          },
          {
            id: '8260a27b-b85c-48ce-b276-9d8d4c9a99dd',
            name: '',
            books: []
          }
        ]
      };

      const error = new QueryFailedError('', [], new Error('duplicate key value violates unique constraint'));

      jest.spyOn(bookRepository, 'save').mockRejectedValue(error);

      await expect(repository.create(book)).rejects.toThrow(ConflictException);
    });

    it('should rethrow any other errors', async () => {
      const book: Book = {
        id: '1',
        title: 'Varios autores',
        isbn: '978-3-16-148410-0212ss3',
        year: 1997,
        pages: 223,
        publisher: {
          id: 'e0af5fca-c1ca-441b-9b5e-3712176e876c',
          name: '',
          books: []
        },
        authors: [
          {
            id: 'f2ac10d7-5a92-4c73-aadd-bc251798d357',
            name: '',
            books: []
          },
          {
            id: '8260a27b-b85c-48ce-b276-9d8d4c9a99dd',
            name: '',
            books: []
          }
        ]
      };
      const error = new Error('Some other error');

      jest.spyOn(bookRepository, 'save').mockRejectedValue(error);

      await expect(repository.create(book)).rejects.toThrow(Error);
    });
  });
});