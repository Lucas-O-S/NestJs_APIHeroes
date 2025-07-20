import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { ArticlesController } from "../controllers/articles.Controller";
import { ArticlesService } from "src/application/services/articles.service";

@Module({
    imports: [
        SequelizeModule.forFeature(models)
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticleModule {}