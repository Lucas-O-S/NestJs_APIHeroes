import { Module } from '@nestjs/common';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuPrincipalController } from '../controllers/menu_principal.controller';
import { MenuPrincipalService } from 'src/application/services/menu-principal.service';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [MenuPrincipalController],
  providers: [MenuPrincipalService],
  exports: [MenuPrincipalService]
})
export class MenuPrincipalModule {}
