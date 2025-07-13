import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { CuriositiesController } from "../controllers/curiosities.Controller";
import { CuriositiesService } from "src/components/curiosities/curiosities.Service";


@Module({
    imports: [SequelizeModule.forFeature(models)],
    controllers: [CuriositiesController],
    providers: [CuriositiesService],
    exports: [CuriositiesService]
})
export class CuriositiesModule {}