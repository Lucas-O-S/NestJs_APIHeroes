import { Module } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { DadosHeroisController } from './dados-herois.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { models} from '../../models/index.model';
import { TeamModule } from '../team/team.module';
import { StudioModule } from '../studio/studio.module';

@Module({
  imports: [SequelizeModule.forFeature(models), TeamModule, StudioModule],
  controllers: [DadosHeroisController],
  providers: [DadosHeroisService],
  exports: [DadosHeroisService],
})
export class DadosHeroisModule {}
