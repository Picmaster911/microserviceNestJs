import { Module } from '@nestjs/common';
import { PcHealthService } from './pc-health.service';
import { PcHealthController } from './pc-health.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PcInfoService } from 'src/pc-info-service/pc-info-service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBIT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [PcHealthController],
  providers: [PcHealthService, PcInfoService],
})
export class PcHealthModule {}
