import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { StudioController } from '../controllers/studio.controller';
import { StudioService } from 'src/application/services/studio.service';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [StudioController],
  providers: [StudioService],
  exports: [StudioService]
})
export class StudioModule {}
