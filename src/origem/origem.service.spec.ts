import { Test, TestingModule } from '@nestjs/testing';
import { OrigemService } from './origem.service';

describe('OrigemService', () => {
  let service: OrigemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrigemService],
    }).compile();

    service = module.get<OrigemService>(OrigemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
