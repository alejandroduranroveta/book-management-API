import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './controllers/book.controller';
import { AppController } from './app.controller';
import { BookService } from './services/book.service';
import { InfrastructureModule } from './infraestructure/infraestructure.module';
import { AuthorController } from './controllers/author.controller';
import { AuthorService } from './services/author.service';
import { PublisherController } from './controllers/publisher.controller';
import { PublisherService } from './services/publisher.service';
import { AppDataSource } from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options), // la conexion de la bd
    InfrastructureModule,
  ],
  controllers: [AppController, BookController, AuthorController, PublisherController],
  providers: [BookService, AuthorService, PublisherService],
})
export class AppModule {}
