import { Module } from '@nestjs/common';
import { OrigemService } from './origem.service';
import { OrigemController } from './origem.controller';
import { models } from 'src/models/index.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [OrigemController],
  providers: [OrigemService],
  exports: [OrigemService]
})
export class OrigemModule {}
