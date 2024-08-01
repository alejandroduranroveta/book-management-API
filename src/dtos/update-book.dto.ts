import { Author } from "./author.dto";
import { Publisher } from "./publisher.dto";

export class UpdateBookDTO {
  title?: string;
  isbn?: string;
  year?: number;
  pages?: number;
  publisher?: Publisher;
  authors?:Author[];
}