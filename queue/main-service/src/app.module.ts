import { Module } from '@nestjs/common';
import { PcHealthModule } from './pc-health/pc-health.module';

@Module({
  imports: [PcHealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
