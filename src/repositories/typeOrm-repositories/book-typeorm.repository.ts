import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { QueryFailedError, Repository } from "typeorm";
import { Book } from "../../entities/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BookRepository } from "../interfaces/book.repository";
import { validate as isUUID } from 'uuid';

@Injectable()
export class BookTypeOrmRepository implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}
  

  async create(book: Book): Promise<Book> {
    try {
      console.log("Creating book", book);
      return await this.repository.save(book);
    } catch (error) {
      if (error instanceof QueryFailedError && error.message.includes('duplicate key value violates unique constraint')) {
        throw new ConflictException('ERROR - Maybe a book with this ISBN already exists or the IDS are wrongs.');
      }
      throw error;
    }
  }
  async update(id: string, bookData: Partial<Book>): Promise<Book> {
    const book = await this.findById(id);
    if (!book) {
      throw new Error('Book not found');
    }

    if (bookData.title !== undefined) book.title = bookData.title;
    if (bookData.isbn !== undefined) book.isbn = bookData.isbn;
    if (bookData.year !== undefined) book.year = bookData.year;
    if (bookData.pages !== undefined) book.pages = bookData.pages;
    if (bookData.publisher !== undefined) book.publisher = bookData.publisher;
    if (bookData.authors !== undefined) book.authors = bookData.authors;

    try {
    await this.repository.save(book);
  } catch (error) {
    if (error instanceof QueryFailedError && error.message.includes('duplicate key value violates unique constraint')) {
      throw new ConflictException('A book with this ISBN already exists.');
    }
    throw error;
  }
    return book;
  }

  findById(id: string): Promise<Book> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }
  
    return this.repository.findOne({ where: { id }, relations: ['publisher', 'authors'] })
      .then(book => {
        if (!book) {
          throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
      });
  }

  findAll(): Promise<Book[]> {
    return this.repository.find({ relations: ['publisher', 'authors'] });
  }

  async delete(id: string): Promise<void> {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
  }
  
    const existingBook = await this.repository.findOne({where: { id }});
    if (!existingBook) {
        throw new NotFoundException(`Book with ID ${id} not found.`);
    }

    await this.repository.delete(id);
    console.log(`Book with ID ${id} successfully deleted.`);
}
}