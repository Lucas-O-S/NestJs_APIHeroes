import { Module } from '@nestjs/common';
import { MenuPrincipalService } from '../../menu_principal/menu_principal.service';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuPrincipalController } from '../controllers/menu_principal.controller';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [MenuPrincipalController],
  providers: [MenuPrincipalService],
  exports: [MenuPrincipalService]
})
export class MenuPrincipalModule {}
