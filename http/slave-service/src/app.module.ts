import { Module } from '@nestjs/common';
import { HttpClientModule } from './http-client/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
