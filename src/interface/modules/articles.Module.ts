import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { models } from 'src/infrastructure/database/sequelize/models/index.model';
import { ArticlesService } from "../../components/articles/articles.Service";
import { ArticlesController } from "../controllers/articles.Controller";

@Module({
    imports: [
        SequelizeModule.forFeature(models)
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticleModule {}