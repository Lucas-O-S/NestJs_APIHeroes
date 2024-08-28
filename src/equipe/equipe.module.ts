import { Module } from '@nestjs/common';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';
import { models } from 'src/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [EquipeController],
  providers: [EquipeService],
  exports: [EquipeService]
})
export class EquipeModule {}
