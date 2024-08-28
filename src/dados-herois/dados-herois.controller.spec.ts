import { Test, TestingModule } from '@nestjs/testing';
import { DadosHeroisController } from './dados-herois.controller';
import { DadosHeroisService } from './dados-herois.service';

describe('DadosHeroisController', () => {
  let controller: DadosHeroisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DadosHeroisController],
      providers: [DadosHeroisService],
    }).compile();

    controller = module.get<DadosHeroisController>(DadosHeroisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
