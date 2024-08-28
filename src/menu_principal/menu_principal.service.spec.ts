import { Test, TestingModule } from '@nestjs/testing';
import { MenuPrincipalService } from './menu_principal.service';

describe('MenuPrincipalService', () => {
  let service: MenuPrincipalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuPrincipalService],
    }).compile();

    service = module.get<MenuPrincipalService>(MenuPrincipalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
