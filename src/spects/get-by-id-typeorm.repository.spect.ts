import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Book } from '../entities/book.entity';

describe('BookService', () => {
    let service: BookService;
    let repository: Repository<Book>;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [
            BookService,
            {
              provide: getRepositoryToken(Book),
              useClass: Repository,
            },
          ],
        }).compile();
    
        service = module.get<BookService>(BookService);
        repository = module.get<Repository<Book>>(getRepositoryToken(Book));
      });
    
      describe('findById', () => {
        it('should return a book if found', async () => {
          const bookId = '1b4e28ba-2fa1-11d2-883f-0016d3cca427';
          const book = new Book();
          book.id = bookId;
          book.title = 'Test Book';
    
          jest.spyOn(repository, 'findOne').mockResolvedValue(book);
    
          expect(await service.findById(bookId)).toEqual(book);
        });
    
        it('should throw NotFoundException if book not found', async () => {
          const bookId = '1b4e28ba-2fa1-11d2-883f-0016d3cca427';
    
          jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    
          await expect(service.findById(bookId)).rejects.toThrow(NotFoundException);
        });
    
        it('should throw BadRequestException if invalid UUID format', async () => {
          const invalidId = 'invalid-uuid';
    
          await expect(service.findById(invalidId)).rejects.toThrow(BadRequestException);
        });
      });
    });