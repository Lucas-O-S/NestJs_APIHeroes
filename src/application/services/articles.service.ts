import { Injectable } from "@nestjs/common";
import { CreateArticleUseCase } from "../use-cases/articles/create-articles.use-case";
import { CreateArticleDto } from "src/interface/dtos/articles/articlesCreate.dto";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Article } from "src/infrastructure/database/sequelize/models/article.model";
import { UpdateArticlesDto } from "src/interface/dtos/articles/articlesUpdate.dto";
import { UpdateArticleUseCase } from "../use-cases/articles/update-article.use-case";

@Injectable()
export class ArticlesService{

    constructor(
        private readonly createArticleUseCase: CreateArticleUseCase,
        private readonly updateArticleUseCase: UpdateArticleUseCase
    ){}

    async createArticle(articleDto: CreateArticleDto): Promise<ApiResponseInterface<Article>>{
        return await this.createArticleUseCase.createArticle(articleDto);
    }

    async updateArticle(id:number, articleDto: UpdateArticlesDto): Promise<ApiResponseInterface<Article>>{
        return await this.updateArticleUseCase.updateArticle(id, articleDto);
    }
}