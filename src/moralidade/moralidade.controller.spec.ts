import { Test, TestingModule } from '@nestjs/testing';
import { MoralidadeController } from './moralidade.controller';
import { MoralidadeService } from './moralidade.service';

describe('MoralidadeController', () => {
  let controller: MoralidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoralidadeController],
      providers: [MoralidadeService],
    }).compile();

    controller = module.get<MoralidadeController>(MoralidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
