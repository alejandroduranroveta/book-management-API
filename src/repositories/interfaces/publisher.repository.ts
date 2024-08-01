
import { Publisher } from '../../entities/publisher.entity';

export interface PublisherRepository {
  findAll(): Promise<Publisher[]>;
  findById(id: string): Promise<Publisher | null>;
  create(publisher: Publisher): Promise<Publisher>;

}