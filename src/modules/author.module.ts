import { Module } from '@nestjs/common';
import { AuthorController } from '../controllers/author.controller';
import { AuthorService } from '../services/author.service';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService]
})
export class AuthorModule {}
