import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('Call received')
    return this.appService.getHello()
  };

  @HttpCode(200)
  @Get('/healthcheck')
    async retrieveAllLinks(@Res() res: Response) {
        console.log('heath')
        res.send('Health OK')
    };
};