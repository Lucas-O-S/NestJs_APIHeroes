import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/models/index.model';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [StudioController],
  providers: [StudioService],
  exports: [StudioService]
})
export class StudioModule {}
