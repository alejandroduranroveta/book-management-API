import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller()
export class AppController {
  @Get('health')
  @Header('Cache-Control', 'none')
  get() {
    return { ok: true };
  }
}
