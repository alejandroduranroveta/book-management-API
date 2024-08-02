import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookService } from "../services/book.service";
import { Book } from "../entities/book.entity";
import { UpdateBookDTO } from "../dtos/update-book.dto";
import { validate } from "class-validator";

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: Book): Promise<Book> {
    return this.bookService.createBook(createBookDto);
  }
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() bookData: UpdateBookDTO): Promise<Book> {
    const errors = await validate(bookData);
    if (errors.length > 0) {
      throw new BadRequestException('Please check');
    }
    return this.bookService.updateBook(id, bookData);
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.bookService.findAllBooks();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookService.deleteBook(id);
  }
}
