import { Module } from '@nestjs/common';
import { SexoService } from './sexo.service';
import { SexoController } from './sexo.controller';
import { models } from 'src/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [SexoController],
  providers: [SexoService],
  exports: [SexoService]
})
export class SexoModule {}
