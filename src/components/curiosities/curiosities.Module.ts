import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from 'src/models/index.model';
import { CuriositiesService } from "./curiosities.Service";
import { ArticlesController } from "../articles/articles.Controller";


@Module({
    imports: [
        SequelizeModule.forFeature(models)
    ],
    controllers: [ArticlesController],
    providers: [CuriositiesService],
    exports: [CuriositiesService]
})
export class CuriositiesModule {}