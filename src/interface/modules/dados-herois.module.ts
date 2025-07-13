import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models} from '../../infrastructure/database/sequelize/models/index.model';
import { StudioModule } from './studio.module';
import { TeamModule } from './team.module';
import { DadosHeroisController } from '../controllers/dados-herois.controller';
import { DadosHeroisService } from 'src/components/dados-herois/dados-herois.service';

@Module({
  imports: [SequelizeModule.forFeature(models), TeamModule, StudioModule],
  controllers: [DadosHeroisController],
  providers: [DadosHeroisService],
  exports: [DadosHeroisService],
})
export class DadosHeroisModule {}
