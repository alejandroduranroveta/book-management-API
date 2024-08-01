import { Author } from "./author.dto";
import { Publisher } from "./publisher.dto";

export class CreateBookDTO {
  title: string;
  isbn: string;
  year: number;
  pages: number;
  publisher: Publisher;
  authors:Author[];
}