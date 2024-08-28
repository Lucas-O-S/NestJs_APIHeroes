import { Module } from '@nestjs/common';
import { MoralidadeService } from './moralidade.service';
import { MoralidadeController } from './moralidade.controller';
import { models } from 'src/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature(models)], 
  controllers: [MoralidadeController],
  providers: [MoralidadeService],
  exports: [MoralidadeService]
})
export class MoralidadeModule {}
