import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { PcInfoService } from 'src/pc-info-service/pc-info-service';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly pcInfoServise: PcInfoService,
  ) {}

  async fetchData(url: string) {
    return this.httpService.get(url).pipe(map((response) => response.data));
  }

  async postData(url: string, data: any): Promise<any> {
    try {
      const response = await lastValueFrom(this.httpService.post(url, data));
      this.logger.log(`Response status: ${response.status}`);
      return response.data;
    } catch (error) {
      this.logger.error('Error during POST request:', error);
      return null;
    }
  }

  startCyclicPost(url: string, intervalMs: number) {
    this.logger.log(`Modul Post Request ${HttpClientService.name}`);
    setInterval(async () => {
      const cpuLoad = await this.pcInfoServise.getCpuLoad();
      const cpuTemp = await this.pcInfoServise.getCpuTemperature();
      const statMemory = this.pcInfoServise.getMemoryUsage();
      const data = new Date();
      const dataTime = data.toISOString();
      this.logger.log(
        `  cpuLoad ${cpuLoad}  cpuTemp ${cpuTemp} statMemory ${statMemory} `,
      );
      this.postData(url, { cpuLoad, cpuTemp, statMemory, dataTime });
    }, intervalMs);
  }

  onModuleInit() {
    this.logger.log(`Modul Init ${HttpClientService.name}`);
    const url = 'http://localhost:5000/api/pc-health';
    const intervalMs = 10000;
    this.startCyclicPost(url, intervalMs);
  }
}
