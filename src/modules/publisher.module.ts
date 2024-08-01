import { Module } from '@nestjs/common';
import { PublisherController } from '../controllers/publisher.controller';
import { PublisherService } from '../services/publisher.service';

@Module({
  controllers: [PublisherController],
  providers: [PublisherService]
})
export class PublisherModule {}
