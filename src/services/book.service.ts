
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { Book } from "../entities/book.entity";
import { AuthorRepository } from "../repositories/interfaces/author.repository";
import { BookRepository } from "../repositories/interfaces/book.repository";
import { PublisherRepository } from "../repositories/interfaces/publisher.repository";
import { BookTypeOrmRepository } from "../repositories/typeOrm-repositories/book-typeorm.repository";
import { AuthorTypeOrmRepository } from "../repositories/typeOrm-repositories/author-typeorm.repository";
import { PublisherTypeOrmRepository } from "../repositories/typeOrm-repositories/publisher-typeorm.repository";
import { CreateBookDTO } from "../dtos/create-book.dto";
import { UpdateBookDTO } from "../dtos/update-book.dto";

@Injectable()
export class BookService {
  constructor(
    @Inject(BookTypeOrmRepository)
    private readonly bookRepository: BookRepository,
    @Inject(AuthorTypeOrmRepository)
    private readonly authorRepository: AuthorRepository,
    @Inject(PublisherTypeOrmRepository)
    private readonly publisherRepository: PublisherRepository,
  ) {}

  async createBook(bookData: CreateBookDTO): Promise<Book> {
    const publisher = await this.publisherRepository.findById(bookData.publisher.id);
    if (!publisher) {
        throw new ConflictException('Publisher not found');
    }

    const authors = [];
    for (const authorData of bookData.authors) {
        const author = await this.authorRepository.findById(authorData.id);
        if (!author) {
            throw new ConflictException(`Author with id ${authorData.id} not found`);
        }
        authors.push(author);
    }

    const book = new Book();
    book.title = bookData.title;
    book.isbn = bookData.isbn;
    book.year = bookData.year;
    book.pages = bookData.pages; 
    book.publisher = publisher;
    book.authors = authors;

    try {
    return this.bookRepository.create(book);
  } catch (error) {
    console.error('Error creating book:', error.message);
    throw new ConflictException('Error creating book');
  }
  }

  async updateBook(id: string, bookData: UpdateBookDTO): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
        throw new Error('Book not found');
    }

    const publisher = await this.publisherRepository.findById(bookData.publisher.id);
    if (!publisher) {
        throw new ConflictException('Publisher not found');
    }

    const authors = [];
    for (const authorData of bookData.authors) {
        const author = await this.authorRepository.findById(authorData.id);
        if (!author) {
            throw new ConflictException(`Author with id ${authorData.id} not found`);
        }
        authors.push(author);
    }

    book.title = bookData.title;
    book.isbn = bookData.isbn;
    book.year = bookData.year;
    book.pages = bookData.pages;
    book.publisher = publisher;
    book.authors = authors;

    return this.bookRepository.update(id, book);
  }

  async deleteBook(id: string): Promise<void> {
    return this.bookRepository.delete(id);
  }
  async findAllBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }
  async findById(id:string):Promise<Book> {
    return this.bookRepository.findById(id);
  }
}
