import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('main_queue')
  handleMessage(data: any) {
    console.log('Received message:', data);
    return { message: 'Message received', data: new Date().toISOString() };
  }
}
