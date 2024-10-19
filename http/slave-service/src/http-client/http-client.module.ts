import { Global, Module } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { HttpModule } from '@nestjs/axios';
import { PcInfoService } from 'src/pc-info-service/pc-info-service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpClientService, PcInfoService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
