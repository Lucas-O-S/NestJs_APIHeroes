import { Module } from '@nestjs/common';
import { DadosHeroisService } from './dados-herois.service';
import { DadosHeroisController } from './dados-herois.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { models} from '../models/index.model';
import { EquipeModule } from 'src/equipe/equipe.module';
import { EditoraModule } from 'src/editora/editora.module';

@Module({
  imports: [SequelizeModule.forFeature(models), EquipeModule, EditoraModule],
  controllers: [DadosHeroisController],
  providers: [DadosHeroisService],
  exports: [DadosHeroisService],
})
export class DadosHeroisModule {}
