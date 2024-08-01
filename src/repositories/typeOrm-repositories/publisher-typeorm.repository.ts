import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublisherRepository } from '../interfaces/publisher.repository';
import { Publisher } from '../../entities/publisher.entity';

@Injectable()
export class PublisherTypeOrmRepository implements PublisherRepository {
  constructor(
    @InjectRepository(Publisher)
    private readonly repository: Repository<Publisher>,
  ) {}

  findById(id: string): Promise<Publisher | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(publisher: Publisher): Promise<Publisher> {
    const existingPublisher = await this.repository.findOne({ where: { name: publisher.name } });
    if (existingPublisher) {
        throw new ConflictException('Publisher with this name already exists');
    }

    return this.repository.save(publisher);
}

  async findAll(): Promise<Publisher[]> {
    return this.repository.find();
}
}