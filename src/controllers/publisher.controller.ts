import { Body, Controller, Post } from '@nestjs/common';
import { Publisher } from '../entities/publisher.entity';
import { PublisherService } from '../services/publisher.service';

@Controller('publisher')
export class PublisherController {
    constructor(private readonly publisherService: PublisherService) {}

    @Post()
    create(@Body() createPublisherDto: Publisher): Promise<Publisher> {
      return this.publisherService.createPublisher(createPublisherDto);
    }
}
