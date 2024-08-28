import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuPrincipalService } from './menu_principal.service';
import { CreateMenuPrincipalDto } from './dto/create-menu_principal.dto';
import { UpdateMenuPrincipalDto } from './dto/update-menu_principal.dto';

@Controller('menu_principal')
export class MenuPrincipalController {
  constructor(private readonly menuPrincipalService: MenuPrincipalService) {}

  @Get('getAll')
  async getDadosMenu(): Promise<any[]>  {
    console.log('rota sendo chamada');
    return this.menuPrincipalService.getData();
  }

}
