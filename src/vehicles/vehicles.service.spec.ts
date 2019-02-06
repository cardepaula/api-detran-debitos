import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesService],
    }).compile();
    service = module.get<VehiclesService>(VehiclesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
