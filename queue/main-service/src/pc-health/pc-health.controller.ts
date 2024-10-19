import { Controller, Post, Body } from '@nestjs/common';
import { PcHealthService } from './pc-health.service';
import { CreatePcHealthDto } from './dto/create-pc-health.dto';

@Controller('pc-health')
export class PcHealthController {
  constructor(private readonly pcHealthService: PcHealthService) {}

  @Post()
  create(@Body() createPcHealthDto: CreatePcHealthDto) {
    return this.pcHealthService.create(createPcHealthDto);
  }
}
