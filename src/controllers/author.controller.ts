import { Body, Controller, Post } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { Author } from '../entities/author.entity';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Post()
    create(@Body() createAuthorDto: Author): Promise<Author> {
      return this.authorService.createAuthor(createAuthorDto);
    }
}
