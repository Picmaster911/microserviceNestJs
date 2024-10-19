import { PartialType } from '@nestjs/mapped-types';
import { CreatePcHealthDto } from './create-pc-health.dto';

export class UpdatePcHealthDto extends PartialType(CreatePcHealthDto) {}
