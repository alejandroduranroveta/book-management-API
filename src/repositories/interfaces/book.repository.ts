import { Book } from '../../entities/book.entity';

export const BOOK_REPOSITORY = 'BOOK_REPOSITORY'; 

export interface BookRepository {
    create(book: Book): Promise<Book>;
    findById(id: string): Promise<Book | undefined>;
    findAll(): Promise<Book[]>;
    update(id: string, book: Book): Promise<Book>;
    delete(id: string): Promise<void>;
  }