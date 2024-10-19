import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreatePcHealthDto } from './dto/create-pc-health.dto';
import { ClientProxy } from '@nestjs/microservices';
import { PcInfoService } from 'src/pc-info-service/pc-info-service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PcHealthService {
  private readonly logger = new Logger(PcHealthService.name);
  constructor(
    @Inject('RABBIT_SERVICE') private rabbitClient: ClientProxy,
    private readonly pcInfoService: PcInfoService,
  ) {}

  create(createPcHealthDto: CreatePcHealthDto) {
    this.rabbitClient.emit('main_queue', createPcHealthDto);
    return { message: 'Ok' };
  }

  async rabbitSend(queue: string, createPcHealthDto: CreatePcHealthDto) {
    try {
      const response = await lastValueFrom(
        this.rabbitClient.send('main_queue', createPcHealthDto),
      );
      this.logger.log(JSON.stringify(response));
    } catch (error) {
      this.logger.error(`Error sending message to queue "${queue}":`, error);
    }
  }

  startCyclicMessage(queue: string, intervalMs: number) {
    setInterval(async () => {
      const cpuLoad = await this.pcInfoService.getCpuLoad();
      const cpuTemp = await this.pcInfoService.getCpuTemperature();
      const statMemory = this.pcInfoService.getMemoryUsage();
      const data = new Date();
      const dataTime = data.toISOString();
      this.logger.log(
        `  cpuLoad ${cpuLoad}  cpuTemp ${cpuTemp} statMemory ${statMemory} `,
      );
      await this.rabbitSend(queue, {
        cpuLoad,
        cpuTemp,
        statMemory,
        dataTime,
      });
    }, intervalMs);
  }
  onModuleInit() {
    this.logger.log(`Modul Init ${PcHealthService.name}`);
    const queue = 'main_queue';
    const intervalMs = 10000;
    this.startCyclicMessage(queue, intervalMs);
  }
}
