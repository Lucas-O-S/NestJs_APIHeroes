import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { StudioController } from '../controllers/studio.controller';
import { StudioService } from 'src/application/services/studio.service';
import { StudioRepository } from 'src/infrastructure/repositories/studio.repository';
import { CreateStudioUseCase } from 'src/application/use-cases/studio/create-studio.use-case';
import { FindAllStudioUseCase } from 'src/application/use-cases/studio/find-all-studio.use-case';
import { DeleteStudioUseCase } from 'src/application/use-cases/studio/delete-studio.use-case';
import { FindStudioByIdUseCase } from 'src/application/use-cases/studio/find-studio-by-id.use-case';
import { UpdateStudioUseCase } from 'src/application/use-cases/studio/update-studio.use-case';

@Module({
  imports: [SequelizeModule.forFeature(models)],
  controllers: [StudioController],
  providers: [
    StudioService,
    CreateStudioUseCase,
    FindAllStudioUseCase,
    DeleteStudioUseCase,
    FindStudioByIdUseCase,
    UpdateStudioUseCase, 
    StudioRepository
  ],
  exports: [
    StudioService,
    StudioRepository
  ]
})
export class StudioModule {}
