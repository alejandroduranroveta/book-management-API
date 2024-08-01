import { Author } from "../entities/author.entity";
import { Publisher } from "../entities/publisher.entity";

export class Book {
    constructor(
      public title: string,
      public isbn: string,
      public year: number,
      public pages: number,
      public publisher: Publisher,
      public authors: Author[],
    ) {}
  }