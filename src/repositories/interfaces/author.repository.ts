
import { Author } from '../../entities/author.entity';


export interface AuthorRepository {
  findById(id: string): Promise<Author | null>;
  create(author: Author): Promise<Author>;
}
