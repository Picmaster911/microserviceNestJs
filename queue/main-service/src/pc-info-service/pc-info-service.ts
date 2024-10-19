import { Injectable, Logger } from '@nestjs/common';
import * as os from 'os';
import * as si from 'systeminformation';

@Injectable()
export class PcInfoService {
  private readonly logger = new Logger(PcInfoService.name);
  async getCpuTemperature(): Promise<string> {
    try {
      const temp = await si.cpuTemperature();
      return `Temp CPU: ${temp.main}°C`;
    } catch (error) {
      this.logger.error('Error', error);
      return 'Cant get Temperature CPU';
    }
  }

  getMemoryUsage(): string {
    const totalMemory = os.totalmem() / (1024 * 1024);
    const freeMemory = os.freemem() / (1024 * 1024);
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercentage = (usedMemory / totalMemory) * 100;

    return `Memory: Total ${totalMemory.toFixed(2)} MB, Free ${freeMemory.toFixed(2)} MB, Used ${memoryUsagePercentage.toFixed(2)}%`;
  }

  async getCpuLoad(): Promise<string> {
    try {
      const load = await si.currentLoad();
      return `Processor load: ${load.currentLoad.toFixed(2)}%`;
    } catch (error) {
      this.logger.error('Error', error);
      return 'Cant get processor load ';
    }
  }
}
