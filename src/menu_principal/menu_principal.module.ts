import { Module } from '@nestjs/common';
import { MenuPrincipalService } from './menu_principal.service';
import { MenuPrincipalController } from './menu_principal.controller';
import { models } from 'src/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [MenuPrincipalController],
  providers: [MenuPrincipalService],
  exports: [MenuPrincipalService]
})
export class MenuPrincipalModule {}
