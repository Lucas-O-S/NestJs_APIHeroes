import { Test, TestingModule } from '@nestjs/testing';
import { MoralidadeService } from './moralidade.service';

describe('MoralidadeService', () => {
  let service: MoralidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoralidadeService],
    }).compile();

    service = module.get<MoralidadeService>(MoralidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
