import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
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
    async retrieveAllLinks(res: Response) {
        console.log('heath')
        return res.status(200).send('Health OK')
    };

};
