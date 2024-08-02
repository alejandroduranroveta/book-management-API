import { Author } from './src/entities/author.entity';
import { Book } from './src/entities/book.entity';
import { Publisher } from './src/entities/publisher.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: 'sa',
  password: 'Passw1rd!',
  database: 'bookdb',
  synchronize: true,
  logging: false,
  entities: [Author, Book, Publisher],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"]
});