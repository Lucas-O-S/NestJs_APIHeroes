import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/models/index.model';

@Module({
  imports: [SequelizeModule.forFeature(models)],
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService]
})
export class TeamModule {}
