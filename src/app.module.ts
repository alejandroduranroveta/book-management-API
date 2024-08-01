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


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sa',
      password: 'Passw1rd!',
      database: 'bookdb',
      autoLoadEntities: true,
      synchronize: true,
    }),
    InfrastructureModule,
  ],
  controllers: [AppController, BookController,AuthorController,PublisherController],
  providers: [BookService,AuthorService,PublisherService],
})
export class AppModule {}
