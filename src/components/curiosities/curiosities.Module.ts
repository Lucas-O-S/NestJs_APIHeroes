import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from 'src/models/index.model';
import { CuriositiesService } from "./curiosities.Service";
import { CuriositiesController } from "./curiosities.Controller";


@Module({
    imports: [SequelizeModule.forFeature(models)],
    controllers: [CuriositiesController],
    providers: [CuriositiesService],
    exports: [CuriositiesService]
})
export class CuriositiesModule {}