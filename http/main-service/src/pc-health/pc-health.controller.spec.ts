import { Test, TestingModule } from '@nestjs/testing';
import { PcHealthController } from './pc-health.controller';
import { PcHealthService } from './pc-health.service';

describe('PcHealthController', () => {
  let controller: PcHealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PcHealthController],
      providers: [PcHealthService],
    }).compile();

    controller = module.get<PcHealthController>(PcHealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
