import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { CuriositiesController } from "../controllers/curiosities.Controller";
import { CuriosityService } from "src/application/services/curiosities.service";


@Module({
    imports: [SequelizeModule.forFeature(models)],
    controllers: [CuriositiesController],
    providers: [CuriosityService],
    exports: [CuriosityService]
})
export class CuriositiesModule {}