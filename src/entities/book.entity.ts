import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, Index } from 'typeorm';
import { Author } from './author.entity';
import { Publisher } from './publisher.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Index({ unique: true })
  @Column()
  isbn: string;

  @Column()
  year: number;

  @Column()
  pages: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  publisher: Publisher;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable()
  authors: Author[];

  static create(title: string, isbn: string, year: number, pages: number, publisher: Publisher, authors: Author[]): Book {
    const book = new Book();
    book.title = title;
    book.isbn = isbn;
    book.year = year;
    book.pages = pages;
    book.publisher = publisher;
    book.authors = authors;
    return book;
  }
}