import { Module } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { DadosHeroisController } from './dados-herois.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {models} from '../models/index.model';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [DadosHeroisController],
  providers: [DadosHeroisService],
  exports: [DadosHeroisService],
})
export class DadosHeroisModule {}
