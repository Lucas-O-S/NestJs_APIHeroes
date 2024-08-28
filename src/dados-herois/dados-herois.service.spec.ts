import { Test, TestingModule } from '@nestjs/testing';
import { DadosHeroisService } from './dados-herois.service';

describe('DadosHeroisService', () => {
  let service: DadosHeroisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DadosHeroisService],
    }).compile();

    service = module.get<DadosHeroisService>(DadosHeroisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
