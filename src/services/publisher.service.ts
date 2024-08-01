import { Inject, Injectable } from '@nestjs/common';
import { PublisherTypeOrmRepository } from '../repositories/typeOrm-repositories/publisher-typeorm.repository';
import { PublisherRepository } from '../repositories/interfaces/publisher.repository';
import { Publisher } from '../entities/publisher.entity';

@Injectable()
export class PublisherService {
    constructor(
        @Inject(PublisherTypeOrmRepository)
        private readonly publisherRepository: PublisherRepository,
      ) {}

    async createPublisher(publisherData: Publisher): Promise<any> {
        return this.publisherRepository.create(publisherData);
    }
}
