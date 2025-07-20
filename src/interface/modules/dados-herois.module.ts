import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models} from '../../infrastructure/database/sequelize/models/index.model';
import { StudioModule } from './studio.module';
import { TeamModule } from './team.module';
import { DadosHeroisController } from '../controllers/dados-herois.controller';
import { DataHeroesService } from 'src/application/services/data-heroes.service';

@Module({
  imports: [SequelizeModule.forFeature(models), TeamModule, StudioModule],
  controllers: [DadosHeroisController],
  providers: [DataHeroesService],
  exports: [DataHeroesService],
})
export class DadosHeroisModule {}
