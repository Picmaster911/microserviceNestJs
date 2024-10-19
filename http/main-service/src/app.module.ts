import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PcHealthModule } from './pc-health/pc-health.module';

@Module({
  imports: [PcHealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
