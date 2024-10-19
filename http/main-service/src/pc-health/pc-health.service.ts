import { Injectable } from '@nestjs/common';
import { CreatePcHealthDto } from './dto/create-pc-health.dto';

@Injectable()
export class PcHealthService {
  create(createPcHealthDto: CreatePcHealthDto) {
    console.log(createPcHealthDto);
  }
}
