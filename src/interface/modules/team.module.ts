import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { TeamController } from '../controllers/team.controller';
import { TeamService } from 'src/application/services/team.service';

@Module({
  imports: [SequelizeModule.forFeature(models)],
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService]
})
export class TeamModule {}
