import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Article } from "src/infrastructure/database/sequelize/models/article.model";
import { ArticlesRepository } from "src/infrastructure/repositories/articles.repository";
import { CreateArticleDto } from "src/interface/dtos/articles/articlesCreate.dto";

@Injectable()
export class CreateArticleUseCase {
    
    constructor(
        private readonly articleRepository: ArticlesRepository
    ){}

    async createArticle(articleDto: CreateArticleDto): Promise<ApiResponseInterface<Article>>{
        const articlesExists = await this.articleRepository.findArticleByName(articleDto.title);

        if(articlesExists){
            return{
                status:HttpStatus.CONFLICT,
                message: "Artigo já exsite."
            }
        }

        await this.articleRepository.createArticle(articleDto);

        return {
            status: HttpStatus.OK,
            message: "Artigo cadastrado com sucesso."
        }
    }
}