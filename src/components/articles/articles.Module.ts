import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from 'src/models/index.model';
import { ArticlesService } from "./articles.Service";
import { ArticlesController } from "./articles.Controller";

@Module({
    imports: [
        SequelizeModule.forFeature(models)
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticleModule {}