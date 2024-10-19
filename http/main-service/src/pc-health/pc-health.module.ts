import { Module } from '@nestjs/common';
import { PcHealthService } from './pc-health.service';
import { PcHealthController } from './pc-health.controller';

@Module({
  controllers: [PcHealthController],
  providers: [PcHealthService],
})
export class PcHealthModule {}
