import { Test, TestingModule } from '@nestjs/testing';
import { PcHealthService } from './pc-health.service';

describe('PcHealthService', () => {
  let service: PcHealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcHealthService],
    }).compile();

    service = module.get<PcHealthService>(PcHealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
