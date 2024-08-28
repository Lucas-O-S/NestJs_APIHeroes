import { Test, TestingModule } from '@nestjs/testing';
import { MenuPrincipalController } from './menu_principal.controller';
import { MenuPrincipalService } from './menu_principal.service';

describe('MenuPrincipalController', () => {
  let controller: MenuPrincipalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuPrincipalController],
      providers: [MenuPrincipalService],
    }).compile();

    controller = module.get<MenuPrincipalController>(MenuPrincipalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
