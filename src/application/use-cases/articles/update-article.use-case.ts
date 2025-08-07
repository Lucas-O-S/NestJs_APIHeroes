import { HttpStatus, Injectable } from "@nestjs/common";
import { ApiResponseInterface } from "src/domain/interfaces/APIResponse.interface";
import { Article } from "src/infrastructure/database/sequelize/models/article.model";
import { ArticlesRepository } from "src/infrastructure/repositories/articles.repository";
import { UpdateArticlesDto } from "src/interface/dtos/articles/articlesUpdate.dto";

@Injectable()
export class UpdateArticleUseCase {

    constructor(
        private readonly articleRepository: ArticlesRepository
    ){}

    async updateArticle(id: number, articleDto:UpdateArticlesDto): Promise<ApiResponseInterface<Article>>{
        const article = await this.articleRepository.findArticleById(id);

        if(!article){
            return{
                status:HttpStatus.NOT_FOUND,
                message: "Artigo não encontrado, não é possivel atualizar."
            }
        }

        await this.articleRepository.updateArticle(id, articleDto);

        return{
            status:HttpStatus.OK,
            message: "Artigo atualizado com sucesso."
        }
    }
}