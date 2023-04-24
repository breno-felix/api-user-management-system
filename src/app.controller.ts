import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/test')
  getHello(): string {
    return String(process.env.NODE_ENV);
  }
}
