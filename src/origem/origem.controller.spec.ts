import { Test, TestingModule } from '@nestjs/testing';
import { OrigemController } from './origem.controller';
import { OrigemService } from './origem.service';

describe('OrigemController', () => {
  let controller: OrigemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrigemController],
      providers: [OrigemService],
    }).compile();

    controller = module.get<OrigemController>(OrigemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
