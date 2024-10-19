import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { PcHealthService } from './pc-health.service';
import { CreatePcHealthDto } from './dto/create-pc-health.dto';
import { Response } from 'express';

@Controller('pc-health')
export class PcHealthController {
  constructor(private readonly pcHealthService: PcHealthService) {}

  @Post()
  create(@Body() createPcHealthDto: CreatePcHealthDto, @Res() res: Response) {
    this.pcHealthService.create(createPcHealthDto);
    return res.status(HttpStatus.OK).send();
  }
}
